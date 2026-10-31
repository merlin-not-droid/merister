"""치지직 다시보기의 채팅 리플레이로 하이라이트 후보 구간을 찾고 프리미어 프로용 시퀀스를 만든다.

방송 다시보기에서는 시청자 채팅이 몰리는 곳이 곧 편집점인 경우가 많다.
  1. 치지직 API 에서 영상 정보와 채팅 리플레이 전체를 받는다 (chat.jsonl 에 저장해 두고 다시 받지 않는다).
  2. 5초 단위로 채팅 수와 반응 종류(ㅋㅋ 웃음, ㄷㄷ 놀람, ?? 당황, ㅠㅠ 감동, 클립 요청, 응원, 후원)를 센다.
  3. 앞뒤 5분 중앙값을 기준선으로 삼아 채팅이 평소보다 튀는 순간을 찾는다.
     시청자 수가 방송 중에 바뀌어도 기준선이 따라가므로 초반·후반 피크를 공평하게 비교할 수 있다.
  4. --vod 로 원본 파일을 주면 ffmpeg 으로 1초 단위 음량을 재서, 채팅 직전 30초 안의 큰 소리(비명·폭소)를
     점수에 더하고 15초 넘는 무음(자리 비움 등)을 삭제 후보로 표시한다.
  5. 채팅은 사건보다 늦게 올라오므로 채팅이 늘기 시작한 지점 40초 전부터 잦아든 뒤 15초까지를
     후보 구간으로 잡는다.

출력 (기본 폴더 highlights_<영상 번호>/)
  highlights.md, highlights.csv   후보 구간 (점수순 · 시간순, 반응 종류, 추천 편집, 대표 채팅)
  cut_candidates.csv              채팅이 끊기거나 크게 줄어든 구간, 무음 구간 (삭제 후보)
  timeline.csv, chat_density.svg  5초 단위 채팅 그래프
  premiere_markers.xml            원본 전체 + 후보·삭제 후보 마커 시퀀스 (FCP7 XML)
  premiere_selects.xml            후보 구간만 시간순으로 이어 붙인 셀렉트 시퀀스 (FCP7 XML)

표준 라이브러리만 쓴다. --vod 의 음량 분석과 프레임레이트 확인에만 ffmpeg / ffprobe 가 필요하다.

사용 예:
  python chzzk_highlights.py https://chzzk.naver.com/video/15940407
  python chzzk_highlights.py 15940407 --vod D:/vod/15940407.mp4 --top 40
"""

import argparse
import bisect
import csv
import json
import math
import re
import shutil
import statistics
import subprocess
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

API = "https://api.chzzk.naver.com/service"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/130.0.0.0 Safari/537.36")
BIN = 5                     # seconds per timeline bin
SMOOTH = 3                  # bins summed for the chat curve (15 s)
BASE_HALF = 60              # bins on each side of the rolling baseline (5 min)
AUDIO_LAG = 6               # bins before a chat bin searched for a loud moment (30 s)
DONATION_TYPES = {10, 11}   # messageTypeCode: 10 donation, 11 subscription
STANDARD_FPS = (23.976, 24, 25, 29.97, 30, 47.952, 48, 50, 59.94, 60)

# 반응 종류 (한 채팅이 여러 종류에 걸릴 수 있다)
REACTIONS = {
    "웃음": re.compile(r"ㅋ{2,}|ㅎ{3,}|크크|킹받|개웃|웃기"),
    "놀람": re.compile(r"ㄷ{2,}|^와+|와{2,}|우와|헐|미친|미쳤|ㅁㅊ|대박|지렸|실화|오{3,}"),
    "당황": re.compile(r"\?{2,}|뭐야|뭐임|뭐함|엥|에바"),
    "감동": re.compile(r"ㅠ{2,}|ㅜ{2,}|감동|울컥|눈물"),
    "클립": re.compile(r"클립|박제|레전드|편집점|짤각|각이다|편집각"),
    "응원": re.compile(r"ㄱㄱ|가즈아|화이팅|파이팅|축하|ㅊㅊ|ㅊㅋ|\bgg\b|굿굿", re.I),
}
# 반응 종류별 추천 편집 (EDIT_GUIDE.md 6장의 효과 레시피와 짝)
TREATMENT = {
    "웃음": "펀치인 줌 + 핵심 대사 강조 자막 + 효과음",
    "놀람": "직전 3~5초 슬로우 리플레이 + 화면 흔들림",
    "당황": "프리즈 프레임 + 물음표 자막 / 정적",
    "감동": "슬로우 + 잔잔한 BGM, 효과 최소화",
    "클립": "시청자 클립 요청 — 우선 사용, 썸네일 후보",
    "응원": "결과 순간 — 챕터 마무리 / 엔딩 후보",
    "후원": "후원 문구 오버레이 + 리액션 줌",
    "대화": "대화 흐름 — 점프컷으로 압축",
}
EMOTE = re.compile(r"\{:[^{}]*:\}")
HANGUL = re.compile(r"[가-힣]")
INFO_FIELDS = ("videoNo", "videoTitle", "videoType", "duration", "publishDate", "liveOpenDate",
               "videoCategory", "videoCategoryValue", "readCount", "adult", "tags")


def parse_args():
    p = argparse.ArgumentParser(description="Find highlight candidates in a CHZZK VOD from its chat replay "
                                            "and write Premiere Pro (FCP7 XML) marker / selects sequences")
    p.add_argument("video", help="CHZZK video URL (https://chzzk.naver.com/video/<no>) or video number")
    p.add_argument("--vod", help="local VOD file: adds loudness / silence analysis (needs ffmpeg) "
                                 "and is linked in the Premiere XML")
    p.add_argument("--out", help="output directory (default: highlights_<video no>)")
    p.add_argument("--top", type=int, default=30, help="number of highlight candidates")
    p.add_argument("--pre", type=float, default=40,
                   help="seconds kept before a chat surge starts (chat lags the moment it reacts to)")
    p.add_argument("--post", type=float, default=15, help="seconds kept after a chat surge ends")
    p.add_argument("--min-gap", type=float, default=90, help="minimum seconds between two peaks")
    p.add_argument("--min-z", type=float, default=2.0, help="minimum surge score for a candidate")
    p.add_argument("--fps", type=float, default=60, help="VOD frame rate when ffprobe can't read --vod")
    p.add_argument("--width", type=int, default=1920, help="VOD width when ffprobe can't read --vod")
    p.add_argument("--height", type=int, default=1080, help="VOD height when ffprobe can't read --vod")
    p.add_argument("--cookies", help='cookie header for 19+ VODs, e.g. "NID_AUT=...; NID_SES=..."')
    p.add_argument("--refresh", action="store_true", help="download video info and chat again")
    return p.parse_args()


def fmt_time(sec):
    sec = max(0, int(round(sec)))
    return f"{sec // 3600}:{sec % 3600 // 60:02d}:{sec % 60:02d}"


def fmt_dur(sec):
    sec = max(0, int(round(sec)))
    return f"{sec // 60}:{sec % 60:02d}"


# ---------------------------------------------------------------- CHZZK API

class HttpError(Exception):
    def __init__(self, code, body):
        super().__init__(f"HTTP {code}: {body[:200]}")
        self.code = code


def get_json(url, cookies=None, tries=5):
    headers = {"User-Agent": UA, "Accept": "application/json", "Referer": "https://chzzk.naver.com/"}
    if cookies:
        headers["Cookie"] = cookies
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
                body = r.read().decode("utf-8")
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < tries - 1:
                time.sleep(2 ** attempt)
                continue
            raise HttpError(e.code, e.read().decode("utf-8", "replace")) from None
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            if attempt < tries - 1:
                time.sleep(2 ** attempt)
                continue
            raise SystemExit(f"{url} 에 연결할 수 없습니다: {e}")
        try:
            return json.loads(body)
        except ValueError:
            raise SystemExit(f"{url} 의 응답이 JSON 이 아닙니다: {body[:200]!r}")


def fetch_video_info(video_no, cookies):
    errors = []
    for ver in ("v3", "v2", "v1"):
        try:
            data = get_json(f"{API}/{ver}/videos/{video_no}", cookies)
        except HttpError as e:
            errors.append(f"{ver}: HTTP {e.code}")
            continue
        content = data.get("content")
        if content:
            info = {k: content.get(k) for k in INFO_FIELDS}
            info["channelName"] = (content.get("channel") or {}).get("channelName")
            return info
        errors.append(f"{ver}: code={data.get('code')} message={data.get('message')}")
    raise SystemExit("영상 정보를 받지 못했습니다 (" + "; ".join(errors) + ").\n"
                     "19세 영상이면 --cookies 로 NID_AUT / NID_SES 쿠키를 넘기세요.")


def parse_chat(c):
    kind = c.get("messageTypeCode")
    amount = 0
    if kind in DONATION_TYPES:
        extras = c.get("extras") or {}
        if isinstance(extras, str):
            try:
                extras = json.loads(extras)
            except ValueError:
                extras = {}
        try:
            amount = int(extras.get("payAmount") or 0)
        except (AttributeError, TypeError, ValueError):
            amount = 0
    # 닉네임 · 사용자 해시는 저장하지 않는다 (분석에 필요 없음)
    return {"t": c["playerMessageTime"] / 1000, "type": kind, "msg": c.get("content") or "", "amount": amount}


def fetch_chats(video_no, cookies, duration):
    chats, seen, t, pages = [], set(), 0, 0
    while True:
        data = get_json(f"{API}/v1/videos/{video_no}/chats"
                        f"?playerMessageTime={t}&previousVideoChatSize=50", cookies)
        content = data.get("content") or {}
        for c in content.get("videoChats") or []:
            pt = c.get("playerMessageTime")
            key = (pt, c.get("messageTime"), c.get("userIdHash"), c.get("content"))
            if pt is None or key in seen:
                continue
            seen.add(key)
            chats.append(parse_chat(c))
        pages += 1
        if pages % 25 == 0:
            print(f"  채팅 {len(chats):,}개 · {fmt_time(t / 1000)} / {fmt_time(duration)}", file=sys.stderr)
        nxt = content.get("nextPlayerMessageTime")
        if nxt is None or (duration and nxt > (duration + 60) * 1000):
            break
        t = nxt if nxt > t else t + 1000
        time.sleep(0.05)
    chats.sort(key=lambda c: c["t"])
    return chats


def load_or_fetch_chats(out, video_no, cookies, duration, refresh):
    path = out / "chat.jsonl"
    if path.exists() and not refresh:
        with path.open(encoding="utf-8") as f:
            return [json.loads(line) for line in f if line.strip()]
    print("채팅 리플레이 받는 중...", file=sys.stderr)
    chats = fetch_chats(video_no, cookies, duration)
    part = path.with_suffix(".jsonl.part")
    with part.open("w", encoding="utf-8") as f:
        for c in chats:
            f.write(json.dumps(c, ensure_ascii=False) + "\n")
    part.replace(path)
    return chats


# ---------------------------------------------------------------- media

def ratio(s):
    try:
        n, d = (s or "0/0").split("/")
        return float(n) / float(d) if float(d) else 0.0
    except ValueError:
        return 0.0


def probe_media(vod, args, duration):
    media = {"fps": args.fps, "width": args.width, "height": args.height, "duration": duration,
             "vfr": False, "probed": False}
    ffprobe = shutil.which("ffprobe")
    if not vod or not ffprobe:
        return media
    r = subprocess.run([ffprobe, "-v", "error", "-select_streams", "v:0",
                        "-show_entries", "stream=width,height,r_frame_rate,avg_frame_rate:format=duration",
                        "-of", "json", str(vod)], capture_output=True, text=True, encoding="utf-8",
                       errors="replace")
    try:
        d = json.loads(r.stdout)
        st = d["streams"][0]
        r_fps, avg_fps = ratio(st.get("r_frame_rate")), ratio(st.get("avg_frame_rate"))
        real = avg_fps or r_fps
        media.update(fps=min(STANDARD_FPS, key=lambda f: abs(f - real)), width=int(st["width"]),
                     height=int(st["height"]), duration=float(d["format"]["duration"]), probed=True,
                     vfr=bool(r_fps and avg_fps and abs(r_fps - avg_fps) / r_fps > 0.01))
    except (KeyError, IndexError, TypeError, ValueError):
        print("ffprobe 로 --vod 를 읽지 못해 --fps / --width / --height 값을 씁니다.", file=sys.stderr)
    return media


def audio_levels(vod):
    """1초마다 RMS 음량(dBFS). ffmpeg 이 없으면 None."""
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        print("ffmpeg 이 없어 음량 분석을 건너뜁니다.", file=sys.stderr)
        return None
    print("원본 오디오 음량 분석 중 (긴 방송은 몇 분 걸림)...", file=sys.stderr)
    af = ("aformat=sample_fmts=flt:sample_rates=8000:channel_layouts=mono,"
          "asetnsamples=n=8000:p=0,astats=metadata=1:reset=1,"
          "ametadata=mode=print:key=lavfi.astats.Overall.RMS_level:file=-")
    cmd = [ffmpeg, "-hide_banner", "-nostats", "-loglevel", "error", "-i", str(vod),
           "-map", "0:a:0", "-af", af, "-f", "null", "-"]
    levels = []
    with subprocess.Popen(cmd, stdout=subprocess.PIPE, text=True, encoding="utf-8", errors="replace") as p:
        for line in p.stdout:
            if line.startswith("lavfi.astats.Overall.RMS_level="):
                try:
                    db = float(line.split("=", 1)[1])
                except ValueError:
                    db = -120.0
                levels.append(db if math.isfinite(db) else -120.0)
    if p.returncode != 0 or not levels:
        print("ffmpeg 음량 분석에 실패해 건너뜁니다.", file=sys.stderr)
        return None
    return levels


# ---------------------------------------------------------------- analysis

def rolling_median_mad(values, half):
    med, mad = [], []
    for i in range(len(values)):
        w = values[max(0, i - half): i + half + 1]
        m = statistics.median(w)
        med.append(m)
        mad.append(statistics.median([abs(v - m) for v in w]))
    return med, mad


def window_sum(values, half):
    return [sum(values[max(0, i - half): i + half + 1]) for i in range(len(values))]


def build_timeline(chats, duration):
    n = int(duration // BIN) + 1
    count, dono = [0] * n, [0] * n
    react = {k: [0] * n for k in REACTIONS}
    for c in chats:
        i = int(c["t"] // BIN)
        if not 0 <= i < n:
            continue
        count[i] += 1
        if c["type"] in DONATION_TYPES:
            dono[i] += 1
        msg = EMOTE.sub("", c["msg"])
        for k, rx in REACTIONS.items():
            if rx.search(msg):
                react[k][i] += 1
    # 반응 채팅과 클립 요청, 후원에 가중치를 줘서 "많이"보다 "크게" 반응한 순간을 앞에 둔다
    activity = [count[i] + 0.5 * sum(react[k][i] for k in REACTIONS if k != "클립")
                + 2 * react["클립"][i] + 2 * dono[i] for i in range(n)]
    smooth = window_sum(activity, SMOOTH // 2)
    base, mad = rolling_median_mad(smooth, BASE_HALF)
    z = [(s - b) / max(1.4826 * m, math.sqrt(max(b, 1.0)), 1.0) for s, b, m in zip(smooth, base, mad)]
    return {"n": n, "count": count, "count15": window_sum(count, SMOOTH // 2), "react": react, "dono": dono,
            "smooth": smooth, "base": base, "z": z}


def audio_timeline(levels, n):
    """5초 구간별 최대 음량과, 앞뒤 5분 대비 얼마나 큰지(z)."""
    loud = [max(levels[i * BIN:(i + 1) * BIN] or [-120.0]) for i in range(n)]
    base, mad = rolling_median_mad(loud, BASE_HALF)
    z = [(v - b) / max(1.4826 * m, 2.0) for v, b, m in zip(loud, base, mad)]
    return loud, z


def pick_candidates(tl, score, duration, args):
    n, z, smooth, base = tl["n"], tl["z"], tl["smooth"], tl["base"]
    gap = int(args.min_gap // BIN)
    blocked = [False] * n
    peaks = []
    for i in sorted(range(n), key=lambda i: score[i], reverse=True):
        if score[i] < args.min_z or len(peaks) >= args.top * 2:
            break
        if blocked[i] or smooth[i] - base[i] < 3:
            continue
        peaks.append(i)
        for j in range(max(0, i - gap), min(n, i + gap + 1)):
            blocked[j] = True
    windows = []
    for i in peaks:
        lo = hi = i
        while lo > 0 and i - lo < 36 and z[lo - 1] >= 1.0:   # 채팅이 늘기 시작한 곳 (최대 3분 앞)
            lo -= 1
        while hi < n - 1 and hi - i < 36 and z[hi + 1] >= 1.0:   # 잦아드는 곳 (최대 3분 뒤)
            hi += 1
        windows.append({"start": max(0.0, lo * BIN - args.pre), "end": min(duration, (hi + 1) * BIN + args.post),
                        "peak": (i + 0.5) * BIN, "onset": lo * BIN, "score": score[i]})
    windows.sort(key=lambda w: w["start"])
    merged = []
    for w in windows:
        if merged and w["start"] <= merged[-1]["end"]:
            m = merged[-1]
            m["end"] = max(m["end"], w["end"])
            if w["score"] > m["score"]:
                m.update(score=w["score"], peak=w["peak"], onset=w["onset"])
        else:
            merged.append(w)
    merged.sort(key=lambda w: w["score"], reverse=True)
    for rank, w in enumerate(merged[: args.top], 1):
        w["rank"] = rank
    return merged[: args.top]


def norm_msg(msg):
    m = re.sub(r"\s+", " ", EMOTE.sub("", msg)).strip()
    return re.sub(r"(.)\1{3,}", r"\1\1\1", m)[:40]   # ㅋㅋㅋㅋㅋㅋ → ㅋㅋㅋ


def describe(w, tl, chats, times):
    i = int(w["peak"] // BIN)
    lo, hi = max(0, i - 3), min(tl["n"], i + 4)
    mix = {k: sum(v[lo:hi]) for k, v in tl["react"].items()}
    dono, total = sum(tl["dono"][lo:hi]), sum(tl["count"][lo:hi])
    kind = max(mix, key=mix.get)
    if mix["클립"] >= max(3, 0.1 * total):
        kind = "클립"
    elif dono >= 3 and dono >= mix[kind]:
        kind = "후원"
    elif mix[kind] < max(3, 0.15 * total):
        kind = "대화"
    a = bisect.bisect_left(times, w["onset"] - 5)
    b = bisect.bisect_right(times, w["peak"] + 20)
    msgs = [norm_msg(chats[k]["msg"]) for k in range(a, b)]
    cnt = Counter(m for m in msgs if m)
    top = [m for m, _ in cnt.most_common(4)]
    # 반응 말고 무슨 일인지 알려주는 문장형 채팅
    text = [m for m, _ in Counter(m for m in msgs if len(HANGUL.findall(m)) >= 3).most_common(8) if m not in top]
    w["kind"] = kind
    w["treatment"] = TREATMENT[kind]
    w["chats"] = total
    w["samples"] = " · ".join(f"{m} ×{cnt[m]}" if cnt[m] > 1 else m for m in top + text[:3])


def runs(flags, min_len):
    out, start = [], None
    for i, f in enumerate(list(flags) + [False]):
        if f and start is None:
            start = i
        elif not f and start is not None:
            if i - start >= min_len:
                out.append((start, i))
            start = None
    return out


def find_cuts(tl, levels, duration):
    cuts = [(a * BIN, min(duration, b * BIN), "채팅 없음")
            for a, b in runs([c == 0 for c in tl["count"]], 120 // BIN)]
    typical = statistics.median(tl["count15"]) if tl["count15"] else 0
    if typical >= 4:
        low = [c < 0.25 * typical for c in tl["count15"]]
        cuts += [(a * BIN, min(duration, b * BIN), "채팅 저조 (평소의 25% 미만)") for a, b in runs(low, 180 // BIN)
                 if not any(x <= a * BIN and b * BIN <= y for x, y, _ in cuts)]
    if levels:
        cuts += [(a, b, "무음") for a, b in runs([db < -50 for db in levels], 15)]
    return sorted(cuts)


# ---------------------------------------------------------------- Premiere (FCP7 XML)

def frames(sec, fps):
    return int(round(sec * fps))


def _rate(parent, fps):
    r = ET.SubElement(parent, "rate")
    ET.SubElement(r, "timebase").text = str(round(fps))
    ET.SubElement(r, "ntsc").text = "TRUE" if abs(fps - round(fps)) > 0.01 else "FALSE"


def _timecode(parent, fps):
    tc = ET.SubElement(parent, "timecode")
    _rate(tc, fps)
    ET.SubElement(tc, "string").text = "00:00:00:00"
    ET.SubElement(tc, "frame").text = "0"
    ET.SubElement(tc, "displayformat").text = "NDF"


def _video_chars(parent, media):
    sc = ET.SubElement(parent, "samplecharacteristics")
    _rate(sc, media["fps"])
    for tag, val in (("width", media["width"]), ("height", media["height"]), ("anamorphic", "FALSE"),
                     ("pixelaspectratio", "square"), ("fielddominance", "none")):
        ET.SubElement(sc, tag).text = str(val)


def _audio_chars(parent):
    sc = ET.SubElement(parent, "samplecharacteristics")
    ET.SubElement(sc, "depth").text = "16"
    ET.SubElement(sc, "samplerate").text = "48000"


def _file(parent, media, full):
    f = ET.SubElement(parent, "file", id="file-1")
    if not full:   # 같은 파일은 처음 한 번만 정의하고 이후에는 id 로 참조
        return
    ET.SubElement(f, "name").text = media["name"]
    ET.SubElement(f, "pathurl").text = media["url"]
    _rate(f, media["fps"])
    ET.SubElement(f, "duration").text = str(frames(media["duration"], media["fps"]))
    _timecode(f, media["fps"])
    m = ET.SubElement(f, "media")
    _video_chars(ET.SubElement(m, "video"), media)
    a = ET.SubElement(m, "audio")
    _audio_chars(a)
    ET.SubElement(a, "channelcount").text = "2"


def write_sequence_xml(path, name, media, clips, markers):
    """clips: 원본 [(in 초, out 초)] 를 순서대로 이어 붙인다. markers: 시퀀스 기준 [(in 초, out 초 | None, 이름, 설명)]."""
    fps = media["fps"]
    spans = [(frames(a, fps), frames(b, fps)) for a, b in clips]
    root = ET.Element("xmeml", version="4")
    seq = ET.SubElement(root, "sequence", id="sequence-1")
    ET.SubElement(seq, "name").text = name
    ET.SubElement(seq, "duration").text = str(sum(b - a for a, b in spans))
    _rate(seq, fps)
    _timecode(seq, fps)
    med = ET.SubElement(seq, "media")
    video = ET.SubElement(med, "video")
    _video_chars(ET.SubElement(video, "format"), media)
    vtrack = ET.SubElement(video, "track")
    audio = ET.SubElement(med, "audio")
    ET.SubElement(audio, "numOutputChannels").text = "2"
    _audio_chars(ET.SubElement(audio, "format"))
    atrack = ET.SubElement(audio, "track", premiereTrackType="Stereo")
    pos = 0
    for j, (src_in, src_out) in enumerate(spans, 1):
        ids = {"video": f"clipitem-{j}", "audio": f"clipitem-{len(spans) + j}"}
        for kind, track in (("video", vtrack), ("audio", atrack)):
            attrs = {"id": ids[kind]}
            if kind == "audio":
                attrs["premiereChannelType"] = "stereo"
            ci = ET.SubElement(track, "clipitem", attrs)
            ET.SubElement(ci, "name").text = media["name"]
            ET.SubElement(ci, "enabled").text = "TRUE"
            ET.SubElement(ci, "duration").text = str(frames(media["duration"], fps))
            _rate(ci, fps)
            for tag, val in (("start", pos), ("end", pos + src_out - src_in), ("in", src_in), ("out", src_out)):
                ET.SubElement(ci, tag).text = str(val)
            _file(ci, media, full=(j == 1 and kind == "video"))
            if kind == "audio":
                st = ET.SubElement(ci, "sourcetrack")
                ET.SubElement(st, "mediatype").text = "audio"
                ET.SubElement(st, "trackindex").text = "1"
            for lkind in ("video", "audio"):
                link = ET.SubElement(ci, "link")
                ET.SubElement(link, "linkclipref").text = ids[lkind]
                ET.SubElement(link, "mediatype").text = lkind
                ET.SubElement(link, "trackindex").text = "1"
                ET.SubElement(link, "clipindex").text = str(j)
        pos += src_out - src_in
    for m_in, m_out, m_name, comment in markers:
        mk = ET.SubElement(seq, "marker")
        ET.SubElement(mk, "comment").text = comment
        ET.SubElement(mk, "name").text = m_name
        ET.SubElement(mk, "in").text = str(frames(m_in, fps))
        ET.SubElement(mk, "out").text = str(frames(m_out, fps)) if m_out is not None else "-1"
    if hasattr(ET, "indent"):   # Python 3.9+
        ET.indent(root)
    with open(path, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE xmeml>\n')
        f.write(ET.tostring(root, encoding="unicode") + "\n")


# ---------------------------------------------------------------- reports

def write_csv(path, header, rows):
    with open(path, "w", newline="", encoding="utf-8-sig") as f:   # BOM: 엑셀에서 한글이 깨지지 않게
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)


def write_svg(path, tl, duration, cands, cuts):
    W, H, L, R, T, B = 1800, 370, 56, 16, 44, 36
    ymax = max(max(tl["count15"]), 1) * 1.1

    def x(sec):
        return L + (W - L - R) * sec / max(duration, 1)

    def y(v):
        return T + (H - T - B) * (1 - v / ymax)

    out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
           f'font-family="sans-serif" font-size="12">', f'<rect width="{W}" height="{H}" fill="#ffffff"/>']
    for a, b, _ in cuts:
        out.append(f'<rect x="{x(a):.1f}" y="{T}" width="{max(x(b) - x(a), 1):.1f}" height="{H - T - B}" '
                   f'fill="#e5e7eb"/>')
    for w in cands:
        out.append(f'<rect x="{x(w["start"]):.1f}" y="{T}" width="{max(x(w["end"]) - x(w["start"]), 1):.1f}" '
                   f'height="{H - T - B}" fill="#fcd34d" fill-opacity="0.55"/>')
        out.append(f'<text x="{x(w["peak"]):.1f}" y="{T - 8}" text-anchor="middle" fill="#92400e">{w["rank"]}</text>')
    base15, _ = rolling_median_mad(tl["count15"], BASE_HALF)
    for series, style in ((base15, 'stroke="#9ca3af" stroke-dasharray="4 3"'), (tl["count15"], 'stroke="#2563eb"')):
        pts = " ".join(f"{x((i + 0.5) * BIN):.1f},{y(v):.1f}" for i, v in enumerate(series))
        out.append(f'<polyline points="{pts}" fill="none" {style} stroke-width="1"/>')
    step = 600 if duration <= 2 * 3600 else 1800
    for s in range(0, int(duration) + 1, step):
        out.append(f'<line x1="{x(s):.1f}" y1="{H - B}" x2="{x(s):.1f}" y2="{H - B + 5}" stroke="#374151"/>')
        out.append(f'<text x="{x(s):.1f}" y="{H - B + 18}" text-anchor="middle" fill="#374151">'
                   f'{s // 3600}:{s % 3600 // 60:02d}</text>')
    out.append(f'<text x="{L}" y="16" fill="#374151">15초당 채팅 수 (파랑) · 기준선 (회색 점선) · '
               f'노랑 = 하이라이트 후보(번호 = 점수 순위) · 회색 = 삭제 후보</text>')
    out.append("</svg>")
    Path(path).write_text("\n".join(out), encoding="utf-8")


def md_cell(s):
    return str(s).replace("|", "\\|").replace("\n", " ")


def write_report(path, info, media, chats, cands, cuts, args, used_audio, video_no):
    duration = media["duration"]
    total = sum(w["end"] - w["start"] for w in cands)
    need, cum = None, 0.0
    for k, w in enumerate(cands, 1):
        cum += w["end"] - w["start"]
        if need is None and cum >= 26 * 60:
            need = k
    dono = sum(1 for c in chats if c["type"] in DONATION_TYPES)
    lines = [
        f"# 하이라이트 후보 — {info.get('videoTitle') or video_no}", "",
        f"- 영상: https://chzzk.naver.com/video/{video_no}",
        f"- 채널: {info.get('channelName') or '-'} · 카테고리: {info.get('videoCategoryValue') or '-'} · "
        f"방송 시작: {info.get('liveOpenDate') or info.get('publishDate') or '-'}",
        f"- 길이: {fmt_time(duration)} · 채팅 {len(chats):,}개 · 후원/구독 {dono:,}건",
        f"- 방법: 5초 단위 채팅(반응 가중)을 앞뒤 5분 중앙값과 비교해 점수 {args.min_z:g} 이상, "
        f"피크 간격 {args.min_gap:.0f}초 이상" + (" · 채팅 직전 30초 안의 큰 소리 가산" if used_audio else ""),
        f"- 구간: 채팅이 늘기 시작한 지점 {args.pre:.0f}초 전 ~ 잦아든 뒤 {args.post:.0f}초 "
        "(채팅은 사건보다 늦게 올라오므로, 실제 장면은 보통 '반응 시작' 5~20초 앞에 있음)",
        f"- 프레임레이트 {media['fps']:g} fps, {media['width']}×{media['height']}"
        + ("" if media["probed"] else " (--vod 미지정 · 기본값, 원본과 다르면 --fps 로 다시 생성)"),
        "",
    ]
    if media["vfr"]:
        lines += ["> ⚠️ 원본이 가변 프레임레이트(VFR)로 보입니다. 프리미어에서 싱크가 밀리면 고정 프레임레이트로 변환한 뒤 "
                  "그 파일로 다시 실행하세요: `ffmpeg -i 원본.mp4 -fps_mode cfr -r 60 -c:v libx264 -crf 18 "
                  "-c:a aac -b:a 320k 원본_cfr.mp4`", ""]
    budget = (f"점수순 상위 **{need}개** 분량." if need else
              "후보를 다 써도 모자라므로 `--min-z 1.5` 처럼 기준을 낮추거나, 후보 사이의 흐름 구간을 직접 더하세요.")
    lines += [f"후보 {len(cands)}개, 합계 {fmt_dur(total)}. 파인컷(점프컷·공백 삭제)에서 보통 20~30%가 더 줄어들므로 "
              f"20분 영상에는 원본 약 26분이 필요합니다 → {budget}", "",
              "## 점수순", "",
              "| # | 원본 구간 | 길이 | 반응 시작 | 반응 | 점수 | 추천 편집 | 대표 채팅 |",
              "|---|---|---|---|---|---|---|---|"]
    for w in cands:
        lines.append(f"| {w['rank']} | {fmt_time(w['start'])}–{fmt_time(w['end'])} | {fmt_dur(w['end'] - w['start'])} "
                     f"| {fmt_time(w['onset'])} | {w['kind']} | {w['score']:.1f} | {w['treatment']} "
                     f"| {md_cell(w['samples'])} |")
    lines += ["", "## 시간순 (premiere_selects.xml 순서)", "",
              "| 순서 | # | 원본 구간 | 셀렉트 시퀀스 위치 | 반응 |", "|---|---|---|---|---|"]
    pos = 0.0
    for k, w in enumerate(sorted(cands, key=lambda w: w["start"]), 1):
        lines.append(f"| {k} | {w['rank']} | {fmt_time(w['start'])}–{fmt_time(w['end'])} | {fmt_time(pos)} | {w['kind']} |")
        pos += w["end"] - w["start"]
    lines += ["", "## 삭제 후보", ""]
    if cuts:
        lines += ["| 원본 구간 | 길이 | 이유 |", "|---|---|---|"]
        lines += [f"| {fmt_time(a)}–{fmt_time(b)} | {fmt_dur(b - a)} | {why} |" for a, b, why in cuts]
    else:
        lines.append("없음")
    lines += ["", "## 프리미어에서 열기", "",
              "1. 파일 > 가져오기(Ctrl+I) 로 `premiere_selects.xml`(후보만 이어 붙인 시퀀스)과 "
              "`premiere_markers.xml`(원본 전체 + 마커)을 불러옵니다.",
              "2. 미디어 연결 창이 뜨면 원본 VOD 파일을 지정합니다 (--vod 로 만든 경우 자동 연결).",
              "3. 셀렉트 시퀀스의 마커(반응 시작 위치)는 Shift+M / Ctrl+Shift+M 으로 이동하며 확인합니다.",
              "4. 점수만 믿지 말고 각 구간을 직접 보고 남길지 정합니다 — 채팅이 적어도 재밌는 장면, "
              "채팅은 많아도 맥락 없인 못 쓰는 장면이 있습니다.", ""]
    Path(path).write_text("\n".join(lines), encoding="utf-8")


# ---------------------------------------------------------------- main

def main():
    for stream in (sys.stdout, sys.stderr):   # 채팅의 이모지를 못 찍는 콘솔(cp949 리다이렉트 등)에서 죽지 않게
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(errors="replace")
    args = parse_args()
    m = re.search(r"(\d+)$", args.video.split("?")[0].rstrip("/"))
    if not m:
        raise SystemExit(f"영상 번호를 찾을 수 없습니다: {args.video}")
    video_no = m.group(1)
    if args.vod and not Path(args.vod).is_file():
        raise SystemExit(f"--vod 파일이 없습니다: {args.vod}")
    out = Path(args.out or f"highlights_{video_no}")
    out.mkdir(parents=True, exist_ok=True)

    info_path = out / "video_info.json"
    if info_path.exists() and not args.refresh:
        info = json.loads(info_path.read_text(encoding="utf-8"))
    else:
        info = fetch_video_info(video_no, args.cookies)
        info_path.write_text(json.dumps(info, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{info.get('videoTitle')} · {info.get('channelName')} · {fmt_time(info.get('duration') or 0)}",
          file=sys.stderr)

    media = probe_media(args.vod, args, float(info.get("duration") or 0))
    chats = load_or_fetch_chats(out, video_no, args.cookies, media["duration"], args.refresh)
    if not chats:
        raise SystemExit("채팅 리플레이가 비어 있습니다 (채팅 다시보기가 꺼진 영상일 수 있음).")
    if not media["duration"]:
        media["duration"] = chats[-1]["t"] + 1
    duration = media["duration"]

    tl = build_timeline(chats, duration)
    score = list(tl["z"])
    levels = audio_levels(args.vod) if args.vod else None
    loud, loud_z = audio_timeline(levels, tl["n"]) if levels else ([None] * tl["n"], [None] * tl["n"])
    if levels:
        for i in range(tl["n"]):
            score[i] += 0.5 * min(4.0, max(0.0, max(loud_z[max(0, i - AUDIO_LAG): i + 1])))
    cands = pick_candidates(tl, score, duration, args)
    times = [c["t"] for c in chats]
    for w in cands:
        describe(w, tl, chats, times)
    cuts = find_cuts(tl, levels, duration)

    write_csv(out / "highlights.csv",
              ["rank", "start", "end", "length_s", "chat_onset", "peak", "kind", "score", "treatment", "chats_35s",
               "sample_chats"],
              [[w["rank"], fmt_time(w["start"]), fmt_time(w["end"]), round(w["end"] - w["start"]),
                fmt_time(w["onset"]), fmt_time(w["peak"]), w["kind"], round(w["score"], 2), w["treatment"],
                w["chats"], w["samples"]] for w in cands])
    write_csv(out / "cut_candidates.csv", ["start", "end", "length_s", "reason"],
              [[fmt_time(a), fmt_time(b), round(b - a), why] for a, b, why in cuts])
    write_csv(out / "timeline.csv",
              ["t_s", "time", "chats"] + list(REACTIONS) + ["donations", "activity_15s", "baseline", "z",
                                                            "loudness_db", "loudness_z", "score"],
              [[i * BIN, fmt_time(i * BIN), tl["count"][i]] + [tl["react"][k][i] for k in REACTIONS]
               + [tl["dono"][i], round(tl["smooth"][i], 1), round(tl["base"][i], 1), round(tl["z"][i], 2),
                  "" if loud[i] is None else round(loud[i], 1), "" if loud_z[i] is None else round(loud_z[i], 2),
                  round(score[i], 2)] for i in range(tl["n"])])
    write_svg(out / "chat_density.svg", tl, duration, cands, cuts)
    write_report(out / "highlights.md", info, media, chats, cands, cuts, args, bool(levels), video_no)

    if args.vod:
        vod = Path(args.vod).resolve()
        media.update(name=vod.name, url=vod.as_uri())
    else:
        media.update(name=f"{video_no}.mp4", url=f"file://localhost/{video_no}.mp4")
    chrono = sorted(cands, key=lambda w: w["start"])
    write_sequence_xml(out / "premiere_markers.xml", f"{video_no}_원본_마커", media, [(0.0, duration)],
                       [(w["start"], w["end"], f"#{w['rank']} {w['kind']} {w['score']:.1f}",
                         f"{w['treatment']} | {w['samples']}") for w in chrono]
                       + [(a, b, f"[삭제후보] {why}", "") for a, b, why in cuts])
    sel_markers, pos = [], 0.0
    for w in chrono:
        sel_markers.append((pos + w["onset"] - w["start"], None,
                            f"#{w['rank']} {w['kind']} (원본 {fmt_time(w['start'])})",
                            f"채팅 반응 시작 — 실제 장면은 보통 5~20초 앞. {w['treatment']} | {w['samples']}"))
        pos += w["end"] - w["start"]
    write_sequence_xml(out / "premiere_selects.xml", f"{video_no}_하이라이트_셀렉트", media,
                       [(w["start"], w["end"]) for w in chrono], sel_markers)

    print(f"\n후보 {len(cands)}개 (합계 {fmt_dur(sum(w['end'] - w['start'] for w in cands))}) → {out}/highlights.md")
    for w in cands[:10]:
        print(f"  #{w['rank']:<3} {fmt_time(w['start'])}–{fmt_time(w['end'])}  {w['kind']:<3} "
              f"{w['score']:5.1f}  {w['samples'][:60]}")


if __name__ == "__main__":
    main()

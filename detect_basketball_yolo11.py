"""YOLO11 기반 농구 경기 영상의 선수 · 공 탐지 및 추적.

기본 모델은 YOLOE-11 (텍스트 프롬프트로 클래스를 지정하는 open-vocabulary YOLO11)이며
"person", "basketball" 두 프롬프트로 선수와 공을 동시에 탐지한다. COCO 사전학습 YOLO11
(yolo11s.pt 등, person / sports ball)이나 직접 파인튜닝한 YOLO11 가중치
(클래스 이름 player / ball 등)도 --weights 로 그대로 쓸 수 있다.

중계 화면에는 관중·벤치·사진기자·심판까지 수십 명이 잡히므로 다음 후처리를 한다.
  1. 코트 필터: 나무 바닥 색으로 코트 영역을 구하고, 발 위치가 코트 안에 있는 사람만 선수로 본다.
  2. 추적: ByteTrack 으로 선수마다 ID 를 붙인다.
  3. 팀 분류: 상체 유니폼 밝기 분포를 k-means 로 묶어 팀 A / 팀 B 로 나눈다
     (--teams 3 이면 가장 작은 군집을 심판으로 본다).
  4. 공: 프레임당 한 개만 고르고(이전 위치와 가까운 후보 우선), 짧은 공백은 선형 보간한다.

사용 예:
  python detect_basketball_yolo11.py --source data/videos/game.mp4
  python detect_basketball_yolo11.py --source data/videos/game.mp4 --weights weights/yolo11s.pt
"""

import argparse
import contextlib
import csv
import json
import os
import time
from collections import Counter, defaultdict, deque
from pathlib import Path

import cv2
import numpy as np
from ultralytics import YOLO, YOLOE
from ultralytics.trackers.byte_tracker import BYTETracker
from ultralytics.utils import YAML, IterableSimpleNamespace
from ultralytics.utils.checks import check_yaml

PLAYER_NAMES = {"person", "player", "basketball player"}
BALL_NAMES = {"sports ball", "ball", "basketball"}
BALL_COLOR = (0, 140, 255)  # BGR orange
TEAM_COLORS = {"team A": (255, 160, 0), "team B": (180, 0, 220), "referee": (0, 230, 230),
               "player": (255, 160, 0)}


def parse_args():
    p = argparse.ArgumentParser(description="YOLO11 basketball player & ball detection / tracking")
    p.add_argument("--source", default="data/videos/game.mp4", help="input video")
    p.add_argument("--weights", default="weights/yoloe-11l-seg.pt",
                   help="YOLOE-11 (text prompts), COCO YOLO11, or fine-tuned YOLO11 weights")
    p.add_argument("--imgsz", type=int, default=1280, help="inference size (1280 helps the small ball)")
    p.add_argument("--conf-player", type=float, default=0.40)
    p.add_argument("--conf-ball", type=float, default=0.10)
    p.add_argument("--device", default=None, help="'cpu', '0', ... (default: auto)")
    p.add_argument("--out", default="runs/yolo11", help="output directory")
    p.add_argument("--no-court-filter", action="store_true", help="keep every detected person")
    p.add_argument("--show-court", action="store_true", help="draw the detected court outline")
    p.add_argument("--teams", type=int, default=2,
                   help="jersey clusters: 2 = two teams, 3 = two teams + referees "
                        "(smallest cluster; unreliable when referee shirts look like a team), 0 = off")
    p.add_argument("--max-ball-gap", type=int, default=8,
                   help="interpolate ball positions across gaps of up to N frames")
    p.add_argument("--ball-max-jump", type=float, default=0.08,
                   help="max ball movement per frame as a fraction of frame width")
    p.add_argument("--max-frames", type=int, default=0, help="stop after N frames (0 = all)")
    return p.parse_args()


# ---------------------------------------------------------------- model

@contextlib.contextmanager
def chdir(path):
    prev = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(prev)


def load_model(weights):
    """Return (model, player_cls, ball_cls)."""
    weights = Path(weights).resolve()
    if "yoloe" in weights.name:
        model = YOLOE(str(weights))
        # set_classes loads the MobileCLIP text encoder (mobileclip_blt.ts); run it from the
        # weights folder so the encoder is found there / downloaded there instead of the cwd.
        with chdir(weights.parent):
            model.set_classes(["person", "basketball"])
        return model, 0, 1
    model = YOLO(str(weights))
    names = {v.lower(): k for k, v in model.names.items()}
    player = next((names[n] for n in PLAYER_NAMES if n in names), None)
    ball = next((names[n] for n in BALL_NAMES if n in names), None)
    if player is None or ball is None:
        raise SystemExit(f"{weights.name}: need player and ball classes, got {model.names}")
    return model, player, ball


def make_tracker(fps):
    cfg = IterableSimpleNamespace(**YAML.load(check_yaml("bytetrack.yaml")))
    cfg.track_buffer = int(round(fps))  # keep lost tracks ~1 s (occlusions under the basket)
    return BYTETracker(cfg)


# ---------------------------------------------------------------- court / teams

def court_polygon(frame, min_area_frac=0.08):
    """Convex hull of the largest wood-coloured region, in full-res pixels (None if no court)."""
    h, w = frame.shape[:2]
    scale = 480 / w
    small = cv2.resize(frame, (480, int(h * scale)))
    hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (5, 15, 140), (30, 110, 255))  # light, low-saturation wood
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    n, labels, stats, _ = cv2.connectedComponentsWithStats(mask)
    if n < 2:
        return None
    big = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    if stats[big, cv2.CC_STAT_AREA] < min_area_frac * mask.size:
        return None
    contours, _ = cv2.findContours((labels == big).astype(np.uint8), cv2.RETR_EXTERNAL,
                                   cv2.CHAIN_APPROX_SIMPLE)
    return (cv2.convexHull(contours[0]) / scale).astype(np.int32)


def on_court(poly, box):
    x1, y1, x2, y2 = box
    foot = (float((x1 + x2) / 2), float(y2 - 0.03 * (y2 - y1)))
    return cv2.pointPolygonTest(poly, foot, False) >= 0


def torso_feature(frame, box):
    """Jersey descriptor: share of bright / mid / dark pixels and mean saturation in the torso.

    Court-coloured pixels are dropped first so the background between arm and body does not
    leak in. Brightness shares separate white vs. dark jerseys and pick up striped referee shirts
    (bright + dark mixed) better than a plain mean colour does.
    """
    x1, y1, x2, y2 = (int(v) for v in box)
    bw, bh = x2 - x1, y2 - y1
    crop = frame[y1 + int(0.18 * bh):y1 + int(0.45 * bh), x1 + int(0.30 * bw):x1 + int(0.70 * bw)]
    if crop.size == 0:
        return None
    hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV).reshape(-1, 3).astype(np.float32)
    h, s, v = hsv[:, 0], hsv[:, 1], hsv[:, 2]
    wood = (h >= 5) & (h <= 30) & (s >= 15) & (s <= 110) & (v >= 140)
    if (~wood).sum() < 20:
        return None
    s, v = s[~wood], v[~wood]
    return np.array([np.mean(v > 170), np.mean((v >= 80) & (v <= 170)), np.mean(v < 80),
                     np.mean(s) / 255], np.float32)


def overlaps_other(box, others, frac=0.10):
    """True if more than `frac` of `box` is covered by any other box (mixed jersey pixels)."""
    x1, y1, x2, y2 = box
    area = max(1, (x2 - x1) * (y2 - y1))
    for o in others:
        if o is box:
            continue
        iw = min(x2, o[2]) - max(x1, o[0])
        ih = min(y2, o[3]) - max(y1, o[1])
        if iw > 0 and ih > 0 and iw * ih > frac * area:
            return True
    return False


def cluster_teams(features_by_track, k):
    """Assign each track id to a jersey cluster. Returns {tid: "team A" | "team B" | "referee"}."""
    tids, feats = [], []
    for tid, fs in features_by_track.items():
        for f in fs:
            tids.append(tid)
            feats.append(f)
    if k < 2 or len(feats) < k * 5:
        return {}
    data = np.float32(feats)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 50, 0.5)
    _, labels, centers = cv2.kmeans(data, k, None, criteria, 5, cv2.KMEANS_PP_CENTERS)
    labels = labels.ravel()

    # Majority vote per track so a player keeps one team for the whole video.
    votes = defaultdict(Counter)
    for tid, lab in zip(tids, labels):
        votes[tid][int(lab)] += 1
    track_cluster = {tid: c.most_common(1)[0][0] for tid, c in votes.items()}

    # With 3 clusters, the one covering the fewest tracks is the referees. The remaining two are
    # named by jersey brightness: team A = lighter jersey, team B = darker jersey.
    sizes = Counter(track_cluster.values())
    clusters = list(range(k))
    names = {}
    if k == 3:
        ref = min(clusters, key=lambda c: sizes.get(c, 0))
        names[ref] = "referee"
        clusters.remove(ref)
    for rank, c in enumerate(sorted(clusters, key=lambda c: -centers[c][0])):
        names[c] = f"team {chr(ord('A') + rank)}"

    for c in range(k):
        print(f"  cluster {names[c]:8s} tracks={sizes.get(c, 0):2d} "
              f"[bright, mid, dark, sat]={[round(float(v), 2) for v in centers[c]]}")
    return {tid: names[c] for tid, c in track_cluster.items()}


# ---------------------------------------------------------------- ball

def pick_ball(cands, last, max_jump):
    """cands: [(conf, (x1,y1,x2,y2))]. Prefer the most confident candidate near the last ball."""
    if not cands:
        return None
    if last is not None:
        (lx, ly), gap = last
        near = [c for c in cands
                if np.hypot((c[1][0] + c[1][2]) / 2 - lx, (c[1][1] + c[1][3]) / 2 - ly) <= max_jump * gap]
        # A confident detection far away (e.g. after a pass or camera cut) still wins.
        if near and near[0][0] >= 0.5 * cands[0][0]:
            return near[0]
    return cands[0]


def interpolate_ball(balls, n_frames, max_gap):
    """Fill gaps of <= max_gap frames between two detections with linear interpolation."""
    known = sorted(balls)
    for a, b in zip(known, known[1:]):
        gap = b - a
        if 1 < gap <= max_gap + 1:
            ba, bb = np.array(balls[a]["box"]), np.array(balls[b]["box"])
            for f in range(a + 1, b):
                t = (f - a) / gap
                balls[f] = {"box": tuple((ba + t * (bb - ba)).round().astype(int)),
                            "conf": 0.0, "interpolated": True}
    return balls


# ---------------------------------------------------------------- drawing

def draw_box(img, box, color, text, thickness=2):
    x1, y1, x2, y2 = (int(v) for v in box)
    cv2.rectangle(img, (x1, y1), (x2, y2), color, thickness)
    (tw, th), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.55, 1)
    y = max(y1, th + 6)
    cv2.rectangle(img, (x1, y - th - 6), (x1 + tw + 4, y), color, -1)
    light = sum(color) > 450
    cv2.putText(img, text, (x1 + 2, y - 4), cv2.FONT_HERSHEY_SIMPLEX, 0.55,
                (0, 0, 0) if light else (255, 255, 255), 1, cv2.LINE_AA)


def draw_frame(img, players, ball, trail, poly, team_of, max_step):
    if poly is not None:
        cv2.polylines(img, [poly], True, (0, 255, 0), 1, cv2.LINE_AA)
    counts = Counter()
    for p in players:
        team = team_of.get(p["id"], "player")
        counts[team] += 1
        color = TEAM_COLORS[team]
        draw_box(img, p["box"], color, f'{team} #{p["id"]}')
    for a, b in zip(trail, list(trail)[1:]):
        # Only join consecutive positions; a big jump is a pass/cut or a wrong pick.
        if a is not None and b is not None and np.hypot(a[0] - b[0], a[1] - b[1]) <= max_step:
            cv2.line(img, a, b, BALL_COLOR, 2, cv2.LINE_AA)
    if ball is not None:
        x1, y1, x2, y2 = ball["box"]
        c = ((x1 + x2) // 2, (y1 + y2) // 2)
        r = max(8, (x2 - x1) // 2 + 4)
        cv2.circle(img, c, r, BALL_COLOR, 3 if not ball["interpolated"] else 1, cv2.LINE_AA)
        label = "ball (interp)" if ball["interpolated"] else f'ball {ball["conf"]:.2f}'
        cv2.putText(img, label, (c[0] + r + 2, c[1]), cv2.FONT_HERSHEY_SIMPLEX, 0.6, BALL_COLOR, 2,
                    cv2.LINE_AA)
    hud = "  ".join(f"{k}: {v}" for k, v in sorted(counts.items())) + f"   ball: {'yes' if ball else 'no'}"
    cv2.putText(img, hud, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 0), 5, cv2.LINE_AA)
    cv2.putText(img, hud, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (255, 255, 255), 2, cv2.LINE_AA)
    return img


# ---------------------------------------------------------------- main

def main():
    args = parse_args()
    src = Path(args.source)
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    model, player_cls, ball_cls = load_model(args.weights)
    cap = cv2.VideoCapture(str(src))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    W, H = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    tracker = make_tracker(fps)
    conf = min(args.conf_player, args.conf_ball)
    max_jump = args.ball_max_jump * W

    # Pass 1: detection, court filter, tracking, ball candidates.
    players_by_frame, polys, balls = {}, {}, {}
    features = defaultdict(list)        # samples from unoccluded boxes
    features_occl = defaultdict(list)   # fallback for tracks that are always occluded
    last_ball = None
    t0 = time.time()
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok or (args.max_frames and idx >= args.max_frames):
            break
        r = model.predict(frame, imgsz=args.imgsz, conf=conf, classes=[player_cls, ball_cls],
                          device=args.device, verbose=False)[0]
        boxes = r.boxes.cpu().numpy()

        poly = None if args.no_court_filter else court_polygon(frame)
        polys[idx] = poly
        keep = [(c == player_cls and s >= args.conf_player and (poly is None or on_court(poly, b)))
                for b, c, s in zip(boxes.xyxy, boxes.cls, boxes.conf)]
        tracks = tracker.update(boxes[np.array(keep, dtype=bool)], frame)
        players = [{"id": int(t[4]), "box": tuple(int(v) for v in t[:4]), "conf": float(t[5])}
                   for t in tracks]
        all_boxes = [p["box"] for p in players]
        for p in players:
            f = torso_feature(frame, p["box"])
            if f is not None:
                (features_occl if overlaps_other(p["box"], all_boxes) else features)[p["id"]].append(f)
        players_by_frame[idx] = players

        cands = sorted(((float(s), tuple(int(v) for v in b))
                        for b, c, s in zip(boxes.xyxy, boxes.cls, boxes.conf)
                        if c == ball_cls and s >= args.conf_ball), reverse=True)
        ball = pick_ball(cands, last_ball, max_jump)
        if ball is not None:
            balls[idx] = {"box": ball[1], "conf": ball[0], "interpolated": False}
            b = ball[1]
            last_ball = (((b[0] + b[2]) / 2, (b[1] + b[3]) / 2), 1)
        elif last_ball is not None:
            last_ball = (last_ball[0], last_ball[1] + 1)
        idx += 1
        if idx % 30 == 0:
            print(f"  frame {idx}: {len(players)} players, ball={'yes' if ball else 'no'} "
                  f"({idx / (time.time() - t0):.1f} fps)")
    n_frames = idx
    detected_ball = len(balls)
    balls = interpolate_ball(balls, n_frames, args.max_ball_gap)
    for tid, fs in features_occl.items():
        if not features[tid]:
            features[tid] = fs
    team_of = cluster_teams(features, args.teams)

    # Pass 2: render annotated video.
    cap.release()
    cap = cv2.VideoCapture(str(src))
    out_video = out_dir / f"{src.stem}_yolo11.mp4"
    writer = cv2.VideoWriter(str(out_video), cv2.VideoWriter_fourcc(*"mp4v"), fps, (W, H))
    trail = deque(maxlen=15)
    rows = []
    for i in range(n_frames):
        ok, frame = cap.read()
        if not ok:
            break
        ball = balls.get(i)
        trail.append(None if ball is None else
                     ((ball["box"][0] + ball["box"][2]) // 2, (ball["box"][1] + ball["box"][3]) // 2))
        poly = polys[i] if args.show_court else None
        writer.write(draw_frame(frame, players_by_frame[i], ball, trail, poly, team_of,
                                max_jump))
        for p in players_by_frame[i]:
            rows.append({"frame": i, "object": "player", "track_id": p["id"],
                         "team": team_of.get(p["id"], ""), "conf": round(p["conf"], 4),
                         "x1": p["box"][0], "y1": p["box"][1], "x2": p["box"][2], "y2": p["box"][3],
                         "interpolated": False})
        if ball:
            b = ball["box"]
            rows.append({"frame": i, "object": "ball", "track_id": "", "team": "",
                         "conf": round(ball["conf"], 4), "x1": int(b[0]), "y1": int(b[1]),
                         "x2": int(b[2]), "y2": int(b[3]), "interpolated": ball["interpolated"]})
    cap.release()
    writer.release()

    with open(out_dir / "detections.csv", "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0]) if rows else ["frame"])
        w.writeheader()
        w.writerows(rows)
    summary = {
        "source": str(src), "weights": Path(args.weights).name, "frames": n_frames, "fps": fps,
        "seconds": round(time.time() - t0, 1),
        "frames_with_players": sum(1 for p in players_by_frame.values() if p),
        "avg_players_per_frame": round(np.mean([len(p) for p in players_by_frame.values()]), 2),
        "unique_player_tracks": len({p["id"] for ps in players_by_frame.values() for p in ps}),
        "frames_with_ball_detected": detected_ball,
        "frames_with_ball_incl_interpolated": len(balls),
        "teams": dict(Counter(team_of.values())),
    }
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=1, ensure_ascii=False))
    print(json.dumps(summary, indent=1, ensure_ascii=False))
    print(f"Saved {out_video} and {out_dir}/detections.csv")


if __name__ == "__main__":
    main()

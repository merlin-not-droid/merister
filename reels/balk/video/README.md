# SPO 펭귄즈 릴스 — 보크 편 (완성 영상)

[`../README.md`](../README.md)의 기획(씬 구성·내레이션·자막·팩트체크)을 그대로 따라 만든 완성본입니다.

| 파일 | 내용 |
|---|---|
| `../spomo_balk_reel.mp4` | 완성 영상 · 1080×1920 · 30fps · 59.5초 · H.264 + AAC |
| `../spomo_balk_cover.png` | 커버 이미지 "움찔하면 공짜 진루?!" |
| `src/` | 화면 (캐릭터·야구장·자막·그래픽을 Canvas로 그림) |
| `tools/` | 내레이션 TTS, 타임라인, 프레임 렌더, 효과음·BGM 믹스 |

## 만든 방식

- **영상**: 펭귄·야구장·자막·도장·비교표를 모두 코드(HTML Canvas)로 그리고, Playwright로 프레임마다 찍어 ffmpeg로 묶었습니다. 그래서 한글이 깨지지 않고, 규칙 장면(투수판을 밟았는지, 심판이 가리키는지)이 기획 그대로 나옵니다.
- **내레이션**: 기획서 3장의 TTS 대본을 한 글자도 바꾸지 않고 읽었습니다. 음성은 오프라인 TTS인 Supertonic 2의 여성 음성(sid 1)입니다. 문장마다 여러 번 합성한 뒤 음성 인식(SenseVoice)으로 다시 받아 적어서, 대본과 가장 가까운 것을 골랐습니다. 60초 안에 들어가도록 1.15배로 빠르게 했습니다.
- **효과음·BGM**: 모두 코드로 합성했습니다(외부 음원 없음, 저작권 걱정 없음). BGM은 내레이션이 나올 때 자동으로 줄어듭니다. 끝내기 장면 앞(S7)에서는 심장 박동 비트로 긴장감을 냅니다.
- **폰트**: Pretendard (SIL Open Font License), `fonts/`에 포함.

## 씬 타이밍 (실제)

| 씬 | 시간 | 내용 |
|---|---|---|
| S1 | 0:00–0:03.6 | 훅: 던지다 멈칫 → 심판 "보크!" → 1루 주자 2루로 |
| S2 | 0:03.6–0:08.1 | 해설 펭귄 등장, 이게 바로 '보크' |
| S3 | 0:08.1–0:14.3 | 부감: 모든 주자 한 베이스씩, 3루 주자 득점, 볼카운트 그대로 |
| S4 | 0:14.3–0:20.5 | 만약 보크가 없다면? 던지는 척에 속아 견제사 |
| S5 | 0:20.5–0:35.5 | 보크 13가지 중 대표 5개 (번호 카드 + 컷 5개 + 빨간 '보크' 도장) |
| S6 | 0:35.5–0:45.1 | 보크 아님: 발 빼고 1루로 던지는 척, 2루로 던지는 척 (초록 'OK' 도장) → 비교표 |
| S7 | 0:45.1–0:52.7 | TMI: 2019 KBO 초구 전 끝내기 보크 |
| S8 | 0:52.7–0:59.5 | 결론 + 엔딩 카드 (팔로우 @SPOMOgrp) |

## 다시 만들기

필요한 것: Python 3 (`sherpa-onnx soundfile librosa rapidfuzz scipy`), Node + Playwright(Chromium), ffmpeg.

```bash
pip install sherpa-onnx soundfile librosa rapidfuzz scipy
```

TTS·음성 인식 모델은 sherpa-onnx 릴리스에서 받습니다.

```bash
curl -L -O https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/sherpa-onnx-supertonic-tts-int8-2026-03-06.tar.bz2
```

```bash
curl -L -O https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2024-07-17.tar.bz2
```

압축을 푼 뒤 경로를 넘겨서 실행합니다.

```bash
TTS_DIR=/path/to/sherpa-onnx-supertonic-tts-int8-2026-03-06 ASR_DIR=/path/to/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2024-07-17 tools/build.sh
```

- TTS는 실행할 때마다 결과가 조금씩 달라서 길이도 약간 바뀝니다. 지금 내레이션을 그대로 쓰고 화면이나 소리만 고치려면 `build/`를 지우지 말고 `SKIP_TTS=1 tools/build.sh`로 실행하세요. (`build/`는 git에 올리지 않습니다.)
- 장면 하나만 확인할 때: `NODE_PATH=$(npm root -g) node tools/frames.cjs build/timeline.json out 1.5 24.9 cover`

## 고칠 때 보는 곳

- 자막 문구·하이라이트: `src/scenes.js`의 `caption(...)` (`*단어*`가 하늘색 강조)
- 펭귄 생김새·유니폼 색: `src/lib.js`의 `C`와 `drawPenguin`
- 효과음 타이밍: `src/scenes.js`의 `buildSfx()`, 소리 자체와 BGM: `tools/mix.py`
- 내레이션 문장: `tools/lines.json` (TTS용 한글 표기)

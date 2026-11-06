#!/usr/bin/env bash
# Rebuild the balk reel end-to-end. Run from reels/balk/video.
#   TTS_DIR / ASR_DIR : sherpa-onnx model folders (see README "다시 만들기")
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p build
if [ "${SKIP_TTS:-0}" != "1" ]; then
  (cd tools && TTS_DIR="$TTS_DIR" ASR_DIR="$ASR_DIR" OUT="../build/vo" python3 vo_build.py 1 1.25 1.15 6)
fi
python3 tools/timeline.py build/vo/meta.json build
NODE_PATH="$(npm root -g)" node tools/render.cjs build
python3 tools/mix.py build
ffmpeg -y -loglevel error -i build/video.mp4 -i build/mix.wav -map 0:v -map 1:a -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart \
  ../spomo_balk_reel.mp4
cp build/cover.png ../spomo_balk_cover.png
echo "-> reels/balk/spomo_balk_reel.mp4"

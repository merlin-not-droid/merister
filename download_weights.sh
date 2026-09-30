#!/usr/bin/env bash
# Download pretrained weights from the official Ultralytics releases into weights/.
# Usage: ./download_weights.sh [yolov5s|yolo11s|yoloe-11l-seg|...]
#   yolov5*  -> COCO YOLOv5 (detect_basketball.py)
#   yolo11*  -> COCO YOLO11 (detect_basketball_yolo11.py --weights ...)
#   yoloe-*  -> YOLOE-11 open-vocabulary model (default of detect_basketball_yolo11.py)
set -euo pipefail
name="${1:-yolov5s}"
mkdir -p weights
case "$name" in
  yolov5*) url="https://github.com/ultralytics/yolov5/releases/download/v7.0/${name}.pt" ;;
  *)       url="https://github.com/ultralytics/assets/releases/download/v8.3.0/${name}.pt" ;;
esac
curl -fSL -o "weights/${name}.pt" "$url"
echo "Saved weights/${name}.pt"

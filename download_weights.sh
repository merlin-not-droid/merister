#!/usr/bin/env bash
# Download COCO-pretrained YOLOv5 weights from the official Ultralytics release.
# Usage: ./download_weights.sh [yolov5n|yolov5s|yolov5m|yolov5l|yolov5x]
set -euo pipefail
name="${1:-yolov5s}"
mkdir -p weights
curl -fSL -o "weights/${name}.pt" "https://github.com/ultralytics/yolov5/releases/download/v7.0/${name}.pt"
echo "Saved weights/${name}.pt"

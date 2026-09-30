"""YOLOv5 기반 농구 선수(person) 및 농구공(sports ball) 탐지.

COCO 사전학습 YOLOv5 가중치를 사용하며, 80개 클래스 중
  - class 0  (person)       -> "player"
  - class 32 (sports ball)  -> "ball"
두 클래스만 남겨 이미지/동영상/폴더에 대해 탐지를 수행한다.

사용 예:
  python detect_basketball.py --source data/images
  python detect_basketball.py --source data/videos/sample_video.mp4
"""

import argparse
import csv
import json
import os
from pathlib import Path

# PyTorch >= 2.6 defaults torch.load(weights_only=True), which rejects the pickled
# model object inside official YOLOv5 .pt checkpoints. Only use trusted weights.
os.environ.setdefault("TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD", "1")

import cv2
import torch
import yolov5

PERSON, SPORTS_BALL = 0, 32
LABELS = {PERSON: "player", SPORTS_BALL: "ball"}
COLORS = {PERSON: (255, 128, 0), SPORTS_BALL: (0, 140, 255)}  # BGR
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
VIDEO_EXTS = {".mp4", ".avi", ".mov", ".mkv"}


def parse_args():
    p = argparse.ArgumentParser(description="YOLOv5 basketball player & ball detection")
    p.add_argument("--source", default="data/images", help="image, video, or directory")
    p.add_argument("--weights", default="weights/yolov5s.pt", help="YOLOv5 weights (.pt)")
    p.add_argument("--imgsz", type=int, default=640, help="inference size (yolov5s is trained at 640)")
    p.add_argument("--conf-player", type=float, default=0.40, help="confidence threshold for players")
    p.add_argument("--conf-ball", type=float, default=0.15, help="confidence threshold for the ball")
    p.add_argument("--iou", type=float, default=0.45, help="NMS IoU threshold")
    p.add_argument("--device", default="", help="'cpu', '0', ... (default: auto)")
    p.add_argument("--out", default="runs/detect", help="output directory")
    return p.parse_args()


def load_model(args):
    device = args.device or ("cuda:0" if torch.cuda.is_available() else "cpu")
    # An absolute path keeps the yolov5 package from treating "dir/file.pt" as a
    # Hugging Face Hub repo id and trying to download it.
    model = yolov5.load(str(Path(args.weights).resolve()), device=device)
    model.classes = [PERSON, SPORTS_BALL]
    # Run NMS at the lower of the two thresholds, then filter per class.
    model.conf = min(args.conf_player, args.conf_ball)
    model.iou = args.iou
    return model


def detect(model, frame_bgr, args):
    """Return a list of dicts: {label, conf, x1, y1, x2, y2}."""
    results = model(frame_bgr[..., ::-1], size=args.imgsz)  # AutoShape expects RGB
    thresholds = {PERSON: args.conf_player, SPORTS_BALL: args.conf_ball}
    dets = []
    for *xyxy, conf, cls in results.xyxy[0].tolist():
        cls = int(cls)
        if conf < thresholds[cls]:
            continue
        x1, y1, x2, y2 = (int(round(v)) for v in xyxy)
        dets.append({"label": LABELS[cls], "cls": cls, "conf": round(conf, 4),
                     "x1": x1, "y1": y1, "x2": x2, "y2": y2})
    return dets


def draw(frame, dets):
    thickness = max(2, round(sum(frame.shape[:2]) / 1000))
    for d in dets:
        color = COLORS[d["cls"]]
        cv2.rectangle(frame, (d["x1"], d["y1"]), (d["x2"], d["y2"]), color, thickness)
        text = f'{d["label"]} {d["conf"]:.2f}'
        (tw, th), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
        y = max(d["y1"], th + 6)
        cv2.rectangle(frame, (d["x1"], y - th - 6), (d["x1"] + tw + 4, y), color, -1)
        cv2.putText(frame, text, (d["x1"] + 2, y - 4), cv2.FONT_HERSHEY_SIMPLEX, 0.6,
                    (255, 255, 255), 2, cv2.LINE_AA)
    n_p = sum(d["cls"] == PERSON for d in dets)
    n_b = sum(d["cls"] == SPORTS_BALL for d in dets)
    cv2.putText(frame, f"players: {n_p}  ball: {n_b}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                0.9, (0, 0, 0), 4, cv2.LINE_AA)
    cv2.putText(frame, f"players: {n_p}  ball: {n_b}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                0.9, (255, 255, 255), 2, cv2.LINE_AA)
    return frame


def run_image(model, path, out_dir, args, rows):
    frame = cv2.imread(str(path))
    dets = detect(model, frame, args)
    cv2.imwrite(str(out_dir / path.name), draw(frame, dets))
    rows += [{"source": path.name, "frame": 0, **d} for d in dets]
    print(f"[image] {path.name}: {summary(dets)}")


def run_video(model, path, out_dir, args, rows):
    cap = cv2.VideoCapture(str(path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    w, h = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    writer = cv2.VideoWriter(str(out_dir / f"{path.stem}.mp4"),
                             cv2.VideoWriter_fourcc(*"mp4v"), fps, (w, h))
    idx = ball_frames = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        dets = detect(model, frame, args)
        ball_frames += any(d["cls"] == SPORTS_BALL for d in dets)
        writer.write(draw(frame, dets))
        rows += [{"source": path.name, "frame": idx, **d} for d in dets]
        idx += 1
    cap.release()
    writer.release()
    print(f"[video] {path.name}: {idx} frames, ball found in {ball_frames} "
          f"({ball_frames / max(idx, 1):.0%})")


def summary(dets):
    n_p = sum(d["cls"] == PERSON for d in dets)
    n_b = sum(d["cls"] == SPORTS_BALL for d in dets)
    return f"{n_p} player(s), {n_b} ball(s)"


def main():
    args = parse_args()
    src = Path(args.source)
    files = sorted(p for p in src.iterdir() if p.suffix.lower() in IMAGE_EXTS | VIDEO_EXTS) \
        if src.is_dir() else [src]
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    model = load_model(args)
    rows = []
    for f in files:
        if f.suffix.lower() in VIDEO_EXTS:
            run_video(model, f, out_dir, args, rows)
        else:
            run_image(model, f, out_dir, args, rows)

    fields = ["source", "frame", "label", "conf", "x1", "y1", "x2", "y2"]
    with open(out_dir / "detections.csv", "w", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    with open(out_dir / "detections.json", "w") as fh:
        json.dump([{k: r[k] for k in fields} for r in rows], fh, indent=1)
    print(f"Saved results to {out_dir}/ ({len(rows)} detections)")


if __name__ == "__main__":
    main()

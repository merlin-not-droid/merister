# YOLOv5 농구 선수 · 공 탐지

COCO로 사전학습된 YOLOv5 모델로 농구 영상/이미지에서 **선수(person)** 와 **농구공(sports ball)** 을 탐지합니다.
80개 COCO 클래스 중 `0: person → player`, `32: sports ball → ball` 두 클래스만 사용하고,
공은 작고 흐릿해서 점수가 낮게 나오기 쉬우므로 클래스별 신뢰도 임계값을 따로 둡니다 (선수 0.40, 공 0.15).

## 설치 및 실행

```bash
pip install -r requirements.txt
./download_weights.sh            # weights/yolov5s.pt (yolov5m 등도 가능)

# 이미지 폴더
python detect_basketball.py --source data/images --out runs/images
# 동영상
python detect_basketball.py --source data/videos/sample_video.mp4 --out runs/videos
```

주요 옵션: `--weights`, `--imgsz` (기본 640), `--conf-player`, `--conf-ball`, `--iou`, `--device cpu|0`.

출력 (`--out` 디렉터리):
- 박스가 그려진 이미지 / 동영상(`.mp4`)
- `detections.csv`, `detections.json` — `source, frame, label, conf, x1, y1, x2, y2`

## 실행 결과 (yolov5s, CPU)

| 입력 | 결과 |
|---|---|
| `sample_image.jpg` | player 1 (0.86), ball 1 (0.64) |
| `sample_image2.jpg` | player 1 (0.88), ball 1 (0.22) |
| `sample_image3.jpg` | player 1 (0.87), ball 1 (0.25) — 두 번째 공(화면 위쪽)은 놓침 |
| `sample_video.mp4` (960×540, 101프레임) | 모든 프레임에서 선수 탐지, 공은 43% 프레임에서 탐지 · 약 10초 |

![result](runs/images/sample_image3.jpg)

### 관찰 및 한계
- `--imgsz 1280` 은 오히려 성능이 떨어졌습니다 (yolov5s는 640으로 학습됨; 1280에서 sample_image의 공을 놓침).
- 사전학습 COCO 모델이라 **손에 쥔 공**, **림 근처에서 모션 블러가 생긴 공** 은 자주 놓칩니다.
  정확도가 필요하면 농구 데이터셋(예: Roboflow Universe의 basketball 데이터셋)으로 파인튜닝하거나
  `--weights weights/yolov5m.pt` 처럼 큰 모델을 쓰는 것을 권장합니다.
- PyTorch 2.6+ 에서는 `torch.load` 기본값이 `weights_only=True` 로 바뀌어 공식 YOLOv5 체크포인트를 읽지 못하므로,
  스크립트가 `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1` 을 설정합니다. 신뢰할 수 있는 가중치만 사용하세요.

## 샘플 데이터 출처
`data/` 의 이미지와 동영상은 [chonyy/AI-basketball-analysis](https://github.com/chonyy/AI-basketball-analysis) 저장소의 샘플입니다.

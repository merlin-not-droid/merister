"""Lay narration chunks on a timeline -> build/timeline.json + build/narration.wav"""
import json, os, sys, numpy as np, soundfile as sf
SR = 48000
meta = json.load(open(sys.argv[1]))           # vo/meta.json
out = sys.argv[2]                              # build dir
START, GAP, SCENE_GAP, TAIL = 0.15, 0.06, 0.24, 1.9
# extra breathing room after specific chunks (scene, idx) -> seconds
EXTRA = {("S5", 1): 0.10, ("S6", 4): 0.35, ("S7", 3): 0.25}
t = START; scenes = []; buf = []
def place(y, t):
    n0 = int(round(t * SR)); buf.append((n0, y))
for si, (k, chunks) in enumerate(meta.items()):
    if si: t += SCENE_GAP
    sc = {"id": k, "start": round(t, 3), "chunks": []}
    for i, c in enumerate(chunks):
        y, sr = sf.read(os.path.join(os.path.dirname(sys.argv[1]), os.path.basename(c["file"])), dtype="float32"); assert sr == SR
        place(y, t)
        sc["chunks"].append({"text": c["text"], "start": round(t, 3), "end": round(t + len(y) / SR, 3)})
        t += len(y) / SR + (GAP if i < len(chunks) - 1 else 0) + EXTRA.get((k, i), 0)
    sc["end"] = round(t, 3); scenes.append(sc)
total = t + TAIL
scenes[-1]["end"] = round(total, 3)
for a, b in zip(scenes, scenes[1:]): a["end"] = b["start"]
mix = np.zeros(int(total * SR) + 1, np.float32)
for n0, y in buf: mix[n0:n0 + len(y)] += y
mix *= 0.9 / max(1e-6, np.abs(mix).max())
sf.write(f"{out}/narration.wav", mix, SR)
json.dump({"fps": 30, "duration": round(total, 3), "scenes": scenes}, open(f"{out}/timeline.json", "w"), ensure_ascii=False, indent=1)
print("duration %.2f" % total)
for s in scenes: print(s["id"], s["start"], s["end"], [c["start"] for c in s["chunks"]])

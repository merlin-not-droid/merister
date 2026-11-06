import json, sys, re, os, subprocess, numpy as np, librosa, soundfile as sf, sherpa_onnx as s
import tts_st
from rapidfuzz.distance import Levenshtein
d=os.environ.get('ASR_DIR','dl/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2024-07-17')
OUT=os.environ.get('OUT','vo')
rec=s.OfflineRecognizer.from_sense_voice(model=f'{d}/model.int8.onnx',tokens=f'{d}/tokens.txt',language='ko',use_itn=False,num_threads=8)
norm=lambda x: re.sub(r'[^가-힣]','',x)
def asr(y,sr):
    y=librosa.resample(y,orig_sr=sr,target_sr=16000); st=rec.create_stream(); st.accept_waveform(16000,y); rec.decode_stream(st); return st.result.text
SID=int(sys.argv[1]); SP=float(sys.argv[2]); A=float(sys.argv[3]); N=int(sys.argv[4])
L=json.load(open('lines.json')); os.makedirs(OUT,exist_ok=True)
g=s.GenerationConfig(); g.sid=SID; g.speed=SP; g.num_steps=8; g.extra={"lang":"ko"}
ONLY=set(os.environ.get('ONLY','').split(',')) - {''}
old=json.load(open(f'{OUT}/meta.json')) if ONLY else {}
meta={}; tot=0; terr=0; tch=0
for k,v in L.items():
    meta[k]=[]
    for i,t in enumerate(v):
        if ONLY and f'{k}_{i}' not in ONLY:
            m=old[k][i]; meta[k].append(m); tot+=m['dur']; terr+=m['err']; tch+=len(norm(t)); continue
        best=None
        for n in range(N):
            a=tts_st.tts.generate(t,g); y=np.array(a.samples,dtype=np.float32); sr=a.sample_rate
            y,_=librosa.effects.trim(y,top_db=40,frame_length=1024,hop_length=128)
            sf.write(f'{OUT}/tmp_in.wav',y,sr)
            subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{OUT}/tmp_in.wav','-af',f'atempo={A}','-ar','48000',f'{OUT}/tmp_out.wav'],check=True)
            z,zsr=sf.read(f'{OUT}/tmp_out.wav',dtype='float32')
            h=asr(z,zsr); e=Levenshtein.distance(norm(t),norm(h))
            if best is None or e<best[0]: best=(e,z,h)
            if e==0: break
        e,z,h=best
        fn=f'{OUT}/{k}_{i}.wav'; sf.write(fn,z,48000)
        dur=len(z)/48000; tot+=dur; terr+=e; tch+=len(norm(t))
        meta[k].append({'text':t,'file':fn,'dur':dur,'asr':h,'err':e})
        print(k,i,'%.2f'%dur,e,h,flush=True)
json.dump(meta,open(f'{OUT}/meta.json','w'),ensure_ascii=False,indent=1)
print('TOTAL %.2f CER %.3f'%(tot,terr/tch))

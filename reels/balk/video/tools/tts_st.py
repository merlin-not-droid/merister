import sherpa_onnx as s, soundfile as sf, sys, os, numpy as np
d=os.environ.get('TTS_DIR','dl/sherpa-onnx-supertonic-tts-int8-2026-03-06')
st=s.OfflineTtsSupertonicModelConfig(duration_predictor=f'{d}/duration_predictor.int8.onnx',text_encoder=f'{d}/text_encoder.int8.onnx',vector_estimator=f'{d}/vector_estimator.int8.onnx',vocoder=f'{d}/vocoder.int8.onnx',tts_json=f'{d}/tts.json',unicode_indexer=f'{d}/unicode_indexer.bin',voice_style=f'{d}/voice.bin')
tts=s.OfflineTts(s.OfflineTtsConfig(model=s.OfflineTtsModelConfig(supertonic=st,num_threads=8)))
print('num_speakers',tts.num_speakers)
def gen(text,out,sid=0,speed=1.0,steps=8):
    g=s.GenerationConfig(); g.sid=sid; g.speed=speed; g.num_steps=steps; g.extra={"lang":"ko"}
    a=tts.generate(text,g)
    sf.write(out,np.array(a.samples),a.sample_rate); return a.sample_rate,len(a.samples)/a.sample_rate
if __name__=='__main__':
    t="응, 진짜야! 이게 바로 보크! 주자가 있을 때 투수가 하는 반칙 동작이야."
    for sid in range(int(sys.argv[1]) if len(sys.argv)>1 else 10):
        try: print(sid,gen(t,f'v{sid}.wav',sid))
        except Exception as e: print(sid,e); break

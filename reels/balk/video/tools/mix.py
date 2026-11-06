"""Synthesize SFX + original BGM, duck under narration, mix -> build/mix.wav"""
import json, sys, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
SR = 48000
build = sys.argv[1] if len(sys.argv) > 1 else 'build'
tl = json.load(open(f'{build}/timeline.json')); sfx = json.load(open(f'{build}/sfx.json'))
vo, _ = sf.read(f'{build}/narration.wav', dtype='float32')
N = int((tl['duration'] + .3) * SR)
R = np.random.default_rng(5)
def T(d): return np.arange(int(d * SR)) / SR
def env(n, a=.005, d=.2, curve=4):
    t = np.arange(n) / SR; e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) * curve / max(d, 1e-3) * 1.0); return e
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'lowpass', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'highpass', fs=SR, output='sos'), x)
def noise(d): return R.standard_normal(int(d * SR))
def tone(f, d, kind='sine', ph=0):
    t = T(d); f = np.broadcast_to(f, t.shape) if np.ndim(f) else np.full(t.shape, f)
    p = 2 * np.pi * np.cumsum(f) / SR + ph
    if kind == 'sine': return np.sin(p)
    if kind == 'tri': return 2 / np.pi * np.arcsin(np.sin(p))
    if kind == 'sq': return np.tanh(3 * np.sin(p))
    if kind == 'saw': return 2 * ((p / (2 * np.pi)) % 1) - 1
def norm(x, g=1): return (x / (np.abs(x).max() + 1e-9) * g).astype(np.float32)

def mk(name):
    if name == 'swish':
        d = .28; x = noise(d); f = np.linspace(800, 5000, len(x)); y = np.zeros_like(x)
        for i in range(0, len(x), 512): y[i:i+512] = bp(x[i:i+512], f[i] * .6, min(f[i] * 1.6, 20000))
        return norm(y * np.sin(np.linspace(0, np.pi, len(x))) ** 2, .35)
    if name == 'whoosh':
        d = .38; x = bp(noise(d), 300, 3000); e = np.sin(np.linspace(0, np.pi, len(x))) ** 1.5
        return norm(x * e * (1 + .5 * np.sin(np.linspace(0, 9, len(x)))), .6)
    if name == 'screech':
        d = .42; f = 1500 + 250 * np.sin(np.linspace(0, 30, int(d * SR))) - np.linspace(0, 300, int(d * SR))
        x = tone(f, d, 'saw') * .5 + tone(f * 2.01, d, 'sine') * .3 + bp(noise(d), 2000, 6000) * .2
        return norm(bp(x, 900, 7000) * env(len(x), .01, .42, 2.5), .55)
    if name == 'beep':
        b = tone(2100, .085, 'sq') * env(int(.085 * SR), .003, .085, 1.5); g = np.zeros(int(.05 * SR))
        return norm(lp(np.concatenate([b, g, b]), 6000), .45)
    if name == 'patter':
        out = np.zeros(int(.6 * SR))
        for i in range(6):
            n0 = int(i * .09 * SR); c = bp(noise(.03), 600 + (i % 2) * 400, 2500) * env(int(.03 * SR), .001, .03, 5)
            out[n0:n0 + len(c)] += c * (1 - i * .08)
        return norm(out, .45)
    if name == 'pop':
        d = .13; f = np.linspace(380, 1400, int(d * SR)) ** 1.0
        return norm(tone(f, d) * env(int(d * SR), .002, .13, 3), .5)
    if name == 'ding':
        def bell(f, d): return (tone(f, d) + .4 * tone(f * 2.76, d) + .2 * tone(f * 5.4, d)) * env(int(d * SR), .002, d, 5)
        a = bell(1318.5, .9); b = bell(1046.5, 1.1); out = np.zeros(int(1.4 * SR)); out[:len(a)] += a; out[int(.22 * SR):int(.22 * SR) + len(b)] += b
        return norm(out, .4)
    if name == 'ok':
        out = np.zeros(int(1.0 * SR))
        for i, f in enumerate([1046.5, 1318.5, 1568, 2093]):
            n0 = int(i * .06 * SR); x = (tone(f, .7) + .3 * tone(2 * f, .7)) * env(int(.7 * SR), .002, .7, 6); out[n0:n0 + len(x)] += x
        st = mk('stamp'); out[:len(st)] += st * 1.2
        return norm(out, .5)
    if name == 'mitt':
        a = tone(np.linspace(180, 90, int(.12 * SR)), .12) * env(int(.12 * SR), .001, .12, 5)
        c = bp(noise(.04), 1500, 5000) * env(int(.04 * SR), .0005, .04, 6); a[:len(c)] += c * .8
        return norm(a, .7)
    if name in ('thud', 'step'):
        d = .25 if name == 'thud' else .14
        a = tone(np.linspace(110, 50, int(d * SR)), d) * env(int(d * SR), .002, d, 4) + lp(noise(d), 400) * env(int(d * SR), .001, d / 2, 6) * .5
        return norm(a, .8 if name == 'thud' else .5)
    if name == 'stamp':
        d = .35; a = tone(np.linspace(95, 45, int(d * SR)), d) * env(int(d * SR), .001, d, 4)
        c = bp(noise(.08), 300, 3000) * env(int(.08 * SR), .0005, .08, 5); a[:len(c)] += c * .9
        return norm(np.tanh(a * 1.5), .85)
    if name == 'uhoh':
        out = np.zeros(int(.6 * SR))
        for i, (f0, f1) in enumerate([(620, 600), (470, 430)]):
            d = .22; x = (tone(np.linspace(f0, f1, int(d * SR)), d, 'tri') + .3 * tone(np.linspace(f0, f1, int(d * SR)) * 2, d)) * env(int(d * SR), .01, d, 2)
            n0 = int(i * .24 * SR); out[n0:n0 + len(x)] += x
        return norm(lp(out, 3000), .45)
    if name in ('cheer', 'gasp'):
        d = 2.2 if name == 'cheer' else 1.1; n = int(d * SR); out = np.zeros(n)
        for k in range(14):
            f = R.uniform(350, 1400) if name == 'cheer' else R.uniform(250, 700)
            v = bp(noise(d), f * .8, f * 1.25) * (1 + .6 * np.sin(2 * np.pi * R.uniform(3, 7) * T(d) + R.uniform(0, 6)))
            out += v
        out += bp(noise(d), 2000, 7000) * .3
        e = np.minimum(1, T(d) / (.25 if name == 'cheer' else .3)) * np.exp(-np.maximum(0, T(d) - (.6 if name == 'cheer' else .35)) * 1.8)
        return norm(out * e, .55 if name == 'cheer' else .35)
    if name == 'splash':
        d = .6; return norm(hp(noise(d), 1500) * env(int(d * SR), .005, d, 5), .35)
    if name == 'tick':
        d = .03; return norm(bp(noise(d), 2500, 6000) * env(int(d * SR), .0005, d, 6), .3)
    raise ValueError(name)

cache = {}
fx = np.zeros(N, np.float32)
for e in sfx:
    if e['name'] not in cache: cache[e['name']] = mk(e['name'])
    x = cache[e['name']] * e['gain']; n0 = int(e['t'] * SR)
    if n0 >= N: continue
    fx[n0:n0 + len(x)] += x[:N - n0]

# ---------------- BGM (original, procedural) ----------------
BPM = 124; beat = 60 / BPM; bar = 4 * beat
def midi(m): return 440 * 2 ** ((m - 69) / 12)
prog = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]  # C G Am F
bgm = np.zeros(N + SR, np.float32)
def put(x, t, g=1.):
    n0 = int(t * SR)
    if n0 >= len(bgm) or n0 < 0: return
    m = min(len(x), len(bgm) - n0); bgm[n0:n0 + m] += x[:m] * g
def pluck(f, d=.35, bright=1.):
    x = tone(f, d, 'saw') * .6 + tone(f, d, 'sq') * .4
    return lp(x, 1800 + 2500 * bright) * env(int(d * SR), .002, d, 5)
def kick(): d = .22; return tone(np.linspace(140, 45, int(d * SR)), d) * env(int(d * SR), .001, d, 5)
def snare(): d = .16; return (bp(noise(d), 1200, 6000) * .7 + tone(200, d) * .3) * env(int(d * SR), .001, d, 7)
def hat(): d = .045; return hp(noise(d), 7000) * env(int(d * SR), .0005, d, 7)
S7 = next(s for s in tl['scenes'] if s['id'] == 'S7'); S8 = next(s for s in tl['scenes'] if s['id'] == 'S8')
tense0, tense1 = S7['chunks'][1]['start'], S7['chunks'][3]['start'] + .65
end_card = S8['chunks'][3]['end'] + .2
mel_r = np.random.default_rng(42)
scale = [72, 74, 76, 79, 81, 84]
t = 0.0; bi = 0
while t < tl['duration'] + .5:
    ch = prog[bi % 4]; tense = tense0 <= t < tense1
    for b in range(4):
        tb = t + b * beat
        if tense0 <= tb < tense1:
            # heartbeat + ticking
            put(kick(), tb, .55); put(kick(), tb + .18, .35); put(hat(), tb + beat / 2, .25)
            if b == 0: put(lp(tone(midi(45), bar, 'saw'), 500) * env(int(bar * SR), .3, bar, 1.2), tb, .12)
            continue
        if tb >= end_card + .9: continue
        put(kick(), tb, .55 if b % 2 == 0 else .35)
        if b % 2 == 1: put(snare(), tb, .28)
        put(hat(), tb + beat / 2, .18); put(hat(), tb, .08)
        # bass
        put(pluck(midi(ch[0] - 24), .22, .2), tb, .45); put(pluck(midi(ch[0] - 12), .18, .2), tb + beat / 2, .25)
        # offbeat chord stab (ukulele-ish)
        for nt in ch: put(pluck(midi(nt), .16, .7), tb + beat / 2, .09)
    # melody (light, sparse)
    if not tense and t < end_card:
        for s in range(8):
            if mel_r.random() < .45:
                nt = scale[mel_r.integers(len(scale))]
                if (nt - ch[0]) % 12 not in (0, 2, 4, 7, 9) and (nt - ch[0]) % 12 not in [(c - ch[0]) % 12 for c in ch]: nt = ch[mel_r.integers(3)] + 12
                put(pluck(midi(nt), .25, 1.0) + .3 * tone(midi(nt) * 2, .25) * env(int(.25 * SR), .002, .25, 6), t + s * beat / 2, .07)
    t += bar; bi += 1
# end-card sting: final C chord
for nt in [60, 64, 67, 72]: put(pluck(midi(nt), 1.6, .8), end_card + .25, .12)
put(kick(), end_card + .25, .6)
bgm = bgm[:N]
# fade out at end
fo = int(.6 * SR); bgm[-fo:] *= np.linspace(1, 0, fo)

# ---------------- ducking & mix ----------------
v = np.zeros(N, np.float32); v[:len(vo)] = vo[:N]
rms = np.sqrt(np.convolve(v ** 2, np.ones(960) / 960, 'same'))
g = np.clip(rms / .05, 0, 1)
sm = np.zeros_like(g); a_att, a_rel = np.exp(-1 / (.01 * SR)), np.exp(-1 / (.35 * SR)); s = 0.
for i in range(N):  # envelope follower
    x = g[i]; s = a_att * s + (1 - a_att) * x if x > s else a_rel * s + (1 - a_rel) * x; sm[i] = s
duck = 1 - .55 * sm
bgm_level = .32
mix = v * 1.0 + fx * .75 * (1 - .45 * sm) + bgm * bgm_level * duck
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
mix = mix / (np.abs(mix).max() + 1e-9) * .95
sf.write(f'{build}/mix.wav', np.stack([mix, mix], 1), SR)
sf.write(f'{build}/bgm.wav', bgm * bgm_level, SR)
print('mix ok', N / SR, 'sfx events', len(sfx))

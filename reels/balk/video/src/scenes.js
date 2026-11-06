// Scene timeline. window.TL (timeline.json) must be set before render(t) is called.
'use strict';
const cv = document.getElementById('c'); let ctx = cv.getContext('2d');
const offs = {}; // cheap blur: render small, scale up
let S = {}; // scene id -> {start,end,c:[chunk starts], e:[chunk ends]}
const SFX = []; // {t, name, gain}
function sfx(t, name, gain = 1) { SFX.push({ t: +t.toFixed(3), name, gain }); }

// ---------- pose factories (view A) ----------
const PIT = () => ({ x: A.RUBBER[0] - 29, y: A.RUBBER[1] - 2, s: 1.45, team: 'red', face: -1, cap: true, glove: 'L', ball: 'L', armL: -1.05, armR: -1.0 });
const RUN = () => ({ x: 790, y: 1062, s: 1.1, team: 'blue', face: -1, helmet: true, crouch: .35, armL: .45, armR: .45 });
const FB1 = () => ({ x: 948, y: 1098, s: 1.1, team: 'red', face: -1, cap: true, glove: 'L', armL: .3, armR: .15 });
const BAT = () => ({ x: 305, y: 1262, s: 1.1, team: 'blue', face: 1, helmet: true, bat: .5, armR: -.9, armL: -.5 });
const UMP = () => ({ x: 98, y: 1182, s: 1.05, team: 'ump', face: 1, cap: true, mask: true, armL: .1, armR: .1 });
const BUMP = () => ({ x: 935, y: 862, s: .82, team: 'ump', face: -1, cap: true, armL: .15, armR: .15 });
function pointAt(p, u) { p.armR = lerp(p.armR, 1.5, u); if (u > .5) p.mouth = 'shout'; }
// generic pitcher actions; u in 0..1
function legLift(p, u) { p.footL = .9 * u; p.tilt = .08 * u; p.armL = lerp(-1.05, -.7, u); p.armR = lerp(-1.0, -.6, u); }
function wobble(p, t) { p.tilt = .08 + Math.sin(t * 38) * .07; p.eyes = 'wide'; p.mouth = 'o'; p.sweat = true; }
function throwArm(p, u, dir = -1) { // dir -1 toward home(left) ; +1 toward first(right)
  // wind back then whip
  if (dir < 0) { p.armR = u < .45 ? lerp(-1.0, 2.6, eio(u / .45)) : lerp(2.6, -1.9, eout((u - .45) / .55)); p.tilt = lerp(0, -.18, u); }
  else { p.armR = u < .45 ? lerp(-1.0, -2.4, eio(u / .45)) : lerp(-2.4, 1.9, eout((u - .45) / .55)); p.tilt = lerp(0, .18, u); }
}
function hop(t, f = 7, h = 22) { return Math.abs(Math.sin(t * f)) * h; }
function lerpPos(p, a, b, u) { p.x = lerp(a[0], b[0], u); p.y = lerp(a[1], b[1], u); }
function arc(a, b, u, h) { return [lerp(a[0], b[0], u), lerp(a[1], b[1], u) - Math.sin(u * Math.PI) * h]; }
const LEAD = [790, 1062], B1R = [865, 1078], B2P = [662, 806];
const handPos = (p, side = 'L') => [p.x + (side === 'L' ? -1 : 1) * 30 * p.s, p.y - 140 * p.s];

function blurred(fn, px = 14, dim = .25) {
  const k = Math.max(2, Math.round(px / 2.2)); // downscale factor
  if (!offs[k]) { const c = document.createElement('canvas'); c.width = Math.ceil(W / k); c.height = Math.ceil(H / k); offs[k] = c; }
  const oc = offs[k], octx = oc.getContext('2d');
  octx.setTransform(1, 0, 0, 1, 0, 0); octx.clearRect(0, 0, oc.width, oc.height); octx.setTransform(1 / k, 0, 0, 1 / k, 0, 0);
  const main = ctx; ctx = octx; try { fn(); } finally { ctx = main; }
  ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(oc, 0, 0, W, H); ctx.restore();
  ctx.fillStyle = `rgba(10,18,35,${dim})`; ctx.fillRect(0, 0, W, H);
}
function flash(t, t0, d = .16) { if (t >= t0 && t < t0 + d) { ctx.fillStyle = `rgba(255,255,255,${(1 - (t - t0) / d) * .85})`; ctx.fillRect(0, 0, W, H); } }
function vignette(a) { const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function questionMark(x, y, t, t0) { if (t < t0) return; const u = eback(clamp((t - t0) / .25)); ctx.save(); ctx.translate(x, y - Math.sin((t - t0) * 6) * 6); ctx.scale(u, u); drawRichLine(ctx, '?', 0, 0, 90, { color: C.yellow }); ctx.restore(); }
function dots(x, y, t, t0) { if (t < t0) return; ctx.save(); ctx.globalAlpha = clamp((t - t0) / .2); bubble(ctx, '…', x, y, t - t0, { size: 56 }); ctx.restore(); }

// ---------- S1 : hook ----------
function s1State(t) { // t absolute; returns view-A state for the hook (also reused for freeze / cover)
  const T0 = S.S1.start;
  const k = t - T0;
  const p = PIT(), r = RUN(), f = FB1(), b = BAT(), u = UMP(), bu = BUMP();
  if (k > .1) legLift(p, eout(seg(k, .1, .5)));
  if (k > .5 && k < 1.0) wobble(p, k);
  if (k >= 1.0) { legLift(p, 1 - eio(seg(k, 1.0, 1.25))); p.eyes = k < 1.6 ? 'wide' : 'sad'; p.mouth = k < 1.6 ? 'o' : 'sad'; p.sweat = true; }
  pointAt(u, eout(seg(k, 1.22, 1.36)));
  // runner trots to 2B
  if (k > 1.75) {
    const v = eio(seg(k, 1.75, 3.2)); lerpPos(r, LEAD, B2P, v); r.s = lerp(1.1, .9, v); r.crouch = .1;
    r.jumpY = v < 1 ? hop(k, 13, 18) : 0; r.eyes = 'happy'; r.mouth = 'grin'; r.armL = .3 + Math.sin(k * 13) * .3; r.armR = .3 - Math.sin(k * 13) * .3;
  }
  if (k > 1.65) { bu.armL = lerp(.15, 2.0, eout(seg(k, 1.65, 1.85))) + Math.sin(k * 10) * .15 * seg(k, 1.85, 2); }
  if (k > 2.2) { b.tilt = -.22 * eout(seg(k, 2.2, 2.45)); b.eyes = 'wide'; b.mouth = 'o'; }
  const cam = k < 1.3 ? camLerp(CAM0, { x: 480, y: 1000, z: 1.1 }, eio(seg(k, 0, 1.3))) : camLerp({ x: 480, y: 1000, z: 1.1 }, { x: 590, y: 980, z: 1.0 }, eio(seg(k, 1.6, 2.6)));
  return { cam, actors: [p, r, f, b, u, bu], k, u };
}
function S1(t, noCap) {
  const st = s1State(t), k = st.k;
  viewA(ctx, t, { ...st, over: () => {
    const u = st.u;
    bubble(ctx, '보크!', u.x + 150, u.y - 300, k - 1.25, { size: 58 });
    if (k > 2.2) { ctx.save(); questionMark(305, 1262 - 250, t, S.S1.start + 2.25); ctx.restore(); }
  } });
  if (!noCap) caption(ctx, ['공도 안 던졌는데 *2루로?!*'], t, S.S1.start - .2);
}

// ---------- S2 : answer ----------
function host(x, y, s, extra = {}) { return { x, y, s, team: 'host', face: 0, cap: true, headset: true, ...extra }; }
function board(x, y, w, h, text, t, t0, color = C.balk, rot = .04, size = 120) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8;
  rr(ctx, -w / 2, -h / 2, w, h, 22); ctx.fillStyle = '#fff'; ctx.fill(); ctx.shadowColor = 'transparent';
  ctx.lineWidth = 12; ctx.strokeStyle = '#A3AEC0'; ctx.stroke();
  if (t >= t0 && text) { const u = eback(clamp((t - t0) / .25)); ctx.scale(u, u); drawRichLine(ctx, text, 0, 6, size, { stroke: false, color }); }
  ctx.restore();
}
function S2(t) {
  const sc = S.S2, k = t - sc.start;
  blurred(() => S1(sc.start - .12, true), 10, .2);
  const ent = eback(seg(k, 0, .35));
  const h = host(330, lerp(2250, 1300, ent), 2.35, { eyes: 'n', mouth: 'grin' });
  if (k > .4 && k < 1.0) h.tilt = Math.sin((k - .4) * 16) * .06;
  const tap = sc.c[1] - sc.start;
  h.armR = k > tap - .1 ? lerp(-.2, 1.1, pulse(t, sc.c[1] - .1, .4)) + .2 : -.2; h.armL = .15;
  if (k > tap) h.eyes = 'happy';
  // board
  const bu = eback(seg(k, .15, .5));
  if (bu > 0) { ctx.save(); ctx.translate(790, 900); ctx.scale(bu, bu); board(0, 0, 400, 280, '보크', t, sc.c[1], C.balk, .05, 150); ctx.restore(); }
  drawPenguin(ctx, h);
  if (k < tap) caption(ctx, ['응, *진짜야!*'], t, sc.start + .05);
  else caption(ctx, sc.c[2] <= t ? ['이게 바로 *\'보크\'*', '주자 있을 때 *투수의 반칙 동작*'] : ['이게 바로 *\'보크\'*'], t, t < sc.c[2] ? sc.c[1] : sc.c[2], { size: 76, y: 1450 });
}

// ---------- S3 : penalty (aerial) ----------
function mini(team, x, y, extra = {}) { return { x, y, s: .62, team, face: 0, helmet: team === 'blue', cap: team !== 'blue', ...extra }; }
function S3(t) {
  const sc = S.S3, k = t - sc.start;
  const r1 = mini('blue', ...B.B1), r3 = mini('blue', ...B.B3), p = mini('red', B.MOUND[0], B.MOUND[1] - 10, { glove: 'L' });
  const bat = mini('blue', B.HOME[0] + 70, B.HOME[1] + 10, { bat: .5, armR: -.9 });
  const mv = eio(seg(k, .9, 2.3));
  lerpPos(r1, B.B1, B.B2, mv); lerpPos(r3, B.B3, B.HOME, mv);
  for (const r of [r1, r3]) if (mv > 0 && mv < 1) { r.jumpY = hop(k, 12, 14); r.eyes = 'happy'; r.mouth = 'grin'; }
  if (mv >= 1) { r3.eyes = 'happy'; r3.mouth = 'grin'; r3.armL = r3.armR = 2.4 + Math.sin(k * 12) * .3; r3.jumpY = hop(k, 9, 26); }
  if (k > 1.2) { p.eyes = 'sad'; p.mouth = 'sad'; p.tilt = .12; p.armL = p.armR = -.15; }
  viewB(ctx, t, { actors: [r1, r3, p, bat], under: () => {
    drawArrow(ctx, [B.B1, [B.B1[0] - 150, B.B1[1] - 150], B.B2], eout(seg(k, .35, .9)), C.yellow, 15, 34);
    drawArrow(ctx, [B.B3, [B.B3[0] + 150, B.B3[1] + 150], [B.HOME[0] - 30, B.HOME[1] - 30]], eout(seg(k, .35, .9)), C.yellow, 15, 34);
  } });
  if (k > 2.32) { // +1
    const u = t - (sc.start + 2.32);
    ctx.save(); ctx.translate(B.HOME[0] - 190, B.HOME[1] - 170 - u * 30); const s = eback(clamp(u / .25)); ctx.scale(s, s);
    drawRichLine(ctx, '+1점!', 0, 0, 96, { color: C.yellow }); ctx.restore();
  }
  // count board (unchanged)
  if (t > sc.c[2]) {
    const u = eback(clamp((t - sc.c[2]) / .3));
    ctx.save(); ctx.translate(290, 470); ctx.scale(u * .8, u * .8);
    rr(ctx, -270, -95, 540, 190, 26); ctx.fillStyle = 'rgba(8,14,28,.88)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.skyHi; ctx.stroke();
    const row = (lab, n, max, col, y) => { drawRichLine(ctx, lab, -200, y, 54, { stroke: false, color: '#fff' }); for (let i = 0; i < max; i++) { ell(ctx, -120 + i * 64, y, 22, 22); ctx.fillStyle = i < n ? col : 'rgba(255,255,255,.2)'; ctx.fill(); } };
    row('B', 1, 3, '#3ED67B', -40); row('S', 2, 2, C.yellow, 42);
    chip(ctx, '그대로', 170, 0, t, sc.c[2] + .25, { size: 44, bg: C.skyHi, rot: -.08 });
    ctx.restore();
  }
  const cap = t < sc.c[1] ? [['모든 주자 *한 베이스씩* 진루'], sc.c[0] + .1] : t < sc.c[2] ? [['3루 주자는 *득점!*'], sc.c[1]] : [['볼카운트는 *그대로*', '(볼 아님!)'], sc.c[2]];
  caption(ctx, cap[0], t, cap[1], { y: 1460 });
  flash(t, sc.start);
}

// ---------- S4 : why (what if) ----------
function S4(t) {
  const sc = S.S4, k = t - sc.start, a = sc.c[1] - sc.start; // a = action start
  const p = PIT(), r = RUN(), f = FB1(), b = BAT(), u = UMP();
  let ball = null;
  const q = k - a; // action clock
  if (q > .05 && q < .55) { const v = seg(q, .05, .5); p.footL = .5 * Math.sin(v * Math.PI); throwArm(p, Math.min(.7, v)); p.ball = 'L'; }
  if (q >= .55 && q < .8) { p.armR = lerp(-1.6, -1.0, seg(q, .55, .8)); }
  if (q > .45) { const v = eio(seg(q, .45, 1.15)); lerpPos(r, LEAD, [715, 945], v); r.crouch = .1; r.jumpY = v < 1 ? hop(q, 14, 14) : 0; r.face = -1; }
  if (q > .9) { p.face = 1; p.tilt = .1; }
  if (q > .95 && q < 1.3) { const v = seg(q, .95, 1.3); throwArm(p, v, 1); if (v > .5) p.ball = null; }
  if (q >= 1.3) { p.face = 1; p.ball = null; p.armR = 1.2; }
  const bs = 1.13, be = 1.38;
  if (q > bs && q < be) { const hp = [p.x + 40, p.y - 210]; ball = [...arc(hp, [f.x - 40, f.y - 140], seg(q, bs, be), 40), 14]; }
  if (q >= be) { f.ball = 'L'; f.armL = .9; }
  if (q > 1.25) { const v = eio(seg(q, 1.25, 1.75)); lerpPos(r, [715, 945], [800, 1020], v); r.face = 1; r.eyes = 'wide'; r.mouth = 'o'; r.jumpY = v < 1 ? hop(q, 14, 10) : 0; }
  if (q > 1.45) { const v = eio(seg(q, 1.45, 1.8)); f.x = lerp(948, 885, v); f.armL = lerp(.9, 1.5, v); f.face = -1; f.ball = 'L'; }
  const cam = camLerp(CAM0, { x: 640, y: 990, z: 1.08 }, eio(seg(k, .2, 1.5)));
  ctx.save();
  viewA(ctx, t, { cam, actors: [p, r, f, b, u], ball, over: () => {
    if (q > 1.85) { const xu = t - (sc.start + a + 1.85); ctx.save(); ctx.translate(800, 880); const s = lerp(2.2, 1, eout(clamp(xu / .2))); ctx.scale(s, s); ctx.rotate(.05);
      ctx.strokeStyle = '#0B0E16'; ctx.lineCap = 'round'; ctx.lineWidth = 58; ctx.beginPath(); ctx.moveTo(-120, -120); ctx.lineTo(120, 120); ctx.moveTo(120, -120); ctx.lineTo(-120, 120); ctx.stroke();
      ctx.strokeStyle = C.balk; ctx.lineWidth = 40; ctx.stroke(); ctx.restore();
      bubble(ctx, '견제사!', 800, 660, xu - .1, { size: 56, bg: C.yellow }); }
  } });
  ctx.restore();
  // "what if" treatment
  ctx.save(); ctx.fillStyle = 'rgba(255,214,120,.14)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.setLineDash([28, 18]); ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(255,255,255,.85)'; rr(ctx, 26, 420, W - 52, 1060, 30); ctx.stroke(); ctx.restore();
  chip(ctx, '만약 보크가 *없다면?*', 540, 470, t, sc.start + .05, { size: 54, rot: -.03 });
  sitBoard(ctx, '1아웃 · 1루 주자', [1]);
  if (t > sc.c[2]) { // forbid sign
    const v = eback(clamp((t - sc.c[2]) / .3));
    ctx.save(); ctx.translate(180, 735); ctx.scale(v * .85, v * .85); ctx.lineWidth = 26; ctx.strokeStyle = C.balk; ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.beginPath(); ctx.arc(0, 0, 120, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    drawRichLine(ctx, '속이기', 0, 4, 54, { stroke: false, color: '#0B0E16' });
    ctx.beginPath(); ctx.moveTo(-85, -85); ctx.lineTo(85, 85); ctx.stroke(); ctx.restore();
  }
  const cap = t < sc.c[1] ? [['만약 보크가 *없다면?*'], sc.c[0] + .05] : t < sc.c[2] ? [['던지는 척에 속으면 *견제사*'], sc.c[1]] : [['그래서 *주자 속이기 금지!*'], sc.c[2]];
  caption(ctx, cap[0], t, cap[1]);
  flash(t, sc.start);
}

// ---------- S5 : five balks ----------
const BALKS = [
  { n: '①', cap: ['① *던지다 멈추기*'] },
  { n: '②', cap: ['② 세트에서 *안 멈추고 던지기*'] },
  { n: '③', cap: ['③ 1·3루로 *던지는 척만 하기*'] },
  { n: '④', cap: ['④ 발 안 내딛고 견제', '→ *발 먼저, 공은 나중!*'] },
  { n: '⑤', cap: ['⑤ *공 떨어뜨리기*'] },
];
function balkCut(i, t, t0, t1) {
  const q = t - t0;
  const p = PIT(), r = RUN(), f = FB1(), b = BAT(), u = UMP();
  let ball = null, cam = { x: 520, y: 975, z: 1.1 }, pointT = 99, stampT = 99, over = null, rubberHL = .9;
  if (i === 0) {
    legLift(p, eout(seg(q, .05, .3)));
    if (q > .3 && q < .62) wobble(p, q);
    if (q >= .62) { legLift(p, 1 - eio(seg(q, .62, .82))); p.eyes = 'wide'; p.sweat = true; p.mouth = 'o'; }
    pointT = .85; stampT = .98;
  } else if (i === 1) {
    p.armL = lerp(-.3, -1.05, eout(seg(q, .05, .25))); p.armR = lerp(-.2, -1.0, eout(seg(q, .05, .25))); p.ball = 'R';
    if (q > .25) { const v = seg(q, .25, .65); throwArm(p, v); p.footL = .6 * Math.sin(v * Math.PI); if (v > .55) p.ball = null; }
    if (q > .48 && q < .9) { const v = seg(q, .48, .9); ball = [lerp(p.x - 80, -80, v), lerp(p.y - 230, p.y - 120, v), 14]; }
    over = () => chip(ctx, '멈춤 *0초*', p.x + 40, p.y - 380, t, t0 + .3, { size: 46, bg: '#fff', rot: .05 });
    pointT = .95; stampT = 1.1;
  } else if (i === 2) {
    if (q > .05) { p.face = 1; }
    if (q > .2 && q < .65) { const v = seg(q, .2, .6); throwArm(p, Math.min(.62, v), 1); p.ball = 'L'; }
    if (q >= .65) { p.armR = lerp(1.2, -1.0, seg(q, .65, 1.0)); }
    if (q > .4) { const v = eout(seg(q, .4, .75)); lerpPos(r, LEAD, [858, 1080], v); r.tilt = .5 * v; r.crouch = .1; r.eyes = 'wide'; r.mouth = 'o'; r.face = 1; r.armR = 1.6 * v; }
    over = () => { const mark = arc([p.x + 80, p.y - 220], [p.x + 150, p.y - 240], 1, 0); chip(ctx, '공은 *그대로*', p.x + 60, p.y - 380, t, t0 + .55, { size: 44, bg: '#fff', rot: .04 }); };
    pointT = .95; stampT = 1.1;
  } else if (i === 3) {
    const zoomOut = eio(seg(q, .75, 1.1));
    cam = camLerp({ x: p.x + 20, y: p.y + 70, z: 1.9 }, { x: 520, y: 975, z: 1.1 }, zoomOut);
    if (q > 1.1 && q < 1.5) { const v = seg(q, 1.1, 1.45); p.face = 1; throwArm(p, v, 1); p.tilt = .3 * Math.sin(v * Math.PI); if (v > .55) p.ball = null; }
    if (q >= 1.45) { p.face = 1; p.ball = null; p.armR = lerp(1.9, 1.0, seg(q, 1.45, 1.8)); }
    if (q > 1.3 && q < 1.55) { const hp = [p.x + 40, p.y - 210]; ball = [...arc(hp, [f.x - 40, f.y - 150], seg(q, 1.3, 1.55), 40), 14]; }
    if (q >= 1.55) { f.ball = 'L'; f.armL = .9; }
    over = () => {
      const a = clamp(1 - seg(q, 1.6, 1.9));
      if (a > 0) { ctx.save(); ctx.globalAlpha = a; ell(ctx, p.x + 8, p.y - 2, 110, 34); ctx.lineWidth = 7; ctx.strokeStyle = C.yellow; ctx.setLineDash([16, 10]); ctx.stroke(); ctx.restore();
        if (q < .9) { ctx.save(); ctx.globalAlpha = a; drawRichLine(ctx, '발은 그대로…', p.x - 230, p.y - 10, 34, { color: C.yellow, strokeW: 7 }); ctx.restore(); } }
    };
    pointT = 1.75; stampT = 1.9;
  } else if (i === 4) {
    cam = { x: p.x + 20, y: p.y - 170, z: 1.65 };
    if (q > .3) { p.ball = null; }
    if (q > .3 && q < .75) { const v = seg(q, .3, .75); const st = handPos(p, 'L'); const bounce = v < .8 ? ein(v / .8) * 140 : 140 - Math.sin((v - .8) / .2 * Math.PI) * 22; ball = [st[0] - 10, st[1] + 10 + bounce, 14]; }
    if (q >= .75) { ball = [handPos(p, 'L')[0] - 6, p.y - 8, 14]; p.eyes = 'wide'; p.mouth = 'o'; p.sweat = true; p.armL = -.6; }
    if (q > .55) { r.eyes = 'happy'; r.mouth = 'grin'; }
    pointT = .95; stampT = 1.1;
  }
  pointAt(u, eout(seg(q, pointT, pointT + .14)));
  viewA(ctx, t, { cam, actors: [p, r, f, cam.z > 1.4 ? null : b, u], ball, rubberHL });
  if (cam.z > 1.4) bubble(ctx, '삐빅! 보크!', 230, 640, q - pointT, { size: 50 });
  else withCam(ctx, cam, () => bubble(ctx, '보크!', u.x + 140, u.y - 290, q - pointT, { size: 54 }));
  if (over) withCam(ctx, cam, over);
  // rubber tag
  withCam(ctx, cam, () => { if (i !== 3 || q > 1.1) { ctx.save(); ctx.globalAlpha = .95; drawRichLine(ctx, '투수판 밟는 중', A.RUBBER[0], A.RUBBER[1] + 58, 26, { color: C.yellow, strokeW: 6 }); ctx.restore(); } });
  drawStamp(ctx, '보크', 760, 760, t - t0 - stampT, C.balk, .95);
  chip(ctx, `대표 보크 ${BALKS[i].n}`, 540, 470, t, t0 - .02, { size: 48, bg: '#fff', hl: C.balk });
  caption(ctx, BALKS[i].cap, t, t0);
  flash(t, t0, .1);
  return { pointT: t0 + pointT, stampT: t0 + stampT };
}
function balkCards(t, sc) {
  blurred(() => viewA(ctx, t, { cam: CAM0, actors: [PIT(), RUN(), FB1()] }), 12, .45);
  const k = t - sc.start;
  for (let i = 0; i < 13; i++) {
    const col = i % 5, row = Math.floor(i / 5);
    const x = 160 + col * 190 + (row === 2 ? 190 : 0), y = 640 + row * 230;
    const d = .04 * i, u = eback(seg(k, d, d + .3));
    const pick = [0, 1, 2, 3, 4].includes(i) && t > sc.c[1];
    const lift = pick ? eback(clamp((t - sc.c[1] - i * .08) / .25)) : 0;
    if (u <= 0) continue;
    ctx.save(); ctx.translate(x, y - lift * 30); ctx.scale(u * (1 + lift * .12), u * (1 + lift * .12)); ctx.rotate((i % 2 ? .04 : -.04));
    rr(ctx, -78, -98, 156, 196, 20); ctx.fillStyle = pick ? C.balk : (t > sc.c[1] ? 'rgba(255,255,255,.35)' : '#fff'); ctx.fill();
    ctx.lineWidth = 6; ctx.strokeStyle = '#0B0E16'; ctx.stroke();
    drawRichLine(ctx, pick ? '①②③④⑤'[i] : String(i + 1), 0, 4, pick ? 86 : 70, { stroke: false, color: pick ? '#fff' : '#0B0E16' });
    ctx.restore();
  }
  // counter badge
  const cu = eback(seg(k, .55, .85));
  if (cu > 0) { ctx.save(); ctx.translate(540, 470); ctx.scale(cu, cu); chip(ctx, '보크 종류 *13가지*', 0, 0, 1, 0, { size: 56, bg: C.yellow }); ctx.restore(); }
  caption(ctx, t < sc.c[1] ? ['보크 *13가지* 중 대표 5개'] : ['보크 *13가지* 중 대표 5개', '(모두 투수판을 밟고 있을 때)'], t, t < sc.c[1] ? sc.start + .1 : sc.c[1], { y: 1430 });
  flash(t, sc.start);
}
function S5(t) {
  const sc = S.S5;
  if (t < sc.c[2]) return balkCards(t, sc);
  const bounds = [sc.c[2], sc.c[3], sc.c[4], sc.c[5], sc.c[6], sc.end];
  for (let i = 0; i < 5; i++) if (t < bounds[i + 1] || i === 4) {
    balkCut(i, t, bounds[i], bounds[i + 1]);
    if (i === 4 && t > sc.c[7]) caption(ctx, ['⑤ *공 떨어뜨리기*', '(실수여도 *보크!*)'], t, sc.c[7]);
    return;
  }
}

// ---------- S6 : not a balk ----------
function S6(t) {
  const sc = S.S6, k = t - sc.start;
  if (t < sc.c[3]) {
    // cut 1: step off the rubber, then fake to first => OK
    const q = t - sc.c[1];
    const p = PIT(), r = RUN(), f = FB1(), b = BAT(), u = UMP(), bu = BUMP();
    let rubberHL = 0, rubberColor = C.ok;
    if (q > .05) { const v = eio(seg(q, .05, .45)); p.x += 95 * v; p.footR = .5 * Math.sin(v * Math.PI); rubberHL = v; }
    if (q > .8) { p.face = 1; }
    if (q > .95 && q < 1.5) { const v = seg(q, .95, 1.45); throwArm(p, Math.min(.62, v), 1); }
    if (q > 1.2) { const v = eout(seg(q, 1.2, 1.5)); lerpPos(r, LEAD, [858, 1078], v); r.eyes = 'wide'; r.mouth = 'o'; r.face = 1; r.tilt = .3 * v; }
    const cam = { x: 610, y: 980, z: 1.15 };
    viewA(ctx, t, { cam, actors: [p, r, f, b, u, bu], rubberHL: q > 0 ? rubberHL : 0, rubberColor });
    withCam(ctx, cam, () => {
      if (q > .4) chip(ctx, '발 뺌!', A.RUBBER[0] - 40, A.RUBBER[1] + 80, t, sc.c[1] + .4, { size: 40, bg: C.ok, color: '#fff', border: '#0B0E16' });
      dots(u.x + 120, u.y - 290, t, sc.c[1] + 1.55); dots(bu.x - 60, bu.y - 230, t, sc.c[1] + 1.6);
    });
    if (t < sc.c[1]) { // intro
      chip(ctx, '보크 *아님!*', 540, 620, t, sc.start + .05, { size: 92, bg: '#fff', hl: C.ok, rot: -.04 });
    }
    drawStamp(ctx, 'OK', 770, 760, t - sc.c[1] - 1.75, C.ok, 1.05);
    sitBoard(ctx, '1루 주자', [1]);
    const cap = t < sc.c[1] ? [['보크 *아닌 것*도 있어!'], sc.start + .05] : t < sc.c[2] ? [['발 빼면 *내야수!*'], sc.c[1]] : [['발 빼면 *내야수!*', '1·3루로 던지는 척 *OK*'], sc.c[2]];
    caption(ctx, cap[0], t, cap[1]);
    flash(t, sc.start);
    return;
  }
  if (t < sc.c[4]) {
    // cut 2 (aerial): runner on 2B, pitcher on the rubber fakes to second => OK
    const q = t - sc.c[3];
    const p = mini('red', B.MOUND[0], B.MOUND[1] - 6, { glove: 'L', ball: 'L', armL: -1, armR: -1 });
    const r = mini('blue', B.B2[0] - 95, B.B2[1] + 45, { armL: .5, armR: .5, crouch: .3 });
    const f2 = mini('red', B.B2[0] + 150, B.B2[1] + 70, { glove: 'L', armL: .4 });
    const um = mini('ump', B.HOME[0] - 110, B.HOME[1] + 30, { mask: true, cap: true, helmet: false });
    if (q > .1) { const v = eio(seg(q, .1, .7)); f2.x = lerp(B.B2[0] + 150, B.B2[0] + 60, v); f2.y = lerp(B.B2[1] + 70, B.B2[1] + 25, v); }
    if (q > .35 && q < .95) { const v = seg(q, .35, .9); p.armR = v < .5 ? lerp(-1, 2.6, eio(v / .5)) : lerp(2.6, 1.6, eout((v - .5) / .5)); p.tilt = -.1 * Math.sin(v * Math.PI); }
    if (q >= .95) p.armR = lerp(1.6, -1, seg(q, .95, 1.3));
    if (q > .65) { const v = eout(seg(q, .65, 1.0)); r.x = lerp(B.B2[0] - 95, B.B2[0] - 10, v); r.y = lerp(B.B2[1] + 45, B.B2[1] + 8, v); r.eyes = 'wide'; r.mouth = 'o'; r.tilt = .4 * v; }
    viewB(ctx, t, { actors: [p, r, f2, um], under: () => {
      ctx.save(); ctx.setLineDash([22, 16]); drawArrow(ctx, [[B.MOUND[0], B.MOUND[1] - 110], [B.B2[0] + 5, B.B2[1] + 90]], eout(seg(q, .5, .8)), C.yellow, 12, 30); ctx.restore();
    }, over: () => {
      ell(ctx, B.MOUND[0], B.MOUND[1], 58, 22); ctx.lineWidth = 7; ctx.strokeStyle = C.yellow; ctx.stroke();
      chip(ctx, '투수판 밟고', B.MOUND[0] + 200, B.MOUND[1] + 30, t, sc.c[3] + .1, { size: 38, bg: '#fff' });
      chip(ctx, '던지는 척!', B.MOUND[0] + 190, B.MOUND[1] - 230, t, sc.c[3] + .6, { size: 38, bg: C.yellow });
      dots(um.x + 70, um.y - 170, t, sc.c[3] + 1.05);
    } });
    drawStamp(ctx, 'OK', 800, 1120, t - sc.c[3] - 1.2, C.ok, 1.05);
    sitBoard(ctx, '2루 주자', [2]);
    caption(ctx, ['2루 주자한텐', '투수판 밟고도 *OK!*'], t, sc.c[3], { y: 1470 });
    flash(t, sc.c[3], .1);
    return;
  }
  // table
  blurred(() => viewA(ctx, t, { cam: CAM0, actors: [PIT()] }), 14, .5);
  const t0 = sc.c[4];
  const x0 = 60, w = W - 120, y0 = 470;
  const pu = eout(clamp((t - t0) / .25));
  ctx.save(); ctx.globalAlpha = pu; ctx.translate(0, (1 - pu) * 60);
  rr(ctx, x0, y0, w, 760, 34); ctx.fillStyle = 'rgba(12,22,44,.94)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.skyHi; ctx.stroke();
  const cols = [x0 + 30, x0 + 470, x0 + 735];
  const cw = [430, 255, 235];
  const hy = y0 + 80;
  drawRichLine(ctx, '동작', cols[0] + 10, hy, 40, { stroke: false, align: 'left', color: '#9FB3D1', weight: 800 });
  drawRichLine(ctx, '투수판 밟고', cols[1] + cw[1] / 2, hy, 40, { stroke: false, color: '#9FB3D1', weight: 800 });
  drawRichLine(ctx, '발 빼고', cols[2] + cw[2] / 2, hy, 40, { stroke: false, color: '#9FB3D1', weight: 800 });
  const rows = [
    ['1·3루로 던지는 척', '', '보크', 'OK'],
    ['2루로 던지는 척', '(2루 주자 있을 때)', 'OK', 'OK'],
    ['타자에게 던지는 척', '', '보크', '보크'],
  ];
  rows.forEach((rw, i) => {
    const ru = eback(clamp((t - t0 - .15 - i * .17) / .25)); if (ru <= 0) return;
    const y = hy + 70 + i * 170;
    ctx.save(); ctx.globalAlpha *= clamp(ru);
    const hl = i === 2 && t > t0 + .9;
    rr(ctx, x0 + 18, y, w - 36, 150, 22); ctx.fillStyle = hl ? 'rgba(229,38,46,.22)' : 'rgba(255,255,255,.07)'; ctx.fill();
    if (hl) { ctx.lineWidth = 6; ctx.strokeStyle = C.balk; ctx.stroke(); }
    drawRichLine(ctx, rw[0], cols[0] + 10, y + (rw[1] ? 56 : 75), 46, { stroke: false, align: 'left' });
    if (rw[1]) drawRichLine(ctx, rw[1], cols[0] + 10, y + 108, 32, { stroke: false, align: 'left', color: '#9FB3D1', weight: 700 });
    [rw[2], rw[3]].forEach((v, j) => {
      const cx = cols[j + 1] + cw[j + 1] / 2, col = v === 'OK' ? C.ok : C.balk;
      rr(ctx, cx - 92, y + 40, 184, 72, 36); ctx.fillStyle = col; ctx.fill();
      drawRichLine(ctx, v, cx, y + 78, 44, { stroke: false });
    });
    ctx.restore();
  });
  if (t > t0 + 1.0) { const fu = eback(clamp((t - t0 - 1.0) / .25)); ctx.save(); ctx.translate(540, y0 + 700); ctx.scale(fu, fu); drawRichLine(ctx, '→ 주자가 없으면 *보크도 없다!*', 0, 0, 46, { stroke: false, hlColor: C.yellow }); ctx.restore(); }
  ctx.restore();
  caption(ctx, ['단, 타자에게 던지는 척은', '*무조건 보크!*'], t, t0 + .05, { y: 1440 });
}

// ---------- S7 : TMI walk-off balk ----------
function S7(t) {
  const sc = S.S7, k = t - sc.start;
  if (t < sc.c[3]) {
    const p = PIT(), r = RUN(), f = FB1(), b = BAT(), u = UMP();
    p.cap = true;
    const jog = seg(t, sc.c[1] + .05, sc.c[1] + 1.1);
    if (t < sc.c[1] + 1.1) { p.x = lerp(1180, A.RUBBER[0] - 29, eio(jog)); p.y = lerp(930, A.RUBBER[1] - 2, eio(jog)); p.jumpY = jog > 0 && jog < 1 ? hop(t, 12, 12) : 0; p.face = -1; p.ball = 'L'; p.armL = .3; p.armR = .3; }
    else if (t < sc.c[1] + 1.4) { const v = eout(seg(t, sc.c[1] + 1.1, sc.c[1] + 1.4)); p.armL = lerp(.3, -1.05, v); p.armR = lerp(.3, -1.0, v); }
    const q = t - sc.c[2];
    if (q > .1) p.face = 1;
    if (q > .25 && q < .8) { const v = seg(q, .25, .75); throwArm(p, Math.min(.62, v), 1); }
    if (q > .45) { const v = eout(seg(q, .45, .8)); lerpPos(r, LEAD, [858, 1078], v); r.face = 1; r.tilt = .4 * v; r.eyes = 'wide'; }
    pointAt(u, eout(seg(q, .9, 1.05)));
    const cam = t < sc.c[2] ? camLerp(CAM0, { x: 610, y: 980, z: 1.1 }, eio(seg(t, sc.c[1], sc.c[2]))) : { x: 610, y: 980, z: 1.1 };
    viewA(ctx, t, { cam, actors: [p, r, f, b, u, t >= sc.c[1] ? null : null], excite: .9, rubberHL: t > sc.c[2] ? .9 : 0 });
    vignette(.55);
    if (t < sc.c[1]) { // TMI burst
      const v = eback(clamp((t - sc.start) / .3));
      ctx.save(); ctx.translate(540, 850); ctx.scale(v, v); ctx.rotate(-.06);
      ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, rad = i % 2 ? 170 : 240; ctx.lineTo(Math.cos(a) * rad * 1.25, Math.sin(a) * rad); } ctx.closePath();
      ctx.fillStyle = C.yellow; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#0B0E16'; ctx.stroke();
      drawRichLine(ctx, 'TMI!', 0, 6, 140, { stroke: false, color: '#0B0E16' }); ctx.restore();
    }
    sitBoard(ctx, '9회말 · 동점 · 1아웃 1·3루', [1, 3], clamp((t - sc.start) / .2));
    if (t > sc.c[2]) drawStamp(ctx, '보크', 760, 780, t - sc.c[2] - 1.15, C.balk, 1);
    if (t >= sc.c[2]) caption(ctx, ['초구도 안 던지고', '*끝내기 보크?!*'], t, sc.c[2]);
    else if (t >= sc.c[1]) caption(ctx, ['9회말 동점, *막 올라온 투수*'], t, sc.c[1]);
    else caption(ctx, ['*TMI!*'], t, sc.start);
    if (t > sc.c[1] && t < sc.c[1] + .9) chip(ctx, '구원투수 등판', 760, 520, t, sc.c[1] + .05, { size: 40, bg: '#fff' });
    return;
  }
  // walk-off: aerial
  const q = t - sc.c[3];
  const r3 = mini('blue', ...B.B3), r1 = mini('blue', ...B.B2), p = mini('red', B.MOUND[0], B.MOUND[1] - 10, { glove: 'L', eyes: 'sad', mouth: 'sad', tilt: .12 });
  r1.x = lerp(B.B1[0], B.B2[0], eio(seg(q, 0, .6))); r1.y = lerp(B.B1[1], B.B2[1], eio(seg(q, 0, .6)));
  const w = eio(seg(q, 0, .65)); lerpPos(r3, B.B3, [B.HOME[0] - 10, B.HOME[1] - 10], w); r3.jumpY = w < 1 ? hop(q, 10, 8) : 0;
  if (w >= 1) { r3.eyes = 'happy'; r3.mouth = 'grin'; r3.armL = r3.armR = 2.5; r3.squash = Math.max(0, 1 - (q - .68) * 5) * .9; }
  viewB(ctx, t, { actors: [r3, r1, p] });
  vignette(.35);
  if (q > .68) {
    const u = q - .68;
    // confetti
    const R = rng(3);
    for (let i = 0; i < 90; i++) { const x0 = R() * W, vy = 300 + R() * 500, x = x0 + Math.sin(u * 4 + i) * 40, y = -40 + u * vy + R() * 400 - 200; ctx.save(); ctx.translate(x, y); ctx.rotate(u * 6 + i); ctx.fillStyle = ['#FFD23F', '#5EC8FF', '#FF6B6B', '#fff', '#22B35E'][i % 5]; ctx.fillRect(-9, -5, 18, 10); ctx.restore(); }
    const s = eback(clamp(u / .3)); ctx.save(); ctx.translate(540, 760); ctx.scale(s, s); ctx.rotate(-.05);
    drawRichLine(ctx, '끝내기!', 0, 0, 150, { color: C.yellow, strokeW: 26 }); ctx.restore();
  }
  sitBoard(ctx, '9회말 · 동점 · 1아웃 1·3루', [1, 3]);
  caption(ctx, ['보크 하나로 *경기 끝!*', '2019 KBO · *리그 최초*'], t, sc.c[3]);
  flash(t, sc.c[3], .12);
}

// ---------- S8 : conclusion + end card ----------
function S8(t) {
  const sc = S.S8, k = t - sc.start;
  const lastEnd = sc.e[3];
  const endT = lastEnd + .2;
  if (t < endT + .35) {
    // background: team celebrating
    blurred(() => {
      viewA(ctx, t, { cam: { x: 540, y: 1000, z: 1.05 }, excite: 1, actors: [0, 1, 2, 3, 4].map(i => {
        const ph = i * 1.3; return { x: 300 + i * 120, y: 1080 + (i % 2) * 40, s: 1.0, team: 'blue', face: i < 2 ? 1 : -1, helmet: true, eyes: 'happy', mouth: 'grin', jumpY: hop(t + ph, 8, 50), armL: 2.2 + Math.sin(t * 9 + ph) * .4, armR: 2.2 - Math.sin(t * 9 + ph) * .4, bottle: i % 2 ? 'R' : null };
      }), over: () => {
        const R = rng(11);
        for (let i = 0; i < 60; i++) { const ph = R() * 3, x0 = 380 + R() * 500, uu = ((t * .9 + ph) % 1); ctx.fillStyle = 'rgba(140,215,255,.85)'; ell(ctx, x0 + (R() - .5) * 200 * uu - 80, 830 - Math.sin(uu * Math.PI) * 260 + uu * 120, 9, 12); ctx.fill(); }
      } });
    }, 6, .25);
    const ent = eback(seg(k, 0, .35));
    const h = host(330, lerp(2250, 1330, ent), 2.35, { mouth: 'grin' });
    if (t > sc.c[1]) { h.eyes = 'wink'; h.armR = lerp(.1, 1.2, eout(seg(t, sc.c[1], sc.c[1] + .2))); h.tilt = -.05; }
    if (t > sc.c[2]) { h.eyes = 'happy'; h.armR = 2.3 + Math.sin(t * 10) * .2; h.armL = 2.3 - Math.sin(t * 10) * .2; h.jumpY = hop(t, 7, 30); }
    drawPenguin(ctx, h);
    if (t > sc.c[1] && t < sc.c[2]) { // eye-on-feet icon
      const v = eback(clamp((t - sc.c[1] - .1) / .25));
      ctx.save(); ctx.translate(780, 830); ctx.scale(v, v); board(0, 0, 360, 260, '', t, 0);
      // mini pitcher feet on rubber
      ctx.fillStyle = '#fff'; rr(ctx, -110, 40, 220, 26, 6); ctx.fill(); ctx.strokeStyle = '#9AA6B8'; ctx.lineWidth = 3; ctx.stroke();
      ell(ctx, -40, 34, 46, 24); ctx.fillStyle = C.feet; ctx.fill(); ell(ctx, 45, 34, 46, 24); ctx.fill();
      for (const sx of [-1, 1]) { ell(ctx, sx * 46, -50, 34, 38); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#0B0E16'; ctx.stroke(); ell(ctx, sx * 46 + 4, -38, 16, 18); ctx.fillStyle = '#0B0E16'; ctx.fill(); }
      drawArrow(ctx, [[0, -10], [0, 18]], 1, C.balk, 8, 18);
      ctx.restore();
    }
    if (t < sc.c[1]) chip(ctx, '결론!', 540, 520, t, sc.start + .02, { size: 72, bg: C.yellow, rot: -.04 });
    const cap = t < sc.c[1] ? [['*결론!*'], sc.start] : t < sc.c[2] ? [['주자 있을 땐 *투수 발*을 잘 봐!'], sc.c[1]] : [['투수판 밟고 움찔하면?', '*보크, 공짜 진루!*'], sc.c[2]];
    caption(ctx, cap[0], t, cap[1], { y: 1480 });
  }
  if (t >= endT) {
    const u = eout(clamp((t - endT) / .35));
    ctx.save(); ctx.translate(0, (1 - u) * H);
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1C3566'); g.addColorStop(1, '#0E1B36');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = .07; for (let i = 0; i < 12; i++) { ell(ctx, (i * 211) % W, (i * 397) % H, 120, 120); ctx.fillStyle = '#5EC8FF'; ctx.fill(); } ctx.globalAlpha = 1;
    const lineup = [
      { x: 170, team: 'blue', helmet: true, s: 1.25 }, { x: 355, team: 'blue', helmet: true, s: 1.35, bat: .5, armR: -.9 },
      { x: 540, team: 'host', cap: true, headset: true, s: 1.6 }, { x: 725, team: 'blue', helmet: true, s: 1.35 }, { x: 910, team: 'blue', helmet: true, s: 1.25 },
    ];
    lineup.forEach((p, i) => drawPenguin(ctx, { y: 1080, face: 0, eyes: i === 2 ? 'wink' : 'happy', mouth: 'grin', armL: 1.8 + Math.sin(t * 8 + i) * .4, armR: p.bat ? -.9 : 1.8 - Math.sin(t * 8 + i) * .4, jumpY: hop(t + i * .4, 6, 26), ...p }));
    drawRichLine(ctx, 'SPO *펭귄즈*', 540, 560, 120, { strokeW: 22 });
    drawRichLine(ctx, '야구 규칙, 1분이면 끝!', 540, 680, 50, { stroke: false, color: '#BFD3F2', weight: 800 });
    chip(ctx, '팔로우 *@SPOMOgrp*', 540, 1250, t, endT + .15, { size: 62, bg: '#fff', hl: '#1F6FB5' });
    chip(ctx, '헷갈리는 규칙은 댓글로!', 540, 1390, t, endT + .3, { size: 48, bg: C.yellow });
    ctx.restore();
  }
}

// ---------- main ----------
const SCENES = { S1, S2, S3, S4, S5, S6, S7, S8 };
function setup(tl) {
  window.TL = tl; S = {};
  for (const s of tl.scenes) S[s.id] = { start: s.start, end: s.end, c: s.chunks.map(c => c.start), e: s.chunks.map(c => c.end) };
  S.S1.start = 0; // hook starts at frame 0
  buildSfx();
}
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); ctx.filter = 'none';
  let id = 'S8';
  for (const s of TL.scenes) if (t < s.end) { id = s.id; break; }
  SCENES[id](t);
  const endCard = t >= S.S8.e[3] + .2;
  if (!endCard) {
    titleBar(ctx, t);
    if (id === 'S1') sitBoard(ctx, '1아웃 · 1루 주자', [1]);
  }
}
function buildSfx() {
  SFX.length = 0;
  const s1 = 0; sfx(s1 + .12, 'swish', .5); sfx(s1 + .55, 'screech', .9); sfx(s1 + 1.24, 'beep', .9); sfx(s1 + 1.8, 'patter', .8); sfx(s1 + 2.3, 'patter', .7); sfx(s1 + 2.8, 'patter', .6);
  sfx(S.S2.start + .02, 'pop', 1); sfx(S.S2.c[1], 'ding', .9);
  sfx(S.S3.start, 'swish', .6); sfx(S.S3.start + .4, 'swish', .4); sfx(S.S3.start + .95, 'patter', .7); sfx(S.S3.start + 1.5, 'patter', .7); sfx(S.S3.start + 2.32, 'cheer', .7); sfx(S.S3.start + 2.32, 'pop', .7); sfx(S.S3.c[2] + .02, 'pop', .7);
  const a = S.S4.c[1]; sfx(S.S4.start, 'swish', .6); sfx(S.S4.start + .05, 'pop', .7); sfx(a + .2, 'whoosh', .8); sfx(a + .5, 'patter', .7); sfx(a + 1.05, 'whoosh', .9); sfx(a + 1.38, 'mitt', .9); sfx(a + 1.85, 'stamp', .9); sfx(a + 1.95, 'uhoh', .8); sfx(S.S4.c[2] + .02, 'pop', .6);
  const s5 = S.S5; sfx(s5.start, 'swish', .6); for (let i = 0; i < 13; i++) sfx(s5.start + .04 * i, 'tick', .35); sfx(s5.c[1], 'ding', .6);
  const b = [s5.c[2], s5.c[3], s5.c[4], s5.c[5], s5.c[6]];
  sfx(b[0] + .05, 'swish', .4); sfx(b[0] + .32, 'screech', .8); sfx(b[0] + .85, 'beep', .8); sfx(b[0] + .98, 'stamp', 1);
  sfx(b[1], 'swish', .4); sfx(b[1] + .45, 'whoosh', .9); sfx(b[1] + .95, 'beep', .8); sfx(b[1] + 1.1, 'stamp', 1);
  sfx(b[2], 'swish', .4); sfx(b[2] + .35, 'whoosh', .8); sfx(b[2] + .5, 'patter', .5); sfx(b[2] + .95, 'beep', .8); sfx(b[2] + 1.1, 'stamp', 1);
  sfx(b[3], 'swish', .4); sfx(b[3] + 1.15, 'whoosh', .9); sfx(b[3] + 1.55, 'mitt', .9); sfx(b[3] + 1.75, 'beep', .8); sfx(b[3] + 1.9, 'stamp', 1);
  sfx(b[4], 'swish', .4); sfx(b[4] + .6, 'thud', 1); sfx(b[4] + .8, 'uhoh', .6); sfx(b[4] + .95, 'beep', .8); sfx(b[4] + 1.1, 'stamp', 1);
  const s6 = S.S6; sfx(s6.start, 'swish', .6); sfx(s6.start + .05, 'pop', .8); sfx(s6.c[1] + .1, 'step', .9); sfx(s6.c[1] + 1.0, 'whoosh', .7); sfx(s6.c[1] + 1.75, 'ok', 1);
  sfx(s6.c[3], 'swish', .4); sfx(s6.c[3] + .5, 'whoosh', .7); sfx(s6.c[3] + 1.2, 'ok', 1);
  sfx(s6.c[4], 'swish', .6); for (let i = 0; i < 3; i++) sfx(s6.c[4] + .15 + i * .17, 'tick', .6); sfx(s6.c[4] + .9, 'beep', .5);
  const s7 = S.S7; sfx(s7.start, 'pop', .8); sfx(s7.c[1], 'gasp', .45); sfx(s7.c[2] + .3, 'whoosh', .8); sfx(s7.c[2] + .9, 'beep', .9); sfx(s7.c[2] + 1.15, 'stamp', 1);
  sfx(s7.c[3], 'swish', .5); sfx(s7.c[3] + .68, 'thud', 1); sfx(s7.c[3] + .68, 'cheer', .7); sfx(s7.e[3] + .02, 'cheer', .9);
  const s8 = S.S8; sfx(s8.start + .02, 'pop', 1); sfx(s8.c[1], 'ding', .5); sfx(s8.start, 'splash', .4); sfx(s8.e[3] + .2, 'swish', .7); sfx(s8.e[3] + .45, 'ding', .9);
}

// cover image (separate output)
function renderCover() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
  const p = PIT(), r = RUN(), f = FB1();
  legLift(p, 1); p.eyes = 'wide'; p.mouth = 'o'; p.sweat = true; p.tilt = .14;
  lerpPos(r, LEAD, B2P, .5); r.s = 1.05; r.eyes = 'happy'; r.mouth = 'grin'; r.jumpY = 26; r.armL = .8; r.armR = 0; r.crouch = .1;
  viewA(ctx, 0, { cam: { x: 580, y: 930, z: 1.35 }, actors: [p, r, f], rubberHL: .9 });
  const g = ctx.createLinearGradient(0, 0, 0, 760); g.addColorStop(0, 'rgba(10,20,45,.85)'); g.addColorStop(1, 'rgba(10,20,45,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, 760);
  drawRichLine(ctx, '움찔하면', 540, 330, 150, { strokeW: 28 });
  drawRichLine(ctx, '*공짜 진루?!*', 540, 500, 150, { strokeW: 28 });
  chip(ctx, '보크 1분 정리', 540, 650, 1, 0, { size: 50, bg: C.yellow });
}

window.setup = setup; window.render = render; window.renderCover = renderCover; window.getSfx = () => SFX;
window.preview = async (arg) => { setup(arg.tl); render(arg.t); };
window.previewCover = async (arg) => { setup(arg.tl); renderCover(); };

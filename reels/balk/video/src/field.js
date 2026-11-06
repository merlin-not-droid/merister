// Backgrounds: side view of the field (view A), aerial diamond (view B), overlays.
'use strict';
const A = { HOME: [175, 1215], B1: [880, 1075], B2: [660, 792], MOUND: [480, 1000], RUBBER: [500, 978] };
const B = { HOME: [540, 1250], B1: [880, 915], B2: [540, 580], B3: [200, 915], MOUND: [540, 915] };

const crowdDots = (() => {
  const r = rng(7), out = [];
  const cols = ['#FF6B6B', '#FFD166', '#06D6A0', '#4CC9F0', '#F8F9FA', '#F15BB5', '#9B5DE5', '#FF9F1C', '#6EC6F5'];
  for (let row = 0; row < 7; row++) for (let i = 0; i < 34; i++) {
    out.push({ x: i * 33 + (row % 2) * 16 + r() * 8 - 10, y: 405 + row * 30 + r() * 4, c: cols[Math.floor(r() * cols.length)], ph: r() * 6.28, row });
  }
  return out;
})();

function drawSky(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, '#5FB8F0'); g.addColorStop(1, '#BFE6FA');
  ctx.fillStyle = g; ctx.fillRect(-400, -400, W + 800, 820);
}
function drawStands(ctx, t, excite = 0) {
  // roof/back
  ctx.fillStyle = '#3B4A63'; ctx.fillRect(-400, 360, W + 800, 250);
  ctx.fillStyle = '#2E3A50'; for (let r = 0; r < 8; r++) ctx.fillRect(-400, 390 + r * 30, W + 800, 3);
  for (const d of crowdDots) {
    const j = excite * Math.abs(Math.sin(t * 9 + d.ph)) * 10;
    ell(ctx, d.x, d.y - j, 11, 12); ctx.fillStyle = d.c; ctx.fill();
    ell(ctx, d.x, d.y - 13 - j, 7, 7); ctx.fillStyle = '#F2D2B6'; ctx.fill();
  }
  // wall
  ctx.fillStyle = '#1E6B4A'; ctx.fillRect(-400, 600, W + 800, 46);
  ctx.fillStyle = '#FFD23F'; ctx.fillRect(-400, 600, W + 800, 6);
}
function drawGrassA(ctx) {
  const g = ctx.createLinearGradient(0, 646, 0, H); g.addColorStop(0, '#4FAE45'); g.addColorStop(1, '#6CCB55');
  ctx.fillStyle = g; ctx.fillRect(-400, 646, W + 800, H);
  ctx.save(); ctx.globalAlpha = .12; ctx.fillStyle = '#FFFFFF';
  for (let i = -6; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 150, 646); ctx.lineTo(i * 150 + 75, 646); ctx.lineTo(i * 150 - 300, H + 200); ctx.lineTo(i * 150 - 375, H + 200); ctx.fill(); }
  ctx.restore();
}
function drawInfieldA(ctx) {
  const H0 = A.HOME, B1 = A.B1, B2 = A.B2, M = A.MOUND;
  ell(ctx, 500, 975, 690, 285); ctx.fillStyle = C.dirt; ctx.fill();
  ctx.beginPath(); ctx.moveTo(H0[0] + 70, H0[1] - 62); ctx.lineTo(B1[0] - 85, B1[1] - 14); ctx.lineTo(B2[0], B2[1] + 58); ctx.lineTo(-150, 905); ctx.closePath();
  ctx.fillStyle = '#5DBB4A'; ctx.fill();
  ell(ctx, H0[0], H0[1], 220, 82); ctx.fillStyle = C.dirt; ctx.fill();
  ell(ctx, M[0], M[1], 210, 56);
  const g = ctx.createRadialGradient(M[0] - 40, M[1] - 30, 10, M[0], M[1], 220); g.addColorStop(0, '#DDA06A'); g.addColorStop(1, C.dirtDark);
  ctx.fillStyle = g; ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 7;
  const dx = B1[0] - H0[0], dy = B1[1] - H0[1];
  ctx.beginPath(); ctx.moveTo(H0[0], H0[1]); ctx.lineTo(H0[0] + dx * 1.4, H0[1] + dy * 1.4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(H0[0], H0[1]); ctx.lineTo(-300, 930); ctx.stroke();
  base(ctx, B1[0], B1[1], 1); base(ctx, B2[0], B2[1], .8);
  ctx.beginPath(); ctx.moveTo(H0[0] - 34, H0[1] - 8); ctx.lineTo(H0[0] + 34, H0[1] - 8); ctx.lineTo(H0[0] + 34, H0[1] + 4); ctx.lineTo(H0[0], H0[1] + 16); ctx.lineTo(H0[0] - 34, H0[1] + 4); ctx.closePath();
  ctx.fillStyle = '#fff'; ctx.fill();
}
function drawRubber(ctx, hl = 0, color = '#FFD23F') {
  const r = A.RUBBER;
  if (hl > 0) { ctx.save(); ctx.globalAlpha = hl; ell(ctx, r[0], r[1] + 4, 100, 28); ctx.strokeStyle = color; ctx.lineWidth = 10; ctx.stroke(); ctx.restore(); }
  // slab with a little depth
  ctx.fillStyle = '#C9CED6'; rr(ctx, r[0] - 66, r[1] - 2, 132, 18, 5); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; rr(ctx, r[0] - 66, r[1] - 12, 132, 16, 5); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 2; rr(ctx, r[0] - 66, r[1] - 12, 132, 28, 5); ctx.stroke();
}
function base(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * .5); ctx.rotate(Math.PI / 4);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-26, -22, 52, 52);
  ctx.fillStyle = '#fff'; ctx.fillRect(-26, -26, 52, 52); ctx.restore();
}
// camera: {x,y,z} world point placed at screen centre (540, 1056)
function withCam(ctx, cam, fn) {
  ctx.save(); ctx.translate(540, 1056); ctx.scale(cam.z, cam.z); ctx.translate(-cam.x, -cam.y); fn(); ctx.restore();
}
const CAM0 = { x: 540, y: 1056, z: 1 };
function camLerp(a, b, u) { return { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), z: lerp(a.z, b.z, u) }; }

// Draw view A with actors (array of penguin poses + optional extras with y for sorting)
function viewA(ctx, t, st) {
  withCam(ctx, st.cam || CAM0, () => {
    drawSky(ctx); drawStands(ctx, t, st.excite || 0); drawGrassA(ctx); drawInfieldA(ctx);
    drawRubber(ctx, st.rubberHL || 0, st.rubberColor);
    if (st.under) st.under(ctx);
    const items = [...(st.actors || [])].filter(Boolean).sort((a, b) => a.y - b.y);
    for (const p of items) p.draw ? p.draw(ctx) : drawPenguin(ctx, p);
    if (st.ball) drawBall(ctx, st.ball[0], st.ball[1], st.ball[2] || 14);
    if (st.over) st.over(ctx);
  });
}

// ----- view B : aerial diamond -----
function viewB(ctx, t, st) {
  ctx.save();
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#4CA843'); g.addColorStop(1, '#68C653');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = .1; ctx.fillStyle = '#fff';
  for (let i = -10; i < 20; i++) { ctx.save(); ctx.translate(540, 900); ctx.rotate(Math.PI / 4); ctx.fillRect(i * 140 - 1400, -1400, 70, 2800); ctx.restore(); }
  ctx.globalAlpha = 1;
  // outfield arc dirt edge
  ctx.beginPath(); ctx.arc(B.HOME[0], B.HOME[1], 700, Math.PI * 1.25, Math.PI * 1.75); ctx.lineTo(B.HOME[0], B.HOME[1]); ctx.closePath();
  ctx.save(); ctx.clip();
  ctx.beginPath(); ctx.arc(B.HOME[0], B.HOME[1], 610, 0, Math.PI * 2); ctx.fillStyle = C.dirt; ctx.fill(); ctx.restore();
  // infield grass diamond
  const d = (pts) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); };
  const shrink = (p, k) => [lerp(B.MOUND[0], p[0], k), lerp(B.MOUND[1], p[1], k)];
  d([B.HOME, B.B1, B.B2, B.B3].map(p => shrink(p, .82))); ctx.fillStyle = '#5DBB4A'; ctx.fill();
  // base paths
  ctx.strokeStyle = C.dirt; ctx.lineWidth = 46; ctx.lineJoin = 'round'; d([B.HOME, B.B1, B.B2, B.B3]); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(B.B3[0] - 140, B.B3[1] - 140); ctx.lineTo(B.HOME[0], B.HOME[1]); ctx.lineTo(B.B1[0] + 140, B.B1[1] - 140); ctx.stroke();
  // home circle + mound
  ell(ctx, B.HOME[0], B.HOME[1], 90, 90); ctx.fillStyle = C.dirt; ctx.fill();
  ell(ctx, B.MOUND[0], B.MOUND[1], 72, 72); ctx.fillStyle = '#D29561'; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillRect(B.MOUND[0] - 22, B.MOUND[1] - 5, 44, 10);
  for (const p of [B.B1, B.B2, B.B3]) { ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(Math.PI / 4); ctx.fillStyle = '#fff'; ctx.fillRect(-22, -22, 44, 44); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(B.HOME[0] - 24, B.HOME[1] - 18); ctx.lineTo(B.HOME[0] + 24, B.HOME[1] - 18); ctx.lineTo(B.HOME[0] + 24, B.HOME[1]); ctx.lineTo(B.HOME[0], B.HOME[1] + 22); ctx.lineTo(B.HOME[0] - 24, B.HOME[1]); ctx.closePath(); ctx.fillStyle = '#fff'; ctx.fill();
  if (st.under) st.under(ctx);
  const items = [...(st.actors || [])].filter(Boolean).sort((a, b) => a.y - b.y);
  for (const p of items) p.draw ? p.draw(ctx) : drawPenguin(ctx, p);
  if (st.over) st.over(ctx);
  ctx.restore();
}

// ----- overlays -----
function titleBar(ctx, t) {
  const y = 196, h = 118;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
  rr(ctx, 52, y, W - 104, h, 30); ctx.fillStyle = C.navyDeep; ctx.fill(); ctx.restore();
  ctx.save(); rr(ctx, 52, y, W - 104, h, 30); ctx.lineWidth = 5; ctx.strokeStyle = C.skyHi; ctx.stroke(); ctx.restore();
  // small penguin badge
  ctx.save(); drawPenguin(ctx, { x: 120, y: y + h - 8, s: .42, team: 'blue', face: 1, helmet: true, shadow: false, eyes: 'happy', mouth: 'grin' }); ctx.restore();
  drawRichLine(ctx, '공도 안 던졌는데 *왜 진루해?*', 572, y + h / 2 + 3, 62, { stroke: false });
}
function sitBoard(ctx, text, runners, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.font = '800 40px Pretendard'; const w = ctx.measureText(text).width + 120, x = 540 - w / 2, y = 336;
  rr(ctx, x, y, w, 64, 32); ctx.fillStyle = 'rgba(8,14,28,.78)'; ctx.fill();
  // mini diamond with runners
  const cx = x + 48, cy = y + 34, k = 13;
  const bases = [[cx + k, cy], [cx, cy - k], [cx - k, cy]];
  bases.forEach((b, i) => { ctx.save(); ctx.translate(b[0], b[1]); ctx.rotate(Math.PI / 4); ctx.fillStyle = runners.includes(i + 1) ? C.yellow : 'rgba(255,255,255,.35)'; ctx.fillRect(-7, -7, 14, 14); ctx.restore(); });
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(text, x + 84, y + 34);
  ctx.restore();
}
// caption: lines with *highlight*; pops in at t0
function caption(ctx, lines, t, t0, opts = {}) {
  if (t < t0) return;
  const u = clamp((t - t0) / .18), sc = lerp(.86, 1, eback(u));
  const size = fitSize(ctx, lines, opts.size || 78, 900);
  const lh = size * 1.22, cy = opts.y || 1430;
  ctx.save(); ctx.globalAlpha = clamp((t - t0) / .08); ctx.translate(520, cy); ctx.scale(sc, sc);
  lines.forEach((l, i) => drawRichLine(ctx, l, 0, (i - (lines.length - 1) / 2) * lh, size, { strokeW: size * .22 }));
  ctx.restore();
}
function chip(ctx, text, x, y, t, t0, opts = {}) {
  if (t < t0) return;
  const u = eback(clamp((t - t0) / .25));
  ctx.save(); ctx.translate(x, y); ctx.scale(u, u); ctx.rotate(opts.rot || 0);
  ctx.font = `900 ${opts.size || 54}px Pretendard`; const w = ctx.measureText(text.replace(/\*/g, '')).width + 64, h = (opts.size || 54) + 36;
  rr(ctx, -w / 2, -h / 2, w, h, opts.r != null ? opts.r : 18); ctx.fillStyle = opts.bg || C.yellow; ctx.fill();
  ctx.lineWidth = 6; ctx.strokeStyle = opts.border || '#0B0E16'; ctx.stroke();
  drawRichLine(ctx, text, 0, 3, opts.size || 54, { stroke: false, color: opts.color || '#0B0E16', hlColor: opts.hl || C.balk });
  ctx.restore();
}

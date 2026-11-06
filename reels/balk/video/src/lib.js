// Shared helpers: easing, colors, penguin character, text, stamps.
'use strict';
const W = 1080, H = 1920;
const C = {
  sky: '#6EC6F5', skyHi: '#5EC8FF', navy: '#1F3A68', navyDeep: '#14233F',
  red: '#E5484D', redCap: '#C3343A', glove: '#9A6234', gloveDark: '#6E4321',
  body: '#2E3446', bodyHi: '#4A5470', belly: '#FFFDF7', beak: '#FFB627', feet: '#FF9F1C',
  ump: '#17181D', umpPants: '#8C919B', grass: '#5DBB4A', grassDark: '#4FA83F', dirt: '#C98A55', dirtDark: '#B27443',
  ok: '#22B35E', balk: '#E5262E', yellow: '#FFD23F', white: '#FFFFFF',
};
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const eio = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const eout = t => 1 - Math.pow(1 - t, 3);
const ein = t => t * t * t;
const eback = t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const elastic = t => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - .75) * (2 * Math.PI) / 3) + 1;
const pulse = (t, a, d) => { const u = seg(t, a, a + d); return Math.sin(u * Math.PI); };
// deterministic pseudo random
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function ell(ctx, x, y, rx, ry, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(.1, rx), Math.max(.1, ry), rot, 0, Math.PI * 2); }
function shade(hex, amt) { // amt -1..1
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((f - r) * p + r); g = Math.round((f - g) * p + g); b = Math.round((f - b) * p + b);
  return `rgb(${r},${g},${b})`;
}
// clay-ish fill: radial gradient light from top-left
function clay(ctx, x, y, r, base) {
  const g = ctx.createRadialGradient(x - r * .35, y - r * .45, r * .1, x, y, r * 1.25);
  g.addColorStop(0, shade(base, .28)); g.addColorStop(.55, base); g.addColorStop(1, shade(base, -.3));
  return g;
}

// ---------- Ball ----------
function drawBall(ctx, x, y, r = 13) {
  ctx.save(); ell(ctx, x, y, r, r); ctx.fillStyle = clay(ctx, x, y, r, '#FFFFFF'); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = '#E0393E'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x - r * 1.1, y, r * .8, -.8, .8); ctx.stroke();
  ctx.beginPath(); ctx.arc(x + r * 1.1, y, r * .8, Math.PI - .8, Math.PI + .8); ctx.stroke(); ctx.restore();
}

// ---------- Penguin ----------
// p: {x,y,s, team:'blue'|'red'|'ump'|'host', face:-1|0|1, armL, armR, footL, footR (lift 0..1),
//     stepL, stepR (x offset), tilt, squash, eyes, mouth, glove:'L'|'R', ball:'L'|'R', mask, cap, helmet,
//     headset, bat, blush, sweat, crouch, jumpY, alpha, shadow}
function drawPenguin(ctx, p) {
  const s = p.s || 1, f = p.face || 0;
  ctx.save();
  ctx.translate(p.x, p.y);
  if (p.alpha != null) ctx.globalAlpha = p.alpha;
  ctx.scale(s, s);
  // shadow
  if (p.shadow !== false) {
    const jy = (p.jumpY || 0);
    ctx.save(); ell(ctx, 0, 4, 70 * (1 - Math.min(.5, jy / 300)), 15 * (1 - Math.min(.5, jy / 300)));
    ctx.fillStyle = 'rgba(30,20,10,.28)'; ctx.fill(); ctx.restore();
  }
  ctx.translate(0, -(p.jumpY || 0));
  const sq = p.squash || 0; // + squash down, - stretch
  // feet
  const footL = p.footL || 0, footR = p.footR || 0;
  const fy = (lift) => -lift * 55;
  const drawFoot = (x, lift) => {
    ctx.save(); ctx.translate(x, fy(lift)); ctx.rotate(lift * -.35 * Math.sign(x || 1));
    ell(ctx, 0, -6, 26, 13); ctx.fillStyle = clay(ctx, 0, -6, 26, C.feet); ctx.fill(); ctx.restore();
  };
  drawFoot(-26 + (p.stepL || 0) + f * 6 - footL * 18, footL);
  drawFoot(26 + (p.stepR || 0) + f * 6 + footR * 18, footR);
  // body transform
  ctx.translate(0, -14);
  ctx.rotate(p.tilt || 0);
  ctx.scale(1 + sq * .12, 1 - sq * .12);
  const crouch = p.crouch || 0;
  ctx.translate(0, crouch * 25);
  // flippers behind body when pointing back? draw after body
  const BH = 190, cy = -BH / 2;
  // pants & body clip
  ctx.save();
  ell(ctx, 0, cy, 66, BH / 2); ctx.fillStyle = clay(ctx, -10, cy - 30, 90, C.body); ctx.fill();
  ctx.clip();
  // belly
  ell(ctx, f * 10, cy + 18, 48, 72); ctx.fillStyle = clay(ctx, f * 10 - 10, cy, 70, C.belly); ctx.fill();
  // jersey
  const team = p.team;
  if (team !== 'host' || true) {
    let jc = team === 'blue' ? C.sky : team === 'red' ? C.red : team === 'ump' ? C.ump : C.navy;
    if (team === 'host') jc = '#FFFFFF';
    ctx.beginPath(); ctx.rect(-80, cy + 2, 160, 62);
    ctx.fillStyle = clay(ctx, -20, cy, 95, jc); ctx.fill();
    // collar V
    if (team !== 'ump') {
      ctx.beginPath(); ctx.moveTo(f * 10 - 22, cy + 2); ctx.lineTo(f * 10, cy + 24); ctx.lineTo(f * 10 + 22, cy + 2);
      ctx.fillStyle = team === 'host' ? C.navy : C.belly; ctx.fill();
      // trim
      ctx.strokeStyle = team === 'blue' ? C.navy : team === 'red' ? '#FFFFFF' : C.navy; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(-80, cy + 5); ctx.lineTo(f * 10 - 22, cy + 5); ctx.moveTo(f * 10 + 22, cy + 5); ctx.lineTo(80, cy + 5); ctx.stroke();
    } else {
      ctx.fillStyle = '#2A2B33'; ctx.fillRect(f * 10 - 3, cy + 2, 6, 62);
    }
    // pants
    ctx.beginPath(); ctx.rect(-80, cy + 62, 160, 60);
    ctx.fillStyle = clay(ctx, -10, cy + 70, 80, team === 'ump' ? C.umpPants : team === 'host' ? '#DDE6F2' : '#F2F2EE'); ctx.fill();
    ctx.fillStyle = team === 'blue' ? C.navy : team === 'red' ? C.redCap : '#5D626C'; ctx.fillRect(-80, cy + 62, 160, 7);
  }
  ctx.restore();
  // face patch (white) on head
  ell(ctx, f * 14 - 19, cy - 40, 26, 28); ctx.fillStyle = C.belly; ctx.fill();
  ell(ctx, f * 14 + 19, cy - 40, 26, 28); ctx.fill();
  // eyes
  const ex = f * 16, eyY = cy - 42;
  const eyes = p.eyes || 'n';
  for (const sx of [-1, 1]) {
    const x = ex + sx * 18 - (f !== 0 && Math.sign(sx) !== Math.sign(f) ? f * 3 : 0);
    if (eyes === 'happy' || (eyes === 'wink' && sx === 1) || eyes === 'closed') {
      ctx.strokeStyle = '#1A1A22'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath();
      if (eyes === 'closed') { ctx.moveTo(x - 9, eyY); ctx.lineTo(x + 9, eyY); }
      else ctx.arc(x, eyY + 4, 9, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke(); continue;
    }
    const big = eyes === 'wide' ? 1.25 : 1;
    ell(ctx, x, eyY, 13 * big, 15 * big); ctx.fillStyle = '#fff'; ctx.fill();
    const px = x + f * 3 + (p.look || 0) * 4, pr = eyes === 'wide' ? 6 : 9.5;
    ell(ctx, px, eyY + 1, pr, pr * 1.08); ctx.fillStyle = '#16161D'; ctx.fill();
    ell(ctx, px - 3, eyY - 4, 3.6, 3.6); ctx.fillStyle = '#fff'; ctx.fill();
    ell(ctx, px + 3, eyY + 3, 1.6, 1.6); ctx.fill();
    if (eyes === 'sad') { ctx.strokeStyle = '#1A1A22'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 12, eyY - 18 - sx * 4); ctx.lineTo(x + 12, eyY - 18 + sx * 4); ctx.stroke(); }
    if (eyes === 'angry') { ctx.strokeStyle = '#1A1A22'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - 12, eyY - 20 + sx * 5); ctx.lineTo(x + 12, eyY - 20 - sx * 5); ctx.stroke(); }
  }
  // blush
  if (p.blush !== false) {
    ctx.fillStyle = 'rgba(255,120,140,.45)';
    ell(ctx, ex - 33, cy - 20, 9, 6); ctx.fill(); ell(ctx, ex + 33, cy - 20, 9, 6); ctx.fill();
  }
  // beak / mouth
  const bx = f * 24, by = cy - 20;
  const mouth = p.mouth || 'smile';
  ctx.fillStyle = clay(ctx, bx, by, 18, C.beak);
  if (mouth === 'o') {
    ell(ctx, bx, by - 3, 13, 7); ctx.fill(); ell(ctx, bx, by + 9, 11, 7); ctx.fill();
    ell(ctx, bx, by + 3, 7, 5); ctx.fillStyle = '#7A2E2E'; ctx.fill();
  } else if (mouth === 'grin' || mouth === 'shout') {
    ctx.beginPath(); ctx.moveTo(bx - 15, by - 4); ctx.quadraticCurveTo(bx, by - 14, bx + 15, by - 4);
    ctx.quadraticCurveTo(bx, by + (mouth === 'shout' ? 22 : 14), bx - 15, by - 4); ctx.fill();
    ctx.fillStyle = '#7A2E2E'; ctx.beginPath(); ctx.moveTo(bx - 10, by - 1); ctx.quadraticCurveTo(bx, by + (mouth === 'shout' ? 16 : 8), bx + 10, by - 1); ctx.fill();
  } else {
    ctx.beginPath(); ctx.moveTo(bx - 14, by - 4); ctx.quadraticCurveTo(bx, by - 13, bx + 14, by - 4);
    ctx.quadraticCurveTo(bx + f * 6, by + (mouth === 'sad' ? 8 : 12), bx - 14, by - 4); ctx.fill();
  }
  // headgear
  const top = cy - BH / 2;
  if (p.helmet || p.cap) {
    const col = p.helmet ? C.navy : (team === 'ump' ? '#15161B' : team === 'host' ? C.navy : C.redCap);
    ctx.save();
    ctx.beginPath(); ctx.ellipse(0, top + 34, 58, 40, 0, Math.PI, 0); ctx.closePath();
    ctx.fillStyle = clay(ctx, -12, top + 20, 70, col); ctx.fill();
    // brim
    ctx.beginPath();
    const d = f === 0 ? 0 : f;
    if (d === 0) { ell(ctx, 0, top + 36, 56, 10); }
    else { ctx.ellipse(d * 46, top + 35, 40, 9, 0, 0, Math.PI * 2); }
    ctx.fillStyle = shade(col, -.15); ctx.fill();
    if (p.helmet) { // ear flap
      ell(ctx, (-d * 46) || -50, top + 42, 16, 18); ctx.fillStyle = col; ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ell(ctx, -22, top + 8, 15, 6, -.4); ctx.fill();
    } else {
      ctx.fillStyle = shade(col, .25); ell(ctx, 0, top - 4, 7, 5); ctx.fill();
    }
    ctx.restore();
  }
  if (p.mask) { // umpire / catcher mask
    ctx.save(); ctx.strokeStyle = '#111'; ctx.lineWidth = 6; ctx.globalAlpha *= .9;
    ctx.lineWidth = 4.5; rr(ctx, ex - 44, cy - 66, 88, 70, 22); ctx.stroke();
    ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(ex - 44, cy - 24); ctx.lineTo(ex + 44, cy - 24);
    ctx.moveTo(ex - 40, cy - 6); ctx.lineTo(ex + 40, cy - 6); ctx.moveTo(ex, cy - 66); ctx.lineTo(ex, cy + 4); ctx.stroke(); ctx.restore();
  }
  if (p.headset) {
    ctx.save(); ctx.strokeStyle = '#222'; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.arc(0, top + 50, 64, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
    ell(ctx, -60, top + 62, 11, 16); ctx.fillStyle = '#222'; ctx.fill();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-58, top + 74); ctx.quadraticCurveTo(-48, cy - 10, bx - 18, by + 6); ctx.stroke();
    ell(ctx, bx - 18, by + 6, 7, 6); ctx.fillStyle = '#333'; ctx.fill(); ctx.restore();
  }
  if (p.sweat) {
    ctx.fillStyle = '#7FD3FF';
    for (let i = 0; i < 2; i++) { const xx = (i ? 58 : -58), yy = top + 50 + i * 12;
      ctx.beginPath(); ctx.moveTo(xx, yy - 14); ctx.quadraticCurveTo(xx + 9, yy + 2, xx, yy + 6); ctx.quadraticCurveTo(xx - 9, yy + 2, xx, yy - 14); ctx.fill(); }
  }
  // flippers
  const flip = (side, ang) => {
    ctx.save(); ctx.translate(side * 56, cy - 4); ctx.rotate(-side * ang);
    // flipper points down (0,+) by default
    ctx.beginPath(); ctx.ellipse(side * 6, 42, 15, 46, side * -.12, 0, Math.PI * 2);
    ctx.fillStyle = clay(ctx, 0, 30, 50, team === 'blue' ? C.sky : team === 'red' ? C.red : team === 'ump' ? C.ump : C.body); ctx.fill();
    ell(ctx, side * 8, 70, 13, 22, side * -.12); ctx.fillStyle = clay(ctx, side * 8, 66, 24, C.body); ctx.fill();
    const tipX = side * 10, tipY = 88;
    if (p.glove === (side < 0 ? 'L' : 'R')) {
      ell(ctx, tipX, tipY, 27, 25); ctx.fillStyle = clay(ctx, tipX, tipY, 28, C.glove); ctx.fill();
      ctx.strokeStyle = C.gloveDark; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(tipX, tipY, 15, .2, 2.6); ctx.stroke();
    }
    if (p.ball === (side < 0 ? 'L' : 'R')) drawBall(ctx, tipX, tipY + (p.glove === (side < 0 ? 'L' : 'R') ? -6 : 4), 13);
    if (p.bat && side > 0) {
      ctx.save(); ctx.translate(tipX, tipY); ctx.rotate(p.bat);
      ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-11, -150); ctx.quadraticCurveTo(0, -162, 11, -150); ctx.lineTo(5, 0); ctx.closePath();
      ctx.fillStyle = '#E2B377'; ctx.fill(); ctx.strokeStyle = '#A9773D'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    }
    if (p.bottle === (side < 0 ? 'L' : 'R')) {
      ctx.save(); ctx.translate(tipX, tipY); ctx.rotate(-side * .6);
      rr(ctx, -12, -40, 24, 50, 8); ctx.fillStyle = 'rgba(80,190,255,.85)'; ctx.fill();
      ctx.fillStyle = '#1F6FB5'; ctx.fillRect(-8, -50, 16, 12); ctx.restore();
    }
    ctx.restore();
  };
  flip(-1, p.armL || 0);
  flip(1, p.armR || 0);
  if (p.board) { // host whiteboard held at right
    ctx.save(); ctx.translate(120, cy - 30); ctx.rotate(.06);
    rr(ctx, -10, -120, 240, 170, 16); ctx.fillStyle = '#FFFFFF'; ctx.fill();
    ctx.lineWidth = 9; ctx.strokeStyle = '#9AA6B8'; ctx.stroke();
    if (p.boardText) {
      ctx.fillStyle = p.boardColor || C.balk; ctx.font = `900 ${p.boardSize || 86}px Pretendard`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(p.boardText, 110, -32);
    }
    ctx.restore();
  }
  ctx.restore();
}

// ---------- Text ----------
// markup: *highlight*
function parseMarkup(s) {
  const out = []; let hl = false;
  for (const part of s.split('*')) { if (part) out.push({ t: part, hl }); hl = !hl; }
  return out;
}
function drawRichLine(ctx, line, x, y, size, opts = {}) {
  const segs = parseMarkup(line);
  ctx.font = `${opts.weight || 900} ${size}px Pretendard`;
  const widths = segs.map(s => ctx.measureText(s.t).width);
  const total = widths.reduce((a, b) => a + b, 0);
  let cx = x - (opts.align === 'left' ? 0 : total / 2);
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  if (opts.stroke !== false) {
    ctx.lineWidth = opts.strokeW || size * .2; ctx.strokeStyle = opts.strokeColor || '#0B0E16';
    let sx = cx; segs.forEach((s, i) => { ctx.strokeText(s.t, sx, y); sx += widths[i]; });
  }
  let sx = cx; segs.forEach((s, i) => { ctx.fillStyle = s.hl ? (opts.hlColor || C.skyHi) : (opts.color || '#FFFFFF'); ctx.fillText(s.t, sx, y); sx += widths[i]; });
  return total;
}
function fitSize(ctx, lines, size, maxW, weight = 900) {
  for (let s = size; s > 30; s -= 2) {
    ctx.font = `${weight} ${s}px Pretendard`;
    if (lines.every(l => ctx.measureText(l.replace(/\*/g, '')).width <= maxW)) return s;
  }
  return 30;
}

// ---------- Stamp ----------
function drawStamp(ctx, text, x, y, t, color, size = 1) { // t: seconds since stamp
  if (t < 0) return;
  const u = clamp(t / .22);
  const sc = lerp(2.4, 1, eout(u)) * size, a = clamp(t / .08);
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.18); ctx.scale(sc, sc); ctx.globalAlpha = a;
  ctx.font = `900 92px Pretendard`; const w = ctx.measureText(text).width + 70;
  ctx.fillStyle = 'rgba(255,255,255,.88)'; rr(ctx, -w / 2, -66, w, 132, 24); ctx.fill();
  ctx.lineWidth = 11; ctx.strokeStyle = color; rr(ctx, -w / 2, -66, w, 132, 24); ctx.stroke();
  ctx.lineWidth = 4; rr(ctx, -w / 2 + 13, -53, w - 26, 106, 16); ctx.stroke();
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4);
  ctx.restore();
  // impact ring
  if (t < .45) {
    ctx.save(); ctx.globalAlpha = (1 - t / .45) * .6; ctx.strokeStyle = color; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.arc(x, y, 90 + t * 420, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
}

function drawArrow(ctx, pts, prog, color, width = 16, head = 34) {
  // pts: polyline; prog 0..1 drawn portion
  if (prog <= 0) return;
  const L = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let rem = tot * prog; const path = [pts[0]]; let end = pts[0], dir = [1, 0];
  for (let i = 1; i < pts.length && rem > 0; i++) {
    const d = L[i - 1], k = Math.min(1, rem / d);
    end = [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)];
    dir = [(pts[i][0] - pts[i - 1][0]) / d, (pts[i][1] - pts[i - 1][1]) / d];
    path.push(end); rem -= d;
  }
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const pass of [0, 1]) {
    ctx.strokeStyle = pass ? color : 'rgba(0,0,0,.35)'; ctx.lineWidth = pass ? width : width + 8;
    ctx.beginPath(); path.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    const tip = [end[0] - dir[0] * head * .6, end[1] - dir[1] * head * .6];
    ctx.lineTo(tip[0], tip[1]); ctx.stroke();
    ctx.fillStyle = pass ? color : 'rgba(0,0,0,.35)';
    const hx = end[0] + dir[0] * (pass ? 0 : 5), hy = end[1] + dir[1] * (pass ? 0 : 5), hs = head + (pass ? 0 : 8);
    ctx.beginPath(); ctx.moveTo(hx, hy);
    ctx.lineTo(hx - dir[0] * hs - dir[1] * hs * .6, hy - dir[1] * hs + dir[0] * hs * .6);
    ctx.lineTo(hx - dir[0] * hs + dir[1] * hs * .6, hy - dir[1] * hs - dir[0] * hs * .6); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

function bubble(ctx, text, x, y, t, opts = {}) { // speech/shout bubble pointing down-left
  if (t < 0) return;
  const sc = eback(clamp(t / .25)); if (sc <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.font = `900 ${opts.size || 64}px Pretendard`; const w = ctx.measureText(text).width + 60, h = (opts.size || 64) + 44;
  ctx.fillStyle = opts.bg || '#FFFFFF'; ctx.strokeStyle = '#0B0E16'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
  ctx.moveTo(-w * .18 * (opts.tail || 1), h / 2 - 2); ctx.lineTo(-w * .32 * (opts.tail || 1), h / 2 + 34); ctx.lineTo(-w * .02 * (opts.tail || 1), h / 2 - 2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = opts.bg || '#FFFFFF'; ctx.fillRect(-w * .3, h / 2 - 9, w * .3, 8);
  ctx.fillStyle = opts.color || '#0B0E16'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3);
  ctx.restore();
}

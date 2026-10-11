import { useEffect, useRef } from 'react';
import { canHover, prefersReducedMotion } from '../lib/motion';

/**
 * 히어로 배경: 경기장 조명탑에서 쏟아지는 빛을 표현한 WebGL 셰이더.
 * - 외부 라이브러리 없이 전체 화면 사각형 하나만 그립니다.
 * - 화면 밖이거나 탭이 숨겨지면 렌더링을 멈춥니다.
 * - prefers-reduced-motion 이면 한 프레임만 그립니다.
 * - WebGL 을 쓸 수 없으면 CSS 그라디언트(.floodlight__fallback)가 대신 보입니다.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform vec3 uAccent;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// 원점에서 아래쪽으로 퍼지는 빛줄기
float beam(vec2 p, vec2 o, float ang, float width, float t) {
  vec2 d = p - o;
  float a = atan(d.x, -d.y);
  float diff = abs(a - ang);
  float cone = smoothstep(width, 0.0, diff);
  float streak = 0.82 + 0.18 * sin(a * 90.0 + t * 1.3) * sin(a * 37.0 - t * 0.7);
  float fall = exp(-length(d) * 0.62);
  return cone * cone * streak * fall;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float ar = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * ar, uv.y);
  float t = uTime;
  vec2 m = (uMouse - 0.5);

  vec2 oL = vec2(-0.5 * ar - 0.05, 1.18);
  vec2 oR = vec2(0.5 * ar + 0.05, 1.18);

  float b = 0.0;
  b += beam(p, oL, 0.62 + sin(t * 0.21) * 0.07 + m.x * 0.12, 0.10, t) * 1.15;
  b += beam(p, oL, 0.92 + sin(t * 0.17 + 1.3) * 0.06 + m.x * 0.08, 0.07, t) * 0.75;
  b += beam(p, oR, -0.66 + sin(t * 0.19 + 2.1) * 0.07 + m.x * 0.12, 0.10, t) * 1.05;
  b += beam(p, oR, -0.95 + sin(t * 0.23 + 0.4) * 0.05 + m.x * 0.08, 0.06, t) * 0.65;

  // 공기 중 먼지와 안개
  float haze = noise(p * 3.0 + vec2(t * 0.05, -t * 0.03)) * 0.55 + noise(p * 9.0 - t * 0.08) * 0.25;
  float dust = step(0.9965, hash(floor(gl_FragCoord.xy / 2.0) + floor(t * 6.0))) * b * 3.0;

  // 바닥의 피치 글로우
  float pitch = smoothstep(0.42, 0.0, uv.y) * 0.22 * (0.7 + 0.3 * noise(vec2(p.x * 2.0, t * 0.1)));

  vec3 col = uInk;
  vec3 light = mix(uPaper, uAccent, 0.18);
  col += light * b * (0.42 + haze * 0.45);
  col += uAccent * pitch * 0.35;
  col += light * dust;

  // 조명탑 광원
  float glowL = exp(-length(p - oL) * 6.0) * 1.4;
  float glowR = exp(-length(p - oR) * 6.0) * 1.4;
  col += light * (glowL + glowR);

  // 비네팅 + 필름 그레인
  float vig = smoothstep(1.25, 0.25, length((uv - vec2(0.5, 0.55)) * vec2(ar * 0.8, 1.0)));
  col *= mix(0.55, 1.0, vig);
  col += (hash(gl_FragCoord.xy + fract(t) * 100.0) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}
`;

function cssColor(name: string): [number, number, number] {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = v.replace('#', '');
  if (hex.length !== 6) return [0, 0, 0];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
}

export function FloodlightCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes');
    const uTime = u('uTime');
    const uMouse = u('uMouse');
    const uInk = u('uInk');
    const uPaper = u('uPaper');
    const uAccent = u('uAccent');

    const setColors = () => {
      gl.uniform3fv(uInk, cssColor('--ink'));
      gl.uniform3fv(uPaper, cssColor('--paper'));
      gl.uniform3fv(uAccent, cssColor('--accent'));
    };
    setColors();

    const narrow = window.matchMedia('(max-width: 860px)').matches;
    const dprCap = narrow ? 1 : 1.5;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr * (narrow ? 0.75 : 1)));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr * (narrow ? 0.75 : 1)));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    resize();

    let mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    if (canHover()) window.addEventListener('pointermove', onMove, { passive: true });

    const reduce = prefersReducedMotion();
    let visible = true;
    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      mouse = { x: mouse.x + (target.x - mouse.x) * 0.04, y: mouse.y + (target.y - mouse.y) * 0.04 };
      gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      draw(now);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (reduce) {
        draw(performance.now());
        return;
      }
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) kick();
    });
    ro.observe(canvas);
    const onVis = () => kick();
    document.addEventListener('visibilitychange', onVis);
    const onDirection = () => {
      setColors();
      kick();
    };
    window.addEventListener('meister:direction', onDirection);
    canvas.classList.add('is-ready');
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('meister:direction', onDirection);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div className="floodlight" aria-hidden="true">
      <div className="floodlight__fallback" />
      <canvas ref={ref} className="floodlight__canvas" />
    </div>
  );
}

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion';

/** 스크롤 속도에 반응하는 무한 띠. 화면 밖에서는 멈춥니다. */
export function Marquee({ children, speed = 60, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const host = root.current;
    if (!el || !host || prefersReducedMotion()) return;
    let x = 0;
    let boost = 0;
    let dir = -1;
    let visible = false;
    const half = () => el.scrollWidth / 2;
    const st = ScrollTrigger.create({
      trigger: host,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity();
        dir = v < 0 ? 1 : -1;
        boost = Math.min(Math.abs(v) / 18, 220);
      },
      onToggle: (self) => (visible = self.isActive),
    });
    const tick = (_t: number, dt: number) => {
      if (!visible) return;
      const w = half();
      if (!w) return;
      x += (dir * (speed + boost) * dt) / 1000;
      boost *= 0.92;
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [speed]);

  return (
    <div className={`marquee ${className}`} ref={root}>
      <div className="marquee__track" ref={track}>
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

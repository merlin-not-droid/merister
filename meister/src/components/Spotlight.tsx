import { createElement, useEffect, useRef, type ReactNode } from 'react';
import { canHover, prefersReducedMotion } from '../lib/motion';

type Props = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
  /** 3D 기울기(도). 0 이면 기울이지 않습니다. */
  tilt?: number;
};

/** 포인터 위치를 따라가는 조명(--mx/--my)과 선택적 3D 기울기 */
export function Spotlight({ children, className = '', as = 'div', tilt = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const reduce = prefersReducedMotion();
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${x - r.left}px`);
      el.style.setProperty('--my', `${y - r.top}px`);
      if (tilt && !reduce) {
        const px = (x - r.left) / r.width - 0.5;
        const py = (y - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', `${(-py * tilt).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(px * tilt).toFixed(2)}deg`);
      }
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [tilt]);

  return createElement(as, { ref, className: `spotlight ${tilt ? 'spotlight--tilt' : ''} ${className}` }, children);
}

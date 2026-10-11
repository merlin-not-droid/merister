import { useEffect, useRef } from 'react';
import { scrollToTarget } from '../lib/SmoothScroll';

/**
 * 스크롤 진행률을 경기 시간(00:00 → 90:00)으로 보여주는 작은 스코어보드.
 * 페이지 끝에 닿으면 FULL TIME 으로 바뀝니다. 누르면 맨 위(킥오프)로 이동합니다.
 */
export function MatchClock() {
  const time = useRef<HTMLSpanElement>(null);
  const half = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const total = Math.round(p * 90 * 60);
      const mm = String(Math.floor(total / 60)).padStart(2, '0');
      const ss = String(total % 60).padStart(2, '0');
      const ft = p > 0.995;
      if (time.current) time.current.textContent = ft ? '90:00' : `${mm}:${ss}`;
      if (half.current) half.current.textContent = ft ? 'FULL TIME' : p < 0.5 ? '1ST HALF' : '2ND HALF';
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      root.current?.classList.toggle('is-ft', ft);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button ref={root} type="button" className="clock" onClick={() => scrollToTarget(0)} aria-label="페이지 진행률. 누르면 맨 위로 이동">
      <span className="clock__dot" aria-hidden="true" />
      <span className="clock__time" ref={time} aria-hidden="true">
        00:00
      </span>
      <span className="clock__half" ref={half} aria-hidden="true">
        1ST HALF
      </span>
      <span className="clock__bar" aria-hidden="true">
        <span ref={bar} />
      </span>
    </button>
  );
}

import { createElement, useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/** 스크롤에 맞춰 단어가 하나씩 밝아지는 문단 */
export function ScrollWords({ text, as = 'p', className = '' }: { text: string; as?: 'p' | 'h2' | 'div'; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll('.sw__w');
    const tween = gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.6 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  const parts = text.split(/(\*[^*]+\*|\s+)/g).filter(Boolean);
  return createElement(
    as,
    { ref, className: `sw ${className}` },
    parts.map((p, i) => {
      if (/^\s+$/.test(p)) return ' ';
      const em = p.startsWith('*') && p.endsWith('*');
      const word = em ? p.slice(1, -1) : p;
      return (
        <span key={i} className={`sw__w ${em ? 'sw__w--em' : ''}`}>
          {word}
        </span>
      );
    }),
  );
}

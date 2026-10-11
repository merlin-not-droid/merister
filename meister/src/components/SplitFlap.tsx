import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * 경기장 전광판(스플릿 플랩) 스타일로 단어를 순환합니다.
 * 스크린리더에는 전체 단어 목록을 한 번에 읽어 주고, 애니메이션 셀은 숨깁니다.
 */
export function SplitFlap({ words, interval = 2800, label }: { words: string[]; interval?: number; label: string }) {
  const width = Math.max(...words.map((w) => w.length));
  const pad = (w: string) => w.padEnd(width, ' ');
  const [chars, setChars] = useState<string[]>(() => pad(words[0]).split(''));
  const [flipping, setFlipping] = useState<boolean[]>(() => Array(width).fill(false));
  const idx = useRef(0);
  const host = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const timers: number[] = [];
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (host.current) io.observe(host.current);

    const step = () => {
      if (!visible || document.hidden) return;
      idx.current = (idx.current + 1) % words.length;
      const target = pad(words[idx.current]).split('');
      if (reduce) {
        setChars(target);
        return;
      }
      target.forEach((finalChar, i) => {
        const spins = 2 + ((i * 7) % 4);
        for (let s = 0; s <= spins; s++) {
          timers.push(
            window.setTimeout(() => {
              const c = s === spins ? finalChar : GLYPHS[(i * 13 + s * 7 + idx.current * 3) % GLYPHS.length];
              setChars((prev) => {
                const next = [...prev];
                next[i] = c;
                return next;
              });
              setFlipping((prev) => {
                const next = [...prev];
                next[i] = s !== spins;
                return next;
              });
            }, i * 45 + s * 70),
          );
        }
      });
    };
    const id = window.setInterval(step, interval);
    return () => {
      window.clearInterval(id);
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, [interval, words.join('|')]);

  return (
    <span className="flap" ref={host}>
      <span className="sr-only">
        {label} {words.join(', ')}
      </span>
      <span className="flap__row" aria-hidden="true">
        {chars.map((c, i) => (
          <span key={i} className={`flap__cell ${flipping[i] ? 'is-flipping' : ''} ${c === ' ' ? 'is-blank' : ''}`}>
            <span className="flap__char">{c === ' ' ? ' ' : c}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

import { createElement, Fragment, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useInView } from '../lib/useInView';

type Props = {
  /** 줄바꿈은 \n 으로 구분합니다. *강조* 표기는 <em> 으로 렌더링됩니다. */
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  /** 'mount' = 마운트 직후 재생 (첫 화면), 'view' = 화면에 들어올 때 재생 */
  trigger?: 'mount' | 'view';
  delay?: number;
  stagger?: number;
  id?: string;
};

/**
 * 단어 단위 마스크 리빌. CSS transition 만 사용해 SSR 결과와 동일한 마크업을 유지합니다.
 * JS 가 없으면(html:not(.js)) 텍스트는 처음부터 보입니다.
 */
export function SplitText({ text, as = 'span', className = '', trigger = 'view', delay = 0, stagger = 0.045, id }: Props) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (trigger !== 'mount') return;
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, [trigger]);

  const active = trigger === 'mount' ? mounted : inView;
  let i = 0;

  const lines = text.split('\n').map((line, li) => {
    const tokens = line.split(/(\*[^*]+\*)/g).filter(Boolean);
    const words: ReactNode[] = [];
    tokens.forEach((tok, ti) => {
      const em = tok.startsWith('*') && tok.endsWith('*');
      const raw = em ? tok.slice(1, -1) : tok;
      raw.split(/(\s+)/).forEach((w, wi) => {
        if (!w) return;
        if (/^\s+$/.test(w)) {
          words.push(' ');
          return;
        }
        const style = { '--i': i++ } as CSSProperties;
        const inner = (
          <span className="split__w" key={`${ti}-${wi}`}>
            <span className="split__i" style={style}>
              {w}
            </span>
          </span>
        );
        words.push(em ? <em key={`e${ti}-${wi}`}>{inner}</em> : inner);
      });
    });
    return (
      <span className="split__line" key={li}>
        {words.map((w, k) => (
          <Fragment key={k}>{w}</Fragment>
        ))}
      </span>
    );
  });

  return createElement(
    as,
    {
      ref,
      id,
      className: `split ${active ? 'is-in' : ''} ${className}`,
      style: { '--split-delay': `${delay}s`, '--split-stagger': `${stagger}s` } as CSSProperties,
    },
    lines,
  );
}

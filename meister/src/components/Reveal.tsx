import { createElement, type CSSProperties, type ReactNode } from 'react';
import { useInView } from '../lib/useInView';

type Props = {
  children: ReactNode;
  as?: 'div' | 'section' | 'li' | 'p' | 'article' | 'span' | 'header' | 'figure';
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
};

/** 화면에 들어오면 아래에서 떠오르는 기본 리빌 */
export function Reveal({ children, as = 'div', className = '', delay = 0, y = 28, id }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      className: `reveal ${inView ? 'is-in' : ''} ${className}`,
      style: { '--reveal-delay': `${delay}s`, '--reveal-y': `${y}px` } as CSSProperties,
    },
    children,
  );
}

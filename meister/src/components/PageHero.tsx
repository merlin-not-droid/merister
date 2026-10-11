import type { ReactNode } from 'react';
import { SplitText } from './SplitText';

/** 하위 페이지 공통 상단 영역 */
export function PageHero({ eyebrow, en, title, lead, children }: { eyebrow: string; en: string; title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="phero surface-ink grain" aria-labelledby="page-title">
      <div className="phero__lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container phero__inner">
        <p className="eyebrow hero__fade" style={{ ['--d' as string]: '0.05s' }}>
          {eyebrow}
        </p>
        <SplitText as="p" trigger="mount" className="phero__en display" text={en} delay={0.1} stagger={0.06} />
        <SplitText as="h1" id="page-title" trigger="mount" className="phero__title" text={title} delay={0.35} />
        {lead && (
          <div className="phero__lead lead hero__fade" style={{ ['--d' as string]: '0.6s' }}>
            {lead}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

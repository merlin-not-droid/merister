import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../components/Magnetic';
import { Pending } from '../components/Pending';
import { SplitText } from '../components/SplitText';
import { site } from '../content/site';
import { canHover } from '../lib/motion';

/** 페이지 하단 공통 협업 문의 영역 */
export function CtaBand({ title = "Let's Play\n*Together.*", text = '함께 만들 경기가 있다면, 먼저 이야기해 주세요. 아직 정리되지 않은 아이디어여도 괜찮습니다.' }: { title?: string; text?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', `${x - r.left}px`);
      el.style.setProperty('--cy', `${y - r.top}px`);
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="cta surface-ink grain" aria-labelledby="cta-title">
      <div className="cta__glow" aria-hidden="true" />
      <div className="container cta__inner">
        <SplitText as="h2" id="cta-title" className="cta__title display" text={title} stagger={0.08} />
        <div className="cta__row">
          <p className="cta__text">{text}</p>
          <Magnetic strength={0.4} className="cta__magnet">
            <Link to="/contact" className="cta__button">
              <span>협업 문의</span>
              <span className="mono">Contact</span>
            </Link>
          </Magnetic>
        </div>
        <p className="cta__mail mono">
          {site.email ? (
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          ) : (
            <Pending label="대표 이메일 주소" />
          )}
        </p>
      </div>
    </section>
  );
}

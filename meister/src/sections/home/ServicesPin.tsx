import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ServiceScene } from '../../components/ServiceScene';
import { SplitText } from '../../components/SplitText';
import { services } from '../../content/services';
import { gsap, ScrollTrigger } from '../../lib/motion';
import { scrollToTarget } from '../../lib/SmoothScroll';

/**
 * 데스크톱: 섹션이 고정된 채로 스크롤에 따라 서비스 3개가 전환됩니다.
 * 모바일·태블릿: 서비스가 세로로 순서대로 쌓입니다.
 */
export function ServicesPin() {
  const pin = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1025px)', () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const i = Math.min(services.length - 1, Math.floor(self.progress * services.length));
          setActive((prev) => (prev === i ? prev : i));
          if (bar.current) bar.current.style.transform = `scaleY(${self.progress})`;
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);

  const goTo = (i: number) => {
    const el = pin.current;
    if (!el) return;
    if (window.matchMedia('(min-width: 1025px)').matches) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - window.innerHeight;
      scrollToTarget(top + span * ((i + 0.5) / services.length));
    } else {
      scrollToTarget(`#svc-${services[i].id}`);
    }
  };

  return (
    <section className="svc surface-ink" aria-labelledby="svc-title">
      <div className="container section-head svc__head">
        <p className="eyebrow">What we do</p>
        <SplitText as="h2" id="svc-title" className="h2" text={'세 가지 일을,\n한 팀이 끝까지.'} />
      </div>

      <div className="svc__pin" ref={pin} style={{ ['--n' as string]: services.length }}>
        <div className="svc__sticky">
          <div className="container svc__frame">
            <nav className="svc__steps" aria-label="서비스 바로가기">
              <span className="svc__rail" aria-hidden="true">
                <span ref={bar} />
              </span>
              {services.map((s, i) => (
                <button key={s.id} type="button" className={`svc__step ${i === active ? 'is-active' : ''}`} onClick={() => goTo(i)} aria-current={i === active}>
                  <span className="mono">{s.no}</span>
                  <span>{s.en}</span>
                </button>
              ))}
            </nav>

            <div className="svc__stack">
              {services.map((s, i) => (
                <article
                  key={s.id}
                  id={`svc-${s.id}`}
                  className={`svc__item ${i === active ? 'is-active' : ''} ${i < active ? 'is-past' : ''}`}
                  aria-labelledby={`svc-${s.id}-title`}
                >
                  <div className="svc__text">
                    <p className="svc__no display" aria-hidden="true">
                      {s.no}
                    </p>
                    <p className="svc__en mono">{s.en}</p>
                    <h3 id={`svc-${s.id}-title`} className="svc__title">
                      {s.ko}
                    </h3>
                    <p className="svc__short">{s.short}</p>
                    <p className="svc__summary">{s.summary}</p>
                    <ul role="list" className="svc__deliv">
                      {s.deliverables.slice(0, 4).map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <Link to={`/services#${s.id}`} className="link-arrow">
                      업무 범위와 산출물 보기 <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="svc__visual">
                    <ServiceScene id={s.id} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

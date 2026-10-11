import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../components/Button';
import { FloodlightCanvas } from '../../components/FloodlightCanvas';
import { Magnetic } from '../../components/Magnetic';
import { SplitFlap } from '../../components/SplitFlap';
import { SplitText } from '../../components/SplitText';
import { services } from '../../content/services';
import { site } from '../../content/site';

export function Hero() {
  return (
    <section className="hero surface-ink grain" aria-labelledby="hero-title">
      <FloodlightCanvas />
      <div className="hero__inner container">
        <div className="hero__meta">
          <p className="eyebrow hero__fade" style={{ ['--d' as string]: '0.1s' }}>
            Sports Marketing Agency · {site.location}
          </p>
          <ol className="hero__index hero__fade" role="list" style={{ ['--d' as string]: '0.2s' }}>
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`}>
                  <span className="mono">{s.no}</span> {s.en}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <SplitText as="p" trigger="mount" className="hero__slogan display" text={'From the Field,\n*For the Brand.*'} delay={0.15} stagger={0.07} />

        <div className="hero__board hero__fade" style={{ ['--d' as string]: '0.9s' }}>
          <span className="hero__board-label mono">We plan</span>
          <SplitFlap label="Meister가 기획하는 일:" words={['SPONSORSHIPS', 'MATCHDAYS', 'FAN EVENTS', 'ATHLETES', 'SECOND HALF']} />
        </div>

        <div className="hero__bottom">
          <SplitText as="h1" id="hero-title" trigger="mount" className="hero__title" text={'스포츠의 감동을,\n브랜드의 경험으로.'} delay={0.55} stagger={0.06} />
          <div className="hero__side">
            <p className="hero__lead hero__fade" style={{ ['--d' as string]: '1.05s' }}>
              Meister는 스폰서십, 스포츠 이벤트, 선수 매니지먼트를 기획하고 실행하는 스포츠 마케팅 에이전시입니다. 경기장의 흐름을 이해하고,
              브랜드의 목표에서 출발합니다.
            </p>
            <div className="hero__ctas hero__fade" style={{ ['--d' as string]: '1.2s' }}>
              <Magnetic>
                <ButtonLink to="/contact">협업 문의하기</ButtonLink>
              </Magnetic>
              <ButtonLink to="/services" variant="ghost">
                서비스 살펴보기
              </ButtonLink>
            </div>
          </div>
        </div>

        <a href="#manifesto" className="hero__cue hero__fade" style={{ ['--d' as string]: '1.4s' }}>
          <span className="mono">Kick-off</span>
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

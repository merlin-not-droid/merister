import { ArrowRight, Building2, Medal, Trophy } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../components/Button';
import { Spotlight } from '../../components/Spotlight';
import { SplitText } from '../../components/SplitText';
import { audiences } from '../../content/audiences';
import { serviceById } from '../../content/services';

const icons = { brand: Building2, club: Trophy, athlete: Medal } as const;

export function Audience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const a = audiences[active];

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + audiences.length) % audiences.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="section audience surface-paper" aria-labelledby="audience-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Who are you?</p>
          <SplitText as="h2" id="audience-title" className="h2" text={'어떤 협업을\n찾고 계신가요?'} />
          <p className="lead section-head__lead">자신에게 해당하는 항목을 고르면, 필요한 서비스와 문의 방법을 바로 안내합니다.</p>
        </div>

        <div className="audience__grid">
          <div className="audience__tabs" role="tablist" aria-label="방문자 유형" aria-orientation="vertical" onKeyDown={onKey}>
            {audiences.map((item, i) => {
              const Icon = icons[item.id];
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`${uid}-panel`}
                  tabIndex={i === active ? 0 : -1}
                  className={`audience__tab ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  <span>
                    <strong>{item.who}</strong>
                    <small>{item.quote}</small>
                  </span>
                  <ArrowRight className="audience__tab-arrow" size={18} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <Spotlight className="audience__panel surface-ink" tilt={0}>
            <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} key={a.id} className="audience__panel-inner">
              <p className="audience__quote display">“{a.quote}”</p>
              <div className="audience__cols">
                <div>
                  <h3 className="audience__h mono">이런 고민이 있다면</h3>
                  <ul role="list" className="audience__list">
                    {a.needs.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="audience__h mono">추천 서비스</h3>
                  <ul role="list" className="audience__services">
                    {a.services.map((id) => {
                      const s = serviceById(id)!;
                      return (
                        <li key={id}>
                          <Link to={`/services#${id}`}>
                            <span className="mono">{s.no}</span>
                            <span>{s.ko}</span>
                            <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="audience__cta">
                <ButtonLink to={`/contact?from=${a.id}&service=${a.services[0]}`}>이 내용으로 문의하기</ButtonLink>
              </div>
            </div>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}

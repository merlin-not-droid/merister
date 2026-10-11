import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ButtonLink } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { ProposalTag } from '../components/Pending';
import { Reveal } from '../components/Reveal';
import { ServiceScene } from '../components/ServiceScene';
import { services } from '../content/services';
import { scrollToTarget } from '../lib/SmoothScroll';
import { CtaBand } from '../sections/CtaBand';

const faqs = [
  { q: '예산이 정해지지 않아도 문의할 수 있나요?', a: '네. 목표와 일정만 알려주셔도 됩니다. 첫 미팅에서 가능한 범위와 예산 구간을 함께 정리합니다.' },
  { q: '한 가지 서비스만 맡길 수도 있나요?', a: '네. 스폰서십 제안서 정비, 하루짜리 이벤트 운영처럼 일부 업무만 의뢰하실 수 있습니다.' },
  { q: '진행 과정은 어떻게 공유되나요?', a: '단계별 산출물과 공유 주기를 계약 전에 약속합니다. 진행 중 변경 사항은 바로 알려드립니다.' },
  { q: '‘제안’ 표시가 붙은 업무는 무엇인가요?', a: '방향은 정했지만 자격 요건이나 파트너 협의를 거쳐 범위를 확정할 업무입니다. 문의 시 현재 가능한 범위를 정확히 안내합니다.' },
];

export default function Services() {
  const [active, setActive] = useState<string>(services[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    services.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Services"
        en={'Three Ways\nto *Play.*'}
        title="스폰서십, 이벤트, 선수. 필요한 일부터 함께합니다."
        lead={<p>서비스마다 누구를 위한 일인지, 어떤 문제를 해결하는지, 무엇을 제공하고 무엇을 넘겨드리는지 정리했습니다.</p>}
      />

      <div className="subnav surface-paper">
        <nav className="container subnav__inner" aria-label="서비스 목록">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`subnav__link ${active === s.id ? 'is-active' : ''}`}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault();
                history.replaceState(null, '', `#${s.id}`);
                scrollToTarget(`#${s.id}`);
              }}
            >
              <span className="mono">{s.no}</span> {s.en}
            </a>
          ))}
        </nav>
      </div>

      {services.map((s, idx) => (
        <section key={s.id} id={s.id} className={`section sdetail ${idx % 2 ? 'surface-ink' : 'surface-paper'}`} aria-labelledby={`${s.id}-title`}>
          <div className="container">
            <div className="sdetail__head">
              <p className="sdetail__no display" aria-hidden="true">
                {s.no}
              </p>
              <div>
                <p className="eyebrow">{s.en}</p>
                <h2 id={`${s.id}-title`} className="h2">
                  {s.ko}
                </h2>
                <p className="lead sdetail__summary">{s.summary}</p>
              </div>
            </div>

            <div className="sdetail__grid">
              <Reveal className="sdetail__visual">
                <ServiceScene id={s.id} />
              </Reveal>

              <div className="sdetail__blocks">
                <Reveal className="sblock">
                  <h3 className="sblock__h mono">For · 주요 고객</h3>
                  <ul role="list" className="sblock__list">
                    {s.clients.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal className="sblock" delay={0.05}>
                  <h3 className="sblock__h mono">Problem · 해결하려는 문제</h3>
                  <ul role="list" className="sblock__list sblock__list--q">
                    {s.problems.map((c) => (
                      <li key={c}>“{c}”</li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal className="sblock" delay={0.1}>
                  <h3 className="sblock__h mono">Scope · 제공 업무</h3>
                  <ul role="list" className="sblock__list sblock__list--check">
                    {s.work.map((w) => (
                      <li key={w.text}>
                        <Check size={16} aria-hidden="true" />
                        <span>
                          {w.text} {w.status === 'proposal' && <ProposalTag />}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal className="sblock" delay={0.15}>
                  <h3 className="sblock__h mono">Deliverables · 산출물</h3>
                  <ul role="list" className="sblock__chips">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  {s.note && <p className="sblock__note">※ {s.note}</p>}
                </Reveal>
                <div className="sdetail__cta">
                  <ButtonLink to={`/contact?service=${s.id}`}>{s.en} 문의하기</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section surface-paper faq" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2">
              자주 묻는 질문
            </h2>
          </div>
          <div className="faq__list">
            {faqs.map((f) => (
              <details key={f.q} className="faq__item">
                <summary>
                  <span>{f.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

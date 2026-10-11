import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ButtonLink } from '../components/Button';
import { Pending } from '../components/Pending';
import { ProjectVisual } from '../components/ProjectVisual';
import { Reveal } from '../components/Reveal';
import { SplitText } from '../components/SplitText';
import { serviceById } from '../content/services';
import { kindLabel, projectBySlug, projects } from '../content/work';
import { CtaBand } from '../sections/CtaBand';
import NotFound from './NotFound';

export default function WorkDetail() {
  const { slug = '' } = useParams();
  const p = projectBySlug(slug);
  if (!p) return <NotFound />;
  const k = kindLabel[p.kind];
  const isProposal = p.kind === 'proposal';
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  const blocks: { h: string; items: string[] }[] = [
    { h: isProposal ? 'Meister의 역할 (제안)' : '수행 역할', items: p.role },
    { h: isProposal ? '실행안' : '실행 내용', items: p.execution },
    { h: isProposal ? '기대 효과 (실제 결과 아님)' : '결과', items: p.outcome },
  ];

  return (
    <>
      <section className="wd-hero surface-ink grain" aria-labelledby="page-title">
        <div className="container">
          <Link to="/work" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Work
          </Link>
          <div className="wd-hero__grid">
            <div>
              <p className="wd-hero__tags">
                <span className={`tag tag--${p.kind}`}>{k.ko}</span>
                {p.services.map((s) => (
                  <span key={s} className="tag tag--line">
                    {serviceById(s)?.en}
                  </span>
                ))}
              </p>
              <p className="wd-hero__en mono">{p.en}</p>
              <SplitText as="h1" id="page-title" trigger="mount" className="h1" text={p.title} />
              <p className="lead wd-hero__lead">{p.summary}</p>
            </div>
            <div className="wd-hero__visual">
              <ProjectVisual kind={p.visual} />
            </div>
          </div>
          <p className="wd-hero__notice">
            <strong>{k.ko}</strong> — {k.desc}
          </p>
        </div>
      </section>

      <section className="section surface-paper wd-body" aria-label="프로젝트 상세">
        <div className="container container--narrow">
          <Reveal className="wd-block">
            <h2 className="wd-block__h mono">목적</h2>
            <p className="wd-block__p">{p.purpose}</p>
          </Reveal>
          {blocks.map((b) =>
            b.items.length ? (
              <Reveal key={b.h} className="wd-block">
                <h2 className="wd-block__h mono">{b.h}</h2>
                <ul role="list" className="wd-block__list">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ) : null,
          )}
          {p.pending && (
            <Reveal className="wd-block">
              <h2 className="wd-block__h mono">확정 전 필요한 자료</h2>
              <ul role="list" className="wd-block__list">
                {p.pending.map((it) => (
                  <li key={it}>
                    <Pending label={it} />
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <div className="wd-next">
            <ButtonLink to={`/work/${next.slug}`} variant="ghost">
              다음: {next.title}
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand title={'Make It\n*Real.*'} text="이 제안을 우리 브랜드·구단 상황에 맞게 실행하고 싶다면 알려주세요." />
    </>
  );
}

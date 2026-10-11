import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SplitText } from '../components/SplitText';
import { categoryLabel, insightBySlug, insights } from '../content/insights';
import { CtaBand } from '../sections/CtaBand';
import NotFound from './NotFound';

export default function InsightDetail() {
  const { slug = '' } = useParams();
  const it = insightBySlug(slug);
  if (!it) return <NotFound />;
  const others = insights.filter((i) => i.slug !== it.slug).slice(0, 2);

  return (
    <>
      <section className="art-hero surface-ink grain" aria-labelledby="page-title">
        <div className="container container--narrow">
          <Link to="/insights" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Insights
          </Link>
          <p className="art-hero__meta mono">
            <span>{categoryLabel[it.category]}</span>
            <span>{it.draft ? '초안 · DRAFT' : it.date.replaceAll('-', '.')}</span>
            <span>{it.readMinutes}분</span>
          </p>
          <SplitText as="h1" id="page-title" trigger="mount" className="h1 art-hero__title" text={it.title} />
          <p className="lead art-hero__lead">{it.summary}</p>
        </div>
      </section>
      <article className="section surface-paper art-body">
        <div className="container container--narrow">
          {it.draft && <p className="art-draft">이 글은 공개 전 검토 중인 초안입니다. 내용은 Meister의 관점이며, 인용한 수치나 사례가 있을 경우 출처를 함께 표기합니다.</p>}
          {it.body.map((b, i) => (
            <Reveal key={i} className="art-block">
              {b.heading && <h2 className="art-block__h">{b.heading}</h2>}
              <p>{b.text}</p>
            </Reveal>
          ))}
          {it.sources && it.sources.length > 0 && (
            <div className="art-sources">
              <h2 className="mono">Sources</h2>
              <ul role="list">
                {it.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className="link" target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="art-more">
            <p className="mono">More Insights</p>
            {others.map((o) => (
              <ButtonLink key={o.slug} to={`/insights/${o.slug}`} variant="ghost">
                {o.title}
              </ButtonLink>
            ))}
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}

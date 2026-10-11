import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { SplitText } from '../../components/SplitText';
import { categoryLabel, insights } from '../../content/insights';

export function InsightsPreview() {
  return (
    <section className="section insights-preview surface-paper" aria-labelledby="insights-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Insights</p>
            <SplitText as="h2" id="insights-title" className="h2" text={'경기장 밖에서\n생각한 것들.'} />
          </div>
          <Reveal className="section-head__aside">
            <p className="muted">스포츠 산업의 흐름, 스포츠·브랜드 마케팅 사례, 그리고 Meister의 관점을 정리합니다.</p>
            <ButtonLink to="/insights" variant="ghost">
              모든 글 보기
            </ButtonLink>
          </Reveal>
        </div>
        <ul role="list" className="ilist">
          {insights.slice(0, 3).map((it, i) => (
            <Reveal as="li" key={it.slug} delay={i * 0.06}>
              <Link to={`/insights/${it.slug}`} className="ilist__row">
                <span className="ilist__cat mono">{categoryLabel[it.category]}</span>
                <span className="ilist__title">{it.title}</span>
                <span className="ilist__meta mono">
                  {it.draft ? 'DRAFT' : it.date.replaceAll('-', '.')} · {it.readMinutes} min
                </span>
                <ArrowRight className="ilist__arrow" size={20} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

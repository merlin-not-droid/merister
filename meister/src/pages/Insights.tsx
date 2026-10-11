import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Spotlight } from '../components/Spotlight';
import { categoryLabel, insights, type InsightCategory } from '../content/insights';
import { CtaBand } from '../sections/CtaBand';

const cats: ('all' | InsightCategory)[] = ['all', 'trend', 'case', 'perspective'];

export default function Insights() {
  const [cat, setCat] = useState<'all' | InsightCategory>('all');
  const list = insights.filter((i) => cat === 'all' || i.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        en={'Notes From\n*the Sideline.*'}
        title="경기장 밖에서 생각한 것들."
        lead={<p>스포츠 산업 트렌드, 스포츠·브랜드 마케팅 사례 분석, 그리고 Meister의 관점과 아이디어를 기록합니다.</p>}
      />
      <section className="section surface-paper insights-page" aria-label="인사이트 목록">
        <div className="container">
          <div className="filters" role="group" aria-label="카테고리 필터">
            {cats.map((c) => (
              <button key={c} type="button" className={`filter ${cat === c ? 'is-active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c === 'all' ? '전체' : categoryLabel[c]}
              </button>
            ))}
          </div>
          {list.length ? (
            <div className="icards" aria-live="polite">
              {list.map((it, i) => (
                <Spotlight as="article" key={it.slug} className={`icard ${i === 0 && cat === 'all' ? 'icard--feature' : ''}`}>
                  <Link to={`/insights/${it.slug}`} className="icard__link">
                    <p className="icard__meta mono">
                      <span>{categoryLabel[it.category]}</span>
                      <span>{it.draft ? 'DRAFT' : it.date.replaceAll('-', '.')}</span>
                    </p>
                    <h2 className="icard__title">{it.title}</h2>
                    <p className="icard__sum">{it.summary}</p>
                    <p className="icard__more">
                      읽기 · {it.readMinutes}분 <ArrowRight size={16} aria-hidden="true" />
                    </p>
                  </Link>
                </Spotlight>
              ))}
            </div>
          ) : (
            <div className="empty" aria-live="polite">
              <p className="empty__title display">Coming Soon</p>
              <p>이 카테고리의 첫 글을 준비하고 있습니다.</p>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { kindLabel, projects, type ProjectKind } from '../content/work';
import { CtaBand } from '../sections/CtaBand';

const filters: { id: 'all' | ProjectKind; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'proposal', label: kindLabel.proposal.ko },
  { id: 'founder', label: kindLabel.founder.ko },
  { id: 'company', label: kindLabel.company.ko },
];

export default function Work() {
  const [filter, setFilter] = useState<'all' | ProjectKind>('all');
  const list = projects.filter((p) => filter === 'all' || p.kind === filter);

  return (
    <>
      <PageHero
        eyebrow="Work"
        en={'Honestly\n*Labeled.*'}
        title="실행한 일과 제안한 일을 구분해 보여드립니다."
        lead={<p>Meister는 창업 준비 단계입니다. 회사 명의로 수행한 프로젝트가 생기기 전까지는 자체 기획한 제안 프로젝트와 창업자 개인의 경험을 명확히 나눠 공개합니다.</p>}
      />

      <section className="section surface-paper work-page" aria-label="프로젝트 목록">
        <div className="container">
          <Reveal className="legend">
            {(Object.keys(kindLabel) as ProjectKind[]).map((k) => (
              <div key={k} className="legend__item">
                <span className={`tag tag--${k}`}>{kindLabel[k].ko}</span>
                <p>{kindLabel[k].desc}</p>
              </div>
            ))}
          </Reveal>

          <div className="filters" role="group" aria-label="프로젝트 유형 필터">
            {filters.map((f) => {
              const count = f.id === 'all' ? projects.length : projects.filter((p) => p.kind === f.id).length;
              return (
                <button key={f.id} type="button" className={`filter ${filter === f.id ? 'is-active' : ''}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label} <span className="mono">{count}</span>
                </button>
              );
            })}
          </div>

          {list.length ? (
            <div className="work-grid work-grid--page" aria-live="polite">
              {list.map((p, i) => (
                <div key={p.slug} className="work-grid__item">
                  <ProjectCard project={p} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty" aria-live="polite">
              <p className="empty__title display">Coming Soon</p>
              <p>Meister 명의의 첫 프로젝트를 준비하고 있습니다. 프로젝트가 완료되면 목적, 역할, 실행 내용, 결과를 이곳에 공개합니다.</p>
            </div>
          )}
        </div>
      </section>

      <CtaBand title={'Your Project\n*Could Be First.*'} text="Meister의 첫 번째 회사 프로젝트를 함께 만들 파트너를 찾고 있습니다." />
    </>
  );
}

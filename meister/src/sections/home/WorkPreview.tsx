import { ButtonLink } from '../../components/Button';
import { ProjectCard } from '../../components/ProjectCard';
import { Reveal } from '../../components/Reveal';
import { SplitText } from '../../components/SplitText';
import { projects } from '../../content/work';

export function WorkPreview() {
  return (
    <section className="section work-preview surface-ink" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Work · Proposals</p>
            <SplitText as="h2" id="work-title" className="h2" text={'아직 회사 명의 실적은 없습니다.\n대신, *어떻게 생각하는지* 보여드립니다.'} />
          </div>
          <Reveal className="section-head__aside">
            <p className="muted">
              아래는 Meister가 자체적으로 기획한 <strong>제안 프로젝트</strong>입니다. 실행된 프로젝트와 창업자 개인의 경험은 서로 다른 표시로 구분해 공개합니다.
            </p>
            <ButtonLink to="/work" variant="ghost">
              전체 보기
            </ButtonLink>
          </Reveal>
        </div>
        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className={`work-grid__item work-grid__item--${i}`}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

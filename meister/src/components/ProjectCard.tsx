import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceById } from '../content/services';
import { kindLabel, type Project } from '../content/work';
import { ProjectVisual } from './ProjectVisual';
import { Spotlight } from './Spotlight';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const k = kindLabel[project.kind];
  return (
    <Spotlight as="article" tilt={5} className={`pcard pcard--${project.kind}`}>
      <Link to={`/work/${project.slug}`} className="pcard__link">
        <div className="pcard__media">
          <ProjectVisual kind={project.visual} />
          <span className={`tag tag--${project.kind}`}>
            {k.ko}
            {project.kind === 'proposal' && ' · 미실행'}
          </span>
          <span className="pcard__idx mono">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="pcard__body">
          <p className="pcard__en mono">{project.en}</p>
          <h3 className="pcard__title">{project.title}</h3>
          <p className="pcard__sum">{project.summary}</p>
          <p className="pcard__svc">
            {project.services.map((s) => (
              <span key={s}>{serviceById(s)?.en}</span>
            ))}
          </p>
        </div>
        <span className="pcard__arrow" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </Link>
    </Spotlight>
  );
}

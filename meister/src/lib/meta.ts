import { site } from '../content/site';
import { projectBySlug } from '../content/work';
import { insightBySlug } from '../content/insights';

export type PageMeta = { title: string; description: string };

const suffix = 'Meister — Sports Marketing Agency';

const staticMeta: Record<string, PageMeta> = {
  '/': {
    title: `Meister — 스포츠의 감동을 브랜드의 경험으로`,
    description: site.description,
  },
  '/about': {
    title: `About · ${suffix}`,
    description: '스포츠의 감동을 사람들에게 전달한다. Meister의 미션과 비전, 창업 배경과 일하는 방식을 소개합니다.',
  },
  '/services': {
    title: `Services · ${suffix}`,
    description: '스포츠 스폰서십 기획·실행, 스포츠 이벤트 기획·운영, 선수 매니지먼트와 은퇴선수 커리어 디자인. 서비스별 대상, 해결하는 문제, 제공 업무와 산출물을 확인하세요.',
  },
  '/work': {
    title: `Work · ${suffix}`,
    description: 'Meister의 제안 프로젝트와 창업자 경험. 실행 여부와 수행 주체를 구분해 정직하게 공개합니다.',
  },
  '/insights': {
    title: `Insights · ${suffix}`,
    description: '스포츠 산업 트렌드, 스포츠·브랜드 마케팅 사례 분석, Meister의 관점과 아이디어.',
  },
  '/contact': {
    title: `Contact · ${suffix}`,
    description: '스폰서십, 스포츠 이벤트, 선수 매니지먼트 협업 문의. 내용을 남겨주시면 영업일 기준 2일 안에 회신드립니다.',
  },
  '/privacy': {
    title: `개인정보 처리방침 · ${suffix}`,
    description: 'Meister 홈페이지 문의 폼의 개인정보 수집·이용 안내.',
  },
};

export const notFoundMeta: PageMeta = { title: `페이지를 찾을 수 없습니다 · ${suffix}`, description: site.description };

export function metaFor(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (staticMeta[path]) return staticMeta[path];
  const work = path.match(/^\/work\/([^/]+)$/);
  if (work) {
    const p = projectBySlug(work[1]);
    if (p) return { title: `${p.title} · ${suffix}`, description: p.summary };
  }
  const insight = path.match(/^\/insights\/([^/]+)$/);
  if (insight) {
    const i = insightBySlug(insight[1]);
    if (i) return { title: `${i.title} · ${suffix}`, description: i.summary };
  }
  return notFoundMeta;
}

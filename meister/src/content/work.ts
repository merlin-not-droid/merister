import type { ServiceId } from './services';

/**
 * 프로젝트 목록.
 * kind: 'proposal' = Meister 자체 기획안 (실행되지 않음, 화면에 '제안 프로젝트'로 표시)
 *       'founder'  = 창업자 개인의 과거 경험 (회사 명의 실적 아님)
 *       'company'  = Meister 명의로 수행한 프로젝트 (현재 없음)
 * 새 프로젝트는 이 배열에 객체 하나를 추가하면 목록·상세 페이지·사이트맵에 자동 반영됩니다.
 */
export type ProjectKind = 'proposal' | 'founder' | 'company';

export type Project = {
  slug: string;
  kind: ProjectKind;
  title: string;
  en: string;
  services: ServiceId[];
  summary: string;
  purpose: string;
  role: string[];
  execution: string[];
  /** 'proposal' 은 실제 결과가 없으므로 '기대 효과'로 표기합니다. */
  outcome: string[];
  pending?: string[];
  visual: 'run' | 'board' | 'path' | 'founder';
};

export const kindLabel: Record<ProjectKind, { ko: string; en: string; desc: string }> = {
  proposal: { ko: '제안 프로젝트', en: 'Concept', desc: 'Meister가 자체적으로 기획한 제안안입니다. 실제로 실행된 프로젝트가 아닙니다.' },
  founder: { ko: '창업자 경험', en: 'Founder', desc: '창업자가 Meister 설립 이전에 개인 자격으로 참여한 경험입니다.' },
  company: { ko: 'Meister 프로젝트', en: 'Meister', desc: 'Meister 명의로 수행한 프로젝트입니다.' },
};

export const projects: Project[] = [
  {
    slug: 'after-work-run-league',
    kind: 'proposal',
    title: '퇴근길 러닝 리그',
    en: 'After-Work Run League',
    services: ['events', 'sponsorship'],
    summary: '직장인 러닝 크루를 시즌제 리그로 묶고, 브랜드가 리그의 운영 파트너가 되는 이벤트 콘셉트.',
    purpose:
      '러닝을 즐기는 직장인에게 꾸준히 참여할 이유를 만들고, 브랜드는 일회성 협찬이 아니라 한 시즌 동안 참가자의 일상에 함께하는 구조를 제안합니다.',
    role: ['리그 콘셉트와 시즌 구조 설계', '참가 규칙·기록 방식 설계', '브랜드 참여 방식과 권리 패키지 구성'],
    execution: [
      '도심 코스 4곳을 순환하는 월 1회 레이스(가정)',
      '크루 단위 누적 기록으로 시즌 순위 산정',
      '브랜드는 리그 운영 파트너로 참여해 급수·기록·시상 경험을 설계',
      '매 라운드 사진·기록을 참가자에게 개인화된 콘텐츠로 제공',
    ],
    outcome: ['참가자의 반복 참여 구조 확보', '브랜드와 참가자의 장기 접점 형성', '시즌 단위로 축적되는 콘텐츠와 참여 데이터'],
    visual: 'run',
  },
  {
    slug: 'club-sponsor-deck',
    kind: 'proposal',
    title: '지역 구단 스폰서십 제안서 재설계',
    en: 'Local Club Sponsor Deck',
    services: ['sponsorship'],
    summary: '지역 구단이 기업에 전달하는 스폰서십 제안서를 “노출 상품 목록”에서 “함께 만드는 시즌 계획”으로 바꾸는 구조안.',
    purpose:
      '많은 제안서가 광고 위치와 가격표 중심으로 구성됩니다. 기업 담당자가 내부 보고에 바로 쓸 수 있도록 목표·팬 접점·활용 계획 중심으로 구조를 재설계합니다.',
    role: ['제안서 정보 구조 설계', '권리 패키지를 목표별로 재구성', '활용 사례 시나리오 작성'],
    execution: [
      '기업 목표(인지도·지역 관계·채용 등)별 패키지 재구성',
      '홈경기 일정에 맞춘 시즌 활용 캘린더 제안',
      '팬 접점(경기장·온라인·지역 행사)별 활용 아이디어 정리',
      '계약 후 보고 항목과 일정을 제안서 단계에서 미리 제시',
    ],
    outcome: ['기업 담당자의 내부 설득 자료로 활용 가능', '노출 중심에서 활용 중심으로 대화 전환', '재계약 논의를 위한 기준 마련'],
    visual: 'board',
  },
  {
    slug: 'second-half',
    kind: 'proposal',
    title: 'Second Half — 은퇴선수 커리어 전환 프로그램',
    en: 'Second Half',
    services: ['athletes'],
    summary: '은퇴를 앞둔 선수가 자신의 경험을 다음 커리어로 옮길 수 있도록 돕는 단계별 프로그램안.',
    purpose:
      '선수로서 쌓은 규율, 팀워크, 압박 속 판단력은 다른 일에서도 가치가 있습니다. 이 경험을 언어로 정리하고 실제 진로로 연결하는 과정을 설계합니다.',
    role: ['프로그램 커리큘럼 설계', '진로 유형별 경로 정리', '파트너 기관 연계 구조 제안'],
    execution: [
      '1단계 진단: 경력·관심·강점 인터뷰',
      '2단계 탐색: 지도자·해설·교육·창업·일반 기업 등 경로별 정보 제공',
      '3단계 준비: 이력서·포트폴리오·인터뷰 준비',
      '4단계 연결: 교육 과정·현장 실습·멘토 연결',
    ],
    outcome: ['선수 개인의 커리어 로드맵', '은퇴 이후 공백 기간 단축', '구단·협회와 함께 운영 가능한 프로그램 모델'],
    pending: ['파트너 기관(교육·채용) 협의 여부'],
    visual: 'path',
  },
  {
    slug: 'founder-track-record',
    kind: 'founder',
    title: '창업자 경력',
    en: 'Founder Track Record',
    services: ['sponsorship', 'events', 'athletes'],
    summary: '창업자가 Meister 설립 이전에 참여한 스포츠 현장 경험을 정리할 자리입니다.',
    purpose: '창업 초기 회사의 전문성은 사람에게서 나옵니다. 창업자의 실제 경험을 기간·소속·역할 단위로 정확히 공개합니다.',
    role: [],
    execution: [],
    outcome: [],
    pending: ['참여 프로젝트명·기간·당시 소속', '본인이 맡은 역할과 범위', '공개 가능한 결과물·사진(사용 권한 확인)', '당시 소속 기관의 공개 동의 여부'],
    visual: 'founder',
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/**
 * 인사이트 글.
 * 새 글은 배열 맨 앞에 객체를 추가하면 목록·상세 페이지·사이트맵에 자동 반영됩니다.
 * 수치·사례를 인용할 때는 sources 에 출처를 반드시 남깁니다.
 */
export type InsightCategory = 'trend' | 'case' | 'perspective';

export const categoryLabel: Record<InsightCategory, string> = {
  trend: '산업 트렌드',
  case: '사례 분석',
  perspective: 'Meister의 관점',
};

export type Insight = {
  slug: string;
  category: InsightCategory;
  title: string;
  summary: string;
  date: string;
  readMinutes: number;
  draft: boolean;
  body: { heading?: string; text: string }[];
  sources?: { label: string; href: string }[];
};

export const insights: Insight[] = [
  {
    slug: 'sponsorship-is-experience',
    category: 'perspective',
    title: '스폰서십은 로고가 아니라 경험을 사는 일',
    summary: '경기장에 이름을 거는 것만으로는 부족합니다. 팬이 브랜드를 “겪는” 장면을 설계해야 기억에 남습니다.',
    date: '2026-10-01',
    readMinutes: 4,
    draft: true,
    body: [
      {
        text: '스폰서십을 검토하는 기업이 가장 먼저 묻는 질문은 보통 “어디에 노출되나요?”입니다. 노출은 중요한 출발점이지만, 계약서에 적힌 권리는 사용하기 전까지 가능성에 불과합니다.',
      },
      {
        heading: '노출은 계약하고, 경험은 설계한다',
        text: '팬은 광고판보다 경기 전후의 순간을 더 오래 기억합니다. 입장 줄에서 받은 응원 도구, 하프타임 이벤트, 경기 후 받은 기록 사진처럼 직접 겪은 장면이 브랜드를 기억하게 만듭니다. 그래서 Meister는 권리 목록보다 팬의 하루 동선을 먼저 그립니다.',
      },
      {
        heading: '측정은 계약 전에 정한다',
        text: '무엇을 성공으로 볼지 계약 후에 정하면 결과 보고는 노출 횟수 나열로 끝나기 쉽습니다. 인지도, 참여, 관계, 판매 중 무엇을 우선할지 먼저 합의하고, 그에 맞는 지표와 보고 일정을 계약 단계에서 함께 설계해야 합니다.',
      },
      {
        heading: '작게 시작해도 된다',
        text: '처음부터 큰 계약일 필요는 없습니다. 한 시즌, 한 대회, 한 선수와의 작은 협업으로 브랜드에 맞는 방식을 검증하고, 확인된 방식에 투자를 늘리는 편이 안전합니다.',
      },
    ],
  },
  {
    slug: 'small-events-big-chance',
    category: 'trend',
    title: '작은 대회가 브랜드에 주는 기회',
    summary: '러닝·생활체육처럼 직접 참여하는 스포츠는 관람형 스포츠와 다른 방식으로 브랜드와 사람을 연결합니다.',
    date: '2026-09-20',
    readMinutes: 3,
    draft: true,
    body: [
      {
        text: '직접 뛰고, 기록을 남기고, 함께 참여한 사람과 이야기를 나누는 참여형 스포츠는 관람형 스포츠와 다른 기회를 줍니다. 참가자는 관객이 아니라 주인공이 되기 때문입니다.',
      },
      {
        heading: '참여형 이벤트에서 브랜드의 역할',
        text: '참여형 이벤트에서 브랜드는 무대를 만드는 사람이 될 수 있습니다. 코스를 안전하게 운영하고, 기록을 정확히 남기고, 완주의 순간을 기념하는 일 자체가 브랜드 경험이 됩니다.',
      },
      {
        heading: '규모보다 반복',
        text: '한 번의 큰 행사보다 작은 행사를 꾸준히 이어가는 편이 참가자와의 관계를 만들기 좋습니다. 시즌제, 기록 누적, 크루 단위 참여처럼 다시 올 이유를 만드는 구조가 중요합니다.',
      },
    ],
    sources: [],
  },
  {
    slug: 'retirement-is-halftime',
    category: 'perspective',
    title: '은퇴는 끝이 아니라 하프타임이다',
    summary: '선수의 커리어는 은퇴로 끝나지 않습니다. 경기장에서 쌓은 역량을 다음 일의 언어로 옮기는 과정이 필요합니다.',
    date: '2026-09-05',
    readMinutes: 4,
    draft: true,
    body: [
      {
        text: '많은 선수에게 은퇴는 갑작스럽게 찾아옵니다. 부상, 계약, 팀 사정처럼 스스로 정하기 어려운 이유로 다음을 준비할 시간 없이 커리어가 바뀌기도 합니다.',
      },
      {
        heading: '선수의 역량을 다른 언어로 번역하기',
        text: '매일 정해진 훈련을 지키는 규율, 팀 안에서 역할을 수행하는 협업, 압박 속에서 빠르게 판단하는 능력은 어느 일터에서나 필요한 역량입니다. 문제는 이 역량을 다른 분야의 언어로 설명하는 경험이 부족하다는 점입니다.',
      },
      {
        heading: '현역일 때 시작하는 커리어 디자인',
        text: '은퇴 이후가 아니라 현역일 때부터 관심 분야를 탐색하고, 짧은 교육이나 실습으로 경험을 쌓아두는 것이 좋습니다. Meister는 이 과정을 선수 개인에게 맞춘 로드맵으로 정리하는 일을 준비하고 있습니다.',
      },
    ],
  },
];

export const insightBySlug = (slug: string) => insights.find((i) => i.slug === slug);

/**
 * 사이트 전역 정보.
 * 값이 null 인 항목은 화면에 [자료 필요] 표시로 렌더링됩니다. 확정되면 값만 채우세요.
 */
export const site = {
  name: 'Meister',
  legalName: null as string | null, // [자료 필요] 법인명 (예: 주식회사 마이스터)
  tagline: 'From the Field, For the Brand.',
  description:
    'Meister는 스포츠 스폰서십, 스포츠 이벤트, 선수 매니지먼트를 기획하고 실행하는 스포츠 마케팅 에이전시입니다. 현장의 흐름을 이해하고 브랜드의 목표에서 출발합니다.',
  email: null as string | null, // [자료 필요] 대표 문의 이메일
  location: '서울', // 가정: 서울 기반. 확정 시 수정
  social: [
    { label: 'Instagram', href: null as string | null },
    { label: 'LinkedIn', href: null as string | null },
    { label: 'YouTube', href: null as string | null },
  ],
  businessNumber: null as string | null, // [자료 필요] 사업자등록번호 (법인 설립 후)
  privacyOfficer: null as string | null, // [자료 필요] 개인정보 보호책임자
} as const;

export const mission = '스포츠의 감동을 사람들에게 전달한다.';
export const vision = '스포츠를 통해 더 많은 사람이 행복을 경험하도록 한다.';

export type NavItem = { to: string; label: string; ko: string };

export const nav: NavItem[] = [
  { to: '/about', label: 'About', ko: '회사 소개' },
  { to: '/services', label: 'Services', ko: '서비스' },
  { to: '/work', label: 'Work', ko: '프로젝트' },
  { to: '/insights', label: 'Insights', ko: '인사이트' },
  { to: '/contact', label: 'Contact', ko: '문의' },
];

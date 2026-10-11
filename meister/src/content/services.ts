/**
 * 서비스 정의.
 * status: 'core'  = 창업 단계에서 바로 제공하는 업무
 *         'proposal' = 방향은 정했지만 범위·자격 확인이 필요한 제안 업무 (화면에 '제안' 표시)
 */
export type ServiceId = 'sponsorship' | 'events' | 'athletes';

export type WorkItem = { text: string; status: 'core' | 'proposal' };

export type Service = {
  id: ServiceId;
  no: string;
  en: string;
  ko: string;
  short: string;
  summary: string;
  clients: string[];
  problems: string[];
  work: WorkItem[];
  deliverables: string[];
  note?: string;
};

export const services: Service[] = [
  {
    id: 'sponsorship',
    no: '01',
    en: 'Sponsorship',
    ko: '스포츠 스폰서십 기획 및 실행',
    short: '어디에 투자할지부터, 계약 이후 활용까지.',
    summary:
      '브랜드의 목표에 맞는 종목·구단·대회·선수를 찾고, 계약 이후 실제로 사람들이 경험하는 활동까지 설계하고 실행합니다.',
    clients: [
      '스포츠 마케팅을 처음 검토하는 기업의 브랜드·마케팅 담당자',
      '기존 스폰서십의 활용도를 높이고 싶은 기업',
      '스폰서를 찾고 제안서를 정비하려는 구단·스포츠 단체',
    ],
    problems: [
      '어떤 종목과 파트너에 투자해야 할지 판단 기준이 없다',
      '로고 노출 외에 무엇을 해야 할지 모른다',
      '계약 후 활용과 성과 보고가 흐지부지된다',
    ],
    work: [
      { text: '스폰서십 목표 정의와 투자 기준 수립', status: 'core' },
      { text: '종목·구단·대회·선수 등 후보 자산 조사와 비교', status: 'core' },
      { text: '권리 패키지 구성과 계약 조건 검토 지원', status: 'core' },
      { text: '현장·디지털 액티베이션 기획과 실행', status: 'core' },
      { text: '성과 측정 지표 설계와 결과 리포트', status: 'proposal' },
    ],
    deliverables: ['스폰서십 전략 보고서', '후보 자산 비교표', '구단·단체용 스폰서십 제안서', '액티베이션 실행 계획', '결과 리포트'],
  },
  {
    id: 'events',
    no: '02',
    en: 'Events',
    ko: '스포츠 이벤트 기획·운영',
    short: '참가자의 경험과 브랜드의 메시지가 한 흐름이 되도록.',
    summary:
      '브랜드 체험형 스포츠 이벤트, 생활체육 대회, 팬 이벤트를 기획하고 현장에서 직접 운영합니다. 행사 이후 남는 기록까지 챙깁니다.',
    clients: [
      '임직원·고객 대상 스포츠 이벤트를 준비하는 기업',
      '대회·팬 이벤트 운영 파트너가 필요한 구단·스포츠 단체',
      '지역 스포츠 행사를 준비하는 기관',
    ],
    problems: [
      '참가자 경험과 브랜드 메시지가 따로 논다',
      '인력·안전·일정 관리가 내부 역량을 넘어선다',
      '행사가 끝나면 남는 콘텐츠와 데이터가 없다',
    ],
    work: [
      { text: '이벤트 콘셉트와 프로그램 설계', status: 'core' },
      { text: '장소 섭외, 인허가, 안전 계획 수립', status: 'core' },
      { text: '운영·촬영·장비 협력사 섭외와 관리', status: 'core' },
      { text: '현장 운영과 참가자 커뮤니케이션', status: 'core' },
      { text: '결과 정리와 사진·영상 아카이브', status: 'core' },
    ],
    deliverables: ['기획안과 예산안', '운영 매뉴얼(큐시트·인력 배치·안전 계획)', '현장 운영', '결과 보고서', '사진·영상 아카이브'],
  },
  {
    id: 'athletes',
    no: '03',
    en: 'Athletes',
    ko: '선수 매니지먼트 & 은퇴선수 커리어 디자인',
    short: '경기 밖의 시간도 커리어가 되도록.',
    summary:
      '현역 선수의 경기 외 활동과 개인 브랜드를 관리하고, 은퇴를 앞둔 선수가 다음 커리어를 스스로 설계할 수 있도록 돕습니다.',
    clients: ['광고·미디어·행사 활동을 관리하고 싶은 현역 선수', '은퇴를 앞두었거나 은퇴한 선수', '선수의 가족과 스포츠 관계자'],
    problems: [
      '경기 외 활동 요청을 체계적으로 관리하기 어렵다',
      '선수 개인의 이야기와 브랜드가 정리되어 있지 않다',
      '은퇴 이후 진로를 혼자 고민한다',
    ],
    work: [
      { text: '선수 브랜드 포지셔닝과 프로필·소개 자료 정리', status: 'core' },
      { text: '광고·협찬·행사 제안 검토와 일정 관리', status: 'core' },
      { text: '미디어·SNS 커뮤니케이션 가이드', status: 'core' },
      { text: '은퇴선수 커리어 진단과 전환 로드맵 설계', status: 'proposal' },
      { text: '지도자·해설·교육·창업 등 진로별 교육·네트워크 연결', status: 'proposal' },
    ],
    deliverables: ['선수 프로필과 브랜드 소개 자료', '활동 캘린더', '커리어 로드맵'],
    note: '에이전트 업무(이적·연봉 협상 등)는 종목별 자격 요건을 확인한 뒤 범위를 정합니다.',
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);

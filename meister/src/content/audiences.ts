import type { ServiceId } from './services';

export type AudienceId = 'brand' | 'club' | 'athlete';

export const audiences: { id: AudienceId; who: string; quote: string; needs: string[]; services: ServiceId[] }[] = [
  {
    id: 'brand',
    who: '기업 브랜드·마케팅 담당자',
    quote: '스포츠로 브랜드를 알리고 싶어요',
    needs: ['스포츠 마케팅을 처음 검토하고 있다', '어떤 종목·구단·선수가 우리 브랜드와 맞는지 모르겠다', '임직원·고객 대상 스포츠 이벤트를 준비 중이다'],
    services: ['sponsorship', 'events'],
  },
  {
    id: 'club',
    who: '구단·스포츠 단체',
    quote: '스폰서를 찾고, 함께 운영할 파트너가 필요해요',
    needs: ['기업에 보낼 스폰서십 제안서를 정비하고 싶다', '스폰서에게 보고할 활용 계획과 결과가 부족하다', '대회·팬 이벤트를 운영할 인력과 경험이 필요하다'],
    services: ['sponsorship', 'events'],
  },
  {
    id: 'athlete',
    who: '선수·스포츠 관계자',
    quote: '경기 밖의 커리어도 관리하고 싶어요',
    needs: ['광고·행사 제안을 혼자 판단하기 어렵다', '나를 소개할 프로필과 자료가 정리되어 있지 않다', '은퇴 이후의 진로를 미리 준비하고 싶다'],
    services: ['athletes'],
  },
];

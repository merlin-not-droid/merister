import { Marquee } from '../../components/Marquee';
import { Reveal } from '../../components/Reveal';
import { ScrollWords } from '../../components/ScrollWords';

const pillars = [
  { en: 'Field Sense', ko: '현장을 아는 기획', text: '경기 일정, 동선, 안전, 팬의 하루까지. 현장에서 실제로 일어나는 일을 기준으로 계획합니다.' },
  { en: 'Brand Logic', ko: '브랜드 목표에서 출발', text: '무엇을 알리고 누구와 관계를 맺을지 먼저 정합니다. 노출이 아니라 목표에 맞는 경험을 설계합니다.' },
  { en: 'Honest Scale', ko: '약속한 만큼 정확하게', text: '할 수 있는 일과 필요한 파트너를 처음부터 투명하게 말합니다. 작게 약속하고 끝까지 지킵니다.' },
];

function Ball() {
  return (
    <svg className="marquee__sep" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7l4 3-1.5 4.5h-5L8 10z" fill="currentColor" />
      <path d="M12 2v5M16 10l5-1.5M14.5 14.5l3 4M9.5 14.5l-3 4M8 10L3 8.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Manifesto() {
  return (
    <section id="manifesto" className="manifesto surface-ink" aria-labelledby="manifesto-title">
      <Marquee className="manifesto__band display" speed={70}>
        <span>Move People Through Sport</span>
        <Ball />
        <span className="marquee__ko">스포츠의 감동을 사람들에게</span>
        <Ball />
        <span>Field Sense, Brand Logic</span>
        <Ball />
      </Marquee>

      <div className="container manifesto__body">
        <h2 id="manifesto-title" className="eyebrow">
          Our Position
        </h2>
        <ScrollWords
          as="p"
          className="manifesto__statement"
          text="우리는 경기장의 열기와 선수의 이야기, 팬의 응원이 *브랜드와 만나는 지점*을 찾습니다. 그리고 그 순간이 오래 기억되도록 설계하고, *현장에서 직접 실행*합니다."
        />
        <ul className="pillars" role="list">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.en} className="pillar" delay={i * 0.08}>
              <span className="pillar__no mono">0{i + 1}</span>
              <h3 className="pillar__en display">{p.en}</h3>
              <p className="pillar__ko">{p.ko}</p>
              <p className="pillar__text">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

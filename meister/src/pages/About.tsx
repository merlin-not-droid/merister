import { PageHero } from '../components/PageHero';
import { Pending } from '../components/Pending';
import { Reveal } from '../components/Reveal';
import { ScrollWords } from '../components/ScrollWords';
import { SplitText } from '../components/SplitText';
import { playbook } from '../content/playbook';
import { mission, vision } from '../content/site';
import { CtaBand } from '../sections/CtaBand';

const principles = [
  { en: 'Field First', ko: '현장에서 출발합니다', text: '회의실의 계획이 현장에서 그대로 작동하는지 먼저 따집니다. 동선, 시간, 안전, 날씨까지 실행 조건을 기획의 일부로 다룹니다.' },
  { en: 'Brand Logic', ko: '브랜드의 언어로 번역합니다', text: '스포츠의 감동을 브랜드가 설명할 수 있는 목표와 지표로 옮깁니다. 담당자가 내부에 보고하기 쉬운 형태로 정리합니다.' },
  { en: 'Honest Scale', ko: '과장하지 않습니다', text: '창업 초기 회사로서 할 수 있는 일과 협력사가 필요한 일을 처음부터 구분해 말씀드립니다.' },
  { en: 'After the Whistle', ko: '끝난 뒤까지 챙깁니다', text: '결과 보고, 사진·영상 아카이브, 다음 시즌 제안까지가 한 프로젝트입니다.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Meister"
        en={"Move People\n*Through Sport.*"}
        title="스포츠 현장을 이해하고, 브랜드의 관점으로 기획하는 파트너."
        lead={<p>Meister는 독일어로 ‘장인(匠人)’을 뜻합니다. 한 경기, 한 행사, 한 선수의 커리어를 장인의 태도로 끝까지 다루겠다는 약속을 이름에 담았습니다.</p>}
      />

      <section className="section surface-paper about-intro" aria-labelledby="about-intro-title">
        <div className="container about-intro__grid">
          <h2 id="about-intro-title" className="eyebrow">
            Company
          </h2>
          <div>
            <ScrollWords
              className="about-intro__statement"
              text="Meister는 스포츠 스폰서십, 스포츠 이벤트, 선수 매니지먼트를 하는 *스포츠 마케팅 에이전시*입니다. 지금은 창업을 준비하는 단계입니다. 그래서 규모보다 *방향과 방식*을 먼저 보여드리려 합니다."
            />
            <Reveal className="about-intro__facts">
              <dl>
                <div>
                  <dt className="mono">Stage</dt>
                  <dd>창업 준비 단계</dd>
                </div>
                <div>
                  <dt className="mono">Base</dt>
                  <dd>서울 (예정)</dd>
                </div>
                <div>
                  <dt className="mono">Focus</dt>
                  <dd>Sponsorship · Events · Athletes</dd>
                </div>
                <div>
                  <dt className="mono">Founded</dt>
                  <dd>
                    <Pending label="법인 설립일" />
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section surface-ink mv" aria-label="미션과 비전">
        <div className="container mv__grid">
          <Reveal className="mv__item">
            <p className="eyebrow">Mission</p>
            <p className="mv__en display">Deliver the thrill of sport.</p>
            <p className="mv__ko">{mission}</p>
            <p className="mv__text muted">경기장의 열기, 선수의 이야기, 팬의 응원을 더 많은 사람이 직접 느낄 수 있도록 연결합니다.</p>
          </Reveal>
          <Reveal className="mv__item" delay={0.1}>
            <p className="eyebrow">Vision</p>
            <p className="mv__en display">More people, happier through sport.</p>
            <p className="mv__ko">{vision}</p>
            <p className="mv__text muted">보는 사람, 뛰는 사람, 후원하는 사람 모두에게 스포츠가 좋은 경험으로 남는 구조를 만듭니다.</p>
          </Reveal>
        </div>
      </section>

      <section className="section surface-paper founder" aria-labelledby="founder-title">
        <div className="container founder__grid">
          <div className="founder__photo">
            <div className="founder__frame">
              <span className="mono">Founder Photo</span>
              <Pending label="창업자 프로필 사진 (촬영 원본, 사용 동의)" block />
            </div>
          </div>
          <div>
            <p className="eyebrow">Founder</p>
            <SplitText as="h2" id="founder-title" className="h2" text={'창업자 소개'} />
            <p className="founder__name">
              <Pending label="창업자 이름 · 직함" />
            </p>
            <p className="lead founder__lead">
              창업 초기 회사의 전문성은 사람에게서 나옵니다. 창업자의 스포츠 현장 경험과 브랜드·마케팅 경험을 기간과 역할 단위로 정확히 공개합니다.
            </p>
            <ul role="list" className="founder__list">
              <li>
                <span className="mono">Career</span>
                <Pending label="주요 경력 (기간 · 소속 · 역할)" />
              </li>
              <li>
                <span className="mono">Field</span>
                <Pending label="스포츠 현장 경험 (종목 · 대회 · 담당 업무)" />
              </li>
              <li>
                <span className="mono">Brand</span>
                <Pending label="브랜드·마케팅 기획 경험" />
              </li>
              <li>
                <span className="mono">Network</span>
                <Pending label="공개 가능한 협력 네트워크 (동의 받은 경우만)" />
              </li>
            </ul>
            <p className="founder__note">※ 창업자 개인 경력은 Meister 회사 명의의 실적과 구분해 표기합니다.</p>
          </div>
        </div>
      </section>

      <section className="section surface-ink principles" aria-labelledby="principles-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <SplitText as="h2" id="principles-title" className="h2" text={'Meister가\n일하는 방식'} />
          </div>
          <ol role="list" className="principles__grid">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.en} className="principle" delay={i * 0.06}>
                <span className="principle__no mono">0{i + 1}</span>
                <h3 className="principle__en display">{p.en}</h3>
                <p className="principle__ko">{p.ko}</p>
                <p className="principle__text">{p.text}</p>
              </Reveal>
            ))}
          </ol>

          <div className="process">
            <h3 className="process__h mono">Process</h3>
            <ol role="list" className="process__list">
              {playbook.map((s, i) => (
                <Reveal as="li" key={s.en} delay={i * 0.06} className="process__item">
                  <span className="process__no mono">0{i + 1}</span>
                  <p className="process__en display">{s.en}</p>
                  <p className="process__ko">{s.ko}</p>
                  <p className="process__out mono">{s.output}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

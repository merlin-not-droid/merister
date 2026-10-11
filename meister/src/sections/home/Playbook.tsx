import { useEffect, useRef, useState } from 'react';
import { SplitText } from '../../components/SplitText';
import { TacticsBoard } from '../../components/TacticsBoard';
import { playbook } from '../../content/playbook';
import { gsap, ScrollTrigger } from '../../lib/motion';

export function Playbook() {
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    const showAll = () => {
      [1, 2, 3, 4].forEach((n) => el.style.setProperty(`--p${n}`, '1'));
      setActive(3);
    };
    const mm = gsap.matchMedia();
    // 데스크톱: 섹션을 고정하고 스크롤에 맞춰 패스를 순서대로 그립니다.
    mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
      const state = { p: 0 };
      const tween = gsap.to(state, {
        p: 4,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
        onUpdate: () => {
          for (let n = 1; n <= 4; n++) {
            el.style.setProperty(`--p${n}`, String(Math.min(1, Math.max(0, state.p - (n - 1)))));
          }
          const i = state.p <= 0.02 ? -1 : Math.min(3, Math.floor(state.p));
          setActive((prev) => (prev === i ? prev : i));
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    // 모바일·모션 최소화: 화면에 들어오면 전체 패스를 한 번에 표시합니다.
    mm.add('(max-width: 1024px), (prefers-reduced-motion: reduce)', () => {
      const st = ScrollTrigger.create({ trigger: el, start: 'top 75%', once: true, onEnter: showAll });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="playbook surface-paper" aria-labelledby="playbook-title">
      <div className="container section-head playbook__head">
        <p className="eyebrow">Meister Playbook</p>
        <SplitText as="h2" id="playbook-title" className="h2" text={'좋은 경기는\n작전에서 시작됩니다.'} />
        <p className="lead section-head__lead">모든 프로젝트는 같은 네 단계로 진행합니다. 단계마다 무엇을 확인하고 무엇을 넘겨드리는지 미리 약속합니다.</p>
      </div>
      <div className="playbook__pin" ref={pin}>
        <div className="playbook__sticky">
          <div className="container playbook__grid">
            <div className="playbook__board">
              <TacticsBoard active={active} />
            </div>
            <ol className="playbook__steps" role="list">
              {playbook.map((s, i) => (
                <li key={s.en} className={`pstep ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}>
                  <span className="pstep__no mono">0{i + 1}</span>
                  <div>
                    <h3 className="pstep__title">
                      <span className="display">{s.en}</span> <span className="pstep__ko">{s.ko}</span>
                    </h3>
                    <p className="pstep__text">{s.text}</p>
                    <p className="pstep__out mono">→ {s.output}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

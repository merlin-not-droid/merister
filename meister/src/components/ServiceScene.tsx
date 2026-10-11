import type { ServiceId } from '../content/services';

/**
 * 서비스별 '산출물 예시' 일러스트. 실제 고객·수치가 아닌 업무 형태를 보여주는 예시 화면입니다.
 * 사진 자료가 확보되면 배경 사진(.scene__photo)과 함께 쓸 수 있습니다.
 */
export function ServiceScene({ id }: { id: ServiceId }) {
  return (
    <div className={`scene scene--${id}`} aria-hidden="true">
      <span className="scene__badge mono">예시 화면</span>
      {id === 'sponsorship' && <SponsorshipScene />}
      {id === 'events' && <EventsScene />}
      {id === 'athletes' && <AthletesScene />}
    </div>
  );
}

function SponsorshipScene() {
  return (
    <>
      <div className="scene__stage">
        <svg className="scene__pitch" viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pitchFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.05" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <path d="M150 60 H450 L590 330 H10 Z" fill="url(#pitchFade)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d="M300 60 V330" stroke="currentColor" strokeOpacity="0.4" />
          <ellipse cx="300" cy="180" rx="78" ry="34" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <path d="M120 120 H200 L190 200 H90 Z M400 120 H480 L510 200 H410 Z" fill="none" stroke="currentColor" strokeOpacity="0.3" />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={40 + i * 40} cy={24 + (i % 3) * 6} r="2" fill="currentColor" opacity="0.35" />
          ))}
        </svg>
        <div className="scene__led">
          <div className="scene__led-track">
            <span>YOUR BRAND</span>
            <span className="is-accent">●</span>
            <span>MATCHDAY</span>
            <span className="is-accent">●</span>
            <span>YOUR BRAND</span>
            <span className="is-accent">●</span>
            <span>MATCHDAY</span>
            <span className="is-accent">●</span>
          </div>
        </div>
      </div>
      <div className="scene__card scene__card--a">
        <p className="scene__card-h mono">Activation Plan</p>
        <ul role="list">
          <li>
            <i className="is-done" /> 경기 전 · 팬 입장 동선 부스
          </li>
          <li>
            <i className="is-done" /> 하프타임 · 관중 참여 이벤트
          </li>
          <li>
            <i /> 경기 후 · 기록 사진 콘텐츠
          </li>
        </ul>
      </div>
      <div className="scene__card scene__card--b">
        <p className="scene__card-h mono">Fit Check</p>
        <div className="scene__fit">
          <span>Brand Goal</span>
          <span className="scene__fit-line" />
          <span>Fan Base</span>
        </div>
      </div>
    </>
  );
}

function EventsScene() {
  const rows = [
    ['08:30', '스태프 브리핑 · 안전 점검'],
    ['09:30', '참가자 입장 · 체크인'],
    ['10:00', '개회 · 브랜드 메시지'],
    ['10:20', '출발 · 코스 운영'],
    ['12:00', '시상 · 기록 사진 전달'],
  ];
  return (
    <>
      <div className="scene__card scene__card--cue">
        <p className="scene__card-h mono">
          Cue Sheet <span>· Run Event</span>
        </p>
        <ol role="list" className="scene__cue">
          {rows.map(([t, label]) => (
            <li key={t}>
              <span className="mono">{t}</span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <span className="scene__playhead" />
      </div>
      <svg className="scene__route" viewBox="0 0 320 240">
        <path
          className="scene__route-path"
          d="M30 200 C 60 120, 120 210, 150 140 S 220 40, 290 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
        <circle cx="30" cy="200" r="7" className="scene__route-start" />
        <circle cx="290" cy="60" r="7" className="scene__route-end" />
        <circle r="6" className="scene__route-dot">
          <animateMotion dur="6s" repeatCount="indefinite" path="M30 200 C 60 120, 120 210, 150 140 S 220 40, 290 60" />
        </circle>
        <text x="40" y="226" className="scene__route-label">START</text>
        <text x="250" y="40" className="scene__route-label">FINISH</text>
      </svg>
    </>
  );
}

function AthletesScene() {
  return (
    <>
      <div className="scene__card scene__card--profile">
        <div className="scene__avatar">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="28" r="14" fill="currentColor" opacity="0.85" />
            <path d="M14 76c2-18 13-28 26-28s24 10 26 28" fill="currentColor" opacity="0.85" />
          </svg>
        </div>
        <div>
          <p className="scene__card-h mono">Athlete Profile</p>
          <p className="scene__name">선수 프로필</p>
          <p className="scene__tags">
            <span>#현역</span>
            <span>#개인브랜드</span>
            <span>#미디어</span>
          </p>
        </div>
        <ul role="list" className="scene__rows">
          <li>
            <span>활동 캘린더</span>
            <span className="scene__bar" style={{ ['--w' as string]: '72%' }} />
          </li>
          <li>
            <span>미디어 가이드</span>
            <span className="scene__bar" style={{ ['--w' as string]: '54%' }} />
          </li>
          <li>
            <span>제안 검토</span>
            <span className="scene__bar" style={{ ['--w' as string]: '38%' }} />
          </li>
        </ul>
      </div>
      <div className="scene__card scene__card--path">
        <p className="scene__card-h mono">Career Roadmap</p>
        <svg viewBox="0 0 300 90" className="scene__path">
          <path d="M20 60 C 80 60, 90 24, 150 24 S 230 60, 280 40" fill="none" stroke="currentColor" strokeWidth="2" className="scene__path-line" />
          <circle cx="20" cy="60" r="7" />
          <circle cx="150" cy="24" r="7" />
          <circle cx="280" cy="40" r="9" className="is-accent" />
        </svg>
        <div className="scene__path-labels">
          <span>현역</span>
          <span>하프타임</span>
          <span>세컨드 커리어</span>
        </div>
      </div>
    </>
  );
}

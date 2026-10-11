import type { Project } from '../content/work';

/** 프로젝트 카드 상단의 추상 일러스트. 실제 사진이 생기면 교체합니다. */
export function ProjectVisual({ kind }: { kind: Project['visual'] }) {
  return (
    <div className={`pv pv--${kind}`} aria-hidden="true">
      {kind === 'run' && (
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M-20 ${200 - i * 16} C 80 ${150 - i * 14}, 160 ${250 - i * 18}, 260 ${150 - i * 10} S 380 ${80 - i * 6}, 430 ${110 - i * 12}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={i === 4 ? 3 : 1}
              className={i === 4 ? 'pv__accent' : ''}
              opacity={i === 4 ? 1 : 0.35}
            />
          ))}
          <circle cx="260" cy="110" r="7" className="pv__dot" />
        </svg>
      )}
      {kind === 'board' && (
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${70 + i * 46} ${40 + i * 18}) rotate(${-6 + i * 6})`}>
              <rect width="180" height="130" rx="4" fill="currentColor" opacity={0.08 + i * 0.06} stroke="currentColor" strokeOpacity="0.5" />
              <rect x="16" y="18" width={70 + i * 10} height="8" fill="currentColor" opacity="0.5" />
              <rect x="16" y="36" width="120" height="4" fill="currentColor" opacity="0.25" />
              <rect x="16" y="46" width="100" height="4" fill="currentColor" opacity="0.25" />
              {i === 2 && <rect x="16" y="70" width="60" height="40" className="pv__accent-fill" />}
            </g>
          ))}
        </svg>
      )}
      {kind === 'path' && (
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          <line x1="200" y1="0" x2="200" y2="260" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="4 6" />
          <path d="M30 200 C 120 200, 140 130, 200 130" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
          <path d="M200 130 C 260 130, 280 60, 370 60" fill="none" strokeWidth="3" className="pv__accent" stroke="currentColor" />
          <circle cx="30" cy="200" r="8" fill="currentColor" opacity="0.6" />
          <circle cx="200" cy="130" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="370" cy="60" r="10" className="pv__dot" />
          <text x="182" y="24" className="pv__label">HALF TIME</text>
        </svg>
      )}
      {kind === 'founder' && (
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          <rect x="140" y="40" width="120" height="160" rx="4" fill="none" stroke="currentColor" strokeDasharray="6 6" opacity="0.6" />
          <circle cx="200" cy="100" r="26" fill="currentColor" opacity="0.25" />
          <path d="M156 196c4-34 22-50 44-50s40 16 44 50" fill="currentColor" opacity="0.25" />
          <text x="200" y="230" textAnchor="middle" className="pv__label">PHOTO NEEDED</text>
        </svg>
      )}
    </div>
  );
}

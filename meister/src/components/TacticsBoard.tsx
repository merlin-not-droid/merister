/**
 * Meister Playbook 을 표현하는 전술판 SVG.
 * 화살표(.tb__run)는 부모가 --p1..--p4 (0~1) 변수로 그려지는 정도를 제어합니다.
 */
export function TacticsBoard({ active }: { active: number }) {
  const players = [
    { x: 150, y: 330, n: 1 },
    { x: 360, y: 210, n: 2 },
    { x: 620, y: 300, n: 3 },
    { x: 840, y: 190, n: 4 },
  ];
  const runs = [
    'M168 318 C 230 270, 280 240, 340 218',
    'M380 214 C 450 230, 520 300, 600 302',
    'M640 292 C 700 250, 760 210, 820 196',
    'M858 186 C 900 176, 930 200, 948 240',
  ];
  return (
    <svg className="tb" viewBox="0 0 1000 480" role="img" aria-label="진단, 설계, 실행, 회고 네 단계를 전술판 위의 패스 흐름으로 표현한 그림">
      <g className="tb__lines" fill="none" stroke="currentColor">
        <rect x="20" y="20" width="960" height="440" rx="2" />
        <line x1="500" y1="20" x2="500" y2="460" />
        <circle cx="500" cy="240" r="70" />
        <circle cx="500" cy="240" r="3" fill="currentColor" />
        <rect x="20" y="130" width="130" height="220" />
        <rect x="20" y="190" width="50" height="100" />
        <rect x="850" y="130" width="130" height="220" />
        <rect x="930" y="190" width="50" height="100" />
        <path d="M150 200 A 50 50 0 0 1 150 280" />
        <path d="M850 200 A 50 50 0 0 0 850 280" />
      </g>
      <g className="tb__opp" stroke="currentColor" strokeWidth="2.5">
        {[
          [260, 120],
          [470, 360],
          [560, 150],
          [730, 380],
          [770, 120],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <line x1="-8" y1="-8" x2="8" y2="8" />
            <line x1="8" y1="-8" x2="-8" y2="8" />
          </g>
        ))}
      </g>
      {runs.map((d, i) => (
        <path key={d} d={d} className={`tb__run ${i <= active ? 'is-on' : ''}`} pathLength={1} style={{ ['--p' as string]: `var(--p${i + 1}, 0)` }} />
      ))}
      <g className="tb__goal">
        <rect x="972" y="210" width="8" height="60" />
      </g>
      {players.map((p, i) => (
        <g key={p.n} className={`tb__player ${i <= active ? 'is-on' : ''} ${i === active ? 'is-current' : ''}`} transform={`translate(${p.x} ${p.y})`}>
          <circle r="22" className="tb__ring" />
          <circle r="16" className="tb__dot" />
          <text y="5.5" textAnchor="middle">
            {p.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

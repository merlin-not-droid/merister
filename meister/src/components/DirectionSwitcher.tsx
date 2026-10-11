import { Palette } from 'lucide-react';
import { useState } from 'react';
import { directions, useDirection } from '../lib/direction';

/**
 * 공개 전 검토용: 3가지 디자인 방향을 실제 화면에서 바로 비교합니다.
 * 방향이 확정되면 VITE_SHOW_DIRECTION_SWITCHER=false 로 숨기세요.
 */
export function DirectionSwitcher() {
  const { direction, setDirection } = useDirection();
  const [open, setOpen] = useState(false);
  const current = directions.find((d) => d.id === direction)!;

  return (
    <div className={`dswitch ${open ? 'is-open' : ''}`}>
      <button type="button" className="dswitch__toggle" aria-expanded={open} aria-controls="dswitch-panel" onClick={() => setOpen((v) => !v)}>
        <Palette size={16} aria-hidden="true" />
        <span className="dswitch__label">
          Direction {direction.toUpperCase()} <span className="dswitch__name">· {current.name}</span>
        </span>
      </button>
      <div id="dswitch-panel" className="dswitch__panel" role="group" aria-label="디자인 방향 선택" hidden={!open}>
        <p className="dswitch__hint">검토용 · 색상과 서체 방향을 비교해 보세요</p>
        {directions.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`dswitch__opt ${d.id === direction ? 'is-active' : ''}`}
            aria-pressed={d.id === direction}
            onClick={() => setDirection(d.id)}
          >
            <span className="dswitch__swatch" aria-hidden="true">
              {d.swatch.map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </span>
            <span>
              <strong>
                {d.id.toUpperCase()} · {d.name}
              </strong>
              <small>{d.ko}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Direction = 'a' | 'b' | 'c';

export const directions: { id: Direction; name: string; ko: string; swatch: [string, string, string] }[] = [
  { id: 'a', name: 'Floodlight', ko: '야간 경기장', swatch: ['#0b0d0b', '#f1f1eb', '#c6ff33'] },
  { id: 'b', name: 'Matchday Paper', ko: '경기 프로그램북', swatch: ['#0f2a20', '#f3efe6', '#ff5b1f'] },
  { id: 'c', name: 'Club Navy', ko: '클래식 클럽', swatch: ['#0a1430', '#f4f6fa', '#e9c25b'] },
];

const STORAGE_KEY = 'meister-direction';

type Ctx = { direction: Direction; setDirection: (d: Direction) => void };
const DirectionContext = createContext<Ctx>({ direction: 'a', setDirection: () => {} });

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [direction, setDir] = useState<Direction>('a');

  useEffect(() => {
    // index.html 의 인라인 스크립트가 첫 페인트 전에 data-direction 을 이미 설정해 둡니다.
    const current = document.documentElement.dataset.direction as Direction | undefined;
    if (current && current !== 'a') setDir(current);
  }, []);

  const setDirection = useCallback((d: Direction) => {
    setDir(d);
    document.documentElement.dataset.direction = d;
    try {
      localStorage.setItem(STORAGE_KEY, d);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new CustomEvent('meister:direction', { detail: d }));
  }, []);

  return <DirectionContext.Provider value={{ direction, setDirection }}>{children}</DirectionContext.Provider>;
}

export const useDirection = () => useContext(DirectionContext);

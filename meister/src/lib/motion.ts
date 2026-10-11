import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect } from 'react';

export const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** SSR 에서 경고 없이 layout effect 를 쓰기 위한 훅 */
export const useIsoLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const canHover = () => isBrowser && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const isNarrow = () => isBrowser && window.matchMedia('(max-width: 860px)').matches;

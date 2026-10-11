import Lenis from 'lenis';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, prefersReducedMotion, ScrollTrigger } from './motion';

let lenis: Lenis | null = null;

/** Lenis 가 켜져 있으면 부드럽게, 아니면 네이티브로 스크롤합니다. */
export function scrollToTarget(target: string | HTMLElement | number, opts: { immediate?: boolean } = {}) {
  const offset = -(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72) - 8;
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : offset, immediate: opts.immediate, duration: 1.1 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export function SmoothScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    document.documentElement.classList.add('lenis');
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    // 라우트가 바뀌면 맨 위로, 해시가 있으면 해당 섹션으로 이동합니다.
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    const run = () => {
      const el = id ? document.getElementById(id) : null;
      if (el) scrollToTarget(el, { immediate: true });
      else scrollToTarget(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(run));
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

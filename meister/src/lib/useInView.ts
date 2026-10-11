import { useEffect, useRef, useState } from 'react';

/** 요소가 화면에 들어오면 true. once=true 이면 한 번만 바뀝니다. */
export function useInView<T extends Element>(opts: { threshold?: number; rootMargin?: string; once?: boolean } = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = opts;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView] as const;
}

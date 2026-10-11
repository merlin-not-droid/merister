import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../content/site';
import { startScroll, stopScroll } from '../lib/SmoothScroll';
import { Logo } from './Logo';
import { MatchClock } from './MatchClock';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 320);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) {
      startScroll();
      return;
    }
    stopScroll();
    const first = menuRef.current?.querySelector<HTMLElement>('a');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <div className="header__inner">
          <Link to="/" className="header__logo" aria-label="Meister 홈">
            <Logo />
          </Link>
          <nav className="header__nav" aria-label="주요 메뉴">
            <ul role="list">
              {nav.slice(0, 4).map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="nav-link">
                    <span className="nav-link__en">{item.label}</span>
                    <span className="nav-link__ko">{item.ko}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__actions">
            <MatchClock />
            <Link to="/contact" className="header__cta">
              협업 문의
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="header__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" ref={menuRef} className={`mmenu surface-ink ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="모바일 메뉴" className="mmenu__nav">
          <ul role="list">
            {nav.map((item, i) => (
              <li key={item.to} style={{ ['--i' as string]: i }}>
                <NavLink to={item.to} className="mmenu__link">
                  <span className="mmenu__no mono">0{i + 1}</span>
                  <span className="mmenu__en display">{item.label}</span>
                  <span className="mmenu__ko">{item.ko}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mmenu__foot mono">Sports Marketing Agency — Meister</p>
      </div>
    </>
  );
}

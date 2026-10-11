/** 임시 워드마크. 로고 확정 전까지 사용합니다. [자료 필요] 로고 원본(SVG) */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`} aria-label="Meister">
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <rect x="1" y="1" width="30" height="30" rx="0" fill="none" stroke="currentColor" strokeWidth="2" className="logo__frame" />
          <path d="M7 24V8l9 10 9-10v16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="miter" />
          <circle cx="16" cy="24.5" r="2.3" className="logo__dot" />
        </svg>
      </span>
      <span className="logo__word" aria-hidden="true">
        MEISTER
      </span>
    </span>
  );
}

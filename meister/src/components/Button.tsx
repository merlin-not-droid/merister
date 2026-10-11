import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'ghost' | 'text';

type Props = {
  to: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  className?: string;
};

export function ButtonLink({ to, children, variant = 'primary', icon = true, className = '' }: Props) {
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowUpRight size={18} strokeWidth={2} />
          <ArrowUpRight size={18} strokeWidth={2} />
        </span>
      )}
    </>
  );
  const cls = `btn btn--${variant} ${className}`;
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <a className={cls} href={to} {...(to.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link className={cls} to={to}>
      {content}
    </Link>
  );
}

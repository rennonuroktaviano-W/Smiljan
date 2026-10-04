import type { ReactNode } from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'cream';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary:
    'bg-maroon text-cream shadow-lift hover:bg-maroon-deep hover:-translate-y-0.5',
  accent:
    'bg-saffron text-espresso shadow-lift hover:bg-saffron-soft hover:-translate-y-0.5',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5',
  ghost: 'text-ink hover:bg-ink/8',
  cream:
    'bg-cream text-espresso shadow-lift hover:bg-white hover:-translate-y-0.5'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base'
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders an anchor. Localised through next-intl unless `external`. */
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  name?: string;
  value?: string;
  form?: string;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'data-state'?: string;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  external,
  target,
  rel,
  ...buttonProps
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      const isAbsolute = /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          className={classes}
          {...(isAbsolute
            ? { target: target ?? '_blank', rel: rel ?? 'noopener noreferrer' }
            : { target, rel })}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

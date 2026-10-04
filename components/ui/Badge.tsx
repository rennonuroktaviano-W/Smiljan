import type { ReactNode } from 'react';

import type { AccentKey } from './accent';
import { accentOf } from './accent';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  accent?: AccentKey;
  /** `solid` for filled pills, `soft` for the tinted outline variant. */
  tone?: 'solid' | 'soft';
  className?: string;
};

export function Badge({
  children,
  accent = 'maroon',
  tone = 'soft',
  className
}: BadgeProps) {
  const palette = accentOf(accent);

  return (
    <span
      className={cn(
        'label-caps inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 leading-none',
        tone === 'solid' ? palette.solid : palette.soft,
        className
      )}
    >
      {children}
    </span>
  );
}

/** Small square swatch used beside category labels. */
export function BadgeDot({ accent }: { accent: AccentKey }) {
  return (
    <span
      aria-hidden="true"
      className={cn('size-1.5 shrink-0 rounded-full', accentOf(accent).bar)}
    />
  );
}

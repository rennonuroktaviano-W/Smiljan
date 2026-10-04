import type { ReactNode } from 'react';

import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Rendered on the opposite side of a two-column header. */
  action?: ReactNode;
  /** `cream` for use on dark accent blocks. */
  tone?: 'ink' | 'cream';
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  tone = 'ink',
  className,
  id
}: SectionHeadingProps) {
  const isCream = tone === 'cream';

  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className
      )}
    >
      <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p
            className={cn(
              'label-caps mb-4 flex items-center gap-3',
              align === 'center' && 'justify-center',
              isCream ? 'text-saffron-soft' : 'text-maroon'
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'h-px w-8',
                isCream ? 'bg-saffron-soft' : 'bg-maroon'
              )}
            />
            {eyebrow}
          </p>
        ) : null}

        <h2
          id={id}
          className={cn(
            'text-display-md leading-[1.05]',
            isCream ? 'text-cream' : 'text-ink'
          )}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={cn(
              'mt-5 text-base leading-relaxed sm:text-lg',
              isCream ? 'text-cream/75' : 'text-ink-muted'
            )}
          >
            {description}
          </p>
        ) : null}
      </Reveal>

      {action ? (
        <Reveal delay={120} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}

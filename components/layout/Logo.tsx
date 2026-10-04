import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  /** Hides the wordmark, leaving just the mark — used in tight spaces. */
  markOnly?: boolean;
  tone?: 'ink' | 'cream';
};

/**
 * Smiljan mark: a cup seen from above, drawn as concentric rings inside a
 * circle. Rendered inline so it inherits colour and needs no extra request.
 */
export function Logo({ className, markOnly = false, tone = 'ink' }: LogoProps) {
  const isCream = tone === 'cream';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'relative grid size-9 shrink-0 place-items-center rounded-full',
          isCream ? 'bg-cream' : 'bg-espresso'
        )}
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-6"
          fill="none"
          stroke={isCream ? 'var(--color-espresso)' : 'var(--color-saffron)'}
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="16" cy="16" r="9.5" />
          <circle cx="16" cy="16" r="5" />
          <path d="M16 6.5v-3M25.5 16h3" opacity="0.5" />
        </svg>
      </span>

      {markOnly ? null : (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-xl font-semibold tracking-[0.16em]',
              isCream ? 'text-cream' : 'text-ink'
            )}
          >
            SMILJAN
          </span>
          <span
            className={cn(
              'label-caps mt-1 text-[0.5rem]',
              isCream ? 'text-cream/55' : 'text-ink-muted'
            )}
          >
            Coffee
          </span>
        </span>
      )}
    </span>
  );
}

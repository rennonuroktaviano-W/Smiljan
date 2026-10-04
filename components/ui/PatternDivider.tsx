import { cn } from '@/lib/utils';

type PatternDividerProps = {
  variant?: 'diamond' | 'dots' | 'weave' | 'rule';
  tone?: 'ink' | 'cream';
  /** Pin to the top or bottom edge of the parent instead of sitting inline. */
  position?: 'inline' | 'top' | 'bottom';
  className?: string;
};

/**
 * Geometric separator inspired by classic tilework and woven textiles
 * (PRD 4.4). Purely decorative, so it is hidden from assistive tech.
 */
export function PatternDivider({
  variant = 'diamond',
  tone = 'ink',
  position = 'inline',
  className
}: PatternDividerProps) {
  const toneClass = tone === 'cream' ? 'text-cream/25' : 'text-ink/15';

  const placement =
    position === 'top'
      ? 'absolute inset-x-0 top-0'
      : position === 'bottom'
        ? 'absolute inset-x-0 bottom-0'
        : '';

  if (variant === 'rule') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'h-px w-full',
          tone === 'cream' ? 'bg-cream/20' : 'bg-line',
          placement,
          className
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-4 w-full',
        toneClass,
        variant === 'diamond' && 'pattern-diamond',
        variant === 'dots' && 'pattern-dots',
        variant === 'weave' && 'pattern-weave',
        placement,
        className
      )}
    />
  );
}

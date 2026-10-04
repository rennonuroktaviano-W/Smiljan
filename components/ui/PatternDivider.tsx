import { cn } from '@/lib/utils';

type PatternDividerProps = {
  variant?: 'diamond' | 'dots' | 'weave' | 'rule';
  tone?: 'ink' | 'cream';
  className?: string;
};

/**
 * Geometric separator inspired by classic tilework and woven textiles
 * (PRD 4.4). Purely decorative, so it is hidden from assistive tech.
 */
export function PatternDivider({
  variant = 'diamond',
  tone = 'ink',
  className
}: PatternDividerProps) {
  const toneClass = tone === 'cream' ? 'text-cream/25' : 'text-ink/15';

  if (variant === 'rule') {
    return (
      <div
        aria-hidden="true"
        className={cn('h-px w-full', tone === 'cream' ? 'bg-cream/20' : 'bg-line', className)}
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
        className
      )}
    />
  );
}

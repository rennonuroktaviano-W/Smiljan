import { cn } from '@/lib/utils';

type MarqueeProps = {
  /** Repeat this to build the scrolling track. */
  items: string[];
  /** Seconds for one full loop. Longer reads calmer. */
  duration?: number;
  reverse?: boolean;
  tone?: 'ink' | 'cream' | 'saffron' | 'maroon';
  className?: string;
};

const tones = {
  ink: 'text-ink',
  cream: 'text-cream',
  saffron: 'text-saffron',
  maroon: 'text-maroon'
} as const;

/**
 * Infinite text marquee used as a section separator (PRD 4.4).
 * The track is duplicated and the animation translates exactly -50%, so the
 * loop is seamless. The copy is announced once by screen readers.
 */
export function Marquee({
  items,
  duration = 38,
  reverse = false,
  tone = 'ink',
  className
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden py-5 select-none',
        className
      )}
    >
      <div
        className="flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
        style={{
          width: 'max-content',
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`
        }}
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span
              className={cn(
                'font-display text-3xl whitespace-nowrap sm:text-4xl',
                tones[tone]
              )}
              {...(index >= items.length ? { 'aria-hidden': true } : {})}
            >
              {item}
            </span>
            <span
              aria-hidden="true"
              className="size-2 rotate-45 bg-current opacity-60"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

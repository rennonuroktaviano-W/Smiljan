import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ArchFrameProps = {
  children: ReactNode;
  /** `arch` rounds the top only, `blob` is fully organic, `circle` is round. */
  shape?: 'arch' | 'blob' | 'circle' | 'leaf';
  className?: string;
  /** Decorative rings drawn behind the frame. */
  rings?: boolean;
};

const shapes = {
  arch: 'rounded-t-[50%] rounded-b-[1.5rem]',
  blob: 'rounded-[58%_42%_46%_54%/52%_44%_56%_48%]',
  circle: 'rounded-full',
  leaf: 'rounded-[50%_0_50%_0]'
};

/**
 * Organic photo frames — PRD 4.4 asks for arches, circles and blobs instead
 * of plain rectangles. The shape is drawn on the wrapper so the image can
 * stay a normal rectangle underneath, which keeps `next/image` simple.
 */
export function ArchFrame({
  children,
  shape = 'arch',
  className,
  rings = false
}: ArchFrameProps) {
  return (
    <div className={cn('relative isolate', className)}>
      {rings ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 -z-10 rounded-full border border-ink/10 md:-inset-6"
        />
      ) : null}

      <div
        className={cn(
          'relative overflow-hidden shadow-plate',
          shapes[shape]
        )}
      >
        {children}
      </div>
    </div>
  );
}

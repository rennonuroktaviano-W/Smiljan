import Image from 'next/image';

import { cn } from '@/lib/utils';

type PlateProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** `sizes` hint for the responsive raster pipeline. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Overrides the intrinsic ratio, e.g. "4/5". */
  ratio?: string;
  /** Object position for focal-point control. */
  position?: string;
};

/**
 * Image wrapper used everywhere a photo appears.
 *
 * Placeholder art ships as SVG, which `next/image` cannot optimise, so those
 * fall back to a plain `<img>`. Swap the file for a real photo of the same name
 * and the optimised pipeline takes over with no code change. The box always
 * reserves the aspect ratio up front, so nothing shifts while loading.
 */
export function Plate({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  imgClassName,
  ratio,
  position
}: PlateProps) {
  const isVector = src.endsWith('.svg');

  return (
    <div
      className={cn('relative overflow-hidden bg-bg-alt', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {isVector ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn('size-full object-cover', imgClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes ?? '(min-width: 1024px) 50vw, 100vw'}
          priority={priority}
          className={cn('object-cover', imgClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
      )}
    </div>
  );
}

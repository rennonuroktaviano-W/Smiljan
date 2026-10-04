import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  size?: 'default' | 'wide' | 'narrow';
  className?: string;
};

const sizes = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-[90rem]'
};

/** Shared horizontal rhythm for every page section. */
export function Container({
  children,
  as: Tag = 'div',
  size = 'default',
  className
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', sizes[size], className)}>
      {children}
    </Tag>
  );
}

type SectionProps = {
  children: ReactNode;
  /** `plain` = page background, `alt` = raised cream, `accent` = colour block. */
  tone?: 'plain' | 'alt' | 'ink' | 'maroon' | 'olive' | 'teal' | 'terracotta';
  className?: string;
  id?: string;
  /** Vertical rhythm. */
  spacing?: 'sm' | 'md' | 'lg';
};

const tones = {
  plain: 'bg-bg text-ink',
  alt: 'bg-bg-alt text-ink',
  ink: 'bg-espresso text-cream',
  maroon: 'bg-maroon text-cream',
  olive: 'bg-olive text-cream',
  teal: 'bg-teal text-cream',
  terracotta: 'bg-terracotta-deep text-cream'
} as const;

const spacing = {
  sm: 'py-14 sm:py-16',
  md: 'py-20 sm:py-24 lg:py-28',
  lg: 'py-24 sm:py-32 lg:py-40'
} as const;

export function Section({
  children,
  tone = 'plain',
  className,
  id,
  spacing: rhythm = 'md'
}: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], spacing[rhythm], className)}>
      {children}
    </section>
  );
}

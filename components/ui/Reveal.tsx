'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { canObserve, observeReveal, unobserveReveal } from '@/lib/reveal-observer';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
};

/**
 * Fade-and-rise reveal on scroll (PRD 4.5).
 *
 * All reveals share a single IntersectionObserver (see lib/reveal-observer).
 * Elements start hidden in CSS, so when JS never runs the layout's noscript
 * rule reveals them and when the observer is unsupported the callback below
 * schedules the reveal on the next frame instead.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div'
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support: skip straight to visible rather than risk the
    // content staying hidden forever.
    if (!canObserve()) {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const reveal = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;

      setShown(true);
      unobserveReveal(node);
    };

    observeReveal(node, reveal);

    return () => unobserveReveal(node);
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal={shown ? 'in' : ''}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
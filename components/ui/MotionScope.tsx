'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';

/**
 * Scopes motion.js's `reducedMotion="user"` handling (PRD 4.5) to the pages
 * that actually use motion components. It used to live in the root layout's
 * Providers, but importing `motion/react` there pulled the whole library
 * into every page's bundle (including the home page, which uses CSS
 * animations only) — Lighthouse flagged it as ~130 KB of 99% unused JS.
 */
export function MotionScope({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

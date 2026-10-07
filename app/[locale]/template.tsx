'use client';

import { motion } from 'motion/react';

/**
 * Soft page transition — PRD 4.5.
 *
 * A template remounts on every navigation, so this plays once per route
 * change: a short fade with a small lift, matching the scroll-reveal easing
 * used across the site. `MotionConfig reducedMotion="user"` (see
 * Providers) strips the transform for visitors who ask for less motion,
 * leaving only the fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      data-page-transition=""
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

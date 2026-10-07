'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {/*
        One place to honour prefers-reduced-motion for every framer-motion
        component in the app (PRD 4.5) — the CSS block in globals.css cannot
        reach transforms that motion drives from JS.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}

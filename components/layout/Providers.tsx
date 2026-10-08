'use client';

import type { ReactNode } from 'react';
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
        Motion's reducedMotion="user" scope lives in components/ui/MotionScope,
        applied per page that uses motion — keeping `motion/react` out of this
        root provider keeps it out of every page's bundle.
      */}
      {children}
    </ThemeProvider>
  );
}

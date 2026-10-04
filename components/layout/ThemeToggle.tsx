'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
  tone?: 'ink' | 'cream';
};

/**
 * Light / dark switch. The icon is only rendered after mount, because
 * next-themes cannot know the resolved theme during SSR — rendering both
 * would produce a hydration mismatch.
 */
export function ThemeToggle({ tone = 'ink' }: ThemeToggleProps) {
  const t = useTranslations('nav');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const isCream = tone === 'cream';

  return (
    <button
      type="button"
      aria-label={t('toggleTheme')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'grid size-10 place-items-center rounded-full border transition-colors duration-300',
        isCream
          ? 'border-cream/30 text-cream hover:bg-cream/10'
          : 'border-ink/15 text-ink hover:bg-ink/5'
      )}
    >
      {mounted ? (
        isDark ? (
          <Moon className="size-4" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Sun className="size-4" strokeWidth={1.75} aria-hidden="true" />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}

'use client';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const labels: Record<Locale, string> = { id: 'ID', en: 'EN' };

/** Switches language while keeping the visitor on the same page. */
export function LocaleSwitcher({ tone = 'ink' }: { tone?: 'ink' | 'cream' }) {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const isCream = tone === 'cream';

  return (
    <div
      role="group"
      aria-label={t('switchLocale')}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border p-0.5',
        isCream ? 'border-cream/30' : 'border-ink/15'
      )}
    >
      {routing.locales.map((candidate) => {
        const active = candidate === locale;

        return (
          <button
            key={candidate}
            type="button"
            lang={candidate}
            aria-current={active ? 'true' : undefined}
            onClick={() => router.replace(pathname, { locale: candidate })}
            className={cn(
              'label-caps rounded-full px-2.5 py-1.5 transition-colors duration-300',
              active
                ? isCream
                  ? 'bg-cream text-espresso'
                  : 'bg-espresso text-cream'
                : isCream
                  ? 'text-cream/70 hover:text-cream'
                  : 'text-ink-muted hover:text-ink'
            )}
          >
            {labels[candidate]}
          </button>
        );
      })}
    </div>
  );
}

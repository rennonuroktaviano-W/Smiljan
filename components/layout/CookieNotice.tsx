'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '../ui/Button';

const STORAGE_KEY = 'smiljan-notice-ack';

/**
 * Cookie / analytics notice — PRD 5.9.
 *
 * Shown once until dismissed, then remembered in `localStorage`. The copy is
 * honest: analytics on this site are cookieless and the only thing stored on
 * the device is the visitor's own preferences (theme and language), so there
 * is nothing to configure beyond acknowledging it.
 */
export function CookieNotice() {
  const t = useTranslations('common.notice');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // localStorage only exists in the browser, so this runs once right
      // after hydration — a single setState here is the standard way to gate
      // UI on it.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of an external store after mount
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage unavailable (private mode): stay quiet instead of nagging.
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Nothing to do — the bar simply returns on the next visit.
    }
  }

  return (
    <aside
      aria-label={t('title')}
      className="fixed bottom-5 left-5 right-24 z-40 max-w-lg rounded-card border border-cream/15 bg-espresso/95 p-5 text-cream shadow-plate backdrop-blur-md sm:right-auto"
    >
      <p className="label-caps text-saffron">{t('title')}</p>

      <p className="mt-2 text-sm leading-relaxed text-cream/75">{t('body')}</p>

      <Button type="button" variant="accent" size="sm" onClick={dismiss} className="mt-4">
        {t('dismiss')}
      </Button>
    </aside>
  );
}

'use client';

import { Clock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { getOpenStatus, type OpenStatus } from '@/lib/opening-hours';
import { timeZone } from '@/data/site';
import { cn, formatTime } from '@/lib/utils';

/**
 * Live "open now / closed" indicator (PRD F-04).
 *
 * Pages are statically generated, so the status has to be resolved in the
 * browser — computing it on the server would freeze whatever time the build
 * happened to run. Until the first client tick we render the same neutral
 * pill, which keeps server and client markup identical.
 */
export function OpenStatus({ showDetail = true }: { showDetail?: boolean }) {
  const t = useTranslations('footer');
  const locale = useLocale();

  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const read = () => setStatus(getOpenStatus(new Date()));

    read();
    // Re-check every minute so a page left open stays honest.
    const timer = window.setInterval(read, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  if (!status) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-2">
        <Clock className="size-3.5" aria-hidden="true" />
        <span className="label-caps">&nbsp;</span>
      </span>
    );
  }

  const detail = status.next
    ? status.isOpen
      ? t('closesAt', { time: status.next.time })
      : t('opensAt', { time: status.next.time })
    : '';

  return (
    <span
      className={cn(
        'inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full px-4 py-2',
        status.isOpen
          ? 'bg-olive/12 text-olive'
          : 'bg-maroon/10 text-maroon'
      )}
    >
      <span className="relative flex size-2.5 shrink-0">
        {status.isOpen ? (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-olive opacity-60" />
        ) : null}
        <span
          className={cn(
            'relative inline-flex size-2.5 rounded-full',
            status.isOpen ? 'bg-olive' : 'bg-maroon'
          )}
        />
      </span>

      <span className="label-caps">
        {status.isOpen ? t('openNow') : t('closedNow')}
      </span>

      {showDetail && status.next ? (
        <span className="text-sm opacity-70">
          {detail} ·{' '}
          {formatTime(status.next.time, locale, timeZone)}
        </span>
      ) : null}
    </span>
  );
}

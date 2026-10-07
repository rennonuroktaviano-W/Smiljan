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
 * happened to run. Until the first client tick the badge renders a neutral
 * placeholder inside the same live region, so server and client markup match
 * and the resolved state is still announced.
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

  /*
    Formatted once here so the sentence stays translatable ("Closes at {time}")
    while the clock itself follows the visitor's locale.
  */
  const nextTime =
    status?.next && showDetail
      ? formatTime(status.next.time, locale, timeZone)
      : null;

  const detail =
    status && nextTime
      ? status.isOpen
        ? t('closesAt', { time: nextTime })
        : t('opensAt', { time: nextTime })
      : '';

  /*
    The live region must stay mounted across the unresolved → resolved swap,
    otherwise the first announcement never fires. Hence one wrapper, two
    inner branches, and the placeholder only ever shows before the first tick.
  */
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        'inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full px-4 py-2',
        !status && 'border border-ink/15',
        status?.isOpen ? 'bg-olive/12 text-olive' : null,
        status && !status.isOpen ? 'bg-maroon/10 text-maroon' : null
      )}
    >
      {status ? (
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
      ) : (
        <Clock className="size-3.5 shrink-0" aria-hidden="true" />
      )}

      <span className="label-caps">
        {status
          ? status.isOpen
            ? t('openNow')
            : t('closedNow')
          : '\u00a0'}
      </span>

      {detail ? <span className="text-sm opacity-70">{detail}</span> : null}
    </span>
  );
}

import { getLocale, getTranslations } from 'next-intl/server';

import { openingHours, timeZone } from '@/data/site';
import { getZonedParts, weekdayKey } from '@/lib/opening-hours';
import { cn, formatTime } from '@/lib/utils';

type HoursTableProps = {
  /** Renders the compact two-column layout used on the home page. */
  compact?: boolean;
  /** Override the day treated as "today" — handy for visual testing. */
  highlightDay?: number;
};

/**
 * Weekly opening hours table (PRD F-04).
 *
 * "Today" is resolved in the café's own timezone rather than the server's, so
 * the highlighted row is right for Jakarta no matter where the build ran. The
 * static shell still renders correctly during prerender; the routes that use
 * this opt into hourly ISR so the highlight cannot go stale.
 */
export async function HoursTable({ compact = false, highlightDay }: HoursTableProps) {
  const t = await getTranslations('common');
  const tFooter = await getTranslations('footer');
  const locale = await getLocale();

  const today = highlightDay ?? getZonedParts(new Date()).day;

  const rows = openingHours.map((entry) => {
    const closed = entry.open === null || entry.close === null;
    const from = closed || !entry.open ? null : formatTime(entry.open, locale, timeZone);
    const to = closed || !entry.close ? null : formatTime(entry.close, locale, timeZone);

    return {
      day: entry.day,
      key: weekdayKey(entry.day),
      isToday: entry.day === today,
      label: closed
        ? t('closed')
        : // Intl already localises the separator, so no manual join is needed.
          `${from} – ${to}`
    };
  });

  if (compact) {
    return (
      <dl className="divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <div
            key={row.day}
            className={cn(
              'flex items-baseline justify-between gap-4 py-3',
              row.isToday && 'text-maroon'
            )}
          >
            <dt className="label-caps">
              {t(`daysShort.${row.key}`)}
              {row.isToday ? (
                <span className="ml-2 size-1.5 rounded-full bg-maroon align-middle" />
              ) : null}
            </dt>
            <dd
              className={cn(
                'font-display text-sm tabular-nums',
                !row.isToday && 'text-ink-muted'
              )}
            >
              {row.label}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{tFooter('hours')}</caption>
      <tbody className="divide-y divide-line">
        {rows.map((row) => (
          <tr key={row.day} className={cn(row.isToday && 'text-maroon')}>
            <th
              scope="row"
              className="label-caps py-4 pr-4 font-medium"
            >
              {t(`days.${row.key}`)}
              {row.isToday ? (
                <span className="ml-2 size-1.5 rounded-full bg-maroon align-middle" />
              ) : null}
            </th>
            <td
              className={cn(
                'py-4 text-right font-display text-sm tabular-nums',
                !row.isToday && 'text-ink-muted'
              )}
            >
              {row.label}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
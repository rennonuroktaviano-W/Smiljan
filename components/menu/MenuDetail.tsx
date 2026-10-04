'use client';

import { Clock, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import type { LocaleCode } from '@/data/shared';
import type { MenuItem } from '@/data/menu';
import { whatsappLink } from '@/lib/whatsapp';
import { formatIDR } from '@/lib/utils';

import { accentOf } from '../ui/accent';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Plate } from '../ui/Plate';
import { WhatsappIcon } from '../ui/BrandIcons';

type MenuDetailProps = {
  item: MenuItem | null;
  onClose: () => void;
  locale: LocaleCode;
};

function pick(text: Record<string, string>, locale: string): string {
  return text[locale] ?? text.id;
}

/**
 * Item detail dialog (PRD 5.3).
 *
 * Uses the native `<dialog>` element rather than a div with a hand-rolled
 * overlay: focus trapping, inertness of the page behind it, Escape-to-close
 * and the top-layer stacking all come from the browser, which is both less code
 * and more reliable across screen readers.
 */
export function MenuDetail({ item, onClose, locale }: MenuDetailProps) {
  const t = useTranslations('menu');
  const tDetail = useTranslations('menu.detail');
  const dialogRef = useRef<HTMLDialogElement>(null);

  // `showModal` and `close` must only run on the client, and the element has to
  // exist before it can be opened — hence the state check on `item` too.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (item && !dialog.open) {
      dialog.showModal();
    } else if (!item && dialog.open) {
      dialog.close();
    }
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // Clicks land on the dialog element itself when the backdrop is hit.
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby="menu-detail-title"
      className="m-auto max-h-[90dvh] w-[min(64rem,calc(100vw-2rem))] overflow-visible border-0 bg-transparent p-0 backdrop:bg-espresso/70 backdrop:backdrop-blur-sm"
    >
      {item ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-[90dvh] overflow-y-auto rounded-card bg-bg shadow-lift"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={tDetail('close')}
            className="absolute top-4 end-4 z-10 grid size-10 place-items-center rounded-full bg-surface/90 text-ink shadow-lift backdrop-blur transition-colors hover:bg-surface"
          >
            <X className="size-4" aria-hidden="true" />
          </button>

          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative md:min-h-full">
              <Plate
                src={item.image}
                alt={pick(item.description, locale)}
                width={800}
                height={800}
                sizes="(min-width: 768px) 30rem, 100vw"
                className="h-64 w-full md:h-full md:min-h-[26rem]"
              />

              {item.badges?.length ? (
                <span className="absolute top-4 start-4 flex flex-wrap gap-2">
                  {item.badges.map((badge) => (
                    <Badge key={badge} accent={item.accent} tone="solid">
                      {t(`badges.${badge}`)}
                    </Badge>
                  ))}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col p-7 sm:p-9">
              <p className="label-caps text-maroon">
                {t(`categories.${item.category}`)}
              </p>

              <h2
                id="menu-detail-title"
                className="mt-3 font-display text-3xl leading-tight"
              >
                {pick(item.name, locale)}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {item.longDescription
                  ? pick(item.longDescription, locale)
                  : pick(item.description, locale)}
              </p>

              <dl className="mt-6 space-y-4 border-t border-line pt-6 text-sm">
                {item.tastingNotes ? (
                  <div>
                    <dt className="label-caps text-ink-muted">
                      {tDetail('tastingNotes')}
                    </dt>
                    <dd className="mt-1.5">{pick(item.tastingNotes, locale)}</dd>
                  </div>
                ) : null}

                {item.brewTime ? (
                  <div>
                    <dt className="label-caps text-ink-muted">
                      {tDetail('brewTime')}
                    </dt>
                    <dd className="mt-1.5 flex items-center gap-2">
                      <Clock className="size-3.5 text-ink-muted" aria-hidden="true" />
                      {tDetail('minutes', { minutes: item.brewTime })}
                    </dd>
                  </div>
                ) : null}

                {item.sizes?.length ? (
                  <div>
                    <dt className="label-caps text-ink-muted">
                      {tDetail('sizes')}
                    </dt>
                    <dd>
                      <ul className="mt-1.5 space-y-1.5">
                        {item.sizes.map((size) => (
                          <li
                            key={size.label.en}
                            className="flex items-baseline justify-between gap-4"
                          >
                            <span>{pick(size.label, locale)}</span>
                            <span className="font-display tabular-nums">
                              {formatIDR(size.price, locale)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-auto pt-8">
                <p className="font-display text-2xl text-maroon">
                  {formatIDR(item.price, locale)}
                </p>

                <Button
                  href={whatsappLink(
                    tDetail('orderMessage', { name: pick(item.name, locale) })
                  )}
                  external
                  variant="primary"
                  size="lg"
                  className="mt-4 w-full"
                >
                  <WhatsappIcon className="size-4" />
                  {tDetail('order')}
                </Button>

                {!item.available ? (
                  <p
                    className={`mt-3 text-center text-xs ${accentOf(item.accent).text}`}
                  >
                    {tDetail('unavailable')}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </dialog>
  );
}
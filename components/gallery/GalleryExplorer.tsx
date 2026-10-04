'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { LocaleCode } from '@/data/shared';
import { galleryCategories, type GalleryCategory, type GalleryItem } from '@/data/gallery';

import { Button } from '../ui/Button';

type Filter = GalleryCategory | 'all';

const filters: Filter[] = ['all', ...galleryCategories];

function pick(text: Record<string, string>, locale: string): string {
  return text[locale] ?? text.id;
}

type GalleryExplorerProps = {
  items: GalleryItem[];
  locale: LocaleCode;
};

/**
 * Masonry gallery with lightbox — PRD 5.6, F-05.
 *
 * CSS multi-column masonry keeps the grid entirely in CSS, so there is no
 * layout measurement in JavaScript and no shift while images decode. The
 * lightbox is a native `<dialog>` for the same reason as the menu detail: focus
 * trapping and Escape handling come from the browser.
 */
export function GalleryExplorer({ items, locale }: GalleryExplorerProps) {
  const t = useTranslations('galeri');
  const tLightbox = useTranslations('galeri.lightbox');

  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [filter, setFilter] = useState<Filter>('all');
  const [index, setIndex] = useState<number | null>(null);

  const visible =
    filter === 'all'
      ? items
      : items.filter((item) => item.category === filter);

  const current = index === null ? null : (visible[index] ?? null);

  const close = useCallback(() => setIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setIndex((previous) => {
        if (previous === null || visible.length === 0) return previous;

        return (previous + delta + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  // Keep the dialog in step with the selection.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (current && !dialog.open) {
      dialog.showModal();
    } else if (!current && dialog.open) {
      dialog.close();
    }
  }, [current]);

  // Arrow-key paging, but only while the lightbox is actually open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || index === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };

    dialog.addEventListener('keydown', onKeyDown);

    return () => dialog.removeEventListener('keydown', onKeyDown);
  }, [index, step]);

  // Send focus back to the thumbnail that opened the lightbox.
  const openerRef = useRef<number | null>(null);

  useEffect(() => {
    if (index === null && openerRef.current !== null) {
      buttonRefs.current[openerRef.current]?.focus();
      openerRef.current = null;
    }
  }, [index]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((value) => {
          const isActive = filter === value;
          const count =
            value === 'all'
              ? items.length
              : items.filter((item) => item.category === value).length;

          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setFilter(value);
                setIndex(null);
              }}
              className={`label-caps rounded-full border px-5 py-3 transition-all duration-300 ${
                isActive
                  ? 'border-maroon bg-maroon text-cream shadow-lift'
                  : 'border-line text-ink-muted hover:border-ink/30 hover:text-ink'
              }`}
            >
              {value === 'all' ? t('all') : t(`categories.${value}`)}
              <span className={`ms-2 tabular-nums ${isActive ? 'opacity-70' : 'opacity-50'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {t('count', { count: visible.length })}
      </p>

      {visible.length > 0 ? (
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {visible.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              ref={(node) => {
                buttonRefs.current[itemIndex] = node;
              }}
              onClick={() => {
                openerRef.current = itemIndex;
                setIndex(itemIndex);
              }}
              aria-haspopup="dialog"
              className="group block w-full break-inside-avoid overflow-hidden rounded-card bg-bg-alt"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={pick(item.alt, locale)}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <span className="sr-only">{pick(item.caption, locale)}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-ink-muted">{t('empty')}</p>
      )}

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        aria-label={t('lightbox.close')}
        className="m-auto w-[min(72rem,calc(100vw-1.5rem))] max-w-none border-0 bg-transparent p-0 backdrop:bg-espresso/90 backdrop:backdrop-blur-md"
      >
        {current ? (
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.src}
                  alt={pick(current.alt, locale)}
                  width={current.width}
                  height={current.height}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="mx-auto max-h-[72dvh] w-auto object-contain"
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 text-cream">
              <p className="min-w-0 truncate text-sm">
                {pick(current.caption, locale)}
              </p>

              <p className="label-caps shrink-0 text-cream/60">
                {tLightbox('counter', {
                  current: (index ?? 0) + 1,
                  total: visible.length
                })}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                onClick={() => step(-1)}
                variant="cream"
                size="sm"
                aria-label={tLightbox('previous')}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </Button>

              <Button
                type="button"
                onClick={() => step(1)}
                variant="cream"
                size="sm"
                aria-label={tLightbox('next')}
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>

              <Button
                type="button"
                onClick={close}
                variant="ghost"
                size="sm"
                className="text-cream hover:bg-cream/10"
              >
                <X className="size-4" aria-hidden="true" />
                {tLightbox('close')}
              </Button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import {
  categoryAccent,
  menuCategories,
  type AccentName,
  type BadgeName,
  type MenuCategory,
  type MenuItem
} from '@/data/menu';
import { whatsappLink } from '@/lib/whatsapp';
import { cn, formatIDR } from '@/lib/utils';
import type { LocaleCode } from '@/data/shared';

import { accentOf } from '../ui/accent';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { MenuDetail } from './MenuDetail';
import { Plate } from '../ui/Plate';
import { WhatsappIcon } from '../ui/BrandIcons';

type Filter = MenuCategory | 'all';

const filters: Filter[] = ['all', ...menuCategories];

const categoryAccentList: Record<Filter, AccentName> = {
  all: 'maroon',
  ...categoryAccent
};

function pick(text: Record<string, string>, locale: string): string {
  return text[locale] ?? text.id;
}

/**
 * Filterable menu grid (PRD F-01, 5.3).
 *
 * The list is small and entirely static, so filtering happens on the client
 * instead of routing to a new page per category — switching tabs stays instant
 * and there is no extra crawlable URL per category.
 */
export function MenuExplorer({ items }: { items: MenuItem[] }) {
  const t = useTranslations('menu');
  const tDetail = useTranslations('menu.detail');
  const locale = useLocale() as LocaleCode;

  const [active, setActive] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      active === 'all'
        ? items
        : items.filter((item) => item.category === active),
    [active, items]
  );

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );

  return (
    <>
      <Container size="wide" className="mt-12">
        <div
          role="tablist"
          aria-label={t('filterLabel')}
          className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {filters.map((filter) => {
            const isActive = active === filter;
            const accent = accentOf(categoryAccentList[filter]);
            const count =
              filter === 'all'
                ? items.length
                : items.filter((item) => item.category === filter).length;

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={cn(
                  'label-caps shrink-0 snap-start rounded-full border px-5 py-3 transition-all duration-300',
                  isActive
                    ? cn(accent.solid, 'shadow-lift')
                    : 'border-line text-ink-muted hover:border-ink/30 hover:text-ink'
                )}
              >
                {filter === 'all' ? t('all') : t(`categories.${filter}`)}
                <span className={cn('ms-2 tabular-nums', isActive ? 'opacity-70' : 'opacity-50')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="mt-8 text-center text-sm text-ink-muted"
        >
          {t('count', { count: visible.length })}
        </p>
      </Container>

      <Container size="wide" className="mt-10">
        <motion.ul layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <motion.li
                key={item.id}
                id={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index, 8) * 0.04,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="scroll-mt-28"
              >
                <article className="group flex h-full flex-col">
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-haspopup="dialog"
                    className="relative block w-full overflow-hidden rounded-card text-start"
                  >
                    <Plate
                      src={item.image}
                      alt={pick(item.description, locale)}
                      width={800}
                      height={800}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      ratio="4/5"
                      imgClassName={cn(
                        'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105',
                        !item.available && 'opacity-55 grayscale'
                      )}
                    />

                    {!item.available ? (
                      <span className="absolute top-4 end-4">
                        <Badge accent="maroon" tone="solid">
                          {tDetail('unavailable')}
                        </Badge>
                      </span>
                    ) : null}

                    {item.badges?.length ? (
                      <span className="absolute top-4 start-4 flex flex-wrap gap-2">
                        {item.badges.slice(0, 2).map((badge: BadgeName) => (
                          <Badge key={badge} accent={item.accent} tone="solid">
                            {t(`badges.${badge}`)}
                          </Badge>
                        ))}
                      </span>
                    ) : null}
                  </button>

                  <div className="mt-5 flex flex-1 flex-col">
                    <h2 className="font-display text-2xl leading-snug">
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className="text-start transition-colors hover:text-maroon"
                      >
                        {pick(item.name, locale)}
                      </button>
                    </h2>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                      {pick(item.description, locale)}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                      <span className="font-display text-lg text-maroon">
                        {formatIDR(item.price, locale)}
                      </span>

                      <span className="flex items-center gap-3">
                        {item.brewTime ? (
                          <span className="text-xs text-ink-muted">
                            {item.brewTime}′
                          </span>
                        ) : null}
                        <Button
                          href={whatsappLink(
                            tDetail('orderMessage', { name: pick(item.name, locale) })
                          )}
                          external
                          variant="ghost"
                          size="sm"
                          className="text-maroon hover:bg-maroon/10"
                          aria-label={`${tDetail('order')} — ${pick(item.name, locale)}`}
                        >
                          <WhatsappIcon className="size-4" />
                          {tDetail('order')}
                        </Button>
                      </span>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-ink-muted">{t('empty')}</p>
        ) : null}
      </Container>

      <MenuDetail
        item={selected}
        onClose={() => setSelectedId(null)}
        locale={locale}
      />
    </>
  );
}
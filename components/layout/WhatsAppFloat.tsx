'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { whatsappLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

import { WhatsappIcon } from '../ui/BrandIcons';

/**
 * Floating WhatsApp button — the primary conversion path in the PRD (F-02).
 * It stays out of the way on desktop until the visitor starts scrolling, and
 * is always visible on mobile.
 */
export function WhatsAppFloat() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const href = whatsappLink(
    locale === 'en'
      ? 'Hi Smiljan, I would like to ask about your menu.'
      : 'Halo Smiljan, saya mau tanya-tanya soal menu kalian.'
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-state={visible ? 'visible' : 'hidden'}
      className={cn(
        'group fixed right-5 bottom-5 z-40 flex items-center gap-3 rounded-full',
        'bg-olive px-4 py-3.5 text-cream shadow-plate transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:bg-olive-deep focus-visible:outline-olive',
        'max-md:opacity-100',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-6 opacity-0 max-md:hidden'
      )}
    >
      <WhatsappIcon className="size-5 shrink-0" />

      {/*
        The label is always in the accessibility tree — it is only collapsed
        visually, so no separate sr-only copy is needed.
      */}
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[12rem] max-md:hidden">
        {t('floatLabel')}
      </span>
    </a>
  );
}

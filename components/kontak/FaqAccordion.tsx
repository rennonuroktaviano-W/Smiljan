'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import type { LocaleCode } from '@/data/shared';
import { faqs } from '@/data/faq';

import { Container, Section } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

function pick(text: Record<string, string>, locale: string): string {
  return text[locale] ?? text.id;
}

/** FAQ accordion — PRD 5.8. */
export function FaqAccordion() {
  const t = useTranslations('kontak.faq');
  const locale = useLocale() as LocaleCode;

  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <Section tone="alt" spacing="lg">
      <Container size="default">
        <Reveal className="max-w-2xl">
          <p className="label-caps flex items-center gap-3 text-maroon">
            <span aria-hidden="true" className="h-px w-8 bg-maroon" />
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 font-display text-display-md leading-[1.05]">
            {t('title')}
          </h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {faqs.map((faq, index) => {
            const isOpen = open === faq.id;

            return (
              <Reveal as="li" key={faq.id} delay={index * 60}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${faq.id}`}
                    onClick={() => setOpen(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-start"
                  >
                    <span className="font-display text-lg leading-snug text-ink sm:text-xl">
                      {pick(faq.question, locale)}
                    </span>

                    <span
                      aria-hidden="true"
                      className="relative block size-4 shrink-0 text-maroon"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                      <span
                        className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                          isOpen ? 'scale-y-0' : 'scale-y-100'
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-muted">
                        {pick(faq.answer, locale)}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
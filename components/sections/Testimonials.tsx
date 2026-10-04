import { Star } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { testimonials } from '@/data/content';
import { pick } from '@/data/shared';
import { socialProof } from '@/data/site';
import { accentSurface } from '@/components/ui/accent';
import { formatNumber } from '@/lib/utils';

import { Container, Section } from '../ui/Container';
import { PatternDivider } from '../ui/PatternDivider';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

/** Pull-quote wall — PRD 5.2.7. */
export async function Testimonials() {
  const t = await getTranslations('home.testimonials');
  const locale = await getLocale();

  const shown = testimonials.slice(0, 3);

  return (
    <Section tone="surface" spacing="lg" className="relative overflow-hidden">
      <PatternDivider position="top" tone="ink" className="opacity-40" />

      <Container size="wide">
        <SectionHeading
          align="center"
          eyebrow={t('eyebrow')}
          title={t('title')}
        />

        <p className="mx-auto mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted">
          <span className="flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4 text-saffron" fill="currentColor" />
            ))}
          </span>
          <span>
            {socialProof.rating} ·{' '}
            {t('ratingSuffix', {
              count: formatNumber(socialProof.reviewCount, locale)
            })}
          </span>
        </p>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {shown.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 100}>
              <figure
                className={`flex h-full flex-col rounded-card border p-8 ${accentSurface(item.accent)}`}
              >
                <span
                  className="font-display text-5xl leading-none opacity-30"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <blockquote className="mt-4 flex-1 font-display text-lg leading-snug text-ink">
                  {pick(item.quote, locale)}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold uppercase tracking-wider text-cream"
                    aria-hidden="true"
                  >
                    {item.author.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">
                      {item.author}
                    </span>
                    <span className="block truncate text-xs text-ink-muted">
                      {pick(item.role, locale)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
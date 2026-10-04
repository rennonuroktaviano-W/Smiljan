import { Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { site } from '@/data/site';

import { ArchFrame } from '../ui/ArchFrame';
import { Button } from '../ui/Button';
import { Container, Section } from '../ui/Container';
import { Plate } from '../ui/Plate';

/** Short brand narrative on an Olive block — PRD 5.2.4. */
export async function StoryBlock() {
  const t = await getTranslations('home.story');

  return (
    <Section tone="olive" spacing="lg" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pattern-dots absolute inset-0 text-cream opacity-[0.12]"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ArchFrame shape="blob" className="mx-auto max-w-sm lg:mx-0">
              <Plate
                src="/images/gallery/interior-3.svg"
                alt=""
                width={1200}
                height={1400}
                sizes="(min-width: 1024px) 38vw, 80vw"
                ratio="5/6"
                imgClassName="animate-drift"
              />
            </ArchFrame>
          </div>

          <div className="lg:col-span-7">
            <p className="label-caps flex items-center gap-3 text-saffron-soft">
              <span aria-hidden="true" className="h-px w-8 bg-saffron-soft" />
              {t('eyebrow')}
            </p>

            <h2 className="mt-6 font-display text-display-md leading-[1.05] text-cream">
              {t('title')}
            </h2>

            <p className="mt-7 text-base leading-relaxed text-cream/80 sm:text-lg">
              {t('body')}
            </p>
            <p className="mt-5 text-base leading-relaxed text-cream/70">
              {t('bodySecond')}
            </p>

            <Quote className="mt-10 size-8 text-saffron/60" aria-hidden="true" />

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/cerita" variant="accent">
                {t('cta')}
              </Button>
              <p className="label-caps text-cream/60">
                {t('since', { year: site.foundedYear })}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

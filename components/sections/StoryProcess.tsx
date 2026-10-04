import { getLocale, getTranslations } from 'next-intl/server';

import { originStory, processSteps } from '@/data/process';
import { pick } from '@/data/shared';

import { ArchFrame } from '../ui/ArchFrame';
import { Container, Section } from '../ui/Container';
import { Plate } from '../ui/Plate';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { accentOf } from '../ui/accent';

/** Alternating image/text timeline — PRD 5.4 "dari biji, sangrai, seduh, cangkir". */
export async function ProcessTimeline() {
  const t = await getTranslations('cerita.process');
  const locale = await getLocale();

  return (
    <Section tone="alt" spacing="lg" id="proses">
      <Container size="wide">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <ol className="mt-16 space-y-16 lg:space-y-24">
          {processSteps.map((step, index) => {
            const palette = accentOf(step.accent);
            const flipped = index % 2 === 1;

            return (
              <li key={step.id}>
                <Reveal>
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div
                      className={
                        flipped
                          ? 'lg:col-span-5 lg:order-2 lg:ms-auto'
                          : 'lg:col-span-5'
                      }
                    >
                      <ArchFrame
                        shape={flipped ? 'circle' : 'arch'}
                        className="aspect-4/5"
                      >
                        <Plate
                          src={step.image}
                          alt={pick(step.alt, locale)}
                          width={1200}
                          height={1500}
                          sizes="(min-width: 1024px) 38vw, 90vw"
                          imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                        />
                      </ArchFrame>
                    </div>

                    <div
                      className={
                        flipped
                          ? 'lg:col-span-6 lg:order-1'
                          : 'lg:col-span-6'
                      }
                    >
                      <p className="label-caps flex items-center gap-3 text-ink-muted">
                        <span
                          aria-hidden="true"
                          className={`grid size-11 shrink-0 place-items-center rounded-full font-display text-sm ${palette.soft}`}
                        >
                          {step.index}
                        </span>
                        <span className="sr-only">
                          {t('stepLabel', { index: step.index })}
                        </span>
                        <span aria-hidden="true" className={`h-px w-8 ${palette.bar}`} />
                      </p>

                      <h3 className="mt-5 font-display text-display-sm leading-tight">
                        {pick(step.title, locale)}
                      </h3>

                      <p className="mt-5 text-base leading-relaxed text-ink-muted">
                        {pick(step.body, locale)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

/** Origin narrative — PRD 5.4. */
export async function OriginStory() {
  const t = await getTranslations('cerita.origin');
  const locale = await getLocale();

  return (
    <Section tone="plain" spacing="lg">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              className="lg:sticky lg:top-32"
            />
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-7">
              {originStory.map((paragraph, index) => (
                <Reveal key={index} delay={index * 90}>
                  <p
                    className={
                      index === 0
                        ? 'font-display text-2xl leading-snug text-ink sm:text-3xl'
                        : 'text-base leading-relaxed text-ink-muted'
                    }
                  >
                    {pick(paragraph, locale)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
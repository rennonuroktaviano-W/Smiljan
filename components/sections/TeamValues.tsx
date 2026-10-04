import { getLocale, getTranslations } from 'next-intl/server';

import { team, values } from '@/data/content';
import { pick } from '@/data/shared';

import { ArchFrame } from '../ui/ArchFrame';
import { Container, Section } from '../ui/Container';
import { Plate } from '../ui/Plate';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { accentSurface, accentOf } from '../ui/accent';

/** Brand values — PRD 5.4. */
export async function BrandValues() {
  const t = await getTranslations('cerita.values');
  const locale = await getLocale();

  return (
    <Section tone="plain" spacing="md">
      <Container size="wide">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          align="center"
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal as="li" key={value.id} delay={index * 100}>
              <div
                className={`flex h-full flex-col rounded-card border p-8 ${accentSurface(value.accent)}`}
              >
                <span className="label-caps opacity-60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-snug">
                  {pick(value.title, locale)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-85">
                  {pick(value.body, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Barista profiles — PRD 5.4. Placeholder people until the owner supplies real ones. */
export async function TeamGrid() {
  const t = await getTranslations('cerita.team');
  const locale = await getLocale();

  return (
    <Section tone="alt" spacing="lg">
      <Container size="wide">
        <SectionHeading
          align="center"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal as="li" key={member.id} delay={index * 100}>
              <article className="group text-center">
                <ArchFrame
                  shape={index === 1 ? 'blob' : 'circle'}
                  className="mx-auto aspect-square max-w-[16rem]"
                >
                  <Plate
                    src={member.image}
                    alt={pick(member.role, locale)}
                    width={800}
                    height={800}
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    imgClassName="transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </ArchFrame>

                <h3 className="mt-6 font-display text-2xl">{member.name}</h3>
                <p
                  className={`label-caps mt-2 inline-block ${accentOf(member.accent).text}`}
                >
                  {pick(member.role, locale)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {pick(member.bio, locale)}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/CtaBand';
import {
  BrandValues,
  TeamGrid
} from '@/components/sections/TeamValues';
import { OriginStory, ProcessTimeline } from '@/components/sections/StoryProcess';
import { Container, Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import { routing } from '@/i18n/routing';
import { ogImages } from '@/lib/og';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: PageProps<'/[locale]/cerita'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cerita.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/cerita` },
    ...ogImages(t('title'), t('description'), locale)
  };
}

export default async function CeritaPage({
  params
}: PageProps<'/[locale]/cerita'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations('cerita.hero');

  return (
    <>
      <Section tone="plain" spacing="lg" className="pb-0 pt-36 sm:pt-44">
        <Container size="wide">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="label-caps text-maroon">{tHero('eyebrow')}</p>
            <h1 className="mt-5 font-display text-display-lg leading-[1.02]">
              {tHero('title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {tHero('description')}
            </p>
            <p className="mt-6 text-sm text-ink-muted/80">
              {tHero('since', { year: site.foundedYear })}
            </p>
          </Reveal>
        </Container>
      </Section>

      <OriginStory />
      <ProcessTimeline />
      <BrandValues />
      <TeamGrid />
      <CtaBand />
    </>
  );
}
import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { GalleryExplorer } from '@/components/gallery/GalleryExplorer';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container, Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { gallery } from '@/data/gallery';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: PageProps<'/[locale]/galeri'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'galeri.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/galeri` }
  };
}

export default async function GaleriPage({
  params
}: PageProps<'/[locale]/galeri'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentLocale = (await getLocale()) as 'id' | 'en';
  const tHero = await getTranslations('galeri.hero');

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
          </Reveal>
        </Container>
      </Section>

      <Section tone="plain" spacing="lg" className="pt-0">
        <Container size="wide">
          <GalleryExplorer items={gallery} locale={currentLocale} />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
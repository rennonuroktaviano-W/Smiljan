import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/CtaBand';
import { FacilityList } from '@/components/sections/FacilityList';
import { MapSection } from '@/components/sections/MapSection';
import { Container, Section } from '@/components/ui/Container';
import { HoursTable } from '@/components/ui/HoursTable';
import { OpenStatus } from '@/components/ui/OpenStatus';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import { routing } from '@/i18n/routing';
import { breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: PageProps<'/[locale]/lokasi'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lokasi.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/lokasi` }
  };
}

export default async function LokasiPage({
  params
}: PageProps<'/[locale]/lokasi'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('lokasi');
  const tHero = await getTranslations('lokasi.hero');
  const tHours = await getTranslations('lokasi.hours');

  const breadcrumb = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: t('meta.title'), path: '/lokasi' }
    ],
    `/${locale}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Section tone="plain" spacing="lg" className="pb-0 pt-36 sm:pt-44">
        <Container size="wide">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="label-caps text-maroon">{tHero('eyebrow')}</p>
            <h1 className="mt-5 font-display text-display-lg leading-[1.02]">
              {tHero('title')}
            </h1>
          </Reveal>
        </Container>
      </Section>

      <Section tone="plain" spacing="md" className="pt-0">
        <Container size="wide">
          <Reveal>
            <div className="mx-auto grid max-w-2xl gap-6 rounded-card border border-line bg-surface p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-display text-2xl">{tHours('title')}</h2>
                <span className="label-caps text-ink-muted">
                  {tHours('status')}
                </span>
              </div>

              <OpenStatus />

              <HoursTable />

              <p className="text-xs leading-relaxed text-ink-muted">
                {tHours('note')}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <MapSection />
      <FacilityList />
      <CtaBand />

      <span className="sr-only">{site.address.full}</span>
    </>
  );
}
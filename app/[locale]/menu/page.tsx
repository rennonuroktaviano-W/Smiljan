import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { MenuExplorer } from '@/components/menu/MenuExplorer';
import { Container, Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { menu } from '@/data/menu';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: PageProps<'/[locale]/menu'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'menu.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/menu` }
  };
}

export default async function MenuPage({ params }: PageProps<'/[locale]/menu'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations('menu.hero');

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
            <p className="mx-auto mt-4 max-w-2xl text-sm text-ink-muted/80">
              {tHero('note')}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="plain" spacing="lg" className="pt-0">
        <MenuExplorer items={menu} />
      </Section>
    </>
  );
}
import type { Metadata } from 'next';
import { Users } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { ReservationForm } from '@/components/reservasi/ReservationForm';
import { Container, Section } from '@/components/ui/Container';
import { MotionScope } from '@/components/ui/MotionScope';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsappIcon } from '@/components/ui/BrandIcons';
import { Button } from '@/components/ui/Button';
import { routing } from '@/i18n/routing';
import { ogImages } from '@/lib/og';
import { whatsappLink } from '@/lib/whatsapp';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: PageProps<'/[locale]/reservasi'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'reservasi.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/reservasi` },
    ...ogImages(t('title'), t('description'), locale)
  };
}

export default async function ReservasiPage({
  params
}: PageProps<'/[locale]/reservasi'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentLocale = (await getLocale()) as 'id' | 'en';
  const tHero = await getTranslations('reservasi.hero');
  const tPrivate = await getTranslations('reservasi.private');

  return (
    <MotionScope>
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
        <Container size="default">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ReservationForm />
            </div>

            <Reveal className="lg:col-span-5" delay={120}>
              <div className="rounded-card border border-line bg-olive p-8 text-cream">
                <p className="label-caps text-saffron-soft">
                  {tPrivate('eyebrow')}
                </p>
                <h2 className="mt-4 font-display text-2xl leading-snug">
                  {tPrivate('title')}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-cream/80">
                  {tPrivate('description')}
                </p>

                <p className="mt-7 flex items-center gap-3 border-t border-cream/20 pt-6">
                  <Users className="size-5 text-saffron" aria-hidden="true" />
                  <span className="text-sm">
                    <span className="label-caps block text-cream/60">
                      {tPrivate('capacity')}
                    </span>
                    <span className="font-display text-lg">
                      {tPrivate('capacityValue')}
                    </span>
                  </span>
                </p>

                <Button
                  href={whatsappLink(
                    currentLocale === 'en'
                      ? 'Hi Smiljan, I would like to ask about hiring the space for a private event.'
                      : 'Halo Smiljan, saya mau tanya soal sewa tempat untuk acara privat.'
                  )}
                  external
                  variant="accent"
                  size="lg"
                  className="mt-8 w-full"
                >
                  <WhatsappIcon className="size-4" />
                  {tPrivate('cta')}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </MotionScope>
  );
}
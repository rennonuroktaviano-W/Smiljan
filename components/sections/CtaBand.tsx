import { getLocale, getTranslations } from 'next-intl/server';

import { whatsappLink } from '@/lib/whatsapp';

import { WhatsappIcon } from '../ui/BrandIcons';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';

/** Closing conversion band — PRD 5.2.9. */
export async function CtaBand() {
  const t = await getTranslations('cta');
  const locale = await getLocale();

  const message =
    locale === 'en'
      ? 'Hi Smiljan, I would like to reserve a table.'
      : 'Halo Smiljan, saya mau reservasi meja.';

  return (
    <section className="relative overflow-hidden bg-espresso py-20 text-cream sm:py-24">
      <div
        aria-hidden="true"
        className="pattern-weave absolute inset-0 text-cream opacity-[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 size-72 rounded-full bg-saffron/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -right-16 size-80 rounded-full bg-maroon/25 blur-3xl"
      />

      <Container size="narrow" className="relative text-center">
        <Reveal>
          <p className="label-caps text-saffron">{t('eyebrow')}</p>
          <h2 className="mt-6 font-display text-display-md leading-[1.02]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/75">
            {t('description')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={whatsappLink(message)} external variant="accent" size="lg">
              <WhatsappIcon className="size-4" />
              {t('primary')}
            </Button>
            <Button
              href="/menu"
              variant="outline"
              size="lg"
              className="border-cream/30 text-cream hover:border-cream hover:bg-cream/10"
            >
              {t('secondary')}
            </Button>
          </div>
        </Reveal>
      </Container>

      <div className="relative mt-16 border-y border-cream/10 py-4">
        <Marquee
          items={[t('title'), 'Smiljan', t('eyebrow')]}
          tone="cream"
          className="opacity-25"
        />
      </div>
    </section>
  );
}
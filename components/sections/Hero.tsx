import { ArrowDown, Star } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { featuredMenu } from '@/data/menu';
import { pick } from '@/data/shared';
import { site, socialProof } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';

import { ArchFrame } from '../ui/ArchFrame';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Plate } from '../ui/Plate';
import { WhatsappIcon } from '../ui/BrandIcons';

/**
 * Home hero — dark Espresso block so the transparent navbar has something to
 * sit against. Asymmetric editorial layout: oversized serif headline on the
 * left, arch-framed photograph bleeding off the right edge.
 */
export async function Hero() {
  const t = await getTranslations('home.hero');
  const locale = await getLocale();

  const lead = featuredMenu[0];
  const waHref = whatsappLink(
    locale === 'en'
      ? 'Hi Smiljan, I would like to order.'
      : 'Halo Smiljan, saya mau pesan.'
  );

  return (
    <section className="relative overflow-hidden bg-espresso pt-32 pb-16 text-cream sm:pt-40 lg:pb-24 lg:pt-48">
      {/* Warm wash + grain-ish pattern, kept subtle so text stays legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(232,163,23,0.20),transparent_46%),radial-gradient(circle_at_8%_88%,rgba(201,102,61,0.18),transparent_52%)]"
      />
      <div
        aria-hidden="true"
        className="pattern-diamond absolute inset-0 text-cream opacity-[0.05]"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label-caps flex items-center gap-3 text-saffron">
              <span aria-hidden="true" className="h-px w-10 bg-saffron" />
              {t('eyebrow')}
            </p>

            <h1 className="mt-7 font-display text-display-xl leading-[0.92] tracking-[-0.03em]">
              <span className="block">{t('titleTop')}</span>
              <span className="block italic text-saffron">{t('titleEmphasis')}</span>
              <span className="block">{t('titleBottom')}</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {t('description')}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/menu" variant="accent" size="lg">
                {t('primaryCta')}
              </Button>

              <Button href={waHref} external variant="outline" size="lg" className="border-cream/30 text-cream hover:border-cream hover:bg-cream/10">
                <WhatsappIcon className="size-4" />
                {t('secondaryCta')}
              </Button>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-cream/15 pt-8">
              <div>
                <dt className="label-caps text-cream/50">{t('stats.since')}</dt>
                <dd className="mt-2 font-display text-3xl">{site.foundedYear}</dd>
              </div>
              <div>
                <dt className="label-caps text-cream/50">{t('stats.beans')}</dt>
                <dd className="mt-2 font-display text-3xl">12</dd>
              </div>
              <div>
                <dt className="label-caps text-cream/50">{t('stats.rating')}</dt>
                <dd className="mt-2 flex items-center gap-1.5 font-display text-3xl">
                  {socialProof.rating}
                  <Star
                    className="size-4 text-saffron"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <ArchFrame shape="arch" rings className="mx-auto max-w-md lg:mr-0">
              <Plate
                src={lead.image}
                alt={pick(lead.longDescription ?? lead.description, locale)}
                width={800}
                height={800}
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
                ratio="4/5"
                imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
              />
            </ArchFrame>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-cream/15 bg-cream/5 p-5 backdrop-blur-sm lg:mr-0">
              <p className="label-caps text-saffron">
                {pick(lead.name, locale)}
              </p>
              <p className="mt-2 text-sm text-cream/70">
                {lead.tastingNotes
                  ? pick(lead.tastingNotes, locale)
                  : pick(lead.description, locale)}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-16 hidden items-center gap-3 text-cream/40 lg:flex">
          <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
          <span className="label-caps">{t('scrollHint')}</span>
        </p>
      </Container>
    </section>
  );
}

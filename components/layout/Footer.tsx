import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

import { site, socialProof } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';
import { Link } from '@/i18n/navigation';

import { InstagramIcon } from '../ui/BrandIcons';
import { Logo } from './Logo';
import { LocaleSwitcher } from './LocaleSwitcher';
import { navItems } from './nav-items';
import { Container } from '../ui/Container';
import { PatternDivider } from '../ui/PatternDivider';

export async function Footer() {
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const locale = await getLocale();

  const year = new Date().getFullYear();
  const waHref = whatsappLink(
    locale === 'en'
      ? 'Hi Smiljan, I would like to ask about your menu.'
      : 'Halo Smiljan, saya mau tanya-tanya soal menu kalian.'
  );

  return (
    <footer className="bg-espresso text-cream">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="cream" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
              {tc('tagline')}
            </p>

            <p className="mt-6 flex items-center gap-2 text-sm text-cream/70">
              <span className="text-saffron" aria-hidden="true">
                {socialProof.rating}
              </span>
              <span aria-hidden="true">/5</span>
              <span>
                <span className="sr-only">{socialProof.rating} out of 5 </span>
                {socialProof.reviewCount}+ ulasan
              </span>
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label-caps text-saffron-soft">{t('explore')}</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/75 transition-colors hover:text-saffron"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reservasi"
                  className="text-sm text-cream/75 transition-colors hover:text-saffron"
                >
                  {tn('reservasi')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label-caps text-saffron-soft">{t('visit')}</h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-cream/75">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-saffron" aria-hidden="true" />
                <span>{site.address.full}</span>
              </p>
              <p>
                <Link
                  href="/lokasi"
                  className="underline decoration-cream/30 underline-offset-4 transition-colors hover:text-saffron"
                >
                  {t('hours')}
                </Link>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-saffron" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="underline decoration-cream/30 underline-offset-4 transition-colors hover:text-saffron"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label-caps text-saffron-soft">{t('connect')}</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-saffron"
                >
                  {t('whatsapp')}
                  <span className="text-cream/40">{site.whatsappDisplay}</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-saffron"
                >
                  <InstagramIcon className="size-4" />
                  {site.social.instagramHandle}
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <LocaleSwitcher tone="cream" />
            </div>
          </div>
        </div>

        <PatternDivider variant="diamond" tone="cream" className="mt-14 opacity-40" />

        <div className="mt-8 flex flex-col gap-4 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {t('rightsReserved')}
          </p>
          <p>
            {t('disclaimerTitle')}: {t('disclaimerBody')}
          </p>
        </div>
      </Container>

      {/* Oversized wordmark as an editorial anchor. */}
      <div aria-hidden="true" className="overflow-hidden">
        <p className="translate-y-[22%] text-center font-display text-[19vw] leading-none font-semibold tracking-[0.06em] text-cream/[0.07] select-none">
          SMILJAN
        </p>
      </div>
    </footer>
  );
}

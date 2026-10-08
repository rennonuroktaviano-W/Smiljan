import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CookieNotice } from '@/components/layout/CookieNotice';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Providers } from '@/components/layout/Providers';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { site } from '@/data/site';
import { routing } from '@/i18n/routing';
import { ogImageUrl } from '@/lib/og';
import { cafeSchema, websiteSchema } from '@/lib/schema';

import '../globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  style: ['normal', 'italic']
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7EFE2' },
    { media: '(prefers-color-scheme: dark)', color: '#1B0F0A' }
  ],
  width: 'device-width',
  initialScale: 1
};

export async function generateMetadata({
  params
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const ogUrl = ogImageUrl(t('title'), locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t('title'),
      template: `%s · ${site.name}`
    },
    description: t('description'),
    applicationName: site.name,
    keywords: [
      'coffee shop',
      'kopi',
      'specialty coffee',
      'manual brew',
      'coffee Jakarta',
      'Smiljan'
    ],
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: '/id',
        en: '/en',
        'x-default': '/id'
      }
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: locale === 'en' ? 'en_US' : 'id_ID',
      alternateLocale: locale === 'en' ? 'id_ID' : 'en_US',
      title: t('title'),
      description: t('description'),
      url: `/${locale}`,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: t('title')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const tNav = await getTranslations('nav');
  const tHomeMeta = await getTranslations({ locale, namespace: 'home.meta' });

  /*
    Structured data belongs in the document head, so it is emitted here rather
    than from the footer. `<` is escaped so a stray character in any interpolated
    value cannot close the script tag early.
  */
  const jsonLd = [cafeSchema(tHomeMeta('description')), websiteSchema()].map(
    (entry) => JSON.stringify(entry).replace(/</g, '\\u003c')
  );

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {jsonLd.map((entry, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: entry }}
          />
        ))}

        {/*
          Scroll-reveal styles start elements hidden. If scripting is off they
          would stay invisible, so force them visible up front.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}[data-page-transition]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className={`${fraunces.variable} ${dmSans.variable} antialiased`}>
        <NextIntlClientProvider>
          <Providers>
            <a
              href="#main"
              className="sr-only rounded-full bg-espresso px-5 py-3 text-sm text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
            >
              {tNav('skipToContent')}
            </a>
            <Navbar />

            <main id="main">{children}</main>

            <Footer />
            <WhatsAppFloat />
            <CookieNotice />
            {process.env.VERCEL ? <Analytics /> : null}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Clock, Mail, MapPin } from 'lucide-react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { ContactForm } from '@/components/kontak/ContactForm';
import { FaqAccordion } from '@/components/kontak/FaqAccordion';
import { InstagramIcon, WhatsappIcon } from '@/components/ui/BrandIcons';
import { Container, Section } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { responseTime, site } from '@/data/site';
import { faqs } from '@/data/faq';
import { routing } from '@/i18n/routing';
import { whatsappBareLink } from '@/lib/whatsapp';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: PageProps<'/[locale]/kontak'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'kontak.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `/${locale}/kontak` }
  };
}

export default async function KontakPage({
  params
}: PageProps<'/[locale]/kontak'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentLocale = (await getLocale()) as 'id' | 'en';
  const tHero = await getTranslations('kontak.hero');
  const tInfo = await getTranslations('kontak.info');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[currentLocale],
      acceptedAnswer: { '@type': 'Answer', text: faq.answer[currentLocale] }
    }))
  };

  const channels = [
    {
      key: 'whatsapp',
      href: whatsappBareLink(),
      external: true,
      value: site.whatsappDisplay,
      icon: WhatsappIcon
    },
    {
      key: 'email',
      href: `mailto:${site.email}`,
      external: false,
      value: site.email,
      icon: Mail
    },
    {
      key: 'instagram',
      href: site.social.instagram,
      external: true,
      value: site.social.instagramHandle,
      icon: InstagramIcon
    }
  ] as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <Reveal className="lg:col-span-5">
              <h2 className="font-display text-2xl">{tInfo('title')}</h2>

              <ul className="mt-8 divide-y divide-line border-y border-line">
                {channels.map((channel) => {
                  const Icon = channel.icon;

                  return (
                    <li key={channel.key} className="py-5">
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="group flex items-start gap-4"
                      >
                        <span
                          className="grid size-10 shrink-0 place-items-center rounded-full bg-maroon/10 text-maroon transition-colors group-hover:bg-maroon group-hover:text-cream"
                          aria-hidden="true"
                        >
                          <Icon className="size-4" strokeWidth={1.75} />
                        </span>

                        <span className="min-w-0">
                          <span className="label-caps block text-ink-muted">
                            {tInfo(channel.key)}
                          </span>
                          <span className="mt-1 block truncate font-display text-lg text-ink group-hover:text-maroon">
                            {channel.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}

                <li className="py-5">
                  <div className="flex items-start gap-4">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-olive/10 text-olive"
                      aria-hidden="true"
                    >
                      <MapPin className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="label-caps block text-ink-muted">
                        {tInfo('address')}
                      </span>
                      <address className="mt-1 text-sm not-italic leading-relaxed text-ink">
                        {site.address.street}
                        <br />
                        {site.address.city}, {site.address.province}{' '}
                        {site.address.postalCode}
                      </address>
                    </span>
                  </div>
                </li>
              </ul>

              <p className="mt-6 flex items-start gap-3 text-sm text-ink-muted">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="label-caps block">
                    {tInfo('responseTime')}
                  </span>
                  <span className="mt-1 block">{tInfo('responseValue')}</span>
                  <span className="mt-0.5 block text-xs">
                    {currentLocale === 'en'
                      ? 'Monday to Sunday, 08.00-22.00'
                      : responseTime.businessDays}
                  </span>
                </span>
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <FaqAccordion />
    </>
  );
}
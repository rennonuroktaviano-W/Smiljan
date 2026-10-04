import { ArrowUpRight, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { mapsDirectionsUrl, site } from '@/data/site';

import { Button } from '../ui/Button';
import { Container, Section } from '../ui/Container';
import { HoursTable } from '../ui/HoursTable';
import { OpenStatus } from '../ui/OpenStatus';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

/** Location + hours teaser — PRD 5.2.8. */
export async function LocationTeaser() {
  const t = await getTranslations('home.location');

  return (
    <Section tone="plain" spacing="lg">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              description={t('description')}
            />

            <address className="mt-10 not-italic">
              <p className="label-caps flex items-center gap-2 text-maroon">
                <MapPin className="size-4" aria-hidden="true" />
                <span>{site.address.city}</span>
              </p>
              <p className="mt-3 font-display text-xl leading-snug">
                {site.address.street}
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                {site.address.city}, {site.address.province}{' '}
                {site.address.postalCode}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={mapsDirectionsUrl} external variant="primary">
                  {t('directions')}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
                <Button href="/lokasi" variant="outline">
                  {t('cta')}
                </Button>
              </div>
            </address>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="rounded-card border border-line bg-surface p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display text-xl">{t('hoursTitle')}</h3>
                <span className="label-caps text-ink-muted">{t('openStatus')}</span>
              </div>

              <div className="mt-5">
                <OpenStatus showDetail={false} />
              </div>

              <div className="mt-6">
                <HoursTable compact />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
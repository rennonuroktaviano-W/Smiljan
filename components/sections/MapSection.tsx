import { ArrowUpRight, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { mapsDirectionsUrl, mapsEmbedUrl, site } from '@/data/site';

import { Button } from '../ui/Button';
import { Container, Section } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

/** Address, embedded map and directions — PRD F-06, 5.5. */
export async function MapSection() {
  const tAddress = await getTranslations('lokasi.address');
  const tMap = await getTranslations('lokasi.map');

  const { lat, lng } = site.address.coordinates;

  return (
    <Section tone="plain" spacing="lg">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-display-sm leading-tight">
              {tAddress('title')}
            </h2>

            <address className="mt-6 not-italic">
              <p className="label-caps flex items-center gap-2 text-maroon">
                <MapPin className="size-4" aria-hidden="true" />
                {site.address.city}
              </p>
              <p className="mt-4 font-display text-xl leading-snug">
                {site.address.street}
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                {site.address.city}, {site.address.province}{' '}
                {site.address.postalCode}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{site.address.countryName}</p>
            </address>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={mapsDirectionsUrl} external variant="primary">
                {tAddress('directions')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <p className="mt-6 font-mono text-xs text-ink-muted/70">
              {lat}, {lng}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <div className="overflow-hidden rounded-card border border-line bg-bg-alt">
              <iframe
                src={mapsEmbedUrl}
                title={tMap('loading')}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[22rem] w-full border-0 sm:h-[26rem]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
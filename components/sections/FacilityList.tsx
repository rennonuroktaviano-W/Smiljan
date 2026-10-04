import {
  AirVent,
  BadgeCheck,
  Car,
  Cigarette,
  Laptop,
  Plug,
  Trees,
  Wifi
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { facilities } from '@/data/site';

import { Container, Section } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

/**
 * Explicit key-to-icon map rather than a dynamic import, so lucide's icons are
 * statically bundled and the `facilities` array in data/site.ts stays a plain
 * list of strings.
 */
const FACILITY_ICONS = {
  wifi: Wifi,
  power: Plug,
  parking: Car,
  outdoor: Trees,
  smokingArea: Cigarette,
  workFriendly: Laptop,
  airConditioned: AirVent,
  halal: BadgeCheck
} satisfies Record<(typeof facilities)[number]['key'], LucideIcon>;

const gridClasses = [
  'sm:col-span-2 lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'sm:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1'
];

/** Facility list — PRD 5.5. */
export async function FacilityList() {
  const t = await getTranslations('lokasi.facilities');

  return (
    <Section tone="alt" spacing="md">
      <Container size="wide">
        <div className="max-w-2xl">
          <p className="label-caps flex items-center gap-3 text-maroon">
            <span aria-hidden="true" className="h-px w-8 bg-maroon" />
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 font-display text-display-md leading-[1.05]">
            {t('title')}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {facilities.map((facility, index) => {
            const Icon = FACILITY_ICONS[facility.key];

            return (
              <Reveal
                as="li"
                key={facility.key}
                delay={index * 60}
                className={gridClasses[index]}
              >
                <div className="flex h-full flex-col items-center gap-3 rounded-card border border-line bg-surface p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-olive/10 text-olive"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-ink">
                    {t(`items.${facility.key}`)}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
import {
  openingHours,
  site,
  timeZone,
  whatsappDigits,
  type DayHours
} from '@/data/site';

const SCHEMA_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

type OpeningHoursSpecification = {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string;
  opens: string;
  closes: string;
};

/** Converts the internal weekly schedule into schema.org day codes. */
export function toOpeningHoursSpecification(
  hours: DayHours[] = openingHours
): OpeningHoursSpecification[] {
  return hours
    .filter((entry) => entry.open !== null && entry.close !== null)
    .map((entry) => ({
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[entry.day]}`,
      opens: entry.open as string,
      closes: entry.close as string
    }));
}

/**
 * Structured data for the whole site (PRD 7 — `CafeOrCoffeeShop`).
 *
 * `description` is passed in rather than hardcoded: the JSON-LD is emitted from
 * the root layout, which has no page-level locale context, and an Indonesian
 * description on the English site would be wrong for both readers and crawlers.
 */
export function cafeSchema(description?: string) {
  const socialUrls: string[] = [
    site.social.instagram,
    site.social.tiktok,
    site.social.facebook
  ];

  const sameAs = socialUrls
    .filter((value): value is string => Boolean(value))
    .map((value) => value.replace(/\/$/, ''));

  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${site.url}/#cafe`,
    name: site.name,
    legalName: site.legalName,
    description:
      description ??
      'Smiljan is a coffee shop with genuine character, serving manually brewed coffee in a warm, colourful room.',
    url: site.url,
    telephone: `+${whatsappDigits}`,
    email: site.email,
    image: `${site.url}/images/og-cover.svg`,
    logo: `${site.url}/icon.svg`,
    priceRange: '$$',
    currenciesAccepted: 'IDR',
    paymentAccepted: 'Cash, QRIS, Debit, Credit Card',
    servesCuisine: ['Coffee', 'Indonesian', 'Pastries'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.coordinates.lat,
      longitude: site.address.coordinates.lng
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.address.coordinates.lat},${site.address.coordinates.lng}`,
    openingHoursSpecification: toOpeningHoursSpecification(),
    sameAs
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: ['id-ID', 'en-US'],
    publisher: { '@id': `${site.url}/#cafe` }
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
  localePrefix = '/id'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${localePrefix}${item.path === '/' ? '' : item.path}`
    }))
  };
}

export const siteUrl = site.url;
export const siteTimeZone = timeZone;

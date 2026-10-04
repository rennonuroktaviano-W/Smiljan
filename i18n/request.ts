import { locale as getSegmentLocale } from 'next/root-params';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

/**
 * One JSON file per namespace per language, so each stays small and easy for
 * a translator to edit. Adding a page means adding its namespace here too.
 */
const namespaces = [
  'common',
  'nav',
  'footer',
  'cta',
  'home',
  'menu',
  'cerita',
  'lokasi',
  'galeri',
  'reservasi',
  'kontak'
] as const;

export default getRequestConfig(async () => {
  const requested = await getSegmentLocale();
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loaded = await import(`../messages/${locale}/${namespace}.json`);

      return [namespace, loaded.default] as const;
    })
  );

  return {
    locale,
    messages: Object.fromEntries(entries)
  };
});

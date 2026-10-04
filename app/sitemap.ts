import type { MetadataRoute } from 'next';

import { site } from '@/data/site';
import { routing } from '@/i18n/routing';
import { allRoutes } from '@/components/layout/nav-items';

/**
 * Sitemap covering both locales, with `alternates.languages` so search engines
 * treat /id and /en as translations of one page rather than duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    allRoutes.map((route) => ({
      url: `${site.url}/${locale}${route === '/' ? '' : route}`,
      lastModified,
      changeFrequency: (route === '/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: route === '/' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alternate) => [
            alternate,
            `${site.url}/${alternate}${route === '/' ? '' : route}`
          ])
        )
      }
    }))
  );
}
import { site } from '@/data/site';

const WIDTH = 1200;
const HEIGHT = 630;

/** URL of the dynamic OG card rendered by `/api/og`. */
export function ogImageUrl(title: string, locale: string): string {
  const params = new URLSearchParams({ title, locale });
  return `/api/og?${params.toString()}`;
}

/**
 * Per-page Open Graph + Twitter images (PRD 7 — SEO). Returns complete
 * `openGraph`/`twitter` objects so a page never inherits a stale cover from
 * the root layout by accident.
 */
export function ogImages(title: string, description: string, locale: string) {
  const url = ogImageUrl(title, locale);

  return {
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: locale === 'en' ? 'en_US' : 'id_ID',
      title,
      description,
      images: [
        {
          url,
          width: WIDTH,
          height: HEIGHT,
          alt: `${title} · ${site.name}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [url]
    }
  };
}

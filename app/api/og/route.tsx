import { ImageResponse } from 'next/og';

import enCommon from '@/messages/en/common.json';
import idCommon from '@/messages/id/common.json';
import { site } from '@/data/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TAGLINES = {
  id: idCommon.tagline,
  en: enCommon.tagline
} as const;

/**
 * Dynamic Open Graph card — PRD 7 (Open Graph) + 4.2 (palette).
 *
 * Renders on demand from `?title=` so every page can carry its own image
 * without shipping a bespoke asset per route. Colours come straight from the
 * design tokens: Espresso ground, Krim Susu type, Saffron rule, Marun blob.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = (searchParams.get('title') ?? site.name).slice(0, 120);
  const locale: keyof typeof TAGLINES = searchParams.get('locale') === 'en' ? 'en' : 'id';

  try {
    const response = new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#2A1810',
            color: '#F7EFE2',
            padding: '72px 80px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative colour blocks — one accent per corner. */}
          <div
            style={{
              position: 'absolute',
              right: -90,
              top: -90,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: '#8C2F39',
              display: 'flex'
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 160,
              bottom: -60,
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: '#1F6F8B',
              display: 'flex'
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -40,
              bottom: 120,
              width: 100,
              height: 100,
              background: '#2F5D50',
              display: 'flex',
              transform: 'rotate(18deg)'
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <span
              style={{
                display: 'flex',
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: 14,
                color: '#E8A317'
              }}
            >
              SMILJAN
            </span>
            <span
              style={{
                display: 'flex',
                fontSize: 20,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: 'rgba(247, 239, 226, 0.55)'
              }}
            >
              {site.name}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 860 }}>
            <span
              style={{
                display: 'flex',
                width: 120,
                height: 8,
                background: '#E8A317'
              }}
            />
            <span
              style={{
                display: 'flex',
                fontSize: title.length > 48 ? 64 : 80,
                fontWeight: 700,
                lineHeight: 1.05
              }}
            >
              {title}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              fontSize: 24,
              color: 'rgba(247, 239, 226, 0.75)'
            }}
          >
            <span style={{ display: 'flex' }}>{TAGLINES[locale]}</span>
            <span style={{ display: 'flex', letterSpacing: 2 }}>{site.url.replace(/^https?:\/\//, '')}</span>
          </div>
        </div>
      ),
      {
        ...size,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400'
        }
      }
    );

    return response;
  } catch {
    return new Response('Could not generate image', { status: 500 });
  }
}

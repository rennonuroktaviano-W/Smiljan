/**
 * Single source of truth for everything the brand owner still needs to supply.
 *
 * Every value marked `PLACEHOLDER` is a stand-in. Replace the whole block in
 * this one file and the rest of the site follows — no component edits needed.
 * See "Konten yang Dibutuhkan dari Pemilik" in the PRD (section 9).
 */

export const PLACEHOLDER = true;

export const site = {
  name: 'Smiljan',
  legalName: 'Smiljan Coffee', // PLACEHOLDER
  /** Short line used in the footer and on social cards. */
  tagline: 'Slow Brewed · Freshly Roasted · Smiljan',

  /** E.164 without the "+", e.g. 6281234567890 */
  whatsapp: '6280000000000', // PLACEHOLDER
  /** Digits only, for tel: links. */
  whatsappDisplay: '+62 800-0000-0000', // PLACEHOLDER
  email: 'halo@smiljan.coffee', // PLACEHOLDER

  address: {
    street: 'Jl. Contoh No. 00, Kel. Contoh, Kec. Contoh', // PLACEHOLDER
    city: 'Jakarta Selatan', // PLACEHOLDER
    province: 'DKI Jakarta', // PLACEHOLDER
    postalCode: '00000', // PLACEHOLDER
    country: 'ID',
    countryName: 'Indonesia',
    /** Used for the map embed and the directions link. */
    coordinates: { lat: -6.2088, lng: 106.8456 }, // PLACEHOLDER
    mapsPlaceId: '', // PLACEHOLDER — optional, improves the Maps pin accuracy
    /** Plain-text address for the JSON-LD schema. */
    get full() {
      return `${this.street}, ${this.city}, ${this.province} ${this.postalCode}`;
    }
  },

  /** Canonical origin, used for metadata, sitemap and Open Graph URLs. */
  url: 'https://smiljan.coffee', // PLACEHOLDER — point at the real domain

  social: {
    instagram: 'https://instagram.com/smiljancoffee', // PLACEHOLDER
    instagramHandle: '@smiljancoffee', // PLACEHOLDER
    tiktok: '', // PLACEHOLDER
    facebook: '' // PLACEHOLDER
  },

  /** Year the café opened — feeds the "since" line in the story section. */
  foundedYear: 2024 // PLACEHOLDER
} as const;

/**
 * Opening hours per weekday. `day` follows the JavaScript convention
 * (0 = Sunday ... 6 = Saturday). Set both `open` and `close` to null for a
 * closed day. Times are local café time (Asia/Jakarta).
 */
export type DayHours = {
  day: number;
  open: string | null;
  close: string | null;
};

export const openingHours: DayHours[] = [
  { day: 0, open: '09:00', close: '21:00' }, // Sunday — PLACEHOLDER
  { day: 1, open: '08:00', close: '22:00' }, // Monday — PLACEHOLDER
  { day: 2, open: '08:00', close: '22:00' }, // Tuesday — PLACEHOLDER
  { day: 3, open: '08:00', close: '22:00' }, // Wednesday — PLACEHOLDER
  { day: 4, open: '08:00', close: '22:00' }, // Thursday — PLACEHOLDER
  { day: 5, open: '08:00', close: '23:00' }, // Friday — PLACEHOLDER
  { day: 6, open: '08:00', close: '23:00' } // Saturday — PLACEHOLDER
];

export const timeZone = 'Asia/Jakarta';

/** Facilities shown on the location page (PRD 5.5). */
export const facilities = [
  { key: 'wifi', icon: 'wifi' },
  { key: 'power', icon: 'plug' },
  { key: 'parking', icon: 'car' },
  { key: 'outdoor', icon: 'trees' },
  { key: 'smokingArea', icon: 'cigarette' },
  { key: 'workFriendly', icon: 'laptop' },
  { key: 'airConditioned', icon: 'snowflake' },
  { key: 'halal', icon: 'badgeCheck' }
] as const;

/** Average response time shown on the contact page (PRD 5.8). */
export const responseTime = {
  typical: '1–2 jam', // PLACEHOLDER
  businessDays: 'Senin–Minggu, 08.00–22.00' // PLACEHOLDER
} as const;

/** Rough number shown next to "rating" in the story and contact sections. */
export const socialProof = {
  rating: 4.9, // PLACEHOLDER
  reviewCount: 320, // PLACEHOLDER
  foundedYear: site.foundedYear
} as const;

export const whatsappDigits = site.whatsapp.replace(/\D/g, '');

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.address.coordinates.lat},${site.address.coordinates.lng}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${site.address.coordinates.lat},${site.address.coordinates.lng}&hl=id&z=16&output=embed`;

import type { LocalizedText } from './shared';

/** Gallery filters — PRD 5.6. */
export const galleryCategories = [
  'interior',
  'minuman',
  'makanan',
  'event'
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  id: string;
  src: string;
  /** Intrinsic ratio, used to reserve space and drive the masonry layout. */
  width: number;
  height: number;
  category: GalleryCategory;
  caption: LocalizedText;
  alt: LocalizedText;
};

export const gallery: GalleryItem[] = [
  {
    id: 'interior-1',
    src: '/images/gallery/interior-1.svg',
    width: 1200,
    height: 1500,
    category: 'interior',
    caption: { id: 'Sudut mezzanine', en: 'The mezzanine corner' },
    alt: {
      id: 'Sudut mezzanine Smiljan dengan kursi kayu dan cahaya alami',
      en: 'Smiljan mezzanine corner with wooden chairs and natural light'
    }
  },
  {
    id: 'minuman-1',
    src: '/images/gallery/minuman-1.svg',
    width: 1200,
    height: 1200,
    category: 'minuman',
    caption: { id: 'Manual brew harian', en: 'Daily manual brew' },
    alt: {
      id: 'Close up cangkir manual brew di atas meja kayu',
      en: 'Close up of a manual brew cup on a wooden table'
    }
  },
  {
    id: 'makanan-1',
    src: '/images/gallery/makanan-1.svg',
    width: 1200,
    height: 1600,
    category: 'makanan',
    caption: { id: 'Brunch plate', en: 'Brunch plate' },
    alt: {
      id: 'Brunch plate Smiljan dengan telur dan sourdough',
      en: 'Smiljan brunch plate with eggs and sourdough'
    }
  },
  {
    id: 'interior-2',
    src: '/images/gallery/interior-2.svg',
    width: 1600,
    height: 1200,
    category: 'interior',
    caption: { id: 'Bar dan espresso machine', en: 'Bar and espresso machine' },
    alt: {
      id: 'Bar Smiljan dengan espresso machine dan rak biji kopi',
      en: 'Smiljan bar with espresso machine and bean shelves'
    }
  },
  {
    id: 'minuman-2',
    src: '/images/gallery/minuman-2.svg',
    width: 1200,
    height: 1500,
    category: 'minuman',
    caption: { id: 'Cold brew 18 jam', en: '18-hour cold brew' },
    alt: {
      id: 'Gelas cold brew dengan es dan satu irisan jeruk',
      en: 'A glass of cold brew with ice and a slice of orange'
    }
  },
  {
    id: 'event-1',
    src: '/images/gallery/event-1.svg',
    width: 1600,
    height: 1067,
    category: 'event',
    caption: { id: 'Private gathering', en: 'Private gathering' },
    alt: {
      id: 'Suasana private gathering di Smiljan pada malam hari',
      en: 'Private gathering at Smiljan in the evening'
    }
  },
  {
    id: 'makanan-2',
    src: '/images/gallery/makanan-2.svg',
    width: 1200,
    height: 1200,
    category: 'makanan',
    caption: { id: 'Pastry display', en: 'Pastry display' },
    alt: {
      id: 'Rak pastry Smiljan dengan croissant dan cake',
      en: 'Smiljan pastry shelf with croissants and cakes'
    }
  },
  {
    id: 'interior-3',
    src: '/images/gallery/interior-3.svg',
    width: 1200,
    height: 1400,
    category: 'interior',
    caption: { id: 'Area kerja', en: 'Work area' },
    alt: {
      id: 'Area kerja Smiljan dengan colokan dan wifi',
      en: 'Smiljan work area with power outlets and wifi'
    }
  },
  {
    id: 'minuman-3',
    src: '/images/gallery/minuman-3.svg',
    width: 1200,
    height: 1200,
    category: 'minuman',
    caption: { id: 'Matcha whisk', en: 'Matcha whisk' },
    alt: {
      id: 'Mangkuk matcha tradisional dengan whisk bambu',
      en: 'Traditional matcha bowl with a bamboo whisk'
    }
  },
  {
    id: 'event-2',
    src: '/images/gallery/event-2.svg',
    width: 1600,
    height: 1200,
    category: 'event',
    caption: { id: 'Cupping session', en: 'Cupping session' },
    alt: {
      id: 'Suasana cupping session bersama pelanggan',
      en: 'Cupping session with customers around the table'
    }
  },
  {
    id: 'makanan-3',
    src: '/images/gallery/makanan-3.svg',
    width: 1200,
    height: 1500,
    category: 'makanan',
    caption: { id: 'Pasta jamur', en: 'Mushroom pasta' },
    alt: {
      id: 'Pasta jamur di piring keramik',
      en: 'Mushroom pasta on a ceramic plate'
    }
  },
  {
    id: 'interior-4',
    src: '/images/gallery/interior-4.svg',
    width: 1200,
    height: 1200,
    category: 'interior',
    caption: { id: 'Jendela dan tanaman', en: 'Window and plants' },
    alt: {
      id: 'Jendela besar dengan tanaman hijau di dalam kafe',
      en: 'Large window with green plants inside the cafe'
    }
  }
];

import type { LocalizedText } from './shared';

export type Testimonial = {
  id: string;
  quote: LocalizedText;
  author: string;
  role: LocalizedText;
  /** Drives the accent colour of the pull-quote card. */
  accent: 'maroon' | 'teal' | 'saffron' | 'olive' | 'terracotta';
  rating: 5 | 4;
};

/** Placeholder quotes — replace with real reviews before launch. */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: {
      id: 'Tempatnya tenang tapi tidak sepi. Manual brew-nya benar-benar enak, dan barista-nya sabar menjelaskan asal bijinya sampai saya paham.',
      en: 'Calm without being quiet. The manual brew is genuinely good, and the barista patiently explained the origin until it actually clicked.'
    },
    author: 'Rani P.',
    role: { id: 'Pengguna kopi rumahan', en: 'Home brewer' },
    accent: 'maroon',
    rating: 5
  },
  {
    id: 't2',
    quote: {
      id: 'Datang untuk brunch, balik lagi karena croissants-nya masih hangat jam sepuluh pagi. Komitmen seperti itu yang jarang ada di Jakarta.',
      en: 'Came for brunch, came back because the croissants were still warm at ten in the morning. That kind of consistency is rare in Jakarta.'
    },
    author: 'Bagas W.',
    role: { id: 'Product designer', en: 'Product designer' },
    accent: 'terracotta',
    rating: 5
  },
  {
    id: 't3',
    quote: {
      id: 'Colokan di mana-mana, Wi-Fi tidak pernah putus. Saya kerja dari sini tiga minggu berturut-turut dan tidak pernah ada yang mengganggu.',
      en: 'Outlets everywhere and the wifi never drops. I worked from here three weeks in a row and nobody ever bothered me.'
    },
    author: 'Sarah L.',
    role: { id: 'Freelance editor', en: 'Freelance editor' },
    accent: 'teal',
    rating: 5
  },
  {
    id: 't4',
    quote: {
      id: 'Gula arennya dibuat sendiri dan itu langsung terasa. Kopi susu yang paling enak saya konsumsi tahun ini.',
      en: 'They make the palm sugar in house and you can taste it immediately. The best milk coffee I have had this year.'
    },
    author: 'Dimas A.',
    role: { id: 'Anak kampus', en: 'University student' },
    accent: 'olive',
    rating: 5
  }
];

export type TeamMember = {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  image: string;
  accent: 'maroon' | 'teal' | 'saffron' | 'olive' | 'terracotta';
};

/** Placeholder profiles — PRD 5.4 asks for a team section. */
export const team: TeamMember[] = [
  {
    id: 'tm1',
    name: 'A. Mahendra',
    role: { id: 'Head Barista', en: 'Head Barista' },
    bio: {
      id: 'Menjaga setiap liner dan setiap dose tetap konsisten sejak hari pertama.',
      en: 'Has kept every liner and every dose consistent since the first morning.'
    },
    image: '/images/team/barista-1.svg',
    accent: 'maroon'
  },
  {
    id: 'tm2',
    name: 'S. Rahma',
    role: { id: 'Roaster', en: 'Roaster' },
    bio: {
      id: 'Menyangrai batches kecil setiap minggu dan menulis profil rasa untuk setiap biji.',
      en: 'Roasts small batches each week and writes a flavour profile for every bean.'
    },
    image: '/images/team/barista-2.svg',
    accent: 'terracotta'
  },
  {
    id: 'tm3',
    name: 'D. Nugroho',
    role: { id: 'Kitchen Lead', en: 'Kitchen Lead' },
    bio: {
      id: 'Membakar pastry sejak pukul tujuh pagi dan menjaga dapur tetap ringkas serta hangat.',
      en: 'Bakes the pastry from seven in the morning and keeps the kitchen sharp.'
    },
    image: '/images/team/barista-3.svg',
    accent: 'olive'
  }
];

export type ValuePoint = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  accent: 'maroon' | 'teal' | 'saffron' | 'olive' | 'terracotta';
};

export const values: ValuePoint[] = [
  {
    id: 'beans',
    title: { id: 'Biji pilihan, disangrai sendiri', en: 'Chosen beans, roasted in house' },
    body: {
      id: 'Kami membeli dalam batch kecil dari para petani yang kami kenal, lalu menyangrai sendiri setiap minggu agar setiap tegukan terasa baru disangrai.',
      en: 'We buy in small lots from growers we know, then roast weekly so every cup tastes freshly roasted.'
    },
    accent: 'maroon'
  },
  {
    id: 'manual',
    title: { id: 'Seduh manual, satu per satu', en: 'Brewed by hand, one cup at a time' },
    body: {
      id: 'Tidak ada mesin yang menyeduh untuk Anda di belakang layar. Setiap cangkir punya alasannya sendiri.',
      en: 'No machine brewing behind the counter. Every cup has its own reason for being made that way.'
    },
    accent: 'teal'
  },
  {
    id: 'space',
    title: { id: 'Ruang yang nyaman untuk tinggal', en: 'A room you can stay in' },
    body: {
      id: 'Colokan di setiap meja, Wi-Fi yang stabil, dan tidak ada aturan yang mengetuk siapa pun yang sedang bekerja.',
      en: 'Outlets at every table, wifi that holds, and no pressure on whoever is working.'
    },
    accent: 'saffron'
  }
];

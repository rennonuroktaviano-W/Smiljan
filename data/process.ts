import type { AccentName } from './menu';
import type { LocalizedText } from './shared';

export type ProcessStep = {
  id: string;
  /** Two-digit label shown in the timeline marker. */
  index: string;
  title: LocalizedText;
  body: LocalizedText;
  image: string;
  alt: LocalizedText;
  accent: AccentName;
};

/**
 * Bean to cup — PRD 5.4 asks for a process section.
 *
 * Placeholder copy written alongside the rest of the site; the owner can
 * replace the wording here without touching the component.
 */
export const processSteps: ProcessStep[] = [
  {
    id: 'biji',
    index: '01',
    title: { id: 'Memilih biji', en: 'Choosing the bean' },
    body: {
      id: 'Kami membeli dalam batch kecil dari petani yang kami kenal. Setiap lot punya asal, ketinggian, dan proses yang kami catat, sehingga profil rasanya bisa kami ulangi setiap minggu.',
      en: 'We buy in small lots from growers we know. Every lot carries its own origin, altitude and process, which we record so the flavour profile can be repeated week after week.'
    },
    image: '/images/menu/espresso-smiljan.svg',
    alt: {
      id: 'Biji kopi arabika pilihan Smiljan',
      en: 'Selected Smiljan Arabica coffee beans'
    },
    accent: 'maroon'
  },
  {
    id: 'sangrai',
    index: '02',
    title: { id: 'Menyangrai sendiri', en: 'Roasting in house' },
    body: {
      id: 'Penyangraian dilakukan di rumah, dalam batch kecil, dan setiap batch kami catat. Titik sangrai kami tentukan berdasarkan rasa, bukan hanya berdasarkan waktu.',
      en: 'Roasting happens on site, in small batches, and every batch is logged. We decide the roast endpoint by taste rather than by the clock alone.'
    },
    image: '/images/gallery/interior-2.svg',
    alt: {
      id: 'Bar Smiljan dengan mesin espresso dan rak biji kopi',
      en: 'The Smiljan bar with espresso machine and coffee bean shelves'
    },
    accent: 'terracotta'
  },
  {
    id: 'seduh',
    index: '03',
    title: { id: 'Menyeduh manual', en: 'Brewing by hand' },
    body: {
      id: 'Tidak ada mesin yang menyeduh di belakang layar. Laju penuangan, suhu air, dan lama kontak kami atur ulang untuk setiap biji, satu cangkir pada satu waktu.',
      en: 'No machine brews behind the counter. We adjust the pour rate, water temperature and contact time for every bean, one cup at a time.'
    },
    image: '/images/gallery/minuman-1.svg',
    alt: {
      id: 'Close up cangkir manual brew di atas meja kayu',
      en: 'Close up of a manual brew cup on a wooden table'
    },
    accent: 'teal'
  },
  {
    id: 'cangkir',
    index: '04',
    title: { id: 'Sampai ke cangkir', en: 'Into the cup' },
    body: {
      id: 'Setelah diseduh, kami biarkan kopinya sebentar, lalu sajikan pada suhu yang masih nyaman untuk minum. Bagian terbaiknya adalah tegukan pertama.',
      en: 'Once brewed we let the coffee settle briefly, then serve it at a temperature that is still comfortable to drink. The best part is the first sip.'
    },
    image: '/images/gallery/minuman-3.svg',
    alt: {
      id: 'Mangkuk matcha tradisional dengan whisk bambu',
      en: 'A traditional matcha bowl with a bamboo whisk'
    },
    accent: 'olive'
  }
];

/** Origin story paragraphs — PRD 5.4. Kept free of third-party claims. */
export const originStory: LocalizedText[] = [
  {
    id: 'Smiljan dimulai dari pencarian akan ketenangan, bukan dari renovasi yang buru-buru. Ruang ini dibangun agar orang bisa tinggal sebentar tanpa merasa tergesa.',
    en: 'Smiljan started from a search for calm. Not from a rushed renovation or a formality target, but from a room that felt like somewhere people could stay a while.'
  },
  {
    id: 'Setiap detail dipilih dengan alasan. Rak biji di bar dan lampu di atas meja baca semuanya kami tempatkan seperti kalau kami sendiri yang duduk di sana.',
    en: 'We built it slowly. Every detail, from the bean shelves at the bar to the lamps over the reading tables, was chosen because we would want to sit there ourselves, not because it photographs well.'
  },
  {
    id: 'Hari ini Smiljan sengaja tetap kecil. Tidak ada cabang dan tidak ada divisi. Hanya satu ruangan, satu bar, dan tim yang tahu nama setiap petani yang kami beli bijinya.',
    en: 'Today Smiljan is still deliberately small. No branches, no divisions. Just one room, one bar, and a team that knows the name of every grower we buy from.'
  }
];

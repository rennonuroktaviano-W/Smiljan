import type { LocalizedText } from './shared';

export type FaqItem = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
};

/** FAQ entries — PRD 5.8. Also emitted as FAQPage structured data. */
export const faqs: FaqItem[] = [
  {
    id: 'booking',
    question: {
      id: 'Apakah saya perlu reservasi?',
      en: 'Do I need to book ahead?'
    },
    answer: {
      id: 'Tidak wajib. Datang saja selama tempat tidak penuh.',
      en: 'Not at all. Just come as long as we are not full.'
    }
  },
  {
    id: 'booking-group',
    question: {
      id: 'Bagaimana cara reservasi untuk grup?',
      en: 'How do I book for a group?'
    },
    answer: {
      id: 'Isi formulir reservasi, lalu kirim lewat WhatsApp.',
      en: 'Fill in the reservation form and send it over WhatsApp.'
    }
  },
  {
    id: 'manual-brew',
    question: {
      id: 'Apakah kopi diseduh manual?',
      en: 'Is the coffee brewed by hand?'
    },
    answer: {
      id: 'Ya. Semua kopi diseduh satu per satu, bukan oleh mesin.',
      en: 'Yes. Every coffee is brewed one cup at a time, never by a machine.'
    }
  },
  {
    id: 'wifi',
    question: {
      id: 'Bisa bekerja dari sini?',
      en: 'Can I work from here?'
    },
    answer: {
      id: 'Bisa. Ada colokan di tiap meja dan Wi-Fi yang stabil.',
      en: 'Yes. There is an outlet at every table and the wifi holds up.'
    }
  },
  {
    id: 'halal',
    question: {
      id: 'Apakah semua halal?',
      en: 'Is everything halal?'
    },
    answer: {
      id: 'Ya. Semua bahan dan minuman kami siapkan sesuai halal.',
      en: 'Yes. All our ingredients and drinks are prepared to halal standards.'
    }
  },
  {
    id: 'event',
    question: {
      id: 'Bisa sewa tempat untuk acara?',
      en: 'Can I hire the space for an event?'
    },
    answer: {
      id: 'Bisa. Hubungi kami lewat WhatsApp untuk paket dan harga sewa.',
      en: 'Yes. Message us on WhatsApp for packages and prices.'
    }
  }
];
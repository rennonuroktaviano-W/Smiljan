/**
 * Menu content — PLACEHOLDER until the owner supplies the real list.
 *
 * Kept as a plain typed array so prices and copy can be edited without
 * touching any component. Text is stored as `{ id, en }` so both languages
 * live side by side in one place. PRD section 8.3 defines the base shape;
 * `longDescription`, `tastingNotes`, `sizes` and `featured` extend it for the
 * detail view and the home page signature row.
 */

import type { LocalizedText } from './shared';

export type MenuCategory =
  | 'kopi-panas'
  | 'kopi-dingin'
  | 'non-kopi'
  | 'makanan'
  | 'pastry';

export type AccentName =
  | 'maroon'
  | 'teal'
  | 'saffron'
  | 'terracotta'
  | 'olive';

export type BadgeName = 'signature' | 'baru' | 'vegan' | 'manual' | 'panas';

export type PortionSize = {
  label: LocalizedText;
  price: number;
};

export type MenuItem = {
  id: string;
  name: LocalizedText;
  category: MenuCategory;
  description: LocalizedText;
  longDescription?: LocalizedText;
  tastingNotes?: LocalizedText;
  price: number;
  image: string;
  accent: AccentName;
  badges?: BadgeName[];
  available: boolean;
  sizes?: PortionSize[];
  /** Pulled into the home page "Menu Signature" row. */
  featured?: boolean;
  brewTime?: number;
};

export const menuCategories: MenuCategory[] = [
  'kopi-panas',
  'kopi-dingin',
  'non-kopi',
  'makanan',
  'pastry'
];

export const categoryAccent: Record<MenuCategory, AccentName> = {
  'kopi-panas': 'maroon',
  'kopi-dingin': 'teal',
  'non-kopi': 'saffron',
  makanan: 'terracotta',
  pastry: 'olive'
};

export const menu: MenuItem[] = [
  /* ---------------------------- Kopi Panas ---------------------------- */
  {
    id: 'espresso-smiljan',
    name: { id: 'Espresso Smiljan', en: 'Smiljan Espresso' },
    category: 'kopi-panas',
    description: {
      id: 'Single shot biji Arabika pilihan, rasa cokelat pekat dan beri.',
      en: 'Single shot of selected Arabica, deep chocolate and berry notes.'
    },
    longDescription: {
      id: 'Diseduh dari biji Ethiopian single origin yang kami sangrai sendiri setiap minggu. Shot-nya pendek, pekat, dan jadi pondasi dari hampir semua menu kami.',
      en: 'Brewed from a weekly house-roasted Ethiopian single origin. The shot is short and concentrated — the base for most of our drinks.'
    },
    tastingNotes: { id: 'Cokelat hitam, blueberry, karamel', en: 'Dark chocolate, blueberry, caramel' },
    price: 18000,
    image: '/images/menu/espresso-smiljan.svg',
    accent: 'maroon',
    badges: ['signature', 'manual'],
    available: true,
    featured: true,
    brewTime: 3
  },
  {
    id: 'manual-brew-v60',
    name: { id: 'Manual Brew V60', en: 'V60 Manual Brew' },
    category: 'kopi-panas',
    description: {
      id: 'Single origin diseduh satu per satu dengan V60 dan timer.',
      en: 'Single origin brewed one cup at a time on a V60, timed by hand.'
    },
    longDescription: {
      id: 'Pour rate kami atur ulang untuk setiap biji, jadi setiap tegukan punya karakter sendiri. Tanya barista kami asal bijinya hari ini.',
      en: 'We adjust the pour rate for every bean, so each cup has its own character. Ask the barista which origin is on today.'
    },
    tastingNotes: { id: 'Floral, red berry, madu hutan', en: 'Floral, red berry, forest honey' },
    price: 38000,
    image: '/images/menu/manual-brew-v60.svg',
    accent: 'maroon',
    badges: ['signature', 'manual'],
    available: true,
    featured: true,
    brewTime: 8
  },
  {
    id: 'kopi-susu-gula-aren',
    name: { id: 'Kopi Susu Gula Aren', en: 'Palm Sugar Latte' },
    category: 'kopi-panas',
    description: {
      id: 'Espresso, susu segar, dan gula aren homemade.',
      en: 'Espresso, fresh milk and homemade palm sugar.'
    },
    longDescription: {
      id: 'Gula aren kami masak sendiri setiap dua hari, jadi rasanya karamel yang dalam — bukan sekadar pemanis.',
      en: 'We cook our palm sugar every other day, so it tastes like real caramel rather than just a sweetener.'
    },
    tastingNotes: { id: 'Karamel, susu, toasted almond', en: 'Caramel, milk, toasted almond' },
    price: 28000,
    image: '/images/menu/kopi-susu-gula-aren.svg',
    accent: 'maroon',
    badges: ['signature'],
    available: true,
    featured: true,
    brewTime: 5
  },
  {
    id: 'cappuccino-klasik',
    name: { id: 'Cappuccino Klasik', en: 'Classic Cappuccino' },
    category: 'kopi-panas',
    description: {
      id: 'Espresso ganda dengan microfoam susu yang tebal.',
      en: 'Double espresso with thick, glossy microfoam.'
    },
    price: 26000,
    image: '/images/menu/cappuccino-klasik.svg',
    accent: 'maroon',
    available: true,
    brewTime: 4
  },
  {
    id: 'flat-white',
    name: { id: 'Flat White', en: 'Flat White' },
    category: 'kopi-panas',
    description: {
      id: 'Rasio kopi dan susu seimbang, tekstur lembut.',
      en: 'A balanced coffee-to-milk ratio with a silky texture.'
    },
    price: 27000,
    image: '/images/menu/flat-white.svg',
    accent: 'maroon',
    available: true,
    brewTime: 4
  },
  {
    id: 'mocha-espresso',
    name: { id: 'Mocha Espresso', en: 'Espresso Mocha' },
    category: 'kopi-panas',
    description: {
      id: 'Espresso, cokelat single origin, dan susu.',
      en: 'Espresso, single origin chocolate and milk.'
    },
    price: 32000,
    image: '/images/menu/mocha-espresso.svg',
    accent: 'maroon',
    badges: ['baru'],
    available: true,
    brewTime: 5
  },

  /* ---------------------------- Kopi Dingin --------------------------- */
  {
    id: 'cold-brew-18-jam',
    name: { id: 'Cold Brew 18 Jam', en: '18-Hour Cold Brew' },
    category: 'kopi-dingin',
    description: {
      id: 'Diberendam 18 jam, manis alami tanpa tambahan gula.',
      en: 'Steeped for 18 hours, naturally sweet with no added sugar.'
    },
    longDescription: {
      id: 'Steeped dalam air dingin selama 18 jam di kitchen kami. Manisnya datang dari bijinya sendiri, jadi kami tidak perlu menambah gula sama sekali.',
      en: 'Steeped in cold water for 18 hours in our kitchen. The sweetness comes from the beans themselves, so we add no sugar at all.'
    },
    tastingNotes: { id: 'Cokelat, batu buah, acidity rendah', en: 'Cocoa, stone fruit, low acidity' },
    price: 32000,
    image: '/images/menu/cold-brew-18-jam.svg',
    accent: 'teal',
    badges: ['signature'],
    available: true,
    featured: true,
    sizes: [
      { label: { id: 'Reguler', en: 'Regular' }, price: 32000 },
      { label: { id: 'Large', en: 'Large' }, price: 38000 }
    ],
    brewTime: 2
  },
  {
    id: 'iced-latte-gula-aren',
    name: { id: 'Iced Latte Gula Aren', en: 'Iced Palm Sugar Latte' },
    category: 'kopi-dingin',
    description: {
      id: 'Espresso, susu dingin, dan gula aren encer.',
      en: 'Espresso, cold milk and diluted palm sugar.'
    },
    price: 30000,
    image: '/images/menu/iced-latte-gula-aren.svg',
    accent: 'teal',
    badges: ['signature'],
    available: true,
    brewTime: 4
  },
  {
    id: 'espresso-tonic',
    name: { id: 'Espresso Tonic', en: 'Espresso Tonic' },
    category: 'kopi-dingin',
    description: {
      id: 'Espresso, tonic, dan kulit jeruk segar.',
      en: 'Espresso, tonic and a strip of fresh citrus peel.'
    },
    tastingNotes: { id: 'Jeruk segar, notes cerah, sparkling', en: 'Citrus, bright, sparkling' },
    price: 34000,
    image: '/images/menu/espresso-tonic.svg',
    accent: 'teal',
    available: true,
    brewTime: 4
  },
  {
    id: 'affogato',
    name: { id: 'Affogato', en: 'Affogato' },
    category: 'kopi-dingin',
    description: {
      id: 'Es vanilla di atas single shot espresso.',
      en: 'Vanilla ice cream over a single espresso shot.'
    },
    price: 36000,
    image: '/images/menu/affogato.svg',
    accent: 'teal',
    available: true,
    brewTime: 3
  },
  {
    id: 'matcha-latte-iced',
    name: { id: 'Iced Matcha Latte', en: 'Iced Matcha Latte' },
    category: 'kopi-dingin',
    description: {
      id: 'Ceremonial grade matcha whisked dengan susu dingin.',
      en: 'Ceremonial grade matcha whisked into cold milk.'
    },
    price: 33000,
    image: '/images/menu/iced-matcha-latte.svg',
    accent: 'teal',
    badges: ['baru', 'vegan'],
    available: true,
    brewTime: 5
  },
  {
    id: 'kopi-susu-kelapa-dingin',
    name: { id: 'Kopi Susu Kelapa Dingin', en: 'Iced Coconut Coffee' },
    category: 'kopi-dingin',
    description: {
      id: 'Espresso dengan santan kelapa segar.',
      en: 'Espresso with fresh coconut milk.'
    },
    price: 31000,
    image: '/images/menu/kopi-susu-kelapa-dingin.svg',
    accent: 'teal',
    badges: ['vegan'],
    available: true,
    brewTime: 4
  },

  /* ------------------------------ Non-Kopi ---------------------------- */
  {
    id: 'matcha-ceremonial',
    name: { id: 'Matcha Ceremonial', en: 'Ceremonial Matcha' },
    category: 'non-kopi',
    description: {
      id: 'Gradehighest matcha, diseduh traditional dengan whisk bambu.',
      en: 'Highest grade matcha whisked traditionally with a bamboo chasen.'
    },
    longDescription: {
      id: 'Kami menyeduh matcha secara tradicional, satu mangkuk sekaligus, supaya foamnya tetap lembut dan rasanya tidak pahit.',
      en: 'We whisk each bowl traditionally, one at a time, so the foam stays silky and never turns bitter.'
    },
    tastingNotes: { id: 'Rumput hijau, krim, slight sweetness', en: 'Green grass, cream, gentle sweetness' },
    price: 34000,
    image: '/images/menu/matcha-ceremonial.svg',
    accent: 'saffron',
    badges: ['signature', 'vegan'],
    available: true,
    featured: true,
    brewTime: 6
  },
  {
    id: 'cokelat-belanda',
    name: { id: 'Cokelat Belanda', en: 'Dutch Chocolate' },
    category: 'non-kopi',
    description: {
      id: 'Cokelat single origin, thick dan tidak manis berlebihan.',
      en: 'Single origin chocolate, thick and never cloying.'
    },
    price: 30000,
    image: '/images/menu/cokelat-belanda.svg',
    accent: 'saffron',
    available: true,
    brewTime: 5
  },
  {
    id: 'chai-latte',
    name: { id: 'Chai Latte', en: 'Chai Latte' },
    category: 'non-kopi',
    description: {
      id: 'Black tea, cardamom, clove, dan susu.',
      en: 'Black tea, cardamom, clove and milk.'
    },
    price: 29000,
    image: '/images/menu/chai-latte.svg',
    accent: 'saffron',
    badges: ['vegan'],
    available: true,
    brewTime: 6
  },
  {
    id: 'matcha-latte-panas',
    name: { id: 'Matcha Latte', en: 'Matcha Latte' },
    category: 'non-kopi',
    description: {
      id: 'Matcha dengan susu segar, panas atau dingin.',
      en: 'Matcha with fresh milk, served hot or iced.'
    },
    price: 32000,
    image: '/images/menu/matcha-latte-panas.svg',
    accent: 'saffron',
    badges: ['vegan'],
    available: true,
    brewTime: 5
  },
  {
    id: 'hot-chocolate-white',
    name: { id: 'Hot Chocolate', en: 'Hot Chocolate' },
    category: 'non-kopi',
    description: {
      id: 'White chocolate dengan susu segar.',
      en: 'White chocolate with fresh milk.'
    },
    price: 30000,
    image: '/images/menu/hot-chocolate-white.svg',
    accent: 'saffron',
    available: true,
    brewTime: 5
  },

  /* ------------------------------ Makanan ---------------------------- */
  {
    id: 'brunch-plate',
    name: { id: 'Smiljan Brunch Plate', en: 'Smiljan Brunch Plate' },
    category: 'makanan',
    description: {
      id: 'Telur, sosis, string beans, dan roti sourdough.',
      en: 'Eggs, sausage, string beans and sourdough toast.'
    },
    longDescription: {
      id: 'Ayah yang tepat untuk pagi yang lambat: telur dari persuwa lokal, sosis/home-made, dan roti yang dipanggang setiap pagi.',
      en: 'Built for a slow morning: eggs from local farmers, house-made sausage, and bread baked fresh each morning.'
    },
    price: 68000,
    image: '/images/menu/brunch-plate.svg',
    accent: 'terracotta',
    badges: ['signature'],
    available: true,
    featured: true
  },
  {
    id: 'eggs-benedict',
    name: { id: 'Eggs Benedict', en: 'Eggs Benedict' },
    category: 'makanan',
    description: {
      id: 'Poached egg, ham, dan saus hollandaise.',
      en: 'Poached egg, ham and hollandaise sauce.'
    },
    price: 58000,
    image: '/images/menu/eggs-benedict.svg',
    accent: 'terracotta',
    available: true
  },
  {
    id: 'avocado-toast',
    name: { id: 'Avocado Toast', en: 'Avocado Toast' },
    category: 'makanan',
    description: {
      id: 'Alpukat, teler, chili crisp, dan lemon.',
      en: 'Avocado, rye, chilli crisp and lemon.'
    },
    price: 52000,
    image: '/images/menu/avocado-toast.svg',
    accent: 'terracotta',
    badges: ['vegan'],
    available: true
  },
  {
    id: 'pan-seared-pasta',
    name: { id: 'Pasta Mushroom', en: 'Mushroom Pasta' },
    category: 'makanan',
    description: {
      id: 'Tagliatelle, jamur, kaldu roasted, dan parmesan.',
      en: 'Tagliatelle, mushrooms, roasted broth and parmesan.'
    },
    price: 62000,
    image: '/images/menu/pan-seared-pasta.svg',
    accent: 'terracotta',
    available: true
  },
  {
    id: 'apple-crumble',
    name: { id: 'Apple Crumble', en: 'Apple Crumble' },
    category: 'makanan',
    description: {
      id: 'Apel panggang, crumble kue, dan es krim vanilla.',
      en: 'Baked apple, crumble topping and vanilla ice cream.'
    },
    price: 48000,
    image: '/images/menu/apple-crumble.svg',
    accent: 'terracotta',
    available: true
  },
  {
    id: 'soup-of-the-day',
    name: { id: 'Sup Hari Ini', en: 'Soup of the Day' },
    category: 'makanan',
    description: {
      id: 'Sup hangat harian dengan roti artisan.',
      en: 'A daily warm soup with artisan bread.'
    },
    price: 45000,
    image: '/images/menu/soup-of-the-day.svg',
    accent: 'terracotta',
    available: true
  },

  /* ------------------------------ Pastry ------------------------------ */
  {
    id: 'butter-croissant',
    name: { id: 'Butter Croissant', en: 'Butter Croissant' },
    category: 'pastry',
    description: {
      id: 'Dapurnya baked setiap jam 7 pagi. 27 lapis mentega.',
      en: 'Baked in our kitchen from 7am. Twenty-seven layers of butter.'
    },
    longDescription: {
      id: 'Dibuat dengan butter asli dan proofing selama tiga hari. Renup di luar, berlapis dan lembut di dalam.',
      en: 'Made with real butter and proofed for three days. Crisp outside, laminated and soft within.'
    },
    price: 28000,
    image: '/images/menu/butter-croissant.svg',
    accent: 'olive',
    badges: ['signature'],
    available: true,
    featured: true
  },
  {
    id: 'banana-toast',
    name: { id: 'Banana Bread', en: 'Banana Bread' },
    category: 'pastry',
    description: {
      id: 'Pisang matang, walnut, dan gula aren.',
      en: 'Overripe banana, walnuts and palm sugar.'
    },
    price: 32000,
    image: '/images/menu/banana-toast.svg',
    accent: 'olive',
    available: true
  },
  {
    id: 'double-chocolate-cookie',
    name: { id: 'Double Chocolate Cookie', en: 'Double Chocolate Cookie' },
    category: 'pastry',
    description: {
      id: 'Cokelat belge dan dark, dengan garam laut di atas.',
      en: 'Belgian and dark chocolate, finished with sea salt.'
    },
    price: 26000,
    image: '/images/menu/double-chocolate-cookie.svg',
    accent: 'olive',
    available: true
  },
  {
    id: 'basque-cheesecake',
    name: { id: 'Basque Cheesecake', en: 'Basque Cheesecake' },
    category: 'pastry',
    description: {
      id: 'Lembut di tengah, karamel gelap di permukaan.',
      en: 'Soft in the middle, dark caramel on top.'
    },
    price: 45000,
    image: '/images/menu/basque-cheesecake.svg',
    accent: 'olive',
    badges: ['baru'],
    available: true
  },
  {
    id: 'cinnamon-roll',
    name: { id: 'Cinnamon Roll', en: 'Cinnamon Roll' },
    category: 'pastry',
    description: {
      id: 'Kayu manis Ceylon dan cream cheese glaze.',
      en: 'Ceylon cinnamon with cream cheese glaze.'
    },
    price: 34000,
    image: '/images/menu/cinnamon-roll.svg',
    accent: 'olive',
    available: true
  }
];

export function getMenuByCategory(category: MenuCategory): MenuItem[] {
  return menu.filter((item) => item.category === category);
}

export function getMenuItem(id: string): MenuItem | undefined {
  return menu.find((item) => item.id === id);
}

export const featuredMenu = menu.filter((item) => item.featured);

export const badgeNames: BadgeName[] = [
  'signature',
  'baru',
  'vegan',
  'manual',
  'panas'
];

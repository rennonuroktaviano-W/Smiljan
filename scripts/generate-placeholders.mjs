/**
 * Generates the placeholder illustration set.
 *
 * These stand in for real product and interior photography until the photo
 * shoot happens. They are drawn from the same palette as the site so the pages
 * look intentional rather than broken, and every file is deterministic — rerun
 * this script to regenerate them after a palette change.
 *
 * Swap-in instructions: replace a file with a real photo of the same name and
 * aspect ratio, or point the matching entry in `data/menu.ts` /
 * `data/gallery.ts` at the new path. Nothing else needs to change.
 *
 * Run with: npm run images:placeholder
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'public', 'images');

const PALETTE = {
  cream: '#F7EFE2',
  creamDeep: '#EFE3D0',
  espresso: '#2A1810',
  maroon: '#8C2F39',
  maroonDeep: '#6E222B',
  saffron: '#E8A317',
  saffronSoft: '#F5C463',
  teal: '#1F6F8B',
  tealDeep: '#17566C',
  olive: '#2F5D50',
  oliveDeep: '#234639',
  terracotta: '#C9663D',
  terracottaDeep: '#8F4526'
};

/** Accent ramp per category, mirroring components/ui/accent.ts. */
const RAMP = {
  maroon: [PALETTE.creamDeep, PALETTE.maroon, PALETTE.maroonDeep, PALETTE.espresso],
  teal: ['#DCE9EF', PALETTE.teal, PALETTE.tealDeep, PALETTE.espresso],
  saffron: ['#FBEBCB', PALETTE.saffron, PALETTE.saffronSoft, PALETTE.espresso],
  terracotta: ['#F6E1D6', PALETTE.terracotta, PALETTE.terracottaDeep, PALETTE.espresso],
  olive: ['#DDE7E3', PALETTE.olive, PALETTE.oliveDeep, PALETTE.espresso]
};

function hexToRgb(hex) {
  const value = hex.replace('#', '');

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function mix(a, b, amount) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const to = (x) => Math.round(x).toString(16).padStart(2, '0');

  return `#${to(ca.r + (cb.r - ca.r) * amount)}${to(
    ca.g + (cb.g - ca.g) * amount
  )}${to(ca.b + (cb.b - ca.b) * amount)}`;
}

/** Small deterministic hash so each item gets a stable but varied layout. */
function hash(value) {
  let result = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    result ^= value.charCodeAt(i);
    result = Math.imul(result, 16777619);
  }

  return Math.abs(result);
}

/* ----------------------------- silhouettes ----------------------------- */

const SILHOUETTES = {
  /** Hot cup with steam, seen three-quarter. */
  cup(view) {
    const { cx, cy, s, ink } = view;
    const w = 210 * s;
    const h = 160 * s;

    return `
    <g fill="${ink}">
      <path d="M${cx - w / 2} ${cy - h / 2} h${w} a${18 * s} ${18 * s} 0 0 1 ${18 * s} ${18 * s}
        v${h - 36 * s} a${18 * s} ${18 * s} 0 0 1 -${18 * s} ${18 * s} h-${w} z" opacity="0.92"/>
      <path d="M${cx + w / 2 - 6 * s} ${cy - h / 2 + 46 * s}
        c${70 * s} ${4 * s} ${74 * s} ${78 * s} ${6 * s} ${86 * s}
        l-${10 * s} ${-14 * s} c-${52 * s} -${10 * s} -${48 * s} -${62 * s} ${4 * s} -${66 * s} z" opacity="0.92"/>
      <rect x="${cx - w / 2 - 26 * s}" y="${cy + h / 2 + 6 * s}" width="${w + 52 * s}" height="${16 * s}" rx="${8 * s}" opacity="0.7"/>
      <path d="M${cx - 44 * s} ${cy - h / 2 - 26 * s}
        c-${16 * s} -${22 * s} ${16 * s} -${40 * s} 0 -${62 * s}"
        stroke="${ink}" stroke-width="${9 * s}" fill="none" stroke-linecap="round" opacity="0.55"/>
      <path d="M${cx + 6 * s} ${cy - h / 2 - 34 * s}
        c-${16 * s} -${22 * s} ${16 * s} -${40 * s} 0 -${62 * s}"
        stroke="${ink}" stroke-width="${9 * s}" fill="none" stroke-linecap="round" opacity="0.4"/>
      <path d="M${cx + 54 * s} ${cy - h / 2 - 24 * s}
        c-${16 * s} -${22 * s} ${16 * s} -${40 * s} 0 -${62 * s}"
        stroke="${ink}" stroke-width="${9 * s}" fill="none" stroke-linecap="round" opacity="0.5"/>
    </g>`;
  },

  /** Tall iced glass with ice cubes and a straw. */
  glass(view) {
    const { cx, cy, s, ink } = view;
    const w = 150 * s;
    const h = 260 * s;

    return `
    <g fill="${ink}">
      <path d="M${cx - w / 2} ${cy - h / 2} h${w} l-${16 * s} ${h} a${14 * s} ${14 * s} 0 0 1 -${14 * s} ${14 * s}
        h-${w - 44 * s} a${14 * s} ${14 * s} 0 0 1 -${14 * s} -${14 * s} z" opacity="0.9"/>
      <rect x="${cx - w / 2 + 14 * s}" y="${cy - h / 2 + 46 * s}" width="${38 * s}" height="${38 * s}" rx="${8 * s}" fill="${PALETTE.cream}" opacity="0.75"/>
      <rect x="${cx + 8 * s}" y="${cy - h / 2 + 26 * s}" width="${38 * s}" height="${38 * s}" rx="${8 * s}" fill="${PALETTE.cream}" opacity="0.6"/>
      <rect x="${cx - 6 * s}" y="${cy - h / 2 + 96 * s}" width="${38 * s}" height="${38 * s}" rx="${8 * s}" fill="${PALETTE.cream}" opacity="0.5"/>
      <rect x="${cx + 26 * s}" y="${cy - h / 2 - 46 * s}" width="${13 * s}" height="${150 * s}" rx="${7 * s}"
        transform="rotate(14 ${cx + 32 * s} ${cy - h / 2 + 20 * s})" opacity="0.85"/>
    </g>`;
  },

  /** Wide bowl with a bamboo whisk. */
  bowl(view) {
    const { cx, cy, s, ink } = view;
    const w = 260 * s;

    return `
    <g fill="${ink}">
      <path d="M${cx - w / 2} ${cy - 24 * s} h${w}
        c-${14 * s} ${110 * s} -${64 * s} ${150 * s} -${w / 2} ${150 * s}
        s-${(w / 2 - 14 * s)} -${40 * s} -${w / 2} -${150 * s} z" opacity="0.92"/>
      <rect x="${cx - w / 2 + 22 * s}" y="${cy + 138 * s}" width="${w - 44 * s}" height="${14 * s}" rx="${7 * s}" opacity="0.7"/>
      <g stroke="${ink}" stroke-width="${7 * s}" stroke-linecap="round" opacity="0.6" fill="none">
        <path d="M${cx - 22 * s} ${cy - 130 * s} l${-14 * s} ${118 * s}"/>
        <path d="M${cx} ${cy - 138 * s} l0 ${124 * s}"/>
        <path d="M${cx + 22 * s} ${cy - 130 * s} l${14 * s} ${118 * s}"/>
      </g>
      <rect x="${cx - 40 * s}" y="${cy - 152 * s}" width="${80 * s}" height="${18 * s}" rx="${9 * s}" opacity="0.85"/>
    </g>`;
  },

  /** Plate seen from above with cutlery. */
  plate(view) {
    const { cx, cy, s, ink } = view;
    const r = 150 * s;

    return `
    <g fill="${ink}">
      <circle cx="${cx}" cy="${cy}" r="${r}" opacity="0.88"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="${PALETTE.cream}" opacity="0.5"/>
      <circle cx="${cx - r * 0.2}" cy="${cy - r * 0.12}" r="${r * 0.3}" opacity="0.75"/>
      <circle cx="${cx + r * 0.24}" cy="${cy + r * 0.1}" r="${r * 0.22}" opacity="0.6"/>
      <rect x="${cx + r + 34 * s}" y="${cy - 96 * s}" width="${11 * s}" height="${150 * s}" rx="${6 * s}" opacity="0.8"/>
      <rect x="${cx + r + 56 * s}" y="${cy - 96 * s}" width="${11 * s}" height="${150 * s}" rx="${6 * s}" opacity="0.8"/>
      <rect x="${cx - r - 78 * s}" y="${cy - 40 * s}" width="${44 * s}" height="${13 * s}" rx="${7 * s}" opacity="0.7"/>
    </g>`;
  },

  /** Crescent croissant. */
  croissant(view) {
    const { cx, cy, s, ink } = view;

    return `
    <g fill="${ink}">
      <path d="M${cx - 190 * s} ${cy + 40 * s}
        c${20 * s} -${104 * s} ${148 * s} -${150 * s} ${190 * s} -${64 * s}
        c${42 * s} ${86 * s} ${170 * s} ${40 * s} ${190 * s} ${64 * s} z" opacity="0.92"/>
      <g stroke="${PALETTE.cream}" stroke-width="${9 * s}" opacity="0.55" stroke-linecap="round" fill="none">
        <path d="M${cx - 120 * s} ${cy + 6 * s} l${22 * s} ${-40 * s}"/>
        <path d="M${cx - 60 * s} ${cy - 20 * s} l${22 * s} ${-40 * s}"/>
        <path d="M${cx} ${cy - 30 * s} l${22 * s} ${-40 * s}"/>
        <path d="M${cx + 60 * s} ${cy - 20 * s} l${22 * s} ${-40 * s}"/>
        <path d="M${cx + 120 * s} ${cy + 6 * s} l${22 * s} ${-40 * s}"/>
      </g>
    </g>`;
  },

  /** Abstract interior: arch doorway, table and pendant lamps. */
  interior(view) {
    const { cx, cy, s, ink, mid } = view;

    return `
    <g fill="${ink}">
      <path d="M${cx - 210 * s} ${cy + 190 * s} v-${190 * s}
        a${210 * s} ${210 * s} 0 0 1 ${420 * s} 0 v${190 * s} z" opacity="0.9"/>
      <rect x="${cx - 26 * s}" y="${cy - 150 * s}" width="${52 * s}" height="${60 * s}" rx="${10 * s}" fill="${PALETTE.cream}" opacity="0.5"/>
      <rect x="${cx - 150 * s}" y="${cy + 40 * s}" width="${300 * s}" height="${20 * s}" rx="${10 * s}" fill="${mid}"/>
      <rect x="${cx - 128 * s}" y="${cy + 60 * s}" width="${18 * s}" height="${130 * s}" rx="${9 * s}" opacity="0.75"/>
      <rect x="${cx + 110 * s}" y="${cy + 60 * s}" width="${18 * s}" height="${130 * s}" rx="${9 * s}" opacity="0.75"/>
      <g stroke="${ink}" stroke-width="${7 * s}" opacity="0.6" stroke-linecap="round">
        <path d="M${cx - 96 * s} ${cy - 190 * s} v${44 * s}"/>
        <path d="M${cx + 96 * s} ${cy - 190 * s} v${44 * s}"/>
      </g>
      <circle cx="${cx - 96 * s}" cy="${cy - 132 * s}" r="${26 * s}" opacity="0.85"/>
      <circle cx="${cx + 96 * s}" cy="${cy - 132 * s}" r="${26 * s}" opacity="0.85"/>
    </g>`;
  },

  /** Two clinking glasses for events. */
  event(view) {
    const { cx, cy, s, ink } = view;

    return `
    <g fill="${ink}">
      <path d="M${cx - 150 * s} ${cy - 120 * s} h${86 * s} l-${16 * s} ${210 * s}
        a${16 * s} ${16 * s} 0 0 1 -${16 * s} ${16 * s} h-${38 * s}
        a${16 * s} ${16 * s} 0 0 1 -${16 * s} -${16 * s} z" opacity="0.9" transform="rotate(-10 ${cx - 107 * s} ${cy})"/>
      <path d="M${cx + 64 * s} ${cy - 120 * s} h${86 * s} l-${16 * s} ${210 * s}
        a${16 * s} ${16 * s} 0 0 1 -${16 * s} ${16 * s} h-${38 * s}
        a${16 * s} ${16 * s} 0 0 1 -${16 * s} -${16 * s} z" opacity="0.9" transform="rotate(10 ${cx + 107 * s} ${cy})"/>
      <circle cx="${cx}" cy="${cy - 158 * s}" r="${16 * s}" opacity="0.7"/>
      <g stroke="${ink}" stroke-width="${8 * s}" opacity="0.5" stroke-linecap="round" fill="none">
        <path d="M${cx - 190 * s} ${cy + 150 * s} h${380 * s}"/>
      </g>
    </g>`;
  }
};

/* ------------------------------- renderer ------------------------------ */

function renderSvg({
  width,
  height,
  accentKey,
  seed,
  silhouette,
  label
}) {
  const [tint, mid, deep, ink] = RAMP[accentKey];
  const seedValue = hash(seed);
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) / 800;
  const rotation = (seedValue % 24) - 12;

  const blob = mix(tint, mid, 0.22 + (seedValue % 30) / 100);
  const patternSize = 28 + (seedValue % 3) * 12;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PALETTE.cream}"/>
      <stop offset="55%" stop-color="${tint}"/>
      <stop offset="100%" stop-color="${blob}"/>
    </linearGradient>
    <pattern id="tile" width="${patternSize}" height="${patternSize}" patternUnits="userSpaceOnUse" patternTransform="rotate(${(seedValue % 4) * 15})">
      <rect width="${patternSize}" height="${patternSize}" fill="none"/>
      <path d="M0 0 L${patternSize} 0 L0 ${patternSize} Z" fill="${deep}" opacity="0.13"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#wash)"/>

  <circle cx="${cx}" cy="${cy}" r="${Math.min(width, height) * 0.44}" fill="${mid}" opacity="0.13"/>
  <circle cx="${width * 0.14}" cy="${height * 0.16}" r="${Math.min(width, height) * 0.09}" fill="${deep}" opacity="0.16"/>
  <circle cx="${width * 0.86}" cy="${height * 0.82}" r="${Math.min(width, height) * 0.13}" fill="${mid}" opacity="0.18"/>

  <g transform="rotate(${rotation} ${cx} ${cy})">
    ${SILHOUETTES[silhouette]({ cx, cy, s: scale, ink: deep, mid })}
  </g>

  <rect width="${width}" height="${height}" fill="url(#tile)"/>

  <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="${deep}" stroke-width="3" opacity="0.18"/>
</svg>
`;
}

function write(relativePath, contents) {
  const full = join(OUT, relativePath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents, 'utf8');

  return relativePath;
}

const written = [];

/* ------------------------------ menu art ------------------------------- */

const MENU_ART = {
  'kopi-panas': 'cup',
  'kopi-dingin': 'glass',
  'non-kopi': 'bowl',
  'makanan': 'plate',
  pastry: 'croissant'
};

/** Menu items, read straight from the real data file — no duplicate manifest. */
const { menu } = await import('../data/menu.ts');

for (const item of menu) {
  written.push(
    write(
      `menu/${item.id}.svg`,
      renderSvg({
        width: 800,
        height: 800,
        accentKey: item.accent,
        seed: item.id,
        silhouette: MENU_ART[item.category],
        label: `${item.name.en} placeholder illustration`
      })
    )
  );
}

/* ---------------------------- gallery art ------------------------------ */

const { gallery } = await import('../data/gallery.ts');

const GALLERY_ART = {
  interior: 'interior',
  minuman: 'cup',
  makanan: 'plate',
  event: 'event'
};

const GALLERY_ACCENT = {
  interior: 'olive',
  minuman: 'maroon',
  makanan: 'terracotta',
  event: 'teal'
};

for (const item of gallery) {
  written.push(
    write(
      `gallery/${item.id}.svg`,
      renderSvg({
        width: item.width,
        height: item.height,
        accentKey: GALLERY_ACCENT[item.category],
        seed: item.id,
        silhouette: GALLERY_ART[item.category],
        label: `${item.caption.en} placeholder illustration`
      })
    )
  );
}

/* ------------------------------ team art ------------------------------- */

const TEAM_ACCENT = ['maroon', 'terracotta', 'olive'];
const TEAM_NAMES = ['barista-1', 'barista-2', 'barista-3'];

TEAM_NAMES.forEach((name, index) => {
  written.push(
    write(
      `team/${name}.svg`,
      renderSvg({
        width: 600,
        height: 600,
        accentKey: TEAM_ACCENT[index],
        seed: name,
        silhouette: 'cup',
        label: `${name} placeholder portrait`
      })
    )
  );
});

/* --------------------------- brand + social ---------------------------- */

written.push(
  write(
    'og-cover.svg',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Smiljan Coffee">
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PALETTE.espresso}"/>
      <stop offset="100%" stop-color="${PALETTE.maroonDeep}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <circle cx="960" cy="150" r="220" fill="${PALETTE.saffron}" opacity="0.16"/>
  <circle cx="180" cy="520" r="180" fill="${PALETTE.terracotta}" opacity="0.18"/>
  <g fill="none" stroke="${PALETTE.saffron}" stroke-width="2" opacity="0.4">
    <path d="M0 630 L1200 0"/>
  </g>
  <text x="80" y="300" font-family="Georgia, serif" font-size="86" fill="${PALETTE.cream}" letter-spacing="10">SMILJAN</text>
  <text x="84" y="356" font-family="Georgia, serif" font-size="30" fill="${PALETTE.saffronSoft}" letter-spacing="7">SLOW BREWED · FRESHLY ROASTED</text>
</svg>
`
  )
);

console.log(`✓ generated ${written.length} placeholder images in public/images`);

import type { AccentName } from '@/data/menu';

/**
 * One accent colour per section / category — PRD 4.2 and 5.3.
 *
 * Class strings are written out in full (rather than assembled at runtime)
 * so Tailwind's scanner can see them. Every pairing below clears WCAG AA
 * for body text — the saffron block is the one place that needs dark text
 * instead of cream, because yellow cannot carry light text accessibly.
 */
export const accent = {
  maroon: {
    /** Filled block, cream text — 9.5:1 */
    solid: 'bg-maroon text-cream',
    solidHover: 'hover:bg-maroon-deep',
    /** Tinted surface, maroon text — 5.0:1 on cream */
    soft: 'bg-maroon/10 text-maroon border-maroon/20',
    text: 'text-maroon',
    bar: 'bg-maroon',
    underline: 'bg-maroon',
    ring: 'focus-visible:outline-maroon'
  },
  teal: {
    solid: 'bg-teal text-cream',
    solidHover: 'hover:bg-teal-deep',
    soft: 'bg-teal/10 text-teal border-teal/20',
    text: 'text-teal',
    bar: 'bg-teal',
    underline: 'bg-teal',
    ring: 'focus-visible:outline-teal'
  },
  olive: {
    solid: 'bg-olive text-cream',
    solidHover: 'hover:bg-olive-deep',
    soft: 'bg-olive/10 text-olive border-olive/20',
    text: 'text-olive',
    bar: 'bg-olive',
    underline: 'bg-olive',
    ring: 'focus-visible:outline-olive'
  },
  /** Saffron is bright — espresso text on it reaches 7.8:1. */
  saffron: {
    solid: 'bg-saffron text-espresso',
    solidHover: 'hover:bg-saffron-soft',
    soft: 'bg-saffron/20 text-espresso border-saffron/40',
    text: 'text-espresso',
    bar: 'bg-saffron',
    underline: 'bg-saffron',
    ring: 'focus-visible:outline-saffron'
  },
  /** Terracotta is mid-tone; the deep variant carries cream text at 6:1. */
  terracotta: {
    solid: 'bg-terracotta-deep text-cream',
    solidHover: 'hover:bg-terracotta',
    soft: 'bg-terracotta/15 text-terracotta-deep border-terracotta/30',
    text: 'text-terracotta-deep',
    bar: 'bg-terracotta',
    underline: 'bg-terracotta',
    ring: 'focus-visible:outline-terracotta'
  }
} satisfies Record<AccentName, Record<string, string>>;

export type AccentKey = AccentName;

export function accentOf(name: AccentKey) {
  return accent[name];
}

/**
 * Card surface for a tinted pull-quote / info panel. Extracted so every call
 * site emits a literal class string Tailwind can see.
 */
export function accentSurface(name: AccentKey): string {
  return accent[name].soft;
}

/** Ordered accent rotation used when a section shows several cards. */
export const accentRotation: AccentKey[] = [
  'maroon',
  'teal',
  'saffron',
  'terracotta',
  'olive'
];

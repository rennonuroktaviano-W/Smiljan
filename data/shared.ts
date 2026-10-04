export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export type LocaleCode = 'id' | 'en';

/** Content authored once and rendered in both languages. */
export type LocalizedText = Record<LocaleCode, string>;

/** Picks the right language, always falling back to Indonesian. */
export function pick(text: LocalizedText, locale: string): string {
  return text[locale as LocaleCode] ?? text.id;
}

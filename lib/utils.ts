export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

/** Minimal class name joiner — keeps the dependency surface small. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }

  return out.join(' ');
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Formats an integer IDR price, e.g. 28000 → "Rp28.000". */
export function formatIDR(value: number, locale = 'id-ID'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number, locale = 'id-ID'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** "14:30" → "2:30 PM" / "14.30" depending on locale. */
export function formatTime(
  hhmm: string,
  locale: string,
  timeZone: string
): string {
  const [hours, minutes] = hhmm.split(':').map(Number);
  const date = new Date(Date.UTC(2000, 0, 1, hours, minutes));

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: undefined,
    timeZone
  }).format(date);
}

import { openingHours, timeZone } from '@/data/site';

/**
 * Pure helpers for the reservation form (PRD F-03) that must render without
 * pulling zod into the browser bundle — the zod schema lives in
 * `lib/reservation.ts` and is only imported by the route handler and by the
 * form's submit path (dynamic import).
 */

/** Bookable slots, derived from the earliest open to the latest close. */
export const reservationSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00'
] as const;

export type ReservationSlot = (typeof reservationSlots)[number];

export const MAX_GUESTS = 20;

/** Strips formatting so "+62 812-3456" and "08123456" compare the same. */
export function normalisePhone(value: string): string {
  return value.replace(/\D/g, '');
}

/** Today as YYYY-MM-DD in the café's timezone, not the visitor's. */
export function todayInCafeTimezone(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
}

/** The earliest and latest opening time across the week, for slot hints. */
export function openingWindow(): { first: string; last: string } {
  const opens = openingHours
    .map((entry) => entry.open)
    .filter((value): value is string => value !== null);
  const closes = openingHours
    .map((entry) => entry.close)
    .filter((value): value is string => value !== null);

  return {
    first: opens.sort()[0] ?? '08:00',
    last: closes.sort().at(-1) ?? '23:00'
  };
}

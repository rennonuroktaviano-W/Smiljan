import { z } from 'zod';

import { openingHours, timeZone } from '@/data/site';

/**
 * Reservation form contract — PRD F-03.
 *
 * Validation runs in the browser because the submission target is a WhatsApp
 * deep link, so there is no server round trip to protect. The schema is still
 * exported so the same rules can be reused server-side if the owner later adds
 * a database or an email endpoint.
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

export const reservationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'required')
    .max(80, 'tooLong'),

  whatsapp: z
    .string()
    .trim()
    .min(1, 'required')
    .refine((value) => {
      const digits = normalisePhone(value);
      return digits.length >= 9 && digits.length <= 15;
    }, 'phone'),

  date: z
    .string()
    .min(1, 'required')
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), 'date')
    .refine((value) => {
      const today = todayInCafeTimezone();
      return value >= today;
    }, 'pastDate'),

  time: z
    .string()
    .min(1, 'required')
    .refine(
      (value): value is ReservationSlot =>
        (reservationSlots as readonly string[]).includes(value),
      'time'
    ),

  guests: z
    .number({ error: 'required' })
    .int('integer')
    .min(1, 'minGuests')
    .max(MAX_GUESTS, 'maxGuests'),

  notes: z.string().trim().max(500, 'tooLong').optional().default('')
});

export type ReservationInput = z.infer<typeof reservationSchema>;

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

/**
 * Formats a validated reservation into the WhatsApp message body. Newlines
 * rather than punctuation so it stays readable on a phone.
 */
export function formatReservationMessage(
  input: ReservationInput,
  labels: { guests: string; notes: string; date: string; time: string }
): string {
  const lines = [
    `${labels.date}: ${input.date}`,
    `${labels.time}: ${input.time}`,
    `${labels.guests}: ${input.guests}`
  ];

  if (input.notes) lines.push(`${labels.notes}: ${input.notes}`);

  return lines.join('\n');
}
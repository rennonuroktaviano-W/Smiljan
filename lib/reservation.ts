import { z } from 'zod';

import {
  MAX_GUESTS,
  normalisePhone,
  reservationSlots,
  todayInCafeTimezone,
  type ReservationSlot
} from './reservation-shared';

export * from './reservation-shared';

/**
 * Reservation form contract — PRD F-03.
 *
 * The schema runs in the browser (instant feedback, via a dynamic import so
 * zod stays out of the initial bundle) and again on the server (PRD 7) if the
 * owner later adds a database or an email endpoint.
 */

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

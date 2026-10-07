import { z } from 'zod';

/**
 * Contact form contract — PRD F-07.
 *
 * Exported so the browser and the `/api/kontak` route handler enforce the
 * exact same rules (PRD 7 — validation on the server, not only in the form).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'required').max(80, 'tooLong'),
  message: z.string().trim().min(10, 'required').max(1000, 'tooLong')
});

export type ContactInput = z.infer<typeof contactSchema>;

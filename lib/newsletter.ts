import { z } from 'zod';

/**
 * Newsletter signup contract — PRD F-08.
 *
 * Shared by the footer form (instant feedback) and the route handler (the
 * actual gate). The `company` field is the honeypot: real visitors never see
 * it, so anything that fills it is a bot.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'required')
    .max(254, 'tooLong')
    .refine((value) => EMAIL_PATTERN.test(value), 'invalid'),
  company: z.string().max(200).optional().default('')
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

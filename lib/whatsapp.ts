import { whatsappDigits } from '@/data/site';

/**
 * Builds a wa.me deep link with a pre-filled message (PRD F-02).
 * Callers compose the message from translations so it stays in the
 * visitor's language.
 */
export function whatsappLink(message: string, phone = whatsappDigits): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Plain wa.me link with no pre-filled text. */
export function whatsappBareLink(phone = whatsappDigits): string {
  return `https://wa.me/${phone}`;
}

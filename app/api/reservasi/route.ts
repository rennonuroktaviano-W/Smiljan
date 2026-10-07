import { NextResponse } from 'next/server';

import enSummary from '@/messages/en/reservasi.json';
import idSummary from '@/messages/id/reservasi.json';
import { formatReservationMessage, reservationSchema } from '@/lib/reservation';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * Reservation form endpoint — PRD F-03, F-02.
 *
 * The browser validates first for instant feedback, then the payload comes
 * here where the same zod schema runs again (PRD 7 — validation on the
 * server). A successful submission returns the WhatsApp deep link, built
 * server-side, which the client opens. No database in phase one, matching
 * the PRD's "WhatsApp handoff" plan.
 */
const SUMMARY_LABELS = {
  id: idSummary.form.summary,
  en: enSummary.form.summary
} as const;

type Locale = keyof typeof SUMMARY_LABELS;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, issues: [] }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Honeypot (PRD 7 — spam protection). Answer like a success so the bot
  // never learns it was caught.
  if (String(body.company ?? '').trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const result = reservationSchema.safeParse({
    name: body.name,
    whatsapp: body.whatsapp,
    date: body.date,
    time: body.time,
    guests: typeof body.guests === 'number' ? body.guests : Number(body.guests),
    notes: body.notes
  });

  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        issues: result.error.issues.map((issue) => ({
          field: String(issue.path[0] ?? ''),
          code: issue.message
        }))
      },
      { status: 400 }
    );
  }

  const locale: Locale = body.locale === 'en' ? 'en' : 'id';
  const summary = formatReservationMessage(result.data, SUMMARY_LABELS[locale]);
  const waUrl = whatsappLink(`${result.data.name}\n${summary}`);

  return NextResponse.json({ ok: true, waUrl });
}

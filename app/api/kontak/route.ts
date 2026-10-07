import { NextResponse } from 'next/server';

import { contactSchema } from '@/lib/contact';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * Contact form endpoint — PRD F-07.
 *
 * Mirrors `/api/reservasi`: the same zod rules run here as in the browser,
 * then the WhatsApp deep link is composed server-side and returned for the
 * client to open.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, issues: [] }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Honeypot — silently pretend the bot succeeded.
  if (String(body.company ?? '').trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const result = contactSchema.safeParse({
    name: body.name,
    message: body.message
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

  const waUrl = whatsappLink(`${result.data.name}\n${result.data.message}`);

  return NextResponse.json({ ok: true, waUrl });
}

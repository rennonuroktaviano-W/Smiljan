import { NextResponse } from 'next/server';

import { newsletterSchema } from '@/lib/newsletter';

/**
 * Newsletter signup — PRD F-08.
 *
 * Server-side validation plus honeypot spam protection (PRD 7). Set
 * `NEWSLETTER_WEBHOOK_URL` to forward subscribers to a list provider
 * (Buttondown, Mailchimp, Resend audience, a Google Sheet worker, …);
 * without it the sign-up is logged and the site keeps working, so the
 * README's "no environment variables needed" promise still holds.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const result = newsletterSchema.safeParse(payload);

  if (!result.success) {
    const issue = result.error.issues[0];
    return NextResponse.json(
      { ok: false, error: issue?.message ?? 'invalid' },
      { status: 400 }
    );
  }

  // Honeypot tripped: answer like a success so the bot learns nothing.
  if (result.data.company !== '') {
    return NextResponse.json({ ok: true });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: result.data.email,
          source: 'smiljan-website',
          subscribedAt: new Date().toISOString()
        }),
        signal: AbortSignal.timeout(8000)
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, error: 'upstream' },
          { status: 502 }
        );
      }
    } catch {
      return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
    }
  } else {
    console.log(`[newsletter] ${result.data.email}`);
  }

  return NextResponse.json({ ok: true });
}

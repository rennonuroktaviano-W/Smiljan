'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { newsletterSchema } from '@/lib/newsletter';

import { Button } from '../ui/Button';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Newsletter signup — PRD F-08.
 *
 * Posts to `/api/newsletter`, where the same zod schema and the honeypot are
 * enforced again on the server. Success replaces the form so the footer never
 * shows two competing inputs.
 */
export function NewsletterForm() {
  const t = useTranslations('footer.newsletter');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const company = String(form.get('company') ?? '');

    const local = newsletterSchema.safeParse({ email, company });
    if (!local.success) {
      setStatus('error');
      setError(t('invalid'));
      return;
    }

    setStatus('sending');
    setError(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: local.data.email, company })
      });

      if (response.status === 400) {
        setStatus('error');
        setError(t('invalid'));
        return;
      }

      if (!response.ok) {
        setStatus('error');
        setError(t('failed'));
        return;
      }

      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
      setError(t('failed'));
    }
  }

  if (status === 'done') {
    return (
      <p role="status" className="text-sm text-saffron">
        {t('success')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative mt-5 max-w-sm">
      <label htmlFor="newsletter-email" className="text-sm text-cream/75">
        {t('description')}
      </label>

      <div className="mt-3 flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={t('placeholder')}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === 'error') setStatus('idle');
          }}
          aria-invalid={status === 'error'}
          aria-describedby={error ? 'newsletter-status' : undefined}
          className="w-full min-w-0 rounded-xl border border-cream/25 bg-cream/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron aria-[invalid=true]:border-maroon"
        />

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={status === 'sending'}
          className="shrink-0"
        >
          {status === 'sending' ? t('sending') : t('submit')}
        </Button>
      </div>

      {/* Honeypot — invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="newsletter-company">Company</label>
        <input
          id="newsletter-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <p
        id="newsletter-status"
        role={error ? 'alert' : 'status'}
        aria-live="polite"
        className="mt-2 min-h-4 text-xs text-saffron-soft"
      >
        {error}
      </p>
    </form>
  );
}

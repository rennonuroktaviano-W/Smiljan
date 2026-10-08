'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { postJson } from '@/lib/api';

import { Button } from '../ui/Button';
import { WhatsappIcon } from '../ui/BrandIcons';
import { Field, TextArea, TextInput } from '../form/Field';

const ISSUE_KEYS = ['required', 'tooLong'] as const;

type Errors = Partial<Record<'name' | 'message', string>>;

/**
 * Contact form — PRD F-07.
 *
 * Validates with zod in the browser (the schema is imported on demand so
 * zod never enters the page's initial bundle), then posts to `/api/kontak`
 * where the same schema runs again before the server hands back a WhatsApp
 * deep link with the message ready to send.
 */
export function ContactForm() {
  const t = useTranslations('kontak.form');
  const tValidation = useTranslations('kontak.validation');

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const company = String(form.get('company') ?? '').trim();
    if (company !== '') return;

    const { contactSchema } = await import('@/lib/contact');
    const parsed = contactSchema.safeParse({ name, message });

    if (!parsed.success) {
      const next: Errors = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof Errors;
        const code = issue.message as (typeof ISSUE_KEYS)[number];

        if (!next[field] && (ISSUE_KEYS as readonly string[]).includes(code)) {
          next[field] = tValidation(code);
        }
      }

      setErrors(next);

      const firstField = Object.keys(next)[0];
      if (firstField) document.getElementById(firstField)?.focus();

      return;
    }

    setSending(true);
    setFailed(false);

    const result = await postJson<{ ok: true; waUrl: string }>('/api/kontak', {
      ...parsed.data,
      company
    });

    setSending(false);

    if (!result.ok) {
      if (result.issues) {
        const next: Errors = {};

        for (const issue of result.issues) {
          const field = issue.field as keyof Errors;

          if (
            !next[field] &&
            (ISSUE_KEYS as readonly string[]).includes(issue.code as never)
          ) {
            next[field] = tValidation(issue.code as (typeof ISSUE_KEYS)[number]);
          }
        }

        setErrors(next);

        const firstField = Object.keys(next)[0];
        if (firstField) document.getElementById(firstField)?.focus();
      } else {
        setFailed(true);
      }

      return;
    }

    window.open(result.data.waUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-card border border-line bg-surface p-7 shadow-lift sm:p-9"
    >
      <h2 className="font-display text-2xl">{t('title')}</h2>
      <p className="mt-2 text-sm text-ink-muted">{t('description')}</p>

      <div className="mt-8 grid gap-6">
        <Field id="name" label={t('name')} required error={errors.name}>
          {(props) => (
            <TextInput
              {...props}
              name="name"
              autoComplete="name"
              placeholder={t('namePlaceholder')}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((previous) => ({ ...previous, name: undefined }));
                setFailed(false);
              }}
            />
          )}
        </Field>

        <Field id="message" label={t('message')} required error={errors.message}>
          {(props) => (
            <TextArea
              {...props}
              name="message"
              rows={6}
              placeholder={t('messagePlaceholder')}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setErrors((previous) => ({ ...previous, message: undefined }));
                setFailed(false);
              }}
            />
          )}
        </Field>

        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={sending}>
          <WhatsappIcon className="size-4" />
          {t('submit')}
        </Button>

        <p role="alert" className="min-h-4 text-center text-xs font-medium text-maroon">
          {failed ? t('failed') : ''}
        </p>

        <p className="text-center text-xs text-ink-muted">{t('afterSubmit')}</p>
      </div>
    </motion.form>
  );
}

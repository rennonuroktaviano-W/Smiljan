'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '../ui/Button';
import { WhatsappIcon } from '../ui/BrandIcons';
import { Field, TextArea, TextInput } from '../form/Field';
import { whatsappLink } from '@/lib/whatsapp';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'required').max(80, 'tooLong'),
  message: z.string().trim().min(10, 'required').max(1000, 'tooLong')
});

const ISSUE_KEYS = ['required', 'tooLong'] as const;

type Errors = Partial<Record<'name' | 'message', string>>;

/**
 * Contact form — PRD F-07.
 *
 * Same handoff as the reservation form: validate with zod, then open WhatsApp
 * with the message ready to send. No backend needed for phase one.
 */
export function ContactForm() {
  const t = useTranslations('kontak.form');
  const tValidation = useTranslations('kontak.validation');

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    if (String(form.get('company') ?? '').trim() !== '') return;

    const result = contactSchema.safeParse({ name, message });

    if (!result.success) {
      const next: Errors = {};

      for (const issue of result.error.issues) {
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

    window.open(
      whatsappLink(`${result.data.name}\n${result.data.message}`),
      '_blank',
      'noopener,noreferrer'
    );
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

        <Button type="submit" variant="primary" size="lg" className="w-full">
          <WhatsappIcon className="size-4" />
          {t('submit')}
        </Button>

        <p className="text-center text-xs text-ink-muted">{t('afterSubmit')}</p>
      </div>
    </motion.form>
  );
}
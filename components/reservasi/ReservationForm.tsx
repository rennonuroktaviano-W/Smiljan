'use client';

import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { postJson } from '@/lib/api';
import {
  MAX_GUESTS,
  reservationSchema,
  reservationSlots,
  todayInCafeTimezone
} from '@/lib/reservation';

import { Button } from '../ui/Button';
import { WhatsappIcon } from '../ui/BrandIcons';
import { Field, Select, TextArea, TextInput } from '../form/Field';

/** Maps a zod issue code to a translation key under `reservasi.validation`. */
const ISSUE_KEYS = [
  'required',
  'phone',
  'date',
  'pastDate',
  'time',
  'integer',
  'minGuests',
  'maxGuests',
  'tooLong'
] as const;

type Errors = Partial<Record<'name' | 'whatsapp' | 'date' | 'time' | 'guests' | 'notes', string>>;

type FormState = {
  name: string;
  whatsapp: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
};

const EMPTY: FormState = {
  name: '',
  whatsapp: '',
  date: '',
  time: '',
  guests: '2',
  notes: ''
};

/**
 * Reservation form — PRD F-03.
 *
 * Validates with zod in the browser for instant feedback, then posts to
 * `/api/reservasi` where the same schema runs again (PRD 7 — server-side
 * validation). The response carries a WhatsApp deep link, built on the
 * server, that is opened on success — no database to maintain in phase one.
 */
export function ReservationForm() {
  const t = useTranslations('reservasi.form');
  const tValidation = useTranslations('reservasi.validation');
  const locale = useLocale();

  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const minDate = useMemo(() => todayInCafeTimezone(), []);

  const set = (key: keyof FormState) => (value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    // Clear the error as soon as the visitor starts fixing the field.
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setFailed(false);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: a real visitor never sees this field, so anything in it is a
    // bot. Silently do nothing rather than telling the bot it was caught.
    const form = new FormData(event.currentTarget);
    const company = String(form.get('company') ?? '').trim();
    if (company !== '') return;

    const parsed = reservationSchema.safeParse({
      name: values.name,
      whatsapp: values.whatsapp,
      date: values.date,
      time: values.time,
      guests: Number(values.guests),
      notes: values.notes
    });

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

      // Move focus to the first problem so keyboard users are not stranded.
      const firstField = Object.keys(next)[0];
      if (firstField) {
        document.getElementById(firstField)?.focus();
      }

      return;
    }

    setSending(true);
    setFailed(false);

    const result = await postJson<{ ok: true; waUrl: string }>('/api/reservasi', {
      ...parsed.data,
      locale,
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
              value={values.name}
              onChange={(event) => set('name')(event.target.value)}
            />
          )}
        </Field>

        <Field
          id="whatsapp"
          label={t('whatsapp')}
          hint={t('whatsappHint')}
          required
          error={errors.whatsapp}
        >
          {(props) => (
            <TextInput
              {...props}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t('whatsappPlaceholder')}
              value={values.whatsapp}
              onChange={(event) => set('whatsapp')(event.target.value)}
            />
          )}
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="date" label={t('date')} required error={errors.date}>
            {(props) => (
              <TextInput
                {...props}
                name="date"
                type="date"
                min={minDate}
                value={values.date}
                onChange={(event) => set('date')(event.target.value)}
              />
            )}
          </Field>

          <Field id="time" label={t('time')} required error={errors.time}>
            {(props) => (
              <Select
                {...props}
                name="time"
                value={values.time}
                onChange={(event) => set('time')(event.target.value)}
              >
                <option value="">--</option>
                {reservationSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        </div>

        <Field id="guests" label={t('guests')} required error={errors.guests}>
          {(props) => (
            <Select
              {...props}
              name="guests"
              value={values.guests}
              onChange={(event) => set('guests')(event.target.value)}
            >
              {Array.from({ length: MAX_GUESTS }, (_, index) => index + 1).map(
                (count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                )
              )}
            </Select>
          )}
        </Field>

        <Field id="notes" label={t('notes')} error={errors.notes}>
          {(props) => (
            <TextArea
              {...props}
              name="notes"
              rows={4}
              placeholder={t('notesPlaceholder')}
              value={values.notes}
              onChange={(event) => set('notes')(event.target.value)}
            />
          )}
        </Field>

        {/*
          Honeypot (PRD 7 — spam protection). Hidden from people, reachable by
          bots; a filled value aborts the submit before WhatsApp is opened.
        */}
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

        <p className="text-center text-xs text-ink-muted">
          {t('afterSubmit')}
        </p>
      </div>
    </motion.form>
  );
}
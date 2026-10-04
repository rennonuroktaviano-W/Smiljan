'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type FieldProps = {
  id: string;
  label: string;
  /** Shown under the label and referenced by the error message. */
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: {
    id: string;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
    required: boolean;
  }) => ReactNode;
};

const controlClass =
  'w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink transition-colors duration-200 placeholder:text-ink-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-bg aria-[invalid=true]:border-maroon';

/**
 * Label, hint and error wiring for a form control (PRD 7 — labels on every
 * field). The render-prop shape keeps `id`, `aria-invalid` and `aria-describedby`
 * correct without every caller having to remember them.
 */
export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  className,
  children
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ms-1 text-maroon">
            *
          </span>
        ) : null}
      </label>

      {hint ? (
        <p id={hintId} className="text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}

      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        required
      })}

      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-maroon">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClass, className)} />;
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(controlClass, 'resize-y', className)} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(controlClass, 'appearance-none', className)}>
      {children}
    </select>
  );
}
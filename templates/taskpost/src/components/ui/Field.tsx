import React from 'react';
import { AlertCircleIcon } from 'lucide-react';

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, hint, error, optional, children, className }: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-bold text-ink-900">
          {label}
        </label>
        {optional && <span className="text-xs font-medium text-ink-500">Optional</span>}
      </div>
      {children}
      {error ?
      <p id={`${htmlFor}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-700">
          <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p> :

      hint &&
      <p id={`${htmlFor}-hint`} className="mt-1.5 text-xs text-ink-500">
            {hint}
          </p>

      }
    </div>);

}
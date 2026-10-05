import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  startIcon?: React.ReactNode;
  hideLabel?: boolean;
}

export const fieldClasses =
'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 disabled:bg-slate-50 disabled:text-slate-500';

export function TextField({
  label,
  hint,
  error,
  startIcon,
  hideLabel,
  className,
  id,
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className={twMerge('mb-1.5 block text-sm font-medium text-slate-700', hideLabel && 'sr-only')}>
        
        {label}
      </label>
      <div className="relative">
        {startIcon &&
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {startIcon}
          </span>
        }
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={twMerge(
            fieldClasses,
            error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-primary-500',
            startIcon && 'pl-10'
          )}
          {...rest} />
        
      </div>
      {error ?
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p> :
      hint ?
      <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p> :
      null}
    </div>);

}
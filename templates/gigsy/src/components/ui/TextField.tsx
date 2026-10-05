import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  hideLabel?: boolean;
}

export const fieldBase =
'block w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-4';

export function fieldState(error?: string): string {
  return error ?
  'border-rose-400 focus:border-rose-500 focus:ring-rose-100' :
  'border-slate-300 hover:border-slate-400 focus:border-primary-500 focus:ring-primary-100';
}

export function TextField({ label, error, hint, leading, trailing, hideLabel, id, className = '', ...rest }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-slate-800'}>
        {label}
      </label>
      <div className="relative">
        {leading &&
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">{leading}</span>
        }
        <input
          id={inputId}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={twMerge(fieldBase, 'h-11', fieldState(error), leading ? 'pl-10' : '', trailing ? 'pr-10' : '')}
          {...rest} />
        
        {trailing && <span className="absolute inset-y-0 right-3.5 flex items-center text-slate-400">{trailing}</span>}
      </div>
      {error ?
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-rose-600">{error}</p> :
      hint ?
      <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">{hint}</p> :
      null}
    </div>);

}
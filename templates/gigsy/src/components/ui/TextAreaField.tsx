import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { fieldBase, fieldState } from './TextField';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  hideLabel?: boolean;
}

export function TextAreaField({ label, error, hint, hideLabel, id, className = '', rows = 4, ...rest }: TextAreaFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-slate-800'}>
        {label}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy}
        className={twMerge(fieldBase, 'resize-y py-2.5 leading-relaxed', fieldState(error))}
        {...rest} />
      
      {error ?
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-rose-600">{error}</p> :
      hint ?
      <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">{hint}</p> :
      null}
    </div>);

}
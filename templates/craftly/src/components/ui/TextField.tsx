import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  hideLabel?: boolean;
}

export function TextField({ label, hint, error, leading, trailing, hideLabel, className, id, ...rest }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'field-label'}>
        {label}
      </label>
      <div className="relative">
        {leading &&
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-muted">
            {leading}
          </span>
        }
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={twMerge(
            'field-input',
            leading ? 'pl-9' : '',
            trailing ? 'pr-12' : '',
            error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''
          )}
          {...rest} />
        
        {trailing && <span className="absolute inset-y-0 right-3.5 flex items-center text-sm text-muted">{trailing}</span>}
      </div>
      {error ?
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p> :
      hint ?
      <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p> :
      null}
    </div>);

}
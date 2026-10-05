import React, { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { fieldClasses } from './TextField';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextArea({ label, hint, error, className, id, rows = 4, ...rest }: TextAreaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={inputId}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? `${inputId}-msg` : undefined}
        className={twMerge(
          fieldClasses,
          'resize-y',
          error ? 'border-red-400' : 'border-slate-300 focus:border-primary-500'
        )}
        {...rest} />
      
      {(error || hint) &&
      <p
        id={`${inputId}-msg`}
        className={twMerge('mt-1.5 text-xs', error ? 'font-medium text-red-600' : 'text-slate-500')}>
        
          {error ?? hint}
        </p>
      }
    </div>);

}
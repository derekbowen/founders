import React from 'react';
import { cn } from '../../utils/cn';
import { fieldBase, fieldState } from './TextField';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export function TextArea({ id, label, hint, error, containerClassName, className, rows = 4, ...rest }: TextAreaProps) {
  return (
    <div className={containerClassName}>
      {label &&
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-stone-800">
          {label}
        </label>
      }
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, fieldState(error), 'resize-y px-4 py-3 leading-relaxed', className)}
        {...rest} />
      
      {error ?
      <p className="mt-1.5 text-sm font-semibold text-red-600">{error}</p> :
      hint ?
      <p className="mt-1.5 text-sm text-stone-500">{hint}</p> :
      null}
    </div>);

}
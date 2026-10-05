import React from 'react';
import { CircleAlertIcon } from 'lucide-react';
import { cn, labelClass } from '../../utils/styles';

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, hint, error, optional, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {optional && <span className="ml-1 font-normal text-steel-500">(optional)</span>}
      </label>
      {children}
      {error ?
      <p id={`${htmlFor}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary" role="alert">
          <CircleAlertIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p> :

      hint && <p className={cn('mt-1.5 text-xs text-steel-500')}>{hint}</p>
      }
    </div>);

}
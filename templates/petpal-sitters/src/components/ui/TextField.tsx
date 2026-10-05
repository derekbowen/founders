import React from 'react';
import { cn } from '../../utils/cn';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  containerClassName?: string;
}

export const fieldBase =
'block w-full rounded-xl border bg-white text-[15px] text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none focus:ring-4 disabled:bg-stone-100 disabled:text-stone-500';

export function fieldState(error?: string) {
  return error ?
  'border-red-400 focus:border-red-500 focus:ring-red-100' :
  'border-stone-300 hover:border-stone-400 focus:border-primary-500 focus:ring-primary-100';
}

export function TextField({ id, label, hint, error, leftIcon, rightSlot, containerClassName, className, ...rest }: TextFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={containerClassName}>
      {label &&
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-stone-800">
          {label}
        </label>
      }
      <div className="relative">
        {leftIcon &&
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-stone-400" aria-hidden="true">
            {leftIcon}
          </span>
        }
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(fieldBase, fieldState(error), 'h-12 px-4', leftIcon && 'pl-10', rightSlot && 'pr-12', className)}
          {...rest} />
        
        {rightSlot && <span className="absolute inset-y-0 right-2 flex items-center">{rightSlot}</span>}
      </div>
      {error ?
      <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-red-600">
          {error}
        </p> :
      hint ?
      <p id={`${id}-hint`} className="mt-1.5 text-sm text-stone-500">
          {hint}
        </p> :
      null}
    </div>);

}
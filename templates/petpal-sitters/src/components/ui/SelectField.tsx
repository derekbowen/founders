import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { fieldBase, fieldState } from './TextField';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  error?: string;
  hint?: string;
  options: {value: string;label: string;}[];
  containerClassName?: string;
}

export function SelectField({ id, label, error, hint, options, containerClassName, className, ...rest }: SelectFieldProps) {
  return (
    <div className={containerClassName}>
      {label &&
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-stone-800">
          {label}
        </label>
      }
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          className={cn(fieldBase, fieldState(error), 'h-12 appearance-none pl-4 pr-10 font-semibold', className)}
          {...rest}>
          
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" aria-hidden="true" />
      </div>
      {error ?
      <p className="mt-1.5 text-sm font-semibold text-red-600">{error}</p> :
      hint ?
      <p className="mt-1.5 text-sm text-stone-500">{hint}</p> :
      null}
    </div>);

}
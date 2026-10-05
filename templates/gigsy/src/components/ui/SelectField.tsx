import React, { useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { fieldBase, fieldState } from './TextField';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: {value: string;label: string;}[];
  error?: string;
  hint?: string;
  hideLabel?: boolean;
  placeholder?: string;
}

export function SelectField({ label, options, error, hint, hideLabel, placeholder, id, className = '', ...rest }: SelectFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-slate-800'}>
        {label}
      </label>
      <div className="relative">
        <select
          id={inputId}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={twMerge(fieldBase, 'h-11 appearance-none pr-10', fieldState(error))}
          {...rest}>
          
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) =>
          <option key={o.value} value={o.value}>{o.label}</option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      </div>
      {error ?
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-rose-600">{error}</p> :
      hint ?
      <p className="mt-1.5 text-xs text-slate-500">{hint}</p> :
      null}
    </div>);

}
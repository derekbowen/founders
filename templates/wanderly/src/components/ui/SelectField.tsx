import React, { useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { fieldClasses } from './TextField';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  hideLabel?: boolean;
}

export function SelectField({ label, options, hideLabel, className, id, ...rest }: SelectFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className={twMerge('mb-1.5 block text-sm font-medium text-slate-700', hideLabel && 'sr-only')}>
        
        {label}
      </label>
      <div className="relative">
        <select
          id={inputId}
          className={twMerge(fieldClasses, 'appearance-none border-slate-300 pr-10 focus:border-primary-500')}
          {...rest}>
          
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          aria-hidden />
        
      </div>
    </div>);

}
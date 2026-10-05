import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: {value: string;label: string;}[];
  helperText?: string;
  hideLabel?: boolean;
}

export function SelectField({ label, options, helperText, hideLabel, id, className = '', ...rest }: SelectFieldProps) {
  const selectId = id ?? `select-${label?.toLowerCase().replace(/\W+/g, '-')}`;
  return (
    <div className={className}>
      {label &&
      <label htmlFor={selectId} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-slate-800'}>
          {label}
        </label>
      }
      <div className="relative">
        <select
          id={selectId}
          className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-9 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          {...rest}>
          
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      </div>
      {helperText && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>);

}
import React, { useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hideLabel?: boolean;
  error?: string;
  options: {value: string;label: string;}[];
}

/** Native select — used where values must stay in sync with URL/booking state */
export function SelectField({ label, hideLabel, error, options, className = '', id, ...rest }: SelectFieldProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className={className}>
      {label &&
      <label htmlFor={selectId} className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-medium text-ink-800'}>
          {label}
        </label>
      }
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={!!error}
          className={`h-11 w-full appearance-none rounded-xl border bg-white pl-3.5 pr-10 text-sm text-ink-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
          error ? 'border-red-400' : 'border-ink-200 hover:border-ink-300 focus:border-primary-500'}`
          }
          {...rest}>
          
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>);

}
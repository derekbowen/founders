import React, { useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<string | {value: string;label: string;}>;
  hideLabel?: boolean;
  error?: string;
  placeholder?: string;
}

export function SelectField({ label, options, hideLabel, error, placeholder, className, id, ...rest }: SelectFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className={hideLabel ? 'sr-only' : 'field-label'}>
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          aria-invalid={error ? true : undefined}
          className={`field-input appearance-none pr-10 ${error ? 'border-danger' : ''}`}
          {...rest}>
          
          {placeholder &&
          <option value="" disabled>
              {placeholder}
            </option>
          }
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>);

          })}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-danger">{error}</p>}
    </div>);

}
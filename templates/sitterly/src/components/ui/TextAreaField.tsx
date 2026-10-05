import React, { useId } from 'react';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export function TextAreaField({ label, helperText, error, id, className = '', maxLength, value, ...rest }: TextAreaFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const count = typeof value === 'string' ? value.length : 0;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </label>
      <textarea
        id={fieldId}
        value={value}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={`${fieldId}-help`}
        className={`min-h-[96px] w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
        error ? 'border-red-400' : 'border-ink-200 hover:border-ink-300 focus:border-primary-500'}`
        }
        {...rest} />
      
      <div id={`${fieldId}-help`} className="mt-1.5 flex justify-between gap-4 text-xs">
        <span className={error ? 'font-medium text-red-600' : 'text-ink-600'}>{error ?? helperText}</span>
        {maxLength &&
        <span className="text-ink-500">
            {count}/{maxLength}
          </span>
        }
      </div>
    </div>);

}
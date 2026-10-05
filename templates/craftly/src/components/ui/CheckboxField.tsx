import React from 'react';

interface CheckboxFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  description?: string;
  count?: number;
}

export function CheckboxField({ label, description, count, className, ...rest }: CheckboxFieldProps) {
  return (
    <label className={`group flex cursor-pointer items-start gap-3 py-1 text-sm ${className ?? ''}`}>
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line accent-primary"
        {...rest} />
      
      <span className="flex-1">
        <span className="text-ink group-hover:text-primary-ink">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-muted">{description}</span>}
      </span>
      {count !== undefined && <span className="text-xs text-muted">{count}</span>}
    </label>);

}
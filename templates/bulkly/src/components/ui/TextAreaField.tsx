import React from 'react';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
}

export function TextAreaField({ label, helperText, id, rows = 4, ...rest }: TextAreaFieldProps) {
  const fieldId = id ?? `textarea-${label.toLowerCase().replace(/\W+/g, '-')}`;
  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        {...rest} />
      
      {helperText && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}
    </div>);

}
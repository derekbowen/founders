import React, { useId } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextArea({ label, hint, error, className, id, maxLength, value, ...rest }: TextAreaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const length = typeof value === 'string' ? value.length : 0;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="field-label">
        {label}
      </label>
      <textarea
        id={fieldId}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fieldId}-msg` : undefined}
        className={`field-input min-h-[110px] resize-y leading-relaxed ${error ? 'border-danger' : ''}`}
        {...rest} />
      
      <div className="mt-1.5 flex justify-between gap-4 text-xs">
        <p id={`${fieldId}-msg`} className={error ? 'font-medium text-danger' : 'text-muted'}>
          {error ?? hint}
        </p>
        {maxLength &&
        <span className="shrink-0 text-muted">
            {length}/{maxLength}
          </span>
        }
      </div>
    </div>);

}
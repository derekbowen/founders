import React, { useId } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

export function TextField({ label, hint, error, prefix, suffix, id, className, ...rest }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>
      <div className="relative">
        {prefix &&
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-muted">
            {prefix}
          </span>
        }
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`field-input ${prefix ? "pl-8" : ""} ${suffix ? "pr-20" : ""} ${
          error ? "border-danger focus:border-danger focus:ring-danger/20" : ""}`
          }
          {...rest} />
        
        {suffix &&
        <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-muted">
            {suffix}
          </span>
        }
      </div>
      {error ?
      <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p> :
      hint ?
      <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p> :
      null}
    </div>);

}
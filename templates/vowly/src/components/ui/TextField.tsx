import React, { InputHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";
import { fieldClasses, fieldErrorClasses, labelClasses } from "../../utils/fieldClasses";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

export function TextField({ label, error, hint, optional, id, className, ...props }: TextFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy = error || hint ? `${fieldId}-desc` : undefined;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClasses}>
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={twMerge(fieldClasses, error && fieldErrorClasses)}
        {...props} />
      
      {(error || hint) &&
      <p id={describedBy} className={error ? "mt-1.5 text-xs text-danger" : "mt-1.5 text-xs text-muted"}>
          {error ?? hint}
        </p>
      }
    </div>);

}
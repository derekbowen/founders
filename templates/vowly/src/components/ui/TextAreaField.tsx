import React, { TextareaHTMLAttributes, useId } from "react";
import { twMerge } from "tailwind-merge";
import { fieldClasses, fieldErrorClasses, labelClasses } from "../../utils/fieldClasses";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function TextAreaField({ label, error, hint, id, className, rows = 4, ...props }: TextAreaFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy = error || hint ? `${fieldId}-desc` : undefined;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClasses}>
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={twMerge(fieldClasses, "resize-y leading-relaxed", error && fieldErrorClasses)}
        {...props} />
      
      {(error || hint) &&
      <p id={describedBy} className={error ? "mt-1.5 text-xs text-danger" : "mt-1.5 text-xs text-muted"}>
          {error ?? hint}
        </p>
      }
    </div>);

}
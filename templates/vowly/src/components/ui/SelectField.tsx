import React, { SelectHTMLAttributes, useId } from "react";
import { ChevronDownIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { fieldClasses, fieldErrorClasses, labelClasses } from "../../utils/fieldClasses";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

export function SelectField({
  label,
  options,
  placeholder,
  error,
  hint,
  id,
  className,
  ...props
}: SelectFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy = error || hint ? `${fieldId}-desc` : undefined;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClasses}>
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={twMerge(fieldClasses, "appearance-none pr-10", error && fieldErrorClasses)}
          {...props}>
          
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) =>
          <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        
      </div>
      {(error || hint) &&
      <p id={describedBy} className={error ? "mt-1.5 text-xs text-danger" : "mt-1.5 text-xs text-muted"}>
          {error ?? hint}
        </p>
      }
    </div>);

}
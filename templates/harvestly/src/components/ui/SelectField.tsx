import React, { useId } from "react";
import { ChevronDownIcon } from "lucide-react";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: {value: string;label: string;}[];
  hideLabel?: boolean;
}

export function SelectField({ label, options, hideLabel, id, className, ...rest }: SelectFieldProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={selectId} className={hideLabel ? "sr-only" : "field-label"}>
        {label}
      </label>
      <div className="relative">
        <select id={selectId} className="field-input appearance-none pr-10" {...rest}>
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
    </div>);

}
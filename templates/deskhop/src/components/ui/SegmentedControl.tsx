import React from 'react';

interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: {value: T;label: string;}[];
  label: string;
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  label
}: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="grid auto-cols-fr grid-flow-col rounded-lg bg-mist p-1">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`focus-ring rounded-md px-3 py-1.5 text-sm font-semibold transition-all ${
            active ? 'bg-white text-ink shadow-card' : 'text-ink-muted hover:text-ink'}`
            }>
            
            {opt.label}
          </button>);

      })}
    </div>);

}
import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface CounterProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  hint?: string;
}

export function Counter({ label, value, min = 1, max = 10, onChange, hint }: CounterProps) {
  const btn =
  'flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors hover:border-stone-500 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200';
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[15px] font-bold text-stone-800">{label}</p>
        {hint && <p className="text-sm text-stone-500">{hint}</p>}
      </div>
      <div className="flex items-center gap-3" role="group" aria-label={label}>
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}>
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="w-6 text-center text-base font-extrabold tabular-nums text-stone-900" aria-live="polite">
          {value}
        </span>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}>
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>);

}
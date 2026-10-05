import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface CounterProps {
  label: string;
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  hint?: string;
}

export function Counter({ label, value, min = 1, max, onChange, hint }: CounterProps) {
  const btn =
  'flex h-9 w-9 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-navy disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral';
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums" aria-live="polite">
          {value}
        </span>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>);

}
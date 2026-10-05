import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface CounterProps {
  label: string;
  description?: string;
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
}

export function Counter({ label, description, value, min = 0, max, onChange }: CounterProps) {
  const btn =
  'grid h-8 w-8 place-items-center rounded-full border border-sand-300 text-ink-700 transition hover:border-ink-500 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-sand-300';
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ink-900">{label}</p>
        {description && <p className="text-xs text-ink-500">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>
          <MinusIcon size={14} />
        </button>
        <span className="w-5 text-center text-sm font-semibold tabular-nums" aria-live="polite">
          {value}
        </span>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>
          <PlusIcon size={14} />
        </button>
      </div>
    </div>);

}
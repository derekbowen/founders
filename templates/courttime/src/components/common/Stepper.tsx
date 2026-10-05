import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export function Stepper({ label, value, min, max, onChange, formatValue }: StepperProps) {
  const buttonClass =
  'grid h-9 w-9 place-items-center rounded-lg border border-slate-300 text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-ink';
  return (
    <div>
      <span className="field-label">{label}</span>
      <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-white p-1.5">
        <button type="button" className={buttonClass} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>
          <MinusIcon size={16} />
        </button>
        <span className="text-sm font-semibold" aria-live="polite">
          {formatValue ? formatValue(value) : value}
        </span>
        <button type="button" className={buttonClass} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>
          <PlusIcon size={16} />
        </button>
      </div>
    </div>);

}
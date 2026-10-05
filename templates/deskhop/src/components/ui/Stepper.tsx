import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  id?: string;
}

export function Stepper({ value, onChange, min = 0, max = 99, label, id }: StepperProps) {
  const btn =
  'focus-ring grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink-subtle hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent';
  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label={label}>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}>
        
        <MinusIcon size={15} />
      </button>
      <output id={id} aria-live="polite" className="w-6 text-center text-base font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}>
        
        <PlusIcon size={15} />
      </button>
    </div>);

}
import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, label = 'Quantity', size = 'md' }: QuantityStepperProps) {
  const h = size === 'sm' ? 'h-9' : 'h-11';
  const btn = `flex ${h} w-10 items-center justify-center text-ink transition-colors hover:bg-subtle disabled:cursor-not-allowed disabled:text-muted/50 disabled:hover:bg-transparent`;
  return (
    <div className={`inline-flex ${h} items-center overflow-hidden rounded-full border border-line bg-surface`} role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>);

}
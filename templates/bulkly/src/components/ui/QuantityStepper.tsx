import React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, min, max, onChange, label = 'Cases', size = 'md' }: QuantityStepperProps) {
  const h = size === 'sm' ? 'h-8' : 'h-11';
  const w = size === 'sm' ? 'w-8' : 'w-11';
  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  return (
    <div className={`inline-flex ${h} items-stretch overflow-hidden rounded-lg border border-slate-300 bg-white`}>
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        className={`${w} flex items-center justify-center text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent`}
        aria-label={`Decrease ${label.toLowerCase()}`}>
        
        <MinusIcon className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(clamp(n));
        }}
        aria-label={label}
        className={`${size === 'sm' ? 'w-10 text-sm' : 'w-14 text-base'} border-x border-slate-200 text-center font-semibold tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`} />
      
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        className={`${w} flex items-center justify-center text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent`}
        aria-label={`Increase ${label.toLowerCase()}`}>
        
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>);

}
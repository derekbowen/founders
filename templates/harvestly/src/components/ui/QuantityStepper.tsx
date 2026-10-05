import React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
  size?: "sm" | "md";
}

export function QuantityStepper({ value, min = 1, max, onChange, label = "Quantity", size = "md" }: QuantityStepperProps) {
  const h = size === "sm" ? "h-9" : "h-11";
  const w = size === "sm" ? "w-9" : "w-11";
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex ${h} items-center rounded-full border border-line bg-white`}>
      
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`flex ${h} ${w} items-center justify-center rounded-full text-ink transition hover:bg-ink/5 disabled:opacity-40`}>
        
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`flex ${h} ${w} items-center justify-center rounded-full text-ink transition hover:bg-ink/5 disabled:opacity-40`}>
        
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>);

}
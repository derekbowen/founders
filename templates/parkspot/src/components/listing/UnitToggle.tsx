import React from 'react';
import type { UnitType } from '../../types/listing';

export function UnitToggle({ value, onChange }: {value: UnitType;onChange: (u: UnitType) => void;}) {
  const options: {value: UnitType;label: string;}[] = [
  { value: 'hour', label: 'Hourly' },
  { value: 'day', label: 'Daily' }];

  return (
    <div role="radiogroup" aria-label="Booking type" className="grid grid-cols-2 gap-1 rounded-xl bg-canvas p-1">
      {options.map((o) =>
      <button
        key={o.value}
        type="button"
        role="radio"
        aria-checked={value === o.value}
        onClick={() => onChange(o.value)}
        className={`h-9 rounded-lg text-sm font-semibold transition-colors ${
        value === o.value ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-ink'}`
        }>
        
          {o.label}
        </button>
      )}
    </div>);

}
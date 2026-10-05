import React from 'react';
import { cn } from '../../utils/cn';

interface OptionCardsProps<T extends string> {
  name: string;
  legend: string;
  value: T;
  options: {value: T;label: string;description?: string;}[];
  onChange: (value: T) => void;
}

export function OptionCards<T extends string>({ name, legend, value, options, onChange }: OptionCardsProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-stone-800">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((o) => {
          const selected = o.value === value;
          return (
            <label
              key={o.value}
              className={cn(
                'cursor-pointer rounded-2xl border-2 px-4 py-3 transition-colors',
                selected ? 'border-primary-500 bg-primary-50' : 'border-stone-200 bg-white hover:border-stone-300'
              )}>
              
              <input type="radio" name={name} className="sr-only" checked={selected} onChange={() => onChange(o.value)} />
              <span className="block font-extrabold text-stone-900">{o.label}</span>
              {o.description && <span className="mt-0.5 block text-sm text-stone-500">{o.description}</span>}
            </label>);

        })}
      </div>
    </fieldset>);

}
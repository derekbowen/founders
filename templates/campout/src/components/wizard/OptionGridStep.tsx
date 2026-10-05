import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { OptionInfo } from '../../data/amenities';

interface OptionGridStepProps<K extends string> {
  options: OptionInfo<K>[];
  selected: K[];
  onChange: (next: K[]) => void;
  label: string;
}

/** Shared multi-select tile grid used by the Amenities and Activities steps */
export function OptionGridStep<K extends string>({ options, selected, onChange, label }: OptionGridStepProps<K>) {
  return (
    <div role="group" aria-label={label}>
      <p className="mb-4 text-sm text-ink-500">{selected.length} selected</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((o) => {
          const active = selected.includes(o.key);
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? selected.filter((k) => k !== o.key) : [...selected, o.key])}
              className={`relative flex flex-col items-start gap-3 rounded-2xl border-2 p-4 text-left text-sm font-medium transition ${
              active ? 'border-primary-700 bg-primary-50 text-primary-900' : 'border-sand-200 bg-white text-ink-700 hover:border-sand-400'}`
              }>
              
              <o.icon size={22} className={active ? 'text-primary-700' : 'text-ink-500'} aria-hidden="true" />
              {o.label}
              {active &&
              <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-primary-700 text-white">
                  <CheckIcon size={12} aria-hidden="true" />
                </span>
              }
            </button>);

        })}
      </div>
    </div>);

}
import React from 'react';
import type { Variation } from '../../types/marketplace';

interface VariationPickerProps {
  variation: Variation;
  value?: string;
  onChange: (value: string) => void;
  showError?: boolean;
}

export function VariationPicker({ variation, value, onChange, showError }: VariationPickerProps) {
  const groupId = `var-${variation.name.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <fieldset>
      <legend id={groupId} className="mb-2 flex w-full items-center justify-between text-sm font-medium text-ink">
        <span>
          {variation.name}
          {value && <span className="ml-2 font-normal text-muted">{value}</span>}
        </span>
        {showError && !value && <span className="text-xs font-medium text-danger">Please choose a {variation.name.toLowerCase()}</span>}
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={groupId}>
        {variation.options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={`min-w-[3rem] rounded-full border px-4 py-2 text-sm transition-colors ${
              active ?
              'border-ink bg-ink text-canvas' :
              `bg-surface text-ink hover:border-ink/40 ${showError && !value ? 'border-danger/60' : 'border-line'}`}`
              }>
              
              {opt}
            </button>);

        })}
      </div>
    </fieldset>);

}
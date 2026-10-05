import React from 'react';
import { CheckIcon } from 'lucide-react';
import { chipStyles } from '../../utils/styles';

interface ChipMultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function ChipMultiSelect({ label, options, value, onChange }: ChipMultiSelectProps) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-navy-800">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? value.filter((v) => v !== o) : [...value, o])}
              className={`${chipStyles.base} ${active ? chipStyles.active : chipStyles.idle}`}>
              
              {active && <CheckIcon size={14} strokeWidth={3} />}
              {o}
            </button>);

        })}
      </div>
    </fieldset>);

}
import React from 'react';
import { amenities } from '../../data/amenities';
import type { StepProps } from '../../types/draft';

export function AmenitiesStep({ draft, update }: StepProps) {
  function toggle(id: (typeof amenities)[number]['id']) {
    update({
      amenities: draft.amenities.includes(id) ? draft.amenities.filter((a) => a !== id) : [...draft.amenities, id]
    });
  }
  return (
    <div>
      <p className="text-sm text-ink-muted">Select everything guests can use. Highlighted amenities appear as search filters.</p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenities.map((a) => {
          const active = draft.amenities.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(a.id)}
              className={`focus-ring flex flex-col items-start gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-colors ${
              active ? 'border-brand-700 bg-brand-50 text-brand-900' : 'border-line bg-white hover:border-ink-subtle/50'}`
              }>
              
              <a.icon size={20} className={active ? 'text-brand-700' : 'text-ink-muted'} aria-hidden="true" />
              <span>
                {a.label}
                {a.filterable && <span className="ml-1 text-[10px] font-semibold uppercase text-brand-700">· filter</span>}
              </span>
            </button>);

        })}
      </div>
    </div>);

}
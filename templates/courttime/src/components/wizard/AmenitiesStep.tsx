import React from 'react';
import { AmenityIcon } from '../common/AmenityIcon';
import { amenities } from '../../data/sports';
import { StepProps } from '../../types/listingDraft';

export function AmenitiesStep({ draft, update }: StepProps) {
  const toggle = (id: (typeof amenities)[number]['id']) =>
  update({ amenities: draft.amenities.includes(id) ? draft.amenities.filter((a) => a !== id) : [...draft.amenities, id] });

  return (
    <fieldset>
      <legend className="sr-only">Amenities</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenities.map((a) => {
          const active = draft.amenities.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(a.id)}
              className={`flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors ${active ? 'border-brand bg-brand-soft ring-1 ring-brand' : 'border-slate-200 bg-white hover:border-brand'}`}>
              
              <AmenityIcon id={a.id} size={22} className={active ? 'text-brand' : 'text-slate-400'} />
              <span className="text-sm font-semibold">{a.label}</span>
            </button>);

        })}
      </div>
      <p className="mt-4 text-sm text-slate-500">{draft.amenities.length} selected</p>
    </fieldset>);

}
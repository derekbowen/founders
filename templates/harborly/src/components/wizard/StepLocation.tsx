import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { Field } from '../ui/Field';
import { destinations } from '../../data/destinations';
import { cn, inputClass } from '../../utils/ui';
import type { StepProps } from '../../types/listingDraft';

export function StepLocation({ draft, update, errors }: StepProps) {
  const dest = destinations.find((d) => d.id === draft.destinationId);
  return (
    <div className="space-y-6">
      <Field label="Destination" htmlFor="w-dest" error={errors.destinationId}>
        <select id="w-dest" value={draft.destinationId} onChange={(e) => update({ destinationId: e.target.value })} className={cn(inputClass, errors.destinationId && 'border-danger')}>
          <option value="">Select a destination</option>
          {destinations.map((d) =>
          <option key={d.id} value={d.id}>
              {d.name}, {d.region}
            </option>
          )}
        </select>
      </Field>
      <Field label="Marina name" htmlFor="w-marina" error={errors.marinaName}>
        <input id="w-marina" value={draft.marinaName} onChange={(e) => update({ marinaName: e.target.value })} placeholder="e.g. Shelter Island Marina" className={cn(inputClass, errors.marinaName && 'border-danger')} />
      </Field>
      <Field label="Street address" htmlFor="w-addr" error={errors.marinaAddress} hint="Guests only see the exact slip after booking is confirmed.">
        <input id="w-addr" value={draft.marinaAddress} onChange={(e) => update({ marinaAddress: e.target.value })} placeholder="2240 Shelter Island Dr, San Diego, CA 92106" className={cn(inputClass, errors.marinaAddress && 'border-danger')} />
      </Field>
      {dest &&
      <div className="relative overflow-hidden rounded-2xl">
          <img src={dest.image} alt={`${dest.name} harbor`} className="h-48 w-full object-cover" />
          <div className="absolute inset-0 flex items-end bg-navy-deep/40 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <MapPinIcon className="h-4 w-4 text-coral" aria-hidden="true" />
              {draft.marinaName || 'Your marina'} · {dest.name}
            </p>
          </div>
        </div>
      }
    </div>);

}
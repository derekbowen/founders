import React from 'react';
import { MapPinIcon, ShieldCheckIcon } from 'lucide-react';
import { Input } from '../Input';
import type { StepProps } from '../../types/draft';

export function LocationStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <Input
        id="w-address"
        label="Street address"
        value={draft.address}
        error={errors.address}
        onChange={(e) => update({ address: e.target.value })}
        placeholder="41 Rivington Street"
        startAdornment={<MapPinIcon size={16} aria-hidden="true" />}
        autoComplete="street-address" />
      
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="w-postcode" label="Postcode" value={draft.postcode} error={errors.postcode} onChange={(e) => update({ postcode: e.target.value })} placeholder="EC2A 3QQ" autoComplete="postal-code" />
        <Input id="w-city-ro" label="City" value={draft.city} readOnly helperText="Change the city in Space details" />
      </div>
      <div className="relative h-56 overflow-hidden rounded-xl border border-line bg-[#eef2ef]" aria-hidden="true">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#fff_2px,transparent_2px),linear-gradient(90deg,#fff_2px,transparent_2px)] [background-size:48px_48px]" />
        <span className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 ring-2 ring-brand-600/30" />
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-700 shadow-pop ring-4 ring-white">
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        <span className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-card">
          {draft.address ? `${draft.address}, ${draft.city}` : `Somewhere in ${draft.city}`}
        </span>
      </div>
      <p className="flex items-start gap-2 text-sm text-ink-muted">
        <ShieldCheckIcon size={16} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
        Guests see the approximate area. Your exact address and door code are shared only after a booking is confirmed.
      </p>
    </div>);

}
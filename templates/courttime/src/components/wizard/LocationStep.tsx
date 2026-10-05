import React from 'react';
import { LockIcon } from 'lucide-react';
import { Input } from '../Input';
import { StepProps } from '../../types/listingDraft';

export function LocationStep({ draft, update }: StepProps) {
  return (
    <div className="space-y-5">
      <Input id="wiz-address" label="Street address" placeholder="2108 Barton Hills Dr" autoComplete="street-address" value={draft.address} onChange={(e) => update({ address: e.target.value })} />
      <Input id="wiz-neighborhood" label="Neighborhood (shown publicly)" placeholder="Barton Hills" value={draft.neighborhood} onChange={(e) => update({ neighborhood: e.target.value })} />
      <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <Input id="wiz-city" label="City" autoComplete="address-level2" value={draft.city} onChange={(e) => update({ city: e.target.value })} />
        <Input id="wiz-zip" label="ZIP code" inputMode="numeric" autoComplete="postal-code" placeholder="78704" value={draft.zip} onChange={(e) => update({ zip: e.target.value.replace(/\D/g, '').slice(0, 5) })} />
      </div>
      <p className="flex items-start gap-2 rounded-xl bg-brand-soft p-4 text-sm text-brand-dark">
        <LockIcon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        Players see the neighborhood and an approximate map pin. Your exact address and any gate codes are shared only after a booking is confirmed.
      </p>
    </div>);

}
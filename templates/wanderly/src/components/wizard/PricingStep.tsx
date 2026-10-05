import React from 'react';
import { TextField } from '../ui/TextField';
import { brand } from '../../data/brand';
import type { WizardStepProps } from '../../types/listingDraft';
import { formatPrice } from '../../utils/format';

export function PricingStep({ draft, update }: WizardStepProps) {
  const fullDeparture = draft.pricePerPerson * draft.maxGuests;
  const commission = fullDeparture * brand.hostCommissionRate;
  const guestPays = draft.pricePerPerson * (1 + brand.serviceFeeRate);

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Price per person"
          type="number"
          min={1}
          inputMode="numeric"
          value={draft.pricePerPerson || ''}
          onChange={(e) => update({ pricePerPerson: Number(e.target.value) })}
          startIcon={<span className="text-sm font-semibold">$</span>}
          hint={`Similar experiences in this city: ${formatPrice(45)}–${formatPrice(90)}`} />
        
        {draft.privateGroupsEnabled &&
        <TextField
          label="Private group price (flat)"
          type="number"
          min={1}
          inputMode="numeric"
          value={draft.privateGroupPrice || ''}
          onChange={(e) => update({ privateGroupPrice: Number(e.target.value) })}
          startIcon={<span className="text-sm font-semibold">$</span>}
          hint={`For up to ${draft.maxGuests} guests`} />

        }
      </div>

      <div className="rounded-2xl border border-slate-200 bg-sand-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">Earnings preview — one full departure</h3>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-700"><dt>{draft.maxGuests} guests × {formatPrice(draft.pricePerPerson)}</dt><dd>{formatPrice(fullDeparture, true)}</dd></div>
          <div className="flex justify-between text-slate-700"><dt>{brand.name} commission ({Math.round(brand.hostCommissionRate * 100)}%)</dt><dd>−{formatPrice(commission, true)}</dd></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900"><dt>You earn</dt><dd className="text-accent-700">{formatPrice(fullDeparture - commission, true)}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-slate-600">Guests see {formatPrice(guestPays, true)} per person including a {Math.round(brand.serviceFeeRate * 100)}% service fee.</p>
      </div>
    </div>);

}
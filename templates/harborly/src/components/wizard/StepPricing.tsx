import React from 'react';
import { Field } from '../ui/Field';
import { cancellationPolicies, packages } from '../../data/booking';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/pricing';
import { cn, inputClass } from '../../utils/ui';
import type { ListingDraft, StepProps } from '../../types/listingDraft';
import type { CancellationPolicyId } from '../../types/marketplace';

export function StepPricing({ draft, update, errors }: StepProps) {
  const money = (key: 'halfDay' | 'fullDay' | 'fuelDeposit', label: string, hint?: string) =>
  <Field label={label} htmlFor={`w-${key}`} error={errors[key]} hint={hint}>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
        <input id={`w-${key}`} type="number" inputMode="numeric" min={0} value={draft[key]} onChange={(e) => update({ [key]: e.target.value } as Partial<ListingDraft>)} className={cn(inputClass, 'pl-7', errors[key] && 'border-danger')} />
      </div>
    </Field>;


  const full = Number(draft.fullDay) || 0;
  const ownerFeeRate = 0.08;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {money('halfDay', `Half day · ${packages[0].hours} hours`)}
        {money('fullDay', `Full day · ${packages[1].hours} hours`)}
      </div>
      {money('fuelDeposit', 'Refundable fuel deposit', 'Held at departure and released after the trip, minus fuel used.')}

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Cancellation policy</legend>
        <div className="space-y-2">
          {(Object.keys(cancellationPolicies) as CancellationPolicyId[]).map((id) =>
          <label key={id} className={cn('flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors', draft.cancellation === id ? 'border-navy ring-1 ring-navy' : 'border-line hover:border-navy/40')}>
              <input type="radio" name="w-cancel" checked={draft.cancellation === id} onChange={() => update({ cancellation: id })} className="mt-0.5 h-4 w-4 accent-navy" />
              <span>
                <span className="block text-sm font-semibold text-ink">{cancellationPolicies[id].label}</span>
                <span className="block text-xs text-muted">{cancellationPolicies[id].summary}</span>
              </span>
            </label>
          )}
        </div>
      </fieldset>

      {full > 0 &&
      <div className="rounded-2xl bg-navy p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand">Earnings preview · full day</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/75">Your price</dt>
              <dd>{formatMoney(full)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/75">{brand.name} owner fee (8%)</dt>
              <dd>−{formatMoney(Math.round(full * ownerFeeRate))}</dd>
            </div>
            <div className="flex justify-between border-t border-white/15 pt-2 font-semibold">
              <dt>You earn</dt>
              <dd className="text-sand">{formatMoney(Math.round(full * (1 - ownerFeeRate)))}</dd>
            </div>
          </dl>
        </div>
      }
    </div>);

}
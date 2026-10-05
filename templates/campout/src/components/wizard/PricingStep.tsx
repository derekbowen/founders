import React from 'react';
import { brand } from '../../data/brand';
import type { CancellationPolicy } from '../../types/listing';
import type { WizardStepProps } from '../../types/wizard';
import { formatMoney } from '../../utils/currency';

const policies: {key: CancellationPolicy;text: string;}[] = [
{ key: 'Flexible', text: 'Full refund up to 24 h before check-in' },
{ key: 'Moderate', text: 'Full refund up to 5 days before' },
{ key: 'Strict', text: '50% refund up to 7 days before' }];


export function PricingStep({ draft, update }: WizardStepProps) {
  const earnings = Math.round(draft.price * (1 - brand.hostCommissionRate));
  return (
    <div className="space-y-8">
      <div className="card p-5">
        <label className="block">
          <span className="label">Nightly price per site</span>
          <div className="relative max-w-[200px]">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-serif text-xl font-bold text-ink-500">$</span>
            <input
              type="number"
              min={0}
              value={draft.price || ''}
              onChange={(e) => update({ price: Math.max(0, Number(e.target.value)) })}
              className="input pl-8 font-serif text-2xl font-bold"
              placeholder="45" />
            
          </div>
        </label>
        <p className="mt-3 text-sm text-ink-600">
          You earn <span className="font-semibold text-primary-700">{formatMoney(earnings)}</span> per night after the {Math.round(brand.hostCommissionRate * 100)}% host fee. Similar sites nearby average $42–$68.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="label">Cleaning fee (optional)</span>
            <input type="number" min={0} className="input" value={draft.cleaningFee} onChange={(e) => update({ cleaningFee: Math.max(0, Number(e.target.value)) })} />
          </label>
          <label className="block">
            <span className="label">Minimum nights</span>
            <input type="number" min={1} max={14} className="input" value={draft.minNights} onChange={(e) => update({ minNights: Math.max(1, Number(e.target.value)) })} />
          </label>
          <label className="block">
            <span className="label">Check-in after</span>
            <select className="input" value={draft.checkIn} onChange={(e) => update({ checkIn: e.target.value })}>
              {['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((t) =>
              <option key={t}>{t}</option>
              )}
            </select>
          </label>
          <label className="block">
            <span className="label">Check-out before</span>
            <select className="input" value={draft.checkOut} onChange={(e) => update({ checkOut: e.target.value })}>
              {['10:00 AM', '11:00 AM', '12:00 PM'].map((t) =>
              <option key={t}>{t}</option>
              )}
            </select>
          </label>
        </div>
      </div>

      <label className="flex items-start justify-between gap-4 rounded-2xl border border-sand-200 bg-white p-5">
        <span>
          <span className="block font-semibold text-ink-900">Instant book</span>
          <span className="block text-sm text-ink-500">Campers can book without waiting for approval. Hosts with instant book get 2× more bookings.</span>
        </span>
        <input type="checkbox" checked={draft.instantBook} onChange={(e) => update({ instantBook: e.target.checked })} className="mt-1 h-5 w-5 accent-primary-700" />
      </label>

      <fieldset>
        <legend className="font-serif text-lg font-bold text-ink-900">Cancellation policy</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {policies.map((p) =>
          <label
            key={p.key}
            className={`cursor-pointer rounded-2xl border-2 p-4 transition ${draft.cancellation === p.key ? 'border-primary-700 bg-primary-50' : 'border-sand-200 bg-white hover:border-sand-400'}`}>
            
              <input type="radio" name="cancellation" className="sr-only" checked={draft.cancellation === p.key} onChange={() => update({ cancellation: p.key })} />
              <span className="block font-semibold text-ink-900">{p.key}</span>
              <span className="mt-1 block text-xs text-ink-500">{p.text}</span>
            </label>
          )}
        </div>
      </fieldset>

      <label className="block">
        <span className="label">Site rules</span>
        <textarea
          className="input min-h-[100px] resize-y"
          value={draft.rules}
          onChange={(e) => update({ rules: e.target.value })}
          placeholder={'Quiet hours 10 PM – 7 AM\nDogs on leash near livestock\nPack out all trash'} />
        
        <span className="mt-1.5 block text-xs text-ink-500">One rule per line.</span>
      </label>
    </div>);

}
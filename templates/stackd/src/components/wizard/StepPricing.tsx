import React from 'react';
import { Toggle } from '../Toggle';
import { brand } from '../../data/brand';
import { formatMoneyExact } from '../../utils/format';
import type { DraftErrors, ListingDraft } from '../../hooks/useListingDraft';

interface StepProps {
  draft: ListingDraft;
  errors: DraftErrors;
  update: (patch: Partial<ListingDraft>) => void;
}

function MoneyField({ id, label, value, error, hint, onChange }: {id: string;label: string;value: string;error?: string;hint: string;onChange: (v: string) => void;}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-display font-bold">$</span>
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
          aria-invalid={!!error}
          aria-describedby={`${id}-msg`}
          className={`field pl-8 font-display text-lg font-bold ${error ? 'border-danger' : ''}`}
          placeholder="0" />
        
      </div>
      <p id={`${id}-msg`} className={`mt-1.5 text-xs ${error ? 'text-danger' : 'text-muted'}`}>
        {error ?? hint}
      </p>
    </div>);

}

export function StepPricing({ draft, errors, update }: StepProps) {
  const price = Number(draft.price) || 0;
  const payout = price * (1 - brand.commissionRate);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 rounded-xl border border-ink p-4">
        <div>
          <p className="font-display font-bold">Pay what you want</p>
          <p className="text-sm text-muted">Let buyers choose their price above a minimum — set it to $0 to offer it free.</p>
        </div>
        <Toggle checked={draft.payWhatYouWant} onChange={(checked: boolean) => update({ payWhatYouWant: checked })} aria-label="Pay what you want" />
      </div>

      <div className={`grid gap-4 ${draft.payWhatYouWant ? 'sm:grid-cols-2' : ''}`}>
        <MoneyField
          id="price"
          label={draft.payWhatYouWant ? 'Suggested price' : 'Price'}
          value={draft.price}
          error={errors.price}
          hint="Buyers pay once and download instantly."
          onChange={(v) => update({ price: v })} />
        
        {draft.payWhatYouWant &&
        <MoneyField id="min-price" label="Minimum price" value={draft.minPrice} error={errors.minPrice} hint="Use 0 to allow free downloads." onChange={(v) => update({ minPrice: v })} />
        }
      </div>

      <fieldset>
        <legend className="label">License</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
          [
          { id: 'personal', title: 'Personal', body: 'Buyers can use it for themselves only.' },
          { id: 'commercial', title: 'Commercial', body: 'Buyers can use it in client work and products.' }] as
          const).
          map((l) =>
          <label
            key={l.id}
            className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${draft.license === l.id ? 'border-ink bg-brand-soft' : 'border-ink/20 hover:border-ink'}`}>
            
              <input type="radio" name="license" value={l.id} checked={draft.license === l.id} onChange={() => update({ license: l.id })} className="mt-1 accent-ink" />
              <span>
                <span className="block font-semibold">{l.title}</span>
                <span className="block text-sm text-muted">{l.body}</span>
              </span>
            </label>
          )}
        </div>
      </fieldset>

      <div className="rounded-xl bg-paper p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">{draft.payWhatYouWant ? 'At the suggested price you’ll receive' : 'You’ll receive per sale'}</span>
          <span className="font-display text-lg font-bold">{formatMoneyExact(payout)}</span>
        </div>
        <p className="mt-1 text-xs text-muted">After the {Math.round(brand.commissionRate * 100)}% {brand.name} fee. No listing or monthly fees.</p>
      </div>
    </div>);

}
import React from 'react';
import { brand } from '../../data/brand';
import type { ListingDraft } from '../../types/marketplace';
import type { WizardErrors } from '../../hooks/useListingWizard';
import { formatPrice } from '../../utils/format';
import { TextField } from '../ui/TextField';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: WizardErrors;
}

export function PricingStep({ draft, update, errors }: StepProps) {
  const price = Number(draft.price) || 0;
  const fee = price * brand.marketplaceFeePercent / 100;
  const processing = price ? price * 0.029 + 0.3 : 0;
  const earnings = Math.max(0, price - fee - processing);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <TextField
          label="Price per item"
          type="number"
          min={1}
          step="0.01"
          inputMode="decimal"
          leading="$"
          value={draft.price}
          onChange={(e) => update({ price: e.target.value })}
          error={errors.price}
          placeholder="0.00"
          hint="Factor in materials, your time, and packaging." />
        
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Most {brand.name} makers price their work at 2–3× the cost of materials, plus an hourly rate for their time. Underpricing handmade work hurts every maker.
        </p>
      </div>
      <div className="rounded-2xl bg-subtle p-6">
        <h3 className="font-sans text-sm font-semibold">Earnings preview</h3>
        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Item price</dt><dd>{formatPrice(price)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">{brand.name} fee ({brand.marketplaceFeePercent}%)</dt><dd>−{formatPrice(fee)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Payment processing</dt><dd>−{formatPrice(processing)}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>You earn</dt><dd className="text-success">{formatPrice(earnings)}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-muted">Shipping fees you charge are passed to you in full.</p>
      </div>
    </div>);

}
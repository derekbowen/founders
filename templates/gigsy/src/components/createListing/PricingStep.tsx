import React from 'react';
import { InfoIcon } from 'lucide-react';
import { TextField } from '../ui/TextField';
import { SelectField } from '../ui/SelectField';
import { brand } from '../../data/brand';
import { formatMoney, serviceFee } from '../../utils/format';
import { StepProps } from '../../types/listingWizard';

const deliveryChoices = [1, 2, 3, 5, 7, 10, 14, 21, 30].map((d) => ({ value: String(d), label: d === 1 ? '1 day' : `${d} days` }));
const revisionChoices = ['0', '1', '2', '3', 'unlimited'].map((r) => ({ value: r, label: r === 'unlimited' ? 'Unlimited' : `${r} round${r === '1' ? '' : 's'}` }));

export function PricingStep({ draft, update, errors }: StepProps) {
  const price = Number(draft.startingPrice) || 0;
  return (
    <div className="space-y-6">
      <TextField
        label="Starting price (USD)"
        type="number"
        inputMode="numeric"
        min={20}
        placeholder="900"
        leading={<span className="text-sm font-semibold">$</span>}
        value={draft.startingPrice}
        onChange={(e) => update({ startingPrice: e.target.value })}
        error={errors.startingPrice}
        hint="Shown as “Starting at” on your listing. You'll send a tailored price in each offer." />
      
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Typical delivery time" options={deliveryChoices} value={draft.deliveryDays} onChange={(e) => update({ deliveryDays: e.target.value })} />
        <SelectField label="Revisions included" options={revisionChoices} value={draft.revisions} onChange={(e) => update({ revisions: e.target.value })} />
      </div>
      {price > 0 &&
      <div className="flex items-start gap-3 rounded-xl bg-primary-50 p-4 text-sm text-primary-900">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
          <p>
            On a {formatMoney(price)} project you'd receive <strong>{formatMoney(price - serviceFee(price))}</strong> after the {brand.serviceFeePercent}% {brand.name} fee.
          </p>
        </div>
      }
    </div>);

}
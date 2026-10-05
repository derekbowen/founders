import React from 'react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { currencySymbol, formatMoney } from '../../utils/format';
import { fieldStyles } from '../../utils/styles';
import type { WizardStepProps } from '../../hooks/useListingWizard';

export function StepRent({ draft, update, errors }: WizardStepProps) {
  const symbol = currencySymbol();
  const rent = Number(draft.rent) || 0;
  const bills = draft.billsIncluded ? 0 : Number(draft.billsEstimate) || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="w-rent"
          label="Monthly rent"
          type="number"
          min={0}
          startAdornment={<span className="text-sm text-navy-400">{symbol}</span>}
          value={draft.rent}
          onChange={(e) => update('rent', e.target.value)}
          error={errors.rent} />
        
        <Input
          id="w-deposit"
          label="Deposit"
          type="number"
          min={0}
          startAdornment={<span className="text-sm text-navy-400">{symbol}</span>}
          value={draft.deposit}
          onChange={(e) => update('deposit', e.target.value)}
          error={errors.deposit}
          helperText={rent ? `Typical: ${formatMoney(rent * 2)} (2 months)` : 'Usually 1–3 months of rent.'} />
        
      </div>

      <div className="rounded-2xl border border-navy-100 p-5">
        <Toggle checked={draft.billsIncluded} onChange={(v) => update('billsIncluded', v)} label="Bills are included in the rent" />
        {!draft.billsIncluded &&
        <div className="mt-4 max-w-xs">
            <Input
            id="w-bills"
            label="Estimated bills per month"
            type="number"
            min={0}
            startAdornment={<span className="text-sm text-navy-400">{symbol}</span>}
            value={draft.billsEstimate}
            onChange={(e) => update('billsEstimate', e.target.value)}
            error={errors.billsEstimate} />
          
          </div>
        }
        <div className="mt-4">
          <label htmlFor="w-billsnote" className={fieldStyles.label}>
            What's covered? <span className="font-normal text-navy-400">(optional)</span>
          </label>
          <input
            id="w-billsnote"
            value={draft.billsNote}
            onChange={(e) => update('billsNote', e.target.value)}
            placeholder="e.g. Electricity, heating, water and Wi-Fi"
            className={fieldStyles.control} />
          
        </div>
      </div>

      {rent > 0 &&
      <div className="flex items-center justify-between rounded-2xl bg-primary-50 p-5">
          <div>
            <p className="text-sm text-navy-600">Renters will see a total monthly cost of about</p>
            <p className="text-2xl font-bold text-navy-900">{formatMoney(rent + bills)}</p>
          </div>
          <p className="text-right text-xs text-navy-500">
            No fees are charged.
            <br />
            Payments happen offline.
          </p>
        </div>
      }
    </div>);

}
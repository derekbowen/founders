import React from 'react';
import { Input } from '../Input';
import { SelectField } from '../ui/SelectField';
import { StepProps } from '../../hooks/useListingDraft';
import { brand } from '../../data/brand';
import { formatCurrency } from '../../utils/format';

export function RatesStep({ draft, update, errors }: StepProps) {
  const rate = Number(draft.hourlyRate) || 0;
  const extra = Number(draft.extraChildRate) || 0;
  const gross = rate * 4 + extra * 4;
  const net = gross * (1 - brand.sitterCommissionPercent);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="hourlyRate" type="number" label="Hourly rate (1 child)" startAdornment={<span className="text-ink-500">$</span>} value={draft.hourlyRate} error={errors.hourlyRate} helperText="Sitters in Austin charge $18–34" onChange={(e) => update({ hourlyRate: e.target.value })} />
        <Input id="extraChildRate" type="number" label="Each additional child" startAdornment={<span className="text-ink-500">+$</span>} value={draft.extraChildRate} error={errors.extraChildRate} helperText="Per hour, per extra child" onChange={(e) => update({ extraChildRate: e.target.value })} />
      </div>
      <SelectField label="Maximum kids at once" className="max-w-[220px]" value={draft.maxKids} onChange={(e) => update({ maxKids: e.target.value })} options={['1', '2', '3', '4', '5'].map((n) => ({ value: n, label: `${n} ${n === '1' ? 'child' : 'children'}` }))} />
      <div className="rounded-3xl bg-primary-50 p-5 ring-1 ring-primary-200">
        <p className="text-sm text-primary-900">A 4-hour date night with 2 kids earns you</p>
        <p className="mt-1 font-heading text-3xl font-bold text-primary-900">{formatCurrency(net)}</p>
        <p className="mt-1 text-xs text-primary-800">
          {formatCurrency(gross)} minus {Math.round(brand.sitterCommissionPercent * 100)}% {brand.name} service fee. Paid out within 2 days.
        </p>
      </div>
    </div>);

}
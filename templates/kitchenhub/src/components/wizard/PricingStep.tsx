import React from 'react';
import { TrendingUpIcon } from 'lucide-react';
import type { WizardStepProps } from '../../types/wizard';
import { formatMoney } from '../../utils/format';
import { cn, inputClass } from '../../utils/styles';
import { Field } from '../ui/Field';

export function PricingStep({ draft, update, errors }: WizardStepProps) {
  const monthly = Math.round(draft.pricePerHour * 20 * 4.3);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Hourly rate" htmlFor="wz-price" error={errors.pricePerHour}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-steel-500">$</span>
            <input id="wz-price" type="number" min={0} value={draft.pricePerHour} onChange={(e) => update({ pricePerHour: Number(e.target.value) })} className={cn(inputClass, 'pl-7', errors.pricePerHour && 'border-primary')} aria-invalid={!!errors.pricePerHour} />
          </div>
        </Field>
        <Field label="Minimum booking" htmlFor="wz-min" hint="2 hours or more">
          <select id="wz-min" value={draft.minHours} onChange={(e) => update({ minHours: Number(e.target.value) })} className={inputClass}>
            {[2, 3, 4, 5, 6, 8].map((h) =>
            <option key={h} value={h}>{h} hours</option>
            )}
          </select>
        </Field>
        <Field label="Cleaning fee" htmlFor="wz-clean" hint="Per booking">
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-steel-500">$</span>
            <input id="wz-clean" type="number" min={0} value={draft.cleaningFee} onChange={(e) => update({ cleaningFee: Number(e.target.value) })} className={cn(inputClass, 'pl-7')} />
          </div>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-steel-200 p-5">
          <p className="text-sm text-steel-500">Smallest booking a renter can make</p>
          <p className="mt-1 font-heading text-3xl font-bold text-steel-900">{formatMoney(draft.pricePerHour * draft.minHours + draft.cleaningFee)}</p>
          <p className="mt-1 text-xs text-steel-500">{draft.minHours}h × {formatMoney(draft.pricePerHour)} + {formatMoney(draft.cleaningFee)} cleaning</p>
        </div>
        <div className="rounded-2xl bg-steel-900 p-5 text-white">
          <p className="flex items-center gap-2 text-sm text-steel-300">
            <TrendingUpIcon className="h-4 w-4" aria-hidden="true" />
            Estimated monthly earnings
          </p>
          <p className="mt-1 font-heading text-3xl font-bold">{formatMoney(monthly)}</p>
          <p className="mt-1 text-xs text-steel-400">Based on 20 booked hours per week</p>
        </div>
      </div>
    </div>);

}
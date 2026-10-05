import React from 'react';
import { formatMoney } from '../../utils/format';
import { storageLabel } from '../../utils/listings';
import type { PriceBreakdown } from '../../utils/pricing';

export function PriceBreakdownList({ breakdown }: {breakdown: PriceBreakdown;}) {
  const rows = [
  { label: `${formatMoney(breakdown.hourly)} × ${breakdown.hours} hours`, value: breakdown.base },
  ...breakdown.storageItems.map((s) => ({ label: `${storageLabel(s.type)} (first month)`, value: s.monthlyPrice })),
  { label: 'Cleaning fee', value: breakdown.cleaningFee },
  { label: 'Service fee', value: breakdown.serviceFee }];


  return (
    <dl className="space-y-2 text-sm">
      {rows.map((r) =>
      <div key={r.label} className="flex justify-between gap-4">
          <dt className="text-steel-600">{r.label}</dt>
          <dd className="text-steel-900">{formatMoney(r.value)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4 border-t border-steel-200 pt-3 text-base font-semibold">
        <dt className="text-steel-900">Total</dt>
        <dd className="text-steel-900">{formatMoney(breakdown.total)}</dd>
      </div>
    </dl>);

}
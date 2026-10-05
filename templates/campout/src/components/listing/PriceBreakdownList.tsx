import React from 'react';
import type { PriceBreakdown } from '../../utils/pricing';
import { formatMoney } from '../../utils/currency';

export function PriceBreakdownList({ breakdown }: {breakdown: PriceBreakdown;}) {
  return (
    <dl className="space-y-2.5 text-sm">
      {breakdown.lines.map((line) =>
      <div key={line.label} className="flex justify-between gap-4 text-ink-700">
          <dt>{line.label}</dt>
          <dd className="tabular-nums">{formatMoney(line.amount)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4 border-t border-sand-200 pt-3 text-base font-bold text-ink-900">
        <dt>Total (USD)</dt>
        <dd className="tabular-nums">{formatMoney(breakdown.total)}</dd>
      </div>
    </dl>);

}
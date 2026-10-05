import React from 'react';
import { formatDuration, formatMoney } from '../../utils/format';
import type { Quote } from '../../utils/pricing';

export function PriceBreakdown({ quote, perspective = 'driver' }: {quote: Quote;perspective?: 'driver' | 'host';}) {
  if (!quote.valid) return null;
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted">
          {formatMoney(quote.unitPrice)} × {quote.units} {quote.unitLabel}
        </dt>
        <dd>{formatMoney(quote.subtotal)}</dd>
      </div>
      {perspective === 'driver' ?
      <div className="flex justify-between">
          <dt className="text-muted">Service fee</dt>
          <dd>{formatMoney(quote.serviceFee)}</dd>
        </div> :

      <div className="flex justify-between">
          <dt className="text-muted">Host fee</dt>
          <dd>−{formatMoney(quote.hostCommission)}</dd>
        </div>
      }
      <div className="flex justify-between border-t border-line pt-2 text-base font-bold">
        <dt>{perspective === 'driver' ? 'Total' : 'You earn'}</dt>
        <dd>{formatMoney(perspective === 'driver' ? quote.total : quote.hostPayout)}</dd>
      </div>
      <p className="text-xs text-muted">Duration: {formatDuration(quote.hours)}</p>
    </dl>);

}
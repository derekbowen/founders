import React from 'react';
import type { Listing, Order } from '../../types/marketplace';
import { brand } from '../../data/brand';
import { formatDateTime, formatMoneyExact } from '../../utils/format';

export function Receipt({ order, listing }: {order: Order;listing: Listing;}) {
  const isSeller = order.role === 'seller';
  const fee = order.amount * brand.commissionRate;
  const rows: [string, string][] = [
  ['Order', order.id],
  ['Date', formatDateTime(order.createdAt)],
  [isSeller ? 'Buyer email' : 'Receipt sent to', order.email],
  ['Payment', order.paymentMethod],
  ['License', listing.license === 'commercial' ? 'Commercial' : 'Personal']];


  return (
    <div className="card p-5">
      <h3 className="font-display text-base font-bold">{isSeller ? 'Sale breakdown' : 'Receipt'}</h3>
      <dl className="mt-3 space-y-2 text-sm">
        {rows.map(([k, v]) =>
        <div key={k} className="flex justify-between gap-4">
            <dt className="text-muted">{k}</dt>
            <dd className="truncate text-right font-medium">{v}</dd>
          </div>
        )}
      </dl>
      <dl className="mt-4 space-y-2 border-t border-dashed border-ink/25 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">{listing.title.length > 28 ? `${listing.title.slice(0, 28)}…` : listing.title}</dt>
          <dd>{formatMoneyExact(order.amount)}</dd>
        </div>
        {isSeller &&
        <div className="flex justify-between">
            <dt className="text-muted">Platform fee ({Math.round(brand.commissionRate * 100)}%)</dt>
            <dd>−{formatMoneyExact(fee)}</dd>
          </div>
        }
        {order.status === 'refunded' &&
        <div className="flex justify-between text-danger">
            <dt>Refunded</dt>
            <dd>−{formatMoneyExact(isSeller ? order.amount - fee : order.amount)}</dd>
          </div>
        }
        <div className="flex justify-between border-t border-line pt-2 font-semibold">
          <dt>{isSeller ? 'Your payout' : 'Total paid'}</dt>
          <dd>
            {formatMoneyExact(
              order.status === 'refunded' ? 0 : isSeller ? order.amount - fee : order.amount
            )}
          </dd>
        </div>
      </dl>
    </div>);

}
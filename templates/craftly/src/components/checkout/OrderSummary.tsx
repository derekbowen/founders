import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';
import { useListings } from '../../contexts/ListingsContext';
import type { CartItem, DeliveryMethod } from '../../types/marketplace';
import { formatPrice } from '../../utils/format';
import { useOrderTotals } from '../../hooks/useOrderTotals';

interface OrderSummaryProps {
  items: CartItem[];
  delivery: DeliveryMethod;
  children?: React.ReactNode;
}

export function OrderSummary({ items, delivery, children }: OrderSummaryProps) {
  const { getMaker } = useListings();
  const { lines, subtotal, shipping, total } = useOrderTotals(items, delivery);

  return (
    <section className="card p-6" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="text-2xl font-medium">Order summary</h2>
      <ul className="mt-5 divide-y divide-line">
        {lines.map(({ item, listing }) =>
        <li key={item.key} className="flex gap-4 py-4 first:pt-0">
            <div className="relative">
              <img src={listing.image} alt="" className="h-20 w-16 rounded-xl object-cover" />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink px-1 text-[11px] font-semibold text-canvas">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium">{listing.title}</p>
              <p className="text-xs text-muted">{getMaker(listing.makerId)?.shopName}</p>
              {Object.entries(item.selections).length > 0 &&
            <p className="mt-1 text-xs text-muted">{Object.entries(item.selections).map(([k, v]) => `${k}: ${v}`).join(' · ')}</p>
            }
            </div>
            <p className="text-sm font-medium">{formatPrice(listing.price * item.quantity)}</p>
          </li>
        )}
      </ul>
      <dl className="mt-2 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">{delivery === 'pickup' ? 'Local pickup' : 'Shipping'}</dt>
          <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {children}
      <p className="mt-4 flex gap-2 rounded-xl bg-accent-soft p-3 text-xs leading-relaxed text-accent-ink">
        <ShieldCheckIcon className="h-4 w-4 shrink-0" aria-hidden />
        Your payment is held securely and released to the maker after you mark the order as received.
      </p>
    </section>);

}
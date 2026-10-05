import React from 'react';
import { AlertTriangleIcon, ShieldCheckIcon } from 'lucide-react';
import { BrandButton } from '../ui/BrandButton';
import { brand as siteBrand } from '../../data/brand';
import type { BrandGroup } from '../../hooks/useCheckout';
import { formatCurrency, getTierForCases } from '../../utils/pricing';

interface OrderSummaryProps {
  groups: BrandGroup[];
  subtotal: number;
  shipping: number;
  savings: number;
  total: number;
  blocked: boolean;
  submitting: boolean;
  onSubmit: () => void;
}

export function OrderSummary({ groups, subtotal, shipping, savings, total, blocked, submitting, onSubmit }: OrderSummaryProps) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="border-b border-slate-100 px-5 py-4 text-base font-semibold text-slate-900">
        Order summary
      </h2>
      <div className="divide-y divide-slate-100">
        {groups.map((g) =>
        <div key={g.brand.id} className="px-5 py-4">
            <p className="text-sm font-semibold text-slate-900">{g.brand.name}</p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
              {g.lines.map((l) =>
            <li key={l.product.id} className="flex justify-between gap-3">
                  <span className="truncate">
                    {l.cases} × {l.product.title}{' '}
                    <span className="text-slate-400">@ {formatCurrency(getTierForCases(l.product, l.cases).unitPrice)}</span>
                  </span>
                  <span className="shrink-0 tabular-nums text-slate-800">{formatCurrency(l.total)}</span>
                </li>
            )}
              <li className="flex justify-between">
                <span>Shipping</span>
                <span className={`tabular-nums ${g.shipping === 0 ? 'font-semibold text-accent-800' : 'text-slate-800'}`}>
                  {g.shipping === 0 ? 'Free' : formatCurrency(g.shipping)}
                </span>
              </li>
            </ul>
            {g.belowMinimum &&
          <p className="mt-2 flex items-start gap-1.5 rounded-md bg-amber-50 p-2 text-xs text-amber-800">
                <AlertTriangleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Add {formatCurrency(g.brand.minOrderValue - g.subtotal)} more to meet this brand’s {formatCurrency(g.brand.minOrderValue)} minimum.
              </p>
          }
            {!g.belowMinimum && g.shipping > 0 &&
          <p className="mt-2 text-xs text-slate-500">
                {formatCurrency(siteBrand.freeShippingThreshold - g.subtotal)} away from free shipping
              </p>
          }
          </div>
        )}
      </div>
      <dl className="space-y-2 border-t border-slate-200 px-5 py-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-600">Subtotal</dt>
          <dd className="tabular-nums text-slate-900">{formatCurrency(subtotal)}</dd>
        </div>
        {savings > 0 &&
        <div className="flex justify-between">
            <dt className="text-slate-600">Tier savings</dt>
            <dd className="font-semibold tabular-nums text-accent-800">−{formatCurrency(savings)}</dd>
          </div>
        }
        <div className="flex justify-between">
          <dt className="text-slate-600">Shipping</dt>
          <dd className="tabular-nums text-slate-900">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">Sales tax</dt>
          <dd className="text-slate-500">Exempt (resale)</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
          <dt className="font-semibold text-slate-900">Total</dt>
          <dd className="text-xl font-semibold tabular-nums text-slate-900">{formatCurrency(total)}</dd>
        </div>
      </dl>
      <div className="px-5 pb-5">
        <BrandButton size="lg" fullWidth onClick={onSubmit} loading={submitting} disabled={blocked}>
          Place order · {formatCurrency(total)}
        </BrandButton>
        <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-500">
          <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-600" aria-hidden="true" />
          Protected by {siteBrand.name} Buyer Guarantee. Report issues within 7 days of delivery.
        </p>
      </div>
    </aside>);

}
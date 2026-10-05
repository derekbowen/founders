import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { Product } from '../../types/marketplace';
import { formatCurrency, formatTierRange, getMarginPercent, getTierDiscount, getTierForCases } from '../../utils/pricing';

export function TierPriceTable({ product, cases }: {product: Product;cases: number;}) {
  const active = getTierForCases(product, cases);
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-sm">
        <caption className="sr-only">Tiered wholesale pricing</caption>
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="px-3 py-2 text-left font-semibold">Quantity</th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">Per unit</th>
            <th scope="col" className="hidden px-3 py-2 text-right font-semibold sm:table-cell">Per case</th>
            <th scope="col" className="px-3 py-2 text-right font-semibold">Margin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {product.tiers.map((tier) => {
            const isActive = tier === active;
            const discount = getTierDiscount(product, tier);
            return (
              <tr key={tier.minCases} className={isActive ? 'bg-accent-50' : 'bg-white'}>
                <td className="px-3 py-2.5">
                  <span className="flex items-center gap-2 font-medium text-slate-900">
                    {isActive ?
                    <CheckIcon className="h-4 w-4 text-accent-700" aria-label="Current tier" /> :

                    <span className="h-4 w-4" aria-hidden="true" />
                    }
                    {formatTierRange(tier)}
                    {discount > 0 &&
                    <span className="rounded bg-primary-50 px-1.5 py-0.5 text-[11px] font-semibold text-primary-700">−{discount}%</span>
                    }
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-slate-900">{formatCurrency(tier.unitPrice)}</td>
                <td className="hidden px-3 py-2.5 text-right tabular-nums text-slate-600 sm:table-cell">
                  {formatCurrency(tier.unitPrice * product.casePack)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-slate-600">{getMarginPercent(tier.unitPrice, product.msrp)}%</td>
              </tr>);

          })}
        </tbody>
      </table>
    </div>);

}
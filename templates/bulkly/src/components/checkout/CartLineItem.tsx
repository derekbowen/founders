import React from 'react';
import { Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuantityStepper } from '../ui/QuantityStepper';
import type { CheckoutLine } from '../../hooks/useCheckout';
import { formatCurrency, formatTierRange, getTierForCases } from '../../utils/pricing';

interface CartLineItemProps {
  line: CheckoutLine;
  onChange: (cases: number) => void;
  onRemove: () => void;
}

export function CartLineItem({ line, onChange, onRemove }: CartLineItemProps) {
  const { product, cases, total, savings } = line;
  const tier = getTierForCases(product, cases);
  const nextTier = product.tiers.find((t) => t.minCases > cases);

  return (
    <li className="flex gap-4 py-4">
      <Link to={`/products/${product.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/products/${product.id}`} className="text-sm font-semibold text-slate-900 hover:text-primary-700">
              {product.title}
            </Link>
            <p className="mt-0.5 text-xs text-slate-500 tabular-nums">
              {product.casePack} units/case · {cases * product.casePack} units
            </p>
          </div>
          <p className="text-right text-sm font-semibold tabular-nums text-slate-900">{formatCurrency(total)}</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-primary-50 px-1.5 py-0.5 font-medium text-primary-800">
            Tier {formatTierRange(tier)} · {formatCurrency(tier.unitPrice)}/unit
          </span>
          {savings > 0 && <span className="font-semibold text-accent-800">Saving {formatCurrency(savings)}</span>}
          {nextTier &&
          <span className="text-slate-500">
              Add {nextTier.minCases - cases} more for {formatCurrency(nextTier.unitPrice)}/unit
            </span>
          }
        </div>
        <div className="mt-3 flex items-center justify-between">
          <QuantityStepper value={cases} min={product.minOrderCases} max={product.stockCases} onChange={onChange} size="sm" />
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-700">
            
            <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
    </li>);

}
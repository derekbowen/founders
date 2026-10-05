import React, { useState } from 'react';
import { BellIcon, ClockIcon, PackageCheckIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TierPriceTable } from './TierPriceTable';
import { BrandButton } from '../ui/BrandButton';
import { QuantityStepper } from '../ui/QuantityStepper';
import { useCart } from '../../contexts/CartContext';
import { brand as siteBrand } from '../../data/brand';
import type { Product } from '../../types/marketplace';
import { formatCurrency, getBaseUnitPrice, getLineSavings, getLineTotal, getProductMargin, getTierForCases } from '../../utils/pricing';

export function PurchasePanel({ product }: {product: Product;}) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const outOfStock = product.stockCases === 0;
  const [cases, setCases] = useState(Math.min(product.minOrderCases, Math.max(product.stockCases, product.minOrderCases)));
  const tier = getTierForCases(product, cases);
  const total = getLineTotal(product, cases);
  const savings = getLineSavings(product, cases);
  const lowStock = !outOfStock && product.stockCases < 50;

  const handleAdd = () => {
    addItem(product.id, cases);
    toast.success(`Added ${cases} case${cases > 1 ? 's' : ''} of ${product.title}`, {
      description: `${cases * product.casePack} units · ${formatCurrency(total)}`,
      action: { label: 'Checkout', onClick: () => navigate('/checkout') }
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Wholesale price</p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold tabular-nums text-primary-900">{formatCurrency(getBaseUnitPrice(product))}</span>
              <span className="text-sm text-slate-500">/ unit</span>
            </p>
          </div>
          <div className="text-right text-sm">
            <p className="text-slate-600">
              MSRP <span className="font-semibold tabular-nums text-slate-900">{formatCurrency(product.msrp)}</span>
            </p>
            <p className="mt-0.5 font-semibold text-accent-800">{getProductMargin(product)}% retail margin</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 divide-x divide-slate-200 rounded-lg bg-slate-50 py-3 text-center">
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-slate-500">Case pack</dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">{product.casePack} units</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-slate-500">Minimum</dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums text-slate-900">
              {product.minOrderCases} case{product.minOrderCases > 1 ? 's' : ''}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-slate-500">In stock</dt>
            <dd className={`mt-0.5 text-sm font-semibold tabular-nums ${outOfStock ? 'text-red-600' : lowStock ? 'text-amber-700' : 'text-slate-900'}`}>
              {outOfStock ? 'Sold out' : `${product.stockCases} cases`}
            </dd>
          </div>
        </dl>

        <div className="mt-5">
          <h2 className="mb-2 text-sm font-semibold text-slate-900">Tiered pricing</h2>
          <TierPriceTable product={product} cases={cases} />
        </div>

        {outOfStock ?
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Currently out of stock</p>
            <p className="mt-0.5 text-sm text-amber-800">{product.restockNote ?? 'The brand is restocking soon.'}</p>
            <BrandButton
            variant="secondary"
            className="mt-3"
            onClick={() => toast.success('We’ll email you when it’s back in stock.')}>
            
              <BellIcon className="h-4 w-4" aria-hidden="true" />
              Notify me when available
            </BrandButton>
          </div> :

        <div className="mt-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p id="qty-label" className="text-sm font-semibold text-slate-900">
                  Quantity (cases)
                </p>
                <p className="text-xs text-slate-500 tabular-nums">
                  {cases * product.casePack} units · {formatCurrency(tier.unitPrice)}/unit
                </p>
              </div>
              <QuantityStepper value={cases} min={product.minOrderCases} max={product.stockCases} onChange={setCases} />
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-600">Line total</span>
              <span className="text-right">
                <span className="block text-xl font-semibold tabular-nums text-slate-900">{formatCurrency(total)}</span>
                {savings > 0 && <span className="text-xs font-semibold text-accent-800">You save {formatCurrency(savings)} with tier pricing</span>}
              </span>
            </div>
            <BrandButton size="lg" fullWidth onClick={handleAdd}>
              <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
              Add to order
            </BrandButton>
            {lowStock && <p className="text-center text-xs font-medium text-amber-700">Only {product.stockCases} cases left — order soon</p>}
          </div>
        }
      </div>

      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white text-sm">
        <li className="flex gap-3 p-4">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-slate-900">Lead time</p>
            <p className="text-slate-600">{product.leadTime}</p>
          </div>
        </li>
        <li className="flex gap-3 p-4">
          <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-slate-900">Shipping from {product.shipsFrom}</p>
            <p className="text-slate-600">
              Free on {formatCurrency(siteBrand.freeShippingThreshold).replace('.00', '')}+ per brand, otherwise{' '}
              {formatCurrency(siteBrand.flatShippingRate).replace('.00', '')} flat.
            </p>
          </div>
        </li>
        <li className="flex gap-3 p-4">
          <PackageCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
          <div>
            <p className="font-medium text-slate-900">Free returns on your first order</p>
            <p className="text-slate-600">Return unsold units within 60 days of your first order with this brand.</p>
          </div>
        </li>
      </ul>
    </div>);

}
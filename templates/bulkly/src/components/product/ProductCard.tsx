import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/marketplace';
import { getBrand, isNewListing } from '../../utils/catalog';
import { formatCurrency, getBaseUnitPrice, getProductMargin } from '../../utils/pricing';

export function ProductCard({ product }: {product: Product;}) {
  const brand = getBrand(product.brandId);
  const wholesale = getBaseUnitPrice(product);
  const margin = getProductMargin(product);
  const outOfStock = product.stockCases === 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${outOfStock ? 'opacity-60' : ''}`} />
        
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          {isNewListing(product.listedAt) &&
          <span className="rounded-md bg-accent-400 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary-950">New</span>
          }
          {outOfStock &&
          <span className="rounded-md bg-slate-900/85 px-2 py-0.5 text-[11px] font-semibold text-white">Out of stock</span>
          }
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="truncate text-xs font-medium text-slate-500">{brand?.name}</p>
        <h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-slate-900">
          <Link to={`/products/${product.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.title}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-semibold tabular-nums text-primary-900">{formatCurrency(wholesale)}</span>
          <span className="text-xs text-slate-500">/ unit wholesale</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2 text-xs">
          <span className="tabular-nums text-slate-600">
            MSRP <span className="font-medium text-slate-800">{formatCurrency(product.msrp)}</span>
          </span>
          <span className="rounded bg-accent-100 px-1.5 py-0.5 font-semibold tabular-nums text-accent-900">{margin}% margin</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-600">
          <span>
            Min {product.minOrderCases} case{product.minOrderCases > 1 ? 's' : ''}
          </span>
          <span className="tabular-nums">{product.casePack} units / case</span>
        </div>
      </div>
    </article>);

}
import React, { useState } from 'react';
import { PackageIcon } from 'lucide-react';
import type { Product } from '../../types/marketplace';

type View = 'product' | 'detail' | 'case';

export function ProductGallery({ product }: {product: Product;}) {
  const [view, setView] = useState<View>('product');

  const views: {id: View;label: string;}[] = [
  { id: 'product', label: 'Product photo' },
  { id: 'detail', label: 'Detail close-up' },
  { id: 'case', label: 'Case pack' }];


  const renderView = (v: View, thumb = false) => {
    if (v === 'case') {
      const cols = Math.min(product.casePack, thumb ? 3 : 6);
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-primary-50 p-4 text-primary-800">
          {thumb ?
          <PackageIcon className="h-6 w-6" aria-hidden="true" /> :

          <>
              <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-hidden="true">
                {Array.from({ length: Math.min(product.casePack, 24) }).map((_, i) =>
              <span key={i} className="h-7 w-7 rounded-md border border-primary-300 bg-white sm:h-9 sm:w-9" />
              )}
              </div>
              <p className="text-center text-base font-semibold">{product.casePack} units per case</p>
              <p className="text-center text-sm text-primary-700">{product.unitDescription}</p>
            </>
          }
        </div>);

    }
    return (
      <img
        src={product.image}
        alt={thumb ? '' : `${product.title}${v === 'detail' ? ' — detail' : ''}`}
        className={`h-full w-full object-cover ${v === 'detail' ? 'scale-[1.8]' : ''}`}
        style={v === 'detail' ? { transformOrigin: '50% 55%' } : undefined} />);


  };

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-2 sm:flex-col" role="tablist" aria-label="Product images">
        {views.map((v) =>
        <button
          key={v.id}
          type="button"
          role="tab"
          aria-selected={view === v.id}
          aria-label={v.label}
          onClick={() => setView(v.id)}
          className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-slate-100 transition-colors sm:h-20 sm:w-20 ${
          view === v.id ? 'border-primary-600' : 'border-transparent hover:border-slate-300'}`
          }>
          
            {renderView(v.id, true)}
          </button>
        )}
      </div>
      <div className="relative aspect-square flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        {renderView(view)}
        {product.stockCases === 0 &&
        <span className="absolute left-3 top-3 rounded-md bg-slate-900/85 px-2.5 py-1 text-xs font-semibold text-white">Out of stock</span>
        }
      </div>
    </div>);

}
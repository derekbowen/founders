import React from 'react';
import { ZapIcon } from 'lucide-react';
import type { Creator, Listing } from '../../types/marketplace';
import { FileTypeBadge } from '../common/FileTypeBadge';
import { formatMoneyExact } from '../../utils/format';

export function OrderSummary({ listing, creator, amount }: {listing: Listing;creator?: Creator;amount: number;}) {
  return (
    <aside className="card overflow-hidden" aria-label="Order summary">
      <div className="border-b border-ink bg-paper px-5 py-3">
        <h2 className="font-display text-base font-bold">Order summary</h2>
      </div>
      <div className="space-y-5 p-5">
        <div className="flex gap-4">
          <img src={listing.cover} alt="" className="h-20 w-24 shrink-0 rounded-lg border border-ink object-cover" />
          <div className="min-w-0">
            <p className="font-display font-semibold leading-snug">{listing.title}</p>
            {creator && <p className="mt-0.5 text-sm text-muted">by {creator.name}</p>}
            <div className="mt-2 flex items-center gap-2">
              <FileTypeBadge type={listing.fileType} />
              <span className="text-xs text-muted">{listing.fileSize}</span>
            </div>
          </div>
        </div>
        <dl className="space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">
              1 × file license{listing.payWhatYouWant ? ' (your price)' : ''}
            </dt>
            <dd>{formatMoneyExact(amount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Tax</dt>
            <dd>{formatMoneyExact(0)}</dd>
          </div>
          <div className="flex items-end justify-between border-t border-line pt-3">
            <dt className="font-semibold">Total</dt>
            <dd className="font-display text-2xl font-bold">{formatMoneyExact(amount)}</dd>
          </div>
        </dl>
        <p className="flex items-start gap-2 rounded-lg bg-brand-soft p-3 text-xs">
          <ZapIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Files unlock immediately after payment and stay in your library forever.
        </p>
      </div>
    </aside>);

}
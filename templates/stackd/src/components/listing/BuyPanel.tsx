import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2Icon, DownloadIcon, LockIcon, ScaleIcon, ZapIcon } from 'lucide-react';
import type { Listing } from '../../types/marketplace';
import { useStore } from '../../contexts/StoreContext';
import { FileTypeBadge } from '../common/FileTypeBadge';
import { basePrice, formatCompact, formatMoney } from '../../utils/format';

export function BuyPanel({ listing }: {listing: Listing;}) {
  const navigate = useNavigate();
  const { orders } = useStore();
  const [amount, setAmount] = useState<string>(String(listing.price));
  const owned = orders.find((o) => o.role === 'buyer' && o.listingSlug === listing.slug && o.status !== 'refunded');

  const numeric = Number(amount);
  const min = basePrice(listing);
  const invalid = listing.payWhatYouWant && (amount === '' || Number.isNaN(numeric) || numeric < min);
  const finalAmount = listing.payWhatYouWant ? numeric : listing.price;
  const suggestions = Array.from(new Set([min, listing.price, listing.price * 2])).filter((v) => v >= min);

  const buy = () => {
    if (invalid) return;
    navigate(`/checkout/${listing.slug}?amount=${finalAmount}`);
  };

  return (
    <div className="card overflow-hidden shadow-pop">
      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {listing.payWhatYouWant ? 'Pay what you want' : 'Price'}
            </p>
            <p className="font-display text-4xl font-bold tracking-tight">
              {listing.payWhatYouWant ? min === 0 ? '$0+' : `${formatMoney(min)}+` : formatMoney(listing.price)}
            </p>
          </div>
          <FileTypeBadge type={listing.fileType} />
        </div>

        {listing.payWhatYouWant &&
        <div>
            <label htmlFor="pwyw" className="label">
              Name a fair price
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-display font-bold">$</span>
              <input
              id="pwyw"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              aria-invalid={invalid}
              aria-describedby="pwyw-hint"
              className={`field pl-8 font-display text-lg font-bold ${invalid ? 'border-danger focus:ring-danger/30' : ''}`} />
            
            </div>
            <p id="pwyw-hint" className={`mt-1.5 text-xs ${invalid ? 'text-danger' : 'text-muted'}`}>
              {invalid ? `Enter at least ${formatMoney(min)}.` : `Minimum ${formatMoney(min)} · suggested ${formatMoney(listing.price)}`}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {suggestions.map((s) =>
            <button
              key={s}
              type="button"
              onClick={() => setAmount(String(s))}
              className={`chip ${numeric === s ? 'border-ink bg-brand' : ''}`}>
              
                  {s === 0 ? 'Free' : formatMoney(s)}
                </button>
            )}
            </div>
          </div>
        }

        {owned ?
        <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-brand-soft px-3 py-2 text-sm font-semibold">
              <CheckCircle2Icon className="h-4 w-4 text-success" aria-hidden="true" />
              You own this — it’s in your library.
            </div>
            <Link to={`/inbox/${owned.id}`} className="btn btn-ink btn-lg w-full">
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              Open & download
            </Link>
          </div> :

        <button type="button" onClick={buy} disabled={invalid} className="btn btn-accent btn-lg w-full">
            <DownloadIcon className="h-5 w-5" aria-hidden="true" />
            {listing.payWhatYouWant && numeric === 0 ? 'Get it free' : 'Buy & download'}
          </button>
        }

        <dl className="grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
          <div>
            <dt className="text-muted">File type</dt>
            <dd className="font-semibold">{listing.fileType}</dd>
          </div>
          <div>
            <dt className="text-muted">Size</dt>
            <dd className="font-semibold">{listing.fileSize}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted">Format</dt>
            <dd className="font-semibold">{listing.format}</dd>
          </div>
          <div>
            <dt className="text-muted">Unit</dt>
            <dd className="font-semibold">Per file · {listing.files.length} file{listing.files.length > 1 ? 's' : ''}</dd>
          </div>
          <div>
            <dt className="text-muted">Sold</dt>
            <dd className="font-semibold">{formatCompact(listing.sales)} copies</dd>
          </div>
        </dl>
      </div>

      <div className="flex gap-3 border-t border-ink bg-paper p-5 text-sm sm:px-6">
        <ScaleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-muted">
          <span className="font-semibold text-ink">{listing.license === 'commercial' ? 'Commercial license.' : 'Personal license.'}</span>{' '}
          {listing.license === 'commercial' ?
          'Use in client work, ads and products you sell. Reselling the files themselves is not allowed.' :
          'For your own personal use. Sharing or reselling the files is not allowed.'}{' '}
          <Link to="/terms" className="link">
            Read terms
          </Link>
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 border-t border-line px-5 py-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <ZapIcon className="h-3.5 w-3.5" aria-hidden="true" /> Instant download
        </span>
        <span className="inline-flex items-center gap-1">
          <LockIcon className="h-3.5 w-3.5" aria-hidden="true" /> Secure checkout
        </span>
      </div>
    </div>);

}
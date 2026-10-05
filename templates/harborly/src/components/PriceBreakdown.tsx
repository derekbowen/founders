import React from 'react';
import { InfoIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { formatMoney, getPackage, getPriceBreakdown } from '../utils/pricing';
import type { Listing, PackageId } from '../types/marketplace';

interface PriceBreakdownProps {
  listing: Listing;
  pkg: PackageId;
  withCaptain: boolean;
}

export function PriceBreakdown({ listing, pkg, withCaptain }: PriceBreakdownProps) {
  const b = getPriceBreakdown(listing, pkg, withCaptain);
  const pack = getPackage(pkg);
  const row = 'flex items-center justify-between gap-4 text-sm';
  return (
    <div>
      <dl className="space-y-2.5">
        <div className={row}>
          <dt className="text-muted">
            {pack.label} · {pack.hours} hours
          </dt>
          <dd className="text-ink">{formatMoney(b.base)}</dd>
        </div>
        {b.captainFee > 0 &&
        <div className={row}>
            <dt className="text-muted">Captain{listing.captainMode === 'required' ? ' (required)' : ''}</dt>
            <dd className="text-ink">{formatMoney(b.captainFee)}</dd>
          </div>
        }
        <div className={row}>
          <dt className="text-muted">{brand.name} service fee</dt>
          <dd className="text-ink">{formatMoney(b.serviceFee)}</dd>
        </div>
        <div className={row + ' border-t border-line pt-3 text-base font-semibold'}>
          <dt className="text-ink">Total</dt>
          <dd className="text-ink">{formatMoney(b.total)}</dd>
        </div>
      </dl>
      {b.fuelDeposit > 0 &&
      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-sand-light p-3 text-xs text-ink/80">
          <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sea" aria-hidden="true" />
          <p>
            <span className="font-semibold text-ink">Refundable fuel deposit: {formatMoney(b.fuelDeposit)}</span> — held on your card at departure and released within 3 days, minus fuel used.
          </p>
        </div>
      }
    </div>);

}
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, format, parseISO, differenceInCalendarDays } from 'date-fns';
import { StarIcon, InfoIcon, ShieldCheckIcon } from 'lucide-react';
import { Button } from '../Button';
import type { Listing } from '../../types/marketplace';
import { estimateBooking, formatMoney } from '../../utils/pricing';
import { brand } from '../../data/brand';
import { ui, cx } from '../../utils/styles';

export function BookingPanel({ listing, isOwn }: {listing: Listing;isOwn: boolean;}) {
  const navigate = useNavigate();
  const today = format(new Date(), 'yyyy-MM-dd');
  const [moveIn, setMoveIn] = useState(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
  const [mode, setMode] = useState<'ongoing' | 'end'>('ongoing');
  const [moveOut, setMoveOut] = useState(format(addDays(new Date(), 97), 'yyyy-MM-dd'));

  const endDate = mode === 'end' ? moveOut : null;
  const tooShort =
  mode === 'end' && moveIn && moveOut && differenceInCalendarDays(parseISO(moveOut), parseISO(moveIn)) < listing.minDays;
  const estimate = useMemo(
    () => estimateBooking({ monthlyPrice: listing.monthlyPrice, deposit: listing.deposit, moveIn, moveOut: endDate }),
    [listing, moveIn, endDate]
  );
  const invalid = !estimate || Boolean(tooShort);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invalid) return;
    const p = new URLSearchParams({ start: moveIn });
    if (endDate) p.set('end', endDate);
    navigate(`/checkout/${listing.id}?${p.toString()}`);
  };

  return (
    <form id="book" onSubmit={submit} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lift" aria-label="Book this space">
      <div className="flex items-baseline justify-between">
        <p>
          <span className="text-2xl font-bold text-stone-900">{formatMoney(listing.monthlyPrice)}</span>
          <span className="text-stone-600"> / month</span>
        </p>
        <span className="flex items-center gap-1 text-sm text-stone-700">
          <StarIcon className="h-3.5 w-3.5 fill-sand-500 text-sand-500" aria-hidden="true" />
          {listing.rating.toFixed(2)} · {listing.reviewCount}
        </span>
      </div>
      <p className="mt-1 text-xs text-stone-500">
        Billed by the day · {formatMoney(listing.monthlyPrice / brand.marketplace.daysPerMonth, 2)}/day
      </p>

      <div className="mt-5">
        <label htmlFor="move-in" className={ui.label}>Move-in date</label>
        <input id="move-in" type="date" min={today} value={moveIn} onChange={(e) => setMoveIn(e.target.value)} className={ui.field} required />
      </div>

      <fieldset className="mt-4">
        <legend className={ui.label}>How long?</legend>
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-stone-100 p-1">
          {(['ongoing', 'end'] as const).map((m) =>
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cx(
              'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
              mode === m ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            )}>
            
              {m === 'ongoing' ? 'Ongoing monthly' : 'Set end date'}
            </button>
          )}
        </div>
      </fieldset>

      {mode === 'end' ?
      <div className="mt-4">
          <label htmlFor="move-out" className={ui.label}>End date</label>
          <input id="move-out" type="date" min={moveIn} value={moveOut} onChange={(e) => setMoveOut(e.target.value)} className={ui.field} aria-describedby="end-hint" />
          <p id="end-hint" className={cx('mt-1.5 text-xs', tooShort ? 'font-medium text-red-700' : 'text-stone-500')}>
            Minimum stay is {listing.minDays} days.
          </p>
        </div> :

      <p className="mt-3 flex gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-800">
          <InfoIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          Renews every 30 days. End anytime with 7 days’ notice.
        </p>
      }

      {estimate && !tooShort &&
      <div className="mt-5">
          <div className="rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
            <p className="text-xs font-medium text-sand-800">Estimated monthly price</p>
            <p className="text-xl font-bold text-stone-900">{formatMoney(estimate.monthlyEstimate)}<span className="text-sm font-medium text-stone-500"> /mo incl. fees</span></p>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label={`${formatMoney(estimate.dailyRate, 2)} × ${estimate.days} days${estimate.ongoing ? ' (first period)' : ''}`} value={formatMoney(estimate.base, 2)} />
            <Row label="Service fee" value={formatMoney(estimate.serviceFee, 2)} />
            <Row label="Refundable deposit" value={formatMoney(estimate.deposit, 2)} />
            <div className="border-t border-stone-200 pt-2">
              <Row label="Due if accepted" value={formatMoney(estimate.dueToday, 2)} strong />
            </div>
          </dl>
        </div>
      }

      <Button type="submit" size="large" disabled={invalid || isOwn} className={cx(ui.btnBrand, 'mt-5 w-full')}>
        {isOwn ? 'This is your listing' : 'Request to book'}
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-500">
        <ShieldCheckIcon className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
        You won’t be charged until the host accepts
      </p>
    </form>);

}

function Row({ label, value, strong }: {label: string;value: string;strong?: boolean;}) {
  return (
    <div className={cx('flex justify-between gap-4', strong ? 'font-semibold text-stone-900' : 'text-stone-700')}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>);

}
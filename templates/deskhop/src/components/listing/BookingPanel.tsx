import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircleIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { useBooking } from '../../hooks/useBooking';
import type { Listing } from '../../types/listing';
import { formatMoney } from '../../utils/format';
import { getSpaceType } from '../../utils/lookup';
import { todayISO } from '../../utils/time';
import { BrandButton } from '../ui/BrandButton';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Stepper } from '../ui/Stepper';
import { Rating } from './Rating';

export function BookingPanel({ listing }: {listing: Listing;}) {
  const navigate = useNavigate();
  const b = useBooking(listing);
  const type = getSpaceType(listing.spaceType);
  const unitMany = type.unit.many.charAt(0).toUpperCase() + type.unit.many.slice(1);
  const ratio = listing.seats > 0 ? b.available / listing.seats : 0;
  const tone = b.available === 0 ? 'bg-red-500' : b.available <= 2 || ratio < 0.25 ? 'bg-amber-500' : 'bg-brand-600';
  const toneText =
  b.available === 0 ? 'text-red-700' : b.available <= 2 || ratio < 0.25 ? 'text-amber-700' : 'text-brand-700';

  function onBook(e: React.FormEvent) {
    e.preventDefault();
    if (b.error) return;
    const params = new URLSearchParams({
      date: b.date,
      mode: b.mode,
      start: b.start,
      end: b.end,
      seats: String(b.seats)
    });
    navigate(`/checkout/${listing.id}?${params.toString()}`);
  }

  return (
    <form
      id="booking"
      onSubmit={onBook}
      aria-label="Book this space"
      className="scroll-mt-24 rounded-2xl border border-line bg-white p-5 shadow-pop sm:p-6">
      
      <div className="flex items-baseline justify-between gap-3">
        <p>
          <span className="font-display text-2xl font-semibold">
            {formatMoney(b.mode === 'hour' ? listing.pricePerHour : listing.pricePerDay)}
          </span>
          <span className="text-sm text-ink-muted"> /{b.mode === 'hour' ? 'hour' : 'day'}</span>
        </p>
        <Rating value={listing.rating} count={listing.reviewCount} />
      </div>

      <div className="mt-5 space-y-4">
        <SegmentedControl
          label="Booking unit"
          value={b.mode}
          onChange={b.setMode}
          options={[
          { value: 'hour', label: `Hourly · ${formatMoney(listing.pricePerHour)}` },
          { value: 'day', label: `Full day · ${formatMoney(listing.pricePerDay)}` }]
          } />
        

        <div>
          <label htmlFor="booking-date" className="field-label">
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            min={todayISO()}
            value={b.date}
            onChange={(e) => e.target.value && b.setDate(e.target.value)}
            className="field" />
          
        </div>

        {b.mode === 'hour' ?
        <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-start" className="field-label">
                Start
              </label>
              <select
              id="booking-start"
              value={b.start}
              onChange={(e) => b.onStartChange(e.target.value)}
              disabled={b.isClosed}
              className="field">
              
                {b.startOptions.map((s) =>
              <option key={s} value={s}>
                    {s}
                  </option>
              )}
              </select>
            </div>
            <div>
              <label htmlFor="booking-end" className="field-label">
                End
              </label>
              <select
              id="booking-end"
              value={b.end}
              onChange={(e) => b.setEnd(e.target.value)}
              disabled={b.isClosed}
              className="field">
              
                {b.endOptions.map((s) =>
              <option key={s} value={s}>
                    {s}
                  </option>
              )}
              </select>
            </div>
          </div> :

        <p className="rounded-lg bg-mist px-3 py-2.5 text-sm text-ink-muted">
            {b.isClosed ? 'Closed on this day' : `Full day access · ${b.dayHours.open} – ${b.dayHours.close}`}
          </p>
        }

        <div className="rounded-xl border border-line p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p id="seats-label" className="text-sm font-semibold">
                {unitMany}
              </p>
              <p className="text-xs text-ink-muted">
                {type.bookBy === 'space' ? `Each fits up to ${listing.capacity} people` : '1 person per ' + type.unit.one}
              </p>
            </div>
            <Stepper
              label={unitMany}
              value={b.seats}
              min={1}
              max={Math.max(1, b.available)}
              onChange={b.setSeats} />
            
          </div>
          <div className="mt-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-mist" aria-hidden="true">
              <div className={`h-full rounded-full transition-all ${tone}`} style={{ width: `${Math.max(4, ratio * 100)}%` }} />
            </div>
            <p className={`mt-1.5 text-xs font-medium ${toneText}`} aria-live="polite">
              {b.isClosed ?
              'Closed on this day' :
              b.available === 0 ?
              'Fully booked for this slot' :
              `${b.available} of ${listing.seats} ${listing.seats === 1 ? type.unit.one : type.unit.many} left for this slot`}
            </p>
          </div>
        </div>
      </div>

      {b.error ?
      <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
          <AlertCircleIcon size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {b.error}
        </p> :

      <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">
              {formatMoney(b.quote.unitPrice)} × {b.quote.units} {b.quote.unitLabel} × {b.seats}{' '}
              {b.seats === 1 ? type.unit.one : type.unit.many}
            </dt>
            <dd className="tabular-nums">{formatMoney(b.quote.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">Service fee ({brand.serviceFeePercent}%)</dt>
            <dd className="tabular-nums">{formatMoney(b.quote.serviceFee)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(b.quote.total)}</dd>
          </div>
        </dl>
      }

      <BrandButton type="submit" size="large" fullWidth className="mt-5" disabled={!!b.error}>
        Book now
      </BrandButton>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
        {listing.instantBook ?
        <>
            <ZapIcon size={13} className="text-brand-700" aria-hidden="true" /> Instant confirmation · you won’t be charged yet
          </> :

        <>
            <ShieldCheckIcon size={13} className="text-brand-700" aria-hidden="true" /> Host confirms within 2 hours · charged on approval
          </>
        }
      </p>
    </form>);

}
import React from 'react';
import { AlertCircleIcon, ShieldCheckIcon } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { Stepper } from '../common/Stepper';
import { Rating } from '../common/Rating';
import { brand } from '../../data/brand';
import { BookingForm } from '../../hooks/useBookingForm';
import { Listing } from '../../types/marketplace';
import { formatHour, formatMoney, formatTimeRange, pluralize, todayKey } from '../../utils/format';

interface BookingPanelProps {
  listing: Listing;
  form: BookingForm;
  onBook: () => void;
}

export function BookingPanel({ listing, form, onBook }: BookingPanelProps) {
  const isOpenPlay = form.bookingType === 'openplay';
  const maxHours = Math.min(listing.maxHours, form.startHour !== null ? listing.hours.close - form.startHour : listing.maxHours);

  return (
    <div className="card p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <p>
          <span className="font-display text-4xl font-bold">{formatMoney(isOpenPlay && listing.openPlay ? listing.openPlay.pricePerSeat : listing.pricePerHour)}</span>
          <span className="text-sm text-slate-500"> /{isOpenPlay ? 'seat' : 'hour'}</span>
        </p>
        <Rating rating={listing.rating} reviewCount={listing.reviewCount || undefined} />
      </div>

      {listing.openPlay &&
      <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1" role="radiogroup" aria-label="Booking type">
          {(['private', 'openplay'] as const).map((type) =>
        <button
          key={type}
          type="button"
          role="radio"
          aria-checked={form.bookingType === type}
          onClick={() => form.setBookingType(type)}
          className={`rounded-lg py-2 text-sm font-semibold transition-colors ${form.bookingType === type ? 'bg-white text-ink shadow-sm' : 'text-slate-600 hover:text-ink'}`}>
          
              {type === 'private' ? 'Private court' : 'Open-play seats'}
            </button>
        )}
        </div>
      }

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="bp-date" className="field-label">Date</label>
          <input id="bp-date" type="date" className="field" value={form.dateKey} min={todayKey()} onChange={(e) => e.target.value && form.setDateKey(e.target.value)} />
        </div>

        {!isOpenPlay ?
        <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bp-start" className="field-label">Start time</label>
              <select id="bp-start" className="field" value={form.startHour ?? ''} onChange={(e) => e.target.value !== '' && form.selectStart(Number(e.target.value))}>
                <option value="" disabled>Select</option>
                {form.slots.map((s) =>
              <option key={s.hour} value={s.hour} disabled={s.status !== 'available'}>
                    {formatHour(s.hour)}
                    {s.status !== 'available' ? ` · ${s.status === 'openplay' ? 'open play' : s.status === 'past' ? 'passed' : 'booked'}` : ''}
                  </option>
              )}
              </select>
            </div>
            <Stepper label="Hours" value={form.hours} min={listing.minHours} max={Math.max(listing.minHours, maxHours)} onChange={form.setHours} formatValue={(v) => pluralize(v, 'hr')} />
          </div> :

        <fieldset>
            <legend className="field-label">Session</legend>
            {form.sessions.length ?
          <div className="space-y-2" role="radiogroup" aria-label="Open-play sessions">
                {form.sessions.map((s) => {
              const selected = form.selectedSession?.id === s.id;
              const disabled = s.isPast || s.seatsLeft === 0;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={disabled}
                  onClick={() => form.selectSession(s.id)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  selected ? 'border-brand bg-brand-soft ring-1 ring-brand' : 'border-slate-200 hover:border-brand'}`
                  }>
                  
                      <span>
                        <span className="block text-sm font-semibold">{formatTimeRange(s.startHour, s.durationHours)}</span>
                        <span className="block text-xs text-slate-600">{s.level}</span>
                      </span>
                      <span className={`text-xs font-semibold ${s.seatsLeft === 0 ? 'text-red-600' : s.seatsLeft <= 2 ? 'text-amber-700' : 'text-brand-dark'}`}>
                        {s.isPast ? 'Started' : s.seatsLeft === 0 ? 'Full' : `${s.seatsLeft} of ${s.seatsTotal} left`}
                      </span>
                    </button>);

            })}
              </div> :

          <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">No open-play sessions on this date.</p>
          }
            {form.selectedSession &&
          <div className="mt-3">
                <Stepper label="Seats" value={form.seats} min={1} max={form.maxSeats} onChange={form.setSeats} formatValue={(v) => pluralize(v, 'seat')} />
              </div>
          }
          </fieldset>
        }

        {listing.addOns.length > 0 &&
        <fieldset>
            <legend className="field-label">Add-ons</legend>
            <div className="space-y-2">
              {listing.addOns.map((addOn) =>
            <div key={addOn.id} className="flex items-center justify-between gap-3">
                  <Checkbox label={addOn.label} checked={form.addOnIds.includes(addOn.id)} onChange={() => form.toggleAddOn(addOn.id)} />
                  <span className="shrink-0 text-sm text-slate-600">
                    {formatMoney(addOn.price)}
                    {addOn.per === 'hour' ? '/hr' : ''}
                  </span>
                </div>
            )}
            </div>
          </fieldset>
        }
      </div>

      <dl className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
        {form.quote.lines.map((line) =>
        <div key={line.label} className="flex justify-between gap-3">
            <dt className="text-slate-600">{line.label}</dt>
            <dd>{formatMoney(line.amount)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-3">
          <dt className="text-slate-600">Service fee</dt>
          <dd>{formatMoney(form.quote.fee)}</dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-slate-100 pt-3 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatMoney(form.quote.total)}</dd>
        </div>
      </dl>

      {form.error &&
      <p className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900" role="status">
          <AlertCircleIcon size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {form.error}
        </p>
      }
      <button type="button" onClick={onBook} disabled={!form.draft} className="btn btn-primary btn-lg mt-4 w-full">
        {isOpenPlay ? 'Book seats' : 'Book court'}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <ShieldCheckIcon size={14} aria-hidden="true" /> Free cancellation up to {brand.freeCancellationHours} hours before
      </p>
    </div>);

}
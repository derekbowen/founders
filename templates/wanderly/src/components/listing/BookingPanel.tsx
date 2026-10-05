import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarXIcon, LockIcon, ShieldCheckIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../ui/Button';
import { Counter } from '../ui/Counter';
import { StarRating } from '../ui/StarRating';
import { useBooking } from '../../hooks/useBooking';
import type { Experience } from '../../types/marketplace';
import { formatDate, formatPrice, formatTime, pluralize } from '../../utils/format';

interface BookingPanelProps {
  experience: Experience;
  initialDate?: string;
  initialGuests?: number;
}

export function BookingPanel({ experience, initialDate, initialGuests }: BookingPanelProps) {
  const navigate = useNavigate();
  const b = useBooking(experience, initialDate, initialGuests);

  return (
    <div id="booking" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-float">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-slate-900">
          <span className="font-display text-2xl font-bold">{formatPrice(experience.pricePerPerson)}</span>
          <span className="text-sm text-slate-600"> / person</span>
        </p>
        <StarRating rating={experience.rating} count={experience.reviewCount} />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-900">Choose a date</h3>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none" role="radiogroup" aria-label="Date">
          {b.dates.map((d) => {
            const active = d === b.date;
            return (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => b.setDate(d)}
                className={twMerge(
                  'flex w-14 shrink-0 flex-col items-center rounded-xl border py-2 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  active ? 'border-accent-700 bg-accent-700 text-white' : 'border-slate-200 text-slate-700 hover:border-slate-400'
                )}>
                
                <span className={twMerge('text-[11px] font-medium uppercase', active ? 'text-accent-100' : 'text-slate-500')}>{formatDate(d, 'EEE')}</span>
                <span className="text-lg font-semibold leading-tight">{formatDate(d, 'd')}</span>
                <span className={twMerge('text-[11px]', active ? 'text-accent-100' : 'text-slate-500')}>{formatDate(d, 'MMM')}</span>
              </button>);

          })}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-900">Departure time</h3>
        <div className="mt-3 grid gap-2" role="radiogroup" aria-label="Departure time">
          {b.departures.every((d) => d.seatsLeft === 0) &&
          <p className="flex items-center gap-2 rounded-xl bg-sand-100 px-3 py-3 text-sm text-slate-700">
              <CalendarXIcon className="h-4 w-4 text-primary-600" aria-hidden />
              Fully booked on this date — try another day.
            </p>
          }
          {b.departures.map((d) => {
            const soldOut = d.seatsLeft === 0;
            const active = b.time === d.time;
            return (
              <button
                key={d.time}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={soldOut}
                onClick={() => b.setTime(d.time)}
                className={twMerge(
                  'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  active ? 'border-accent-700 bg-accent-50 ring-1 ring-accent-700' : 'border-slate-200 hover:border-slate-400',
                  soldOut && 'cursor-not-allowed bg-slate-50 opacity-60 hover:border-slate-200'
                )}>
                
                <span className="font-semibold text-slate-900">{formatTime(d.time)}</span>
                <span className={twMerge('text-xs font-semibold', soldOut ? 'text-slate-500' : d.seatsLeft <= 3 ? 'text-primary-700' : 'text-accent-700')}>
                  {soldOut ? 'Sold out' : d.seatsLeft <= 3 ? `Only ${pluralize(d.seatsLeft, 'seat')} left` : `${d.seatsLeft} seats left`}
                </span>
              </button>);

          })}
        </div>
      </div>

      <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
        <Counter
          label="Guests"
          description={`Min ${experience.minGuests} · max ${b.maxGuests}`}
          value={b.guests}
          min={experience.minGuests}
          max={Math.max(experience.minGuests, b.maxGuests)}
          onChange={b.setGuests} />
        
        <label className={twMerge('flex items-start gap-3 rounded-xl border border-slate-200 p-3', b.privateAvailable ? 'cursor-pointer hover:border-slate-400' : 'cursor-not-allowed opacity-60')}>
          <input
            type="checkbox"
            checked={b.privateGroup}
            disabled={!b.privateAvailable}
            onChange={(e) => b.setPrivateGroup(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[rgb(var(--color-accent-700))]" />
          
          <span className="flex-1">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              <LockIcon className="h-3.5 w-3.5" aria-hidden />
              Book as a private group
            </span>
            <span className="block text-xs text-slate-600">
              {b.privateAvailable ?
              `Just your group, up to ${experience.maxGuests} guests · ${formatPrice(experience.privateGroupPrice)} flat` :
              'Available only for departures with no other bookings'}
            </span>
          </span>
        </label>
      </div>

      <dl className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm">
        <div className="flex justify-between text-slate-700">
          <dt>{b.privateGroup ? 'Private group' : `${formatPrice(experience.pricePerPerson)} × ${pluralize(b.guests, 'guest')}`}</dt>
          <dd>{formatPrice(b.price.subtotal, true)}</dd>
        </div>
        <div className="flex justify-between text-slate-700">
          <dt>Service fee</dt>
          <dd>{formatPrice(b.price.serviceFee, true)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
          <dt>Total</dt>
          <dd>{formatPrice(b.price.total, true)}</dd>
        </div>
      </dl>

      <Button size="lg" fullWidth className="mt-5" disabled={!b.canBook} onClick={() => navigate(b.checkoutUrl)}>
        Book experience
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-600">
        <ShieldCheckIcon className="h-3.5 w-3.5 text-accent-700" aria-hidden />
        Free cancellation up to 24 hours before
      </p>
    </div>);

}
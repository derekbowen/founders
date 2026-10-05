import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleAlertIcon, ShieldCheckIcon, StarIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Counter } from '../ui/Counter';
import { ServiceIcon } from '../ui/ServiceIcon';
import { timeSlots } from '../../data/services';
import type { BookingForm } from '../../hooks/useBookingForm';
import type { Listing } from '../../types/marketplace';
import { cn } from '../../utils/cn';
import { formatMoney, toInputDate } from '../../utils/format';
import { getService } from '../../utils/pricing';

interface BookingPanelProps {
  listing: Listing;
  form: BookingForm;
}

export function BookingPanel({ listing, form }: BookingPanelProps) {
  const navigate = useNavigate();
  const today = toInputDate(new Date());
  const labelCls = 'block text-xs font-extrabold uppercase tracking-wide text-stone-500';
  const inputCls =
  'mt-1 h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-[15px] font-bold text-stone-900 hover:border-stone-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ready) return;
    navigate(`/checkout/${listing.id}?${form.checkoutQuery()}`);
  };

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-stone-100" aria-label="Book this sitter">
      <div className="flex items-end justify-between">
        <p className="text-stone-500">
          <span className="text-2xl font-black text-stone-900">{formatMoney(form.variation.price)}</span> / {form.service.unitLabel}
        </p>
        <p className="flex items-center gap-1 text-sm font-bold text-stone-800">
          <StarIcon className="h-4 w-4 fill-primary-400 text-primary-400" aria-hidden="true" />
          {listing.rating.toFixed(2)} <span className="font-medium text-stone-500">· {listing.reviewCount} reviews</span>
        </p>
      </div>

      <fieldset className="mt-5">
        <legend className={labelCls}>Service</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {listing.services.map((o) => {
            const s = getService(o.serviceId);
            const selected = o.serviceId === form.serviceId;
            return (
              <label
                key={o.serviceId}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-colors',
                  selected ? 'border-primary-500 bg-primary-50 text-stone-900' : 'border-stone-200 text-stone-600 hover:border-stone-300'
                )}>
                
                <input type="radio" name="booking-service" className="sr-only" checked={selected} onChange={() => form.setServiceId(o.serviceId)} />
                <ServiceIcon id={o.serviceId} className={cn('h-4 w-4 shrink-0', selected ? 'text-primary-700' : 'text-stone-400')} />
                <span className="leading-tight">{s.label}</span>
              </label>);

          })}
        </div>
      </fieldset>

      {form.offering.variations.length > 1 &&
      <fieldset className="mt-4">
          <legend className={labelCls}>Option</legend>
          <div className="mt-2 space-y-2">
            {form.offering.variations.map((v) => {
            const selected = v.id === form.variationId;
            return (
              <label
                key={v.id}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-xl border-2 px-3 py-2.5 text-sm transition-colors',
                  selected ? 'border-primary-500 bg-primary-50' : 'border-stone-200 hover:border-stone-300'
                )}>
                
                  <input type="radio" name="booking-variation" className="sr-only" checked={selected} onChange={() => form.setVariationId(v.id)} />
                  <span className="font-bold text-stone-800">{v.label}</span>
                  <span className="font-extrabold text-stone-900">{formatMoney(v.price)}</span>
                </label>);

          })}
          </div>
        </fieldset>
      }

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="bp-start" className={labelCls}>
            {form.isNight ? 'Drop-off' : 'Date'}
          </label>
          <input id="bp-start" type="date" min={today} value={form.start} onChange={(e) => form.setStart(e.target.value)} className={inputCls} />
        </div>
        {form.isNight ?
        <div>
            <label htmlFor="bp-end" className={labelCls}>
              Pick-up
            </label>
            <input id="bp-end" type="date" min={form.start || today} value={form.end} onChange={(e) => form.setEnd(e.target.value)} className={inputCls} />
          </div> :

        <div>
            <label htmlFor="bp-time" className={labelCls}>
              Start time
            </label>
            <select id="bp-time" value={form.time} onChange={(e) => form.setTime(e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {timeSlots.map((t) =>
            <option key={t} value={t}>
                  {t}
                </option>
            )}
            </select>
          </div>
        }
      </div>

      <div className="mt-5 border-t border-stone-100 pt-5">
        <Counter
          label="Pets"
          value={form.pets}
          min={1}
          max={listing.maxPets}
          onChange={form.setPets}
          hint={`Up to ${listing.maxPets} · +${formatMoney(form.offering.extraPetPrice)} each extra`} />
        
      </div>

      {form.error &&
      <p className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700" role="alert">
          <CircleAlertIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {form.error}
        </p>
      }

      {form.breakdown ?
      <dl className="mt-5 space-y-2.5 border-t border-stone-100 pt-5 text-[15px]">
          {form.breakdown.lines.map((line) =>
        <div key={line.label} className="flex justify-between gap-3">
              <dt className="text-stone-600">{line.label}</dt>
              <dd className="font-semibold text-stone-900">{formatMoney(line.amount)}</dd>
            </div>
        )}
          <div className="flex justify-between gap-3">
            <dt className="text-stone-600">Service fee</dt>
            <dd className="font-semibold text-stone-900">{formatMoney(form.breakdown.serviceFee)}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-stone-100 pt-3 text-base">
            <dt className="font-extrabold text-stone-900">Total</dt>
            <dd className="font-black text-stone-900">{formatMoney(form.breakdown.total)}</dd>
          </div>
        </dl> :

      !form.error &&
      <p className="mt-5 rounded-xl bg-stone-50 px-3 py-2.5 text-sm font-semibold text-stone-600">
            {form.isNight ? 'Add drop-off and pick-up dates to see the total price.' : 'Choose a date and time to see the total price.'}
          </p>

      }

      <Button type="submit" size="lg" fullWidth className="mt-5" disabled={!form.ready}>
        Request to book
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-stone-500">
        <ShieldCheckIcon className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
        You won’t be charged until {listing.sitter.firstName} accepts
      </p>
    </form>);

}
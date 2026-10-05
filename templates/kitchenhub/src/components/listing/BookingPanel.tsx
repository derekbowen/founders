import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { InfoIcon, MinusIcon, PlusIcon } from 'lucide-react';
import type { Listing, StorageType } from '../../types/marketplace';
import { formatHour, formatMoney, todayISO } from '../../utils/format';
import { durationOptions, startHourOptions, storageLabel } from '../../utils/listings';
import { calcBreakdown } from '../../utils/pricing';
import { toggleValue } from '../../utils/search';
import { cn, focusRing, inputClass } from '../../utils/styles';
import { Button } from '../ui/Button';
import { CheckboxField } from '../ui/CheckboxField';
import { Field } from '../ui/Field';
import { StarRating } from '../ui/StarRating';
import { PriceBreakdownList } from './PriceBreakdownList';

export function BookingPanel({ listing }: {listing: Listing;}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const startOptions = startHourOptions(listing);
  const [date, setDate] = useState(params.get('date') ?? '');
  const [start, setStart] = useState(startOptions.includes(9) ? 9 : startOptions[0]);
  const [hours, setHours] = useState(Math.max(listing.minHours, Number(params.get('hours')) || listing.minHours));
  const [storage, setStorage] = useState<StorageType[]>([]);
  const [error, setError] = useState('');

  const durations = durationOptions(listing, start);
  const maxHours = durations[durations.length - 1] ?? listing.minHours;
  const effectiveHours = Math.min(Math.max(hours, listing.minHours), maxHours);
  const breakdown = calcBreakdown(listing, effectiveHours, storage);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError('Choose a date to continue');
      return;
    }
    const q = new URLSearchParams({ date, start: String(start), hours: String(effectiveHours) });
    if (storage.length) q.set('storage', storage.join(','));
    navigate(`/checkout/${listing.id}?${q.toString()}`);
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-steel-200 bg-white p-6 shadow-lift" aria-label="Book this kitchen">
      <div className="flex items-baseline justify-between">
        <p>
          <span className="font-heading text-3xl font-bold text-steel-900">{formatMoney(listing.pricePerHour)}</span>
          <span className="text-steel-500"> / hour</span>
        </p>
        <StarRating rating={listing.rating} count={listing.reviewCount} />
      </div>

      <div className="mt-5 space-y-4">
        <Field label="Date" htmlFor="book-date" error={error}>
          <input
            id="book-date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setError('');
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'book-date-error' : undefined}
            className={cn(inputClass, error && 'border-primary')} />
          
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start time" htmlFor="book-start">
            <select id="book-start" value={start} onChange={(e) => setStart(Number(e.target.value))} className={inputClass}>
              {startOptions.map((h) =>
              <option key={h} value={h}>{formatHour(h)}</option>
              )}
            </select>
          </Field>
          <div>
            <span className="mb-1.5 block text-sm font-medium text-steel-800" id="book-hours-label">Hours</span>
            <div className="flex h-[42px] items-center justify-between rounded-lg border border-steel-300 px-1.5" role="group" aria-labelledby="book-hours-label">
              <button
                type="button"
                onClick={() => setHours(Math.max(listing.minHours, effectiveHours - 1))}
                disabled={effectiveHours <= listing.minHours}
                aria-label="Fewer hours"
                className={cn('grid h-8 w-8 place-items-center rounded-md text-steel-700 hover:bg-steel-100 disabled:opacity-30', focusRing)}>
                
                <MinusIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="text-sm font-semibold text-steel-900" aria-live="polite">{effectiveHours}h</span>
              <button
                type="button"
                onClick={() => setHours(Math.min(maxHours, effectiveHours + 1))}
                disabled={effectiveHours >= maxHours}
                aria-label="More hours"
                className={cn('grid h-8 w-8 place-items-center rounded-md text-steel-700 hover:bg-steel-100 disabled:opacity-30', focusRing)}>
                
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-steel-500">
          <InfoIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {listing.minHours}-hour minimum · Session ends {formatHour(start + effectiveHours)}
        </p>

        {listing.storage.length > 0 &&
        <fieldset className="rounded-xl bg-steel-50 p-4">
            <legend className="sr-only">Storage add-ons</legend>
            <p className="mb-1 text-sm font-semibold text-steel-900">Storage add-ons <span className="font-normal text-steel-500">· billed monthly</span></p>
            {listing.storage.map((s) =>
          <CheckboxField
            key={s.type}
            id={`book-storage-${s.type}`}
            checked={storage.includes(s.type)}
            onChange={() => setStorage((cur) => toggleValue(cur, s.type))}
            label={storageLabel(s.type)}
            description={s.capacity}
            trailing={`${formatMoney(s.monthlyPrice)}/mo`} />

          )}
          </fieldset>
        }
      </div>

      <div className="mt-5 border-t border-steel-200 pt-4">
        <PriceBreakdownList breakdown={breakdown} />
      </div>

      <Button type="submit" size="lg" fullWidth className="mt-5">
        Request to book
      </Button>
      <p className="mt-3 text-center text-xs text-steel-500">You won’t be charged until the host accepts.</p>
    </form>);

}
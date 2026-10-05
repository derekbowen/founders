import React from 'react';
import { format } from 'date-fns';
import { MinusIcon, PlusIcon, ShieldCheckIcon, StarIcon } from 'lucide-react';
import { Button } from '../Button';
import { Select } from '../Select';
import { getOpenHours, getUpcomingDays, toDateKey } from '../../utils/availability';
import { formatHour, formatMoney, pluralize } from '../../utils/format';
import { getSubjectName } from '../../utils/tutors';
import { brandButton } from '../../utils/buttonStyles';
import type { BookingState } from '../../hooks/useBooking';
import type { SubjectId, Tutor } from '../../types/marketplace';

interface BookingPanelProps {
  tutor: Tutor;
  booking: BookingState;
  onBook: () => void;
  isOwnListing?: boolean;
}

export function BookingPanel({ tutor, booking, onBook, isOwnListing = false }: BookingPanelProps) {
  const days = getUpcomingDays(14);
  const { price } = booking;
  const packageOptions = [{ lessons: 1, discountPercent: 0 }, ...tutor.packages];

  return (
    <div id="booking-panel" className="scroll-mt-24 rounded-3xl border border-ink-200 bg-white p-5 shadow-lift sm:p-6">
      <div className="flex items-end justify-between">
        <p>
          <span className="text-2xl font-semibold text-ink-900">{formatMoney(tutor.hourlyRate)}</span>
          <span className="text-ink-500"> / hour</span>
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-ink-800">
          <StarIcon size={14} className="fill-accent-400 text-accent-500" aria-hidden="true" />
          {tutor.rating.toFixed(2)} · {tutor.reviewCount} reviews
        </span>
      </div>

      <div className="mt-5 space-y-5">
        <Select
          label="Subject"
          value={booking.subject}
          options={tutor.subjects.map((s) => ({ value: s.subject, label: getSubjectName(s.subject) }))}
          onChange={(v) => booking.setSubject(v as SubjectId)} />
        

        <div>
          <p className="mb-2 text-sm font-medium text-ink-800" id="date-label">Date</p>
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-none" role="listbox" aria-labelledby="date-label">
            {days.map((d) => {
              const key = toDateKey(d);
              const available = getOpenHours(tutor, d).length > 0;
              const selected = key === booking.dateKey;
              return (
                <button
                  key={key}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={!available}
                  onClick={() => booking.selectDate(key)}
                  className={`flex w-14 shrink-0 flex-col items-center rounded-xl border py-2 text-xs transition disabled:cursor-not-allowed disabled:border-ink-100 disabled:bg-ink-50 disabled:text-ink-400 ${
                  selected ?
                  'border-primary-600 bg-primary-600 text-white' :
                  'border-ink-200 text-ink-700 hover:border-primary-400'}`
                  }>
                  
                  <span>{format(d, 'EEE')}</span>
                  <span className="text-base font-semibold">{format(d, 'd')}</span>
                </button>);

            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink-800">
            Start time <span className="font-normal text-ink-500">· {format(booking.date, 'EEEE, MMM d')}</span>
          </p>
          {booking.openHours.length === 0 ?
          <p className="rounded-xl bg-ink-50 p-3 text-sm text-ink-600">No open times this day — try another date.</p> :

          <div className="grid grid-cols-3 gap-1.5">
              {booking.openHours.map((h) =>
            <button
              key={h}
              type="button"
              aria-pressed={booking.startHour === h}
              onClick={() => booking.selectStart(h)}
              className={`rounded-lg border py-2 text-sm font-medium transition ${
              booking.startHour === h ?
              'border-accent-500 bg-accent-400 text-ink-900' :
              'border-ink-200 text-ink-800 hover:border-primary-400 hover:text-primary-700'}`
              }>
              
                  {formatHour(h)}
                </button>
            )}
            </div>
          }
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-ink-800">Number of hours</p>
            <p className="text-xs text-ink-500">
              {booking.maxHours > 1 ? `Up to ${booking.maxHours} hours available` : 'Only 1 hour open at this time'}
            </p>
          </div>
          <div className="flex items-center gap-2" role="group" aria-label="Number of hours">
            <button
              type="button"
              onClick={() => booking.setHours(booking.hours - 1)}
              disabled={booking.hours <= 1}
              aria-label="Fewer hours"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-40">
              
              <MinusIcon size={16} />
            </button>
            <span className="w-6 text-center font-semibold text-ink-900" aria-live="polite">{booking.hours}</span>
            <button
              type="button"
              onClick={() => booking.setHours(booking.hours + 1)}
              disabled={booking.hours >= booking.maxHours}
              aria-label="More hours"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:bg-ink-50 disabled:opacity-40">
              
              <PlusIcon size={16} />
            </button>
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink-800">Lesson package</legend>
          <div className="grid gap-2">
            {packageOptions.map((p) => {
              const selected = booking.packageLessons === p.lessons;
              return (
                <label
                  key={p.lessons}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                  selected ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-ink-200 hover:border-primary-300'}`
                  }>
                  
                  <span className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="package"
                      checked={selected}
                      onChange={() => booking.setPackageLessons(p.lessons)}
                      className="h-4 w-4 accent-[rgb(var(--color-primary-600))]" />
                    
                    <span className="text-sm font-medium text-ink-900">
                      {p.lessons === 1 ? 'Single lesson' : `${p.lessons}-lesson package`}
                    </span>
                  </span>
                  {p.discountPercent > 0 &&
                  <span className="rounded-full bg-accent-300 px-2 py-0.5 text-xs font-semibold text-ink-900">
                      Save {p.discountPercent}%
                    </span>
                  }
                </label>);

            })}
          </div>
        </fieldset>

        <dl className="space-y-2 border-t border-ink-200 pt-4 text-sm">
          <div className="flex justify-between text-ink-700">
            <dt>{formatMoney(price.rate)} × {pluralize(price.hours, 'hour')}{price.lessons > 1 && ` × ${price.lessons} lessons`}</dt>
            <dd>{formatMoney(price.subtotal)}</dd>
          </div>
          {price.discount > 0 &&
          <div className="flex justify-between text-green-700">
              <dt>Package discount ({price.discountPercent}%)</dt>
              <dd>−{formatMoney(price.discount)}</dd>
            </div>
          }
          <div className="flex justify-between text-ink-700">
            <dt>Service fee</dt>
            <dd>{formatMoney(price.serviceFee)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink-200 pt-3 text-base font-semibold text-ink-900">
            <dt>Total</dt>
            <dd>{formatMoney(price.total)}</dd>
          </div>
        </dl>

        <Button
          size="large"
          className={`w-full ${brandButton.primary}`}
          disabled={!booking.isValid || isOwnListing}
          onClick={onBook}>
          
          {isOwnListing ? 'This is your listing' : booking.isValid ? 'Book lesson' : 'Select a start time'}
        </Button>
        <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-500">
          <ShieldCheckIcon size={16} className="shrink-0 text-primary-600" aria-hidden="true" />
          You won't be charged until {tutor.firstName} accepts. Free cancellation up to 24 hours before the lesson.
        </p>
      </div>
    </div>);

}
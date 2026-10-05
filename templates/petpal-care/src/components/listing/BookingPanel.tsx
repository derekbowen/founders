import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, MinusIcon, PlusIcon, ShieldCheckIcon } from 'lucide-react';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { ServiceIcon } from '../common/ServiceIcon';
import { StarRating } from '../common/StarRating';
import { useBooking } from '../../hooks/useBooking';
import { getServiceMeta, isDateBlocked } from '../../utils/listing';
import { formatLongDate, formatMoney, formatShortDate, formatTime, pluralize } from '../../utils/format';
import { sessionTimes } from '../../data/services';
import type { Listing } from '../../types/listing';

export function BookingPanel({ listing }: {listing: Listing;}) {
  const b = useBooking(listing);
  const navigate = useNavigate();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const minPrice = Math.min(...b.service.variants.map((v) => v.price));

  const dateLabel = b.isNightly ?
  b.start && b.end ?
  `${formatShortDate(b.start)} – ${formatShortDate(b.end)}` :
  b.start ?
  `${formatShortDate(b.start)} – pick-up date` :
  'Add drop-off & pick-up' :
  b.start ?
  formatLongDate(b.start) :
  'Choose a date';

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-end justify-between">
        <p className="text-sm text-ink-600">
          From <span className="text-2xl font-black text-ink-900">{formatMoney(minPrice)}</span> / {b.meta.unitLabel}
        </p>
        <StarRating rating={listing.rating} count={listing.reviewCount} />
      </div>

      {/* Service */}
      <fieldset className="mt-5">
        <legend className="field-label">Service</legend>
        <div className="grid grid-cols-2 gap-2">
          {listing.services.map((s) => {
            const active = b.serviceId === s.serviceId;
            return (
              <button
                key={s.serviceId}
                type="button"
                aria-pressed={active}
                onClick={() => b.setServiceId(s.serviceId)}
                className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                active ? 'border-primary-500 bg-primary-50 text-ink-900' : 'border-ink-200 text-ink-700 hover:border-ink-400'}`
                }>
                
                <ServiceIcon serviceId={s.serviceId} />
                {getServiceMeta(s.serviceId)?.name}
              </button>);

          })}
        </div>
      </fieldset>

      {/* Price variation */}
      {b.service.variants.length > 1 &&
      <fieldset className="mt-4">
          <legend className="field-label">Option</legend>
          <div className="space-y-2">
            {b.service.variants.map((v) => {
            const active = b.variantId === v.id;
            return (
              <label
                key={v.id}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-2.5 transition ${active ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-ink-400'}`}>
                
                  <input type="radio" name="variant" checked={active} onChange={() => b.setVariantId(v.id)} className="h-4 w-4 accent-primary-600" />
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-ink-900">{v.label}</span>
                    <span className="block text-xs text-ink-600">{v.description}</span>
                  </span>
                  <span className="text-sm font-black text-ink-900">{formatMoney(v.price)}</span>
                </label>);

          })}
          </div>
        </fieldset>
      }

      {/* Dates */}
      <div className="mt-4">
        <span className="field-label">{b.isNightly ? 'Dates' : 'Date'}</span>
        <button
          type="button"
          onClick={() => setCalendarOpen((o) => !o)}
          aria-expanded={calendarOpen}
          className="flex w-full items-center gap-2 rounded-2xl border border-ink-200 px-3.5 py-3 text-left text-sm font-bold text-ink-900 transition hover:border-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          
          <CalendarIcon className="h-4 w-4 text-ink-500" aria-hidden="true" />
          <span className={b.start ? '' : 'text-ink-500'}>{dateLabel}</span>
        </button>
        <AnimatePresence initial={false}>
          {calendarOpen &&
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-3 rounded-2xl border border-ink-200 p-3">
                <AvailabilityCalendar
                isBlocked={(d) => isDateBlocked(listing, d)}
                rangeStart={b.start}
                rangeEnd={b.end}
                onDayClick={(d) => {
                  b.handleDayClick(d);
                  if (!b.isNightly || b.start && !b.end) setCalendarOpen(false);
                }} />
              
                <div className="mt-2 flex items-center justify-between text-xs text-ink-600">
                  <span>{b.isNightly ? b.start && !b.end ? 'Now pick your pick-up date' : 'Select drop-off date' : 'Select a date'}</span>
                  {b.start &&
                <button type="button" onClick={b.clearDates} className="font-bold text-ink-800 underline">
                      Clear
                    </button>
                }
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Session time */}
      {!b.isNightly &&
      <fieldset className="mt-4">
          <legend className="field-label flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" aria-hidden="true" /> Session start time
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {sessionTimes.map((t) =>
          <button key={t} type="button" aria-pressed={b.sessionTime === t} onClick={() => b.setSessionTime(t)} className={`rounded-xl border py-2 text-sm font-bold transition ${b.sessionTime === t ? 'border-primary-500 bg-primary-50 text-ink-900' : 'border-ink-200 text-ink-700 hover:border-ink-400'}`}>
                {formatTime(t)}
              </button>
          )}
          </div>
        </fieldset>
      }

      {/* Pets */}
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-ink-200 px-3.5 py-2.5">
        <div>
          <p className="text-sm font-bold text-ink-900">Number of pets</p>
          <p className="text-xs text-ink-600">Up to {listing.maxPets} · +{formatMoney(b.service.extraPetFee)} per extra pet</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => b.setPets(Math.max(1, b.pets - 1))} disabled={b.pets <= 1} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 hover:border-ink-400 disabled:opacity-40" aria-label="Fewer pets">
            <MinusIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-4 text-center font-black" aria-live="polite">
            {b.pets}
          </span>
          <button type="button" onClick={() => b.setPets(Math.min(listing.maxPets, b.pets + 1))} disabled={b.pets >= listing.maxPets} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 hover:border-ink-400 disabled:opacity-40" aria-label="More pets">
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Breakdown */}
      {b.breakdown &&
      <dl className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
          {b.breakdown.lineItems.map((li) =>
        <div key={li.label} className="flex justify-between gap-3">
              <dt className="text-ink-700">{li.label}</dt>
              <dd className="font-bold text-ink-900">{formatMoney(li.amount, true)}</dd>
            </div>
        )}
          <div className="flex justify-between">
            <dt className="text-ink-700">Service fee</dt>
            <dd className="font-bold text-ink-900">{formatMoney(b.breakdown.serviceFee, true)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink-100 pt-3 text-base">
            <dt className="font-extrabold text-ink-900">Total</dt>
            <dd className="font-black text-ink-900">{formatMoney(b.breakdown.total, true)}</dd>
          </div>
        </dl>
      }

      <button type="button" disabled={!b.ready} onClick={() => navigate(b.checkoutUrl)} className="btn btn-lg btn-primary mt-5 w-full">
        Request to book
      </button>
      <p className="mt-2 text-center text-xs text-ink-600">
        {b.ready ?
        'You won’t be charged until the sitter accepts.' :
        b.isNightly ?
        'Select your dates to see the total.' :
        `Choose a date and time · ${pluralize(1, b.meta.unitLabel)}`}
      </p>
      <p className="mt-4 flex items-start gap-2 rounded-2xl bg-accent-50 p-3 text-xs text-accent-900">
        <ShieldCheckIcon className="h-4 w-4 shrink-0 text-accent-700" aria-hidden="true" />
        Every booking includes reservation protection, vetted sitters and 24/7 support.
      </p>
    </div>);

}
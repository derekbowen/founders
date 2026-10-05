import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, PackageIcon, ShieldCheckIcon, SparklesIcon, StoreIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import type { DeliveryMethod, Listing, RentalDays } from '../../types/marketplace';
import { formatMoney, isoDate, longDate, shortDate } from '../../utils/format';
import { getBreakdown, isWindowAvailable, rentalWindow, savingsPercent } from '../../utils/pricing';
import { btn, cx } from '../../utils/styles';
import { AvailabilityCalendar } from './AvailabilityCalendar';
import { SizeCheck } from './SizeCheck';

interface BookingPanelProps {
  listing: Listing;
  days: RentalDays;
  setDays: (d: RentalDays) => void;
  eventDate: Date | null;
  setEventDate: (d: Date | null) => void;
}

export function BookingPanel({ listing, days, setDays, eventDate, setEventDate }: BookingPanelProps) {
  const navigate = useNavigate();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [usualSize, setUsualSize] = useState('');
  const [delivery, setDelivery] = useState<DeliveryMethod>(listing.delivery[0]);
  const [error, setError] = useState('');

  const valid = eventDate ? isWindowAvailable(listing, eventDate, days) : false;
  const breakdown = getBreakdown(listing, days, delivery);
  const window = eventDate ? rentalWindow(eventDate, days) : null;

  const changeDays = (d: RentalDays) => {
    setDays(d);
    if (eventDate && !isWindowAvailable(listing, eventDate, d)) {
      setError(`Those dates aren’t free for a ${d}-day rental. Pick another event date.`);
    } else setError('');
  };

  const rent = () => {
    if (!eventDate) {
      setError('Choose your event date to continue.');
      setCalendarOpen(true);
      return;
    }
    if (!valid) {
      setError('This dress isn’t available for those dates.');
      return;
    }
    navigate(
      `/checkout/${listing.id}?event=${isoDate(eventDate)}&days=${days}&delivery=${delivery}`
    );
  };

  return (
    <div className="border border-line bg-paper p-5 md:p-6">
      <div className="flex items-baseline justify-between">
        <p>
          <span className="font-display text-3xl text-ink">{formatMoney(breakdown.rental)}</span>
          <span className="text-sm text-muted"> / {days} days</span>
        </p>
        <p className="text-xs text-muted">
          Retail <span className="line-through">{formatMoney(listing.retailPrice)}</span>
          <span className="ml-1.5 font-semibold text-accent-dark">−{savingsPercent(listing)}%</span>
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted">Rental length</p>
          <div className="mt-1.5 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Rental length">
            {brand.rentalOptions.map((o) => {
              const active = days === o.days;
              const price = o.days === 4 ? listing.price4 : listing.price8;
              return (
                <button
                  key={o.days}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => changeDays(o.days)}
                  className={cx(
                    'border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark',
                    active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
                  )}>
                  
                  <span className="block text-sm font-medium">{o.label}</span>
                  <span className={cx('block text-xs', active ? 'text-paper/75' : 'text-muted')}>
                    {formatMoney(price)} · {o.hint}
                  </span>
                </button>);

            })}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted">Event date</p>
          <button
            type="button"
            onClick={() => setCalendarOpen((o) => !o)}
            aria-expanded={calendarOpen}
            className={cx(
              'mt-1.5 flex h-11 w-full items-center gap-2 border px-3 text-left text-sm transition',
              calendarOpen ? 'border-ink' : 'border-line hover:border-ink'
            )}>
            
            <CalendarIcon size={16} className="text-muted" aria-hidden="true" />
            {eventDate ? longDate(eventDate) : <span className="text-muted">Select your event date</span>}
          </button>
          {calendarOpen &&
          <div className="mt-3 border border-line p-3">
              <AvailabilityCalendar
              listing={listing}
              days={days}
              eventDate={eventDate}
              onSelect={(d) => {
                setEventDate(d);
                setError('');
                setCalendarOpen(false);
              }} />
            
            </div>
          }
          {window && valid &&
          <p className="mt-2 text-xs text-muted">
              Arrives {shortDate(window.start)} · Return by {shortDate(window.end)}
            </p>
          }
        </div>

        <SizeCheck listing={listing} usualSize={usualSize} onChange={setUsualSize} />

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted">Delivery</p>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(['ship', 'pickup'] as DeliveryMethod[]).map((m) => {
              const allowed = listing.delivery.includes(m);
              const active = delivery === m;
              const Icon = m === 'ship' ? PackageIcon : StoreIcon;
              return (
                <button
                  key={m}
                  type="button"
                  disabled={!allowed}
                  aria-pressed={active}
                  onClick={() => setDelivery(m)}
                  className={cx(
                    'flex h-11 items-center justify-center gap-2 border text-sm transition disabled:cursor-not-allowed disabled:opacity-40',
                    active ? 'border-ink bg-cream' : 'border-line hover:border-ink'
                  )}>
                  
                  <Icon size={15} aria-hidden="true" />
                  {m === 'ship' ? 'Ship to me' : 'Pick up'}
                </button>);

            })}
          </div>
        </div>
      </div>

      <dl className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
        {breakdown.lines.map((l) =>
        <div key={l.label} className="flex justify-between">
            <dt className="text-muted">{l.label}</dt>
            <dd className={l.note ? 'text-accent-dark' : 'text-ink'}>
              {l.note ?? formatMoney(l.amount)}
            </dd>
          </div>
        )}
        <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatMoney(breakdown.total)}</dd>
        </div>
      </dl>

      {error &&
      <p role="alert" className="mt-4 text-sm text-[#9b2c2c]">
          {error}
        </p>
      }

      <button type="button" onClick={rent} className={btn('primary', 'lg', 'mt-5 w-full')}>
        Rent now
      </button>
      <p className="mt-3 text-center text-xs text-muted">You won’t be charged until the lender confirms.</p>

      <ul className="mt-5 space-y-2 border-t border-line pt-5 text-xs text-muted">
        <li className="flex items-center gap-2">
          <SparklesIcon size={14} className="text-accent-dark" aria-hidden="true" />
          Professional cleaning included in every rental
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheckIcon size={14} className="text-accent-dark" aria-hidden="true" />
          Damage protection covers small accidents
        </li>
      </ul>
    </div>);

}
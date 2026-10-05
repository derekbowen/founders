import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ShieldCheckIcon } from 'lucide-react';
import { Counter } from '../ui/Counter';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { PriceBreakdown } from '../PriceBreakdown';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import { packages } from '../../data/booking';
import { formatMoney } from '../../utils/pricing';
import { todayIso } from '../../utils/format';
import { cn, inputClass } from '../../utils/ui';
import type { Listing, PackageId } from '../../types/marketplace';

export function BookingPanel({ listing }: {listing: Listing;}) {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useMarketplace();
  const [date, setDate] = useState('');
  const [pkg, setPkg] = useState<PackageId>('full');
  const [departure, setDeparture] = useState(packages[1].departures[0]);
  const [withCaptain, setWithCaptain] = useState(listing.captainMode === 'required');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');

  const isOwn = isAuthenticated && listing.ownerId === currentUser.id;
  const pack = packages.find((p) => p.id === pkg) ?? packages[1];

  const choosePackage = (id: PackageId) => {
    setPkg(id);
    const p = packages.find((x) => x.id === id);
    if (p) setDeparture(p.departures[0]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return setError('Choose a date to see availability.');
    if (listing.blockedDates.includes(date)) return setError('This boat is already booked that day. Try another date.');
    setError('');
    const params = new URLSearchParams({ date, pkg, dep: departure, guests: String(guests), captain: withCaptain ? '1' : '0' });
    navigate(`/l/${listing.id}/checkout?${params.toString()}`);
  };

  return (
    <form id="booking" onSubmit={submit} className="rounded-3xl border border-line bg-white p-6 shadow-card" aria-labelledby="booking-heading">
      <h2 id="booking-heading" className="sr-only">
        Book this boat
      </h2>
      <p className="text-ink">
        <span className="font-heading text-3xl text-navy">{formatMoney(pkg === 'half' ? listing.pricing.halfDay : listing.pricing.fullDay)}</span>
        <span className="text-sm text-muted"> / {pkg === 'half' ? 'half day' : 'day'}</span>
      </p>

      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="bp-date" className="mb-1.5 block text-sm font-medium text-ink">
            Date
          </label>
          <div className="relative">
            <CalendarIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="bp-date"
              type="date"
              min={todayIso()}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError('');
              }}
              aria-invalid={!!error}
              aria-describedby={error ? 'bp-error' : undefined}
              className={cn(inputClass, 'pl-10', error && 'border-danger')} />
            
          </div>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-ink">Package</legend>
          <div className="grid grid-cols-2 gap-2">
            {packages.map((p) => {
              const price = p.id === 'half' ? listing.pricing.halfDay : listing.pricing.fullDay;
              const active = pkg === p.id;
              return (
                <label key={p.id} className={cn('cursor-pointer rounded-xl border p-3 transition-colors', active ? 'border-navy bg-navy/[0.04] ring-1 ring-navy' : 'border-line hover:border-navy/40')}>
                  <input type="radio" name="pkg" value={p.id} checked={active} onChange={() => choosePackage(p.id)} className="sr-only" />
                  <span className="block text-sm font-semibold text-ink">{p.label}</span>
                  <span className="block text-xs text-muted">
                    {p.hours} hrs · {formatMoney(price)}
                  </span>
                </label>);

            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="bp-dep" className="mb-1.5 block text-sm font-medium text-ink">
            Departure
          </label>
          <select id="bp-dep" value={departure} onChange={(e) => setDeparture(e.target.value)} className={inputClass}>
            {pack.departures.map((d) =>
            <option key={d}>{d}</option>
            )}
          </select>
        </div>

        <div className="rounded-xl bg-sand-light p-4">
          {listing.captainMode === 'optional' ?
          <Toggle
            id="bp-captain"
            label="Add a captain"
            description={`+${formatMoney(pkg === 'half' ? listing.pricing.captainHalfDay : listing.pricing.captainFullDay)} · licensed & insured`}
            checked={withCaptain}
            onChange={setWithCaptain} /> :

          listing.captainMode === 'required' ?
          <Toggle id="bp-captain" label="Captain included" description="Required for this vessel" checked onChange={() => undefined} disabled /> :

          <Toggle id="bp-captain" label="Bareboat only" description="You’ll operate the boat — license required" checked={false} onChange={() => undefined} disabled />
          }
        </div>

        <Counter label="Guests" hint={`Up to ${listing.specs.capacity}`} value={guests} min={1} max={listing.specs.capacity} onChange={setGuests} />
      </div>

      {error &&
      <p id="bp-error" role="alert" className="mt-4 rounded-xl bg-danger/5 px-3 py-2 text-sm font-medium text-danger">
          {error}
        </p>
      }

      <div className="mt-6">
        <PriceBreakdown listing={listing} pkg={pkg} withCaptain={withCaptain} />
      </div>

      {isOwn ?
      <p className="mt-6 rounded-xl border border-dashed border-line p-3 text-center text-sm text-muted">This is your listing — guests will request to book here.</p> :

      <Button type="submit" variant="accent" size="lg" className="mt-6 w-full">
          Request to book
        </Button>
      }
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
        <ShieldCheckIcon className="h-3.5 w-3.5 text-success" aria-hidden="true" />
        You won’t be charged until the owner accepts
      </p>
    </form>);

}
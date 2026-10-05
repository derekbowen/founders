import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InfoIcon, ZapIcon } from 'lucide-react';
import { Input } from '../Input';
import { UnitToggle } from './UnitToggle';
import { PriceBreakdown } from './PriceBreakdown';
import { getQuote, getHours } from '../../utils/pricing';
import { buttonClass, fieldClass } from '../../utils/styles';
import { formatMoney } from '../../utils/format';
import type { Listing, UnitType } from '../../types/listing';

interface BookingPanelProps {
  listing: Listing;
  initialArrive: string;
  initialLeave: string;
  isOwnListing: boolean;
}

export function BookingPanel({ listing, initialArrive, initialLeave, isOwnListing }: BookingPanelProps) {
  const navigate = useNavigate();
  const [arrive, setArrive] = useState(initialArrive);
  const [leave, setLeave] = useState(initialLeave);
  const [unit, setUnit] = useState<UnitType>(getHours(initialArrive, initialLeave) >= 24 ? 'day' : 'hour');
  const [plate, setPlate] = useState('');
  const [touched, setTouched] = useState(false);

  const quote = getQuote(listing, arrive, leave, unit);
  const plateError = touched && plate.trim().length < 2 ? 'Enter your license plate so the host can recognize your car' : undefined;
  const belowMin = unit === 'hour' && quote.valid && quote.hours < listing.minHours;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!quote.valid || plate.trim().length < 2) return;
    const params = new URLSearchParams({ arrive, leave, unit, plate: plate.trim().toUpperCase() });
    navigate(`/checkout/${listing.id}?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} id="booking" className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6" aria-label="Reserve this spot">
      <div className="flex items-baseline justify-between">
        <p>
          <span className="text-2xl font-bold">{formatMoney(unit === 'hour' ? listing.hourlyPrice : listing.dailyPrice)}</span>
          <span className="text-muted"> / {unit}</span>
        </p>
        {listing.instantBook &&
        <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold">
            <ZapIcon size={12} aria-hidden /> Instant book
          </span>
        }
      </div>

      <div className="mt-4">
        <UnitToggle value={unit} onChange={setUnit} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Arrive
          <input type="datetime-local" value={arrive} onChange={(e) => setArrive(e.target.value)} className={`${fieldClass} mt-1 px-2 text-[13px]`} required />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Leave
          <input type="datetime-local" value={leave} onChange={(e) => setLeave(e.target.value)} className={`${fieldClass} mt-1 px-2 text-[13px]`} required />
        </label>
      </div>

      <div className="mt-4">
        <Input
          id="plate"
          label="Vehicle license plate"
          placeholder="e.g. 8KXD214"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          onBlur={() => setTouched(true)}
          error={plateError}
          maxLength={8} />
        
      </div>

      <div className="mt-5 border-t border-line pt-4">
        {quote.valid ?
        <PriceBreakdown quote={quote} /> :

        <p role="alert" className="text-sm font-medium text-danger">
            {quote.error}
          </p>
        }
        {belowMin &&
        <p className="mt-2 flex items-start gap-1.5 text-xs text-muted">
            <InfoIcon size={14} className="mt-px shrink-0" aria-hidden /> {listing.minHours}-hour minimum applies.
          </p>
        }
        {quote.dailySavings > 0 &&
        <button
          type="button"
          onClick={() => setUnit('day')}
          className="mt-3 w-full rounded-lg bg-accent/20 px-3 py-2 text-left text-xs font-medium text-ink hover:bg-accent/30">
          
            Switch to daily and save {formatMoney(quote.dailySavings)} →
          </button>
        }
      </div>

      {isOwnListing ?
      <div className="mt-5 rounded-xl bg-canvas p-4 text-sm">
          This is your listing.{' '}
          <Link to="/inbox?tab=hosting" className="font-semibold underline">
            Manage bookings
          </Link>
        </div> :

      <button type="submit" className={buttonClass('accent', 'lg', 'mt-5 w-full')} disabled={!quote.valid}>
          Reserve
        </button>
      }
      <p className="mt-3 text-center text-xs text-muted">
        {listing.instantBook ? 'Confirmed instantly. ' : 'Host replies within hours. '}You won’t be charged yet.
      </p>
    </form>);

}
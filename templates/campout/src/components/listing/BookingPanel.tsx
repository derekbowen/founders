import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ZapIcon } from 'lucide-react';
import { Counter } from '../Counter';
import { Rating } from '../Rating';
import { PriceBreakdownList } from './PriceBreakdownList';
import type { Listing } from '../../types/listing';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/currency';
import { TODAY, defaultStay, nightsBetween, plusDays, toISODate } from '../../utils/dates';
import { computeBreakdown } from '../../utils/pricing';

export function BookingPanel({ listing, anchorId }: {listing: Listing;anchorId?: string;}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const fallback = defaultStay();
  const [start, setStart] = useState(params.get('start') ?? fallback.start);
  const [end, setEnd] = useState(params.get('end') ?? fallback.end);
  const [campers, setCampers] = useState(Math.min(Number(params.get('campers')) || 2, listing.maxCampers));
  const [vehicles, setVehicles] = useState(1);

  const nights = nightsBetween(start, end);
  const breakdown = computeBreakdown(listing, nights, campers);
  const error = !start || !end ? 'Select check-in and check-out dates.' : nights < listing.minNights ? `Minimum stay is ${listing.minNights} nights.` : '';

  const book = () => {
    if (error) return;
    const p = new URLSearchParams({ start, end, campers: String(campers), vehicles: String(vehicles) });
    navigate(`/l/${listing.id}/checkout?${p.toString()}`);
  };

  return (
    <div id={anchorId} className="card scroll-mt-24 p-6 shadow-card">
      <div className="flex items-baseline justify-between gap-2">
        <p>
          <span className="font-serif text-2xl font-bold text-ink-900">{formatMoney(listing.price)}</span>
          <span className="text-ink-500"> / {brand.unitLabel}</span>
        </p>
        <Rating value={listing.rating} count={listing.reviewCount} />
      </div>

      <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-sand-300">
        <label className="border-r border-sand-300 px-3 py-2.5 focus-within:bg-sand-50">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-600">Check in</span>
          <input
            type="date"
            value={start}
            min={toISODate(TODAY)}
            onChange={(e) => {
              setStart(e.target.value);
              if (!end || e.target.value >= end) setEnd(plusDays(e.target.value, Math.max(listing.minNights, 1)));
            }}
            className="w-full bg-transparent text-sm font-medium text-ink-900 focus:outline-none" />
          
        </label>
        <label className="px-3 py-2.5 focus-within:bg-sand-50">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-600">Check out</span>
          <input
            type="date"
            value={end}
            min={start ? plusDays(start, 1) : toISODate(TODAY)}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink-900 focus:outline-none" />
          
        </label>
      </div>

      <div className="mt-5 space-y-4">
        <Counter
          label="Campers"
          description={`${listing.includedCampers} included · max ${listing.maxCampers}`}
          value={campers}
          min={1}
          max={listing.maxCampers}
          onChange={setCampers} />
        
        <Counter
          label="Vehicles"
          description={listing.maxVehicleLength > 0 ? `RVs up to ${listing.maxVehicleLength} ft` : `Max ${listing.maxVehicles} · no RVs`}
          value={vehicles}
          min={0}
          max={listing.maxVehicles}
          onChange={setVehicles} />
        
      </div>

      {error &&
      <p className="mt-4 rounded-lg bg-accent-50 px-3 py-2 text-sm text-accent-700" role="alert">
          {error}
        </p>
      }

      <button type="button" onClick={book} disabled={Boolean(error)} className="btn-accent btn-lg mt-5 w-full">
        {listing.instantBook && <ZapIcon size={17} aria-hidden="true" />}
        Book site
      </button>
      <p className="mt-2 text-center text-xs text-ink-500">
        {listing.instantBook ? 'Instant book · confirmed right away' : 'Host responds within 24 hours · you won’t be charged yet'}
      </p>

      {nights > 0 && !error &&
      <div className="mt-5">
          <PriceBreakdownList breakdown={breakdown} />
        </div>
      }
    </div>);

}
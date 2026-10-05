import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from 'lucide-react';
import type { BookingMode, Listing } from '../../types/listing';
import { formatMoney } from '../../utils/format';

interface MapViewProps {
  listings: Listing[];
  activeId?: string | null;
  priceMode?: BookingMode;
  single?: boolean;
  className?: string;
  label?: string;
}

export function MapView({
  listings,
  activeId = null,
  priceMode = 'hour',
  single = false,
  className = '',
  label = 'Map of spaces'
}: MapViewProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedListing = listings.find((l) => l.id === selected);

  return (
    <div
      role="region"
      aria-label={label}
      className={`relative overflow-hidden rounded-2xl border border-line bg-[#eef2ef] ${className}`}>
      
      <MapBackdrop />

      {single && listings[0] &&
      <span
        aria-hidden="true"
        className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-600/40 bg-brand-500/15"
        style={{ left: `${listings[0].map.x}%`, top: `${listings[0].map.y}%` }} />

      }

      {listings.map((l) => {
        const isActive = activeId === l.id || selected === l.id;
        const price = priceMode === 'hour' ? l.pricePerHour : l.pricePerDay;
        return single ?
        <span
          key={l.id}
          className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-700 text-white shadow-pop ring-4 ring-white"
          style={{ left: `${l.map.x}%`, top: `${l.map.y}%` }}
          aria-label={`${l.title} location`}>
          
            <span className="h-3 w-3 rounded-full bg-white" />
          </span> :

        <button
          key={l.id}
          type="button"
          onClick={() => setSelected(l.id === selected ? null : l.id)}
          aria-label={`${l.title}, ${formatMoney(price)} per ${priceMode}`}
          className={`focus-ring absolute -translate-x-1/2 -translate-y-full rounded-full px-2.5 py-1 text-xs font-bold shadow-card transition-all ${
          isActive ?
          'z-20 scale-110 bg-ink text-white' :
          'z-10 bg-white text-ink hover:z-20 hover:scale-105'}`
          }
          style={{ left: `${l.map.x}%`, top: `${l.map.y}%` }}>
          
            {formatMoney(price)}
          </button>;

      })}

      {selectedListing && !single &&
      <div className="absolute inset-x-3 bottom-3 z-30 flex gap-3 rounded-xl bg-white p-2.5 shadow-pop sm:left-auto sm:w-80">
          <img src={selectedListing.images[0]} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
          <div className="min-w-0 flex-1 py-0.5">
            <Link to={`/l/${selectedListing.id}`} className="link line-clamp-2 text-sm text-ink">
              {selectedListing.title}
            </Link>
            <p className="mt-0.5 truncate text-xs text-ink-muted">
              {selectedListing.neighborhood}, {selectedListing.city}
            </p>
            <p className="mt-1 text-sm">
              <span className="font-semibold">{formatMoney(selectedListing.pricePerHour)}</span>
              <span className="text-ink-muted"> /hour</span>
            </p>
          </div>
          <button
          type="button"
          onClick={() => setSelected(null)}
          className="focus-ring grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-mist"
          aria-label="Close preview">
          
            <XIcon size={14} />
          </button>
        </div>
      }

      <span className="absolute bottom-2 left-3 text-[10px] font-medium text-ink-subtle">Illustrative map</span>
    </div>);

}

function MapBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true">
      
      <ellipse cx="18" cy="26" rx="12" ry="9" fill="#d6ead9" />
      <ellipse cx="80" cy="78" rx="14" ry="10" fill="#d6ead9" />
      <ellipse cx="72" cy="16" rx="7" ry="5" fill="#d6ead9" />
      <path d="M-5 70 C 20 60, 35 85, 55 72 S 90 55, 110 62" fill="none" stroke="#cfe2ee" strokeWidth="14" vectorEffect="non-scaling-stroke" />
      {[12, 28, 44, 60, 76, 92].map((y) =>
      <line key={`h${y}`} x1="0" x2="100" y1={y} y2={y + 4} stroke="#ffffff" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      )}
      {[10, 26, 42, 58, 74, 90].map((x) =>
      <line key={`v${x}`} x1={x} x2={x - 6} y1="0" y2="100" stroke="#ffffff" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      )}
      <line x1="0" y1="100" x2="100" y2="0" stroke="#ffffff" strokeWidth="6" vectorEffect="non-scaling-stroke" />
      {[20, 36, 52, 68, 84].map((y) =>
      <line key={`m${y}`} x1="0" x2="100" y1={y} y2={y} stroke="#f6f8f6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      )}
    </svg>);

}
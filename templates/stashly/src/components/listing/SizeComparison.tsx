import React, { useState } from 'react';
import type { Listing } from '../../types/marketplace';
import { sqft } from '../../data/listings';
import { ui, cx } from '../../utils/styles';

type RefKey = 'person' | 'mattress' | 'car' | 'boxes';

const references: Record<RefKey, {label: string;w: number;l: number;}> = {
  person: { label: 'Person (top-down)', w: 2, l: 1.5 },
  mattress: { label: 'Queen mattress', w: 5, l: 6.7 },
  car: { label: 'Sedan', w: 6, l: 15 },
  boxes: { label: 'Box stack (2×2 ft)', w: 2, l: 2 }
};

function fitsLabel(area: number): string {
  if (area < 30) return 'A closet’s worth — about 10–20 boxes, suitcases or ski gear';
  if (area < 80) return 'A dorm room or studio’s worth of boxes and small furniture';
  if (area < 160) return 'The contents of a 1-bedroom apartment';
  if (area < 260) return 'A 2-bedroom home, or one car';
  return 'A 3+ bedroom home, or a large vehicle with room to spare';
}

export function SizeComparison({ listing }: {listing: Listing;}) {
  const [refKey, setRefKey] = useState<RefKey>(listing.vehicleStorage ? 'car' : 'mattress');
  const ref = references[refKey];
  const area = sqft(listing);

  const span = Math.max(listing.width, listing.length, ref.w, ref.l) * 1.12;
  const vb = 100;
  const scale = vb / span;
  const sw = listing.width * scale;
  const sl = listing.length * scale;
  const ox = (vb - sw) / 2;
  const oy = (vb - sl) / 2;

  const rw = ref.w * scale;
  const rl = ref.l * scale;
  const fitsCount = Math.floor(listing.width / ref.w) * Math.floor(listing.length / ref.l);

  const boxes = Math.floor(area * Math.min(listing.height ?? 6, 7) / 4.5);

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,280px)_1fr] md:items-center">
      <div className="relative aspect-square w-full rounded-2xl border border-stone-200 bg-sand-50 p-3">
        <svg viewBox={`0 0 ${vb} ${vb}`} className="h-full w-full" role="img" aria-label={`Floor plan: ${listing.width} by ${listing.length} feet compared to a ${ref.label}`}>
          <defs>
            <pattern id="grid" width={scale} height={scale} patternUnits="userSpaceOnUse" x={ox} y={oy}>
              <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="var(--sand-200)" strokeWidth="0.25" />
            </pattern>
          </defs>
          <rect x={ox} y={oy} width={sw} height={sl} fill="url(#grid)" stroke="var(--brand-600)" strokeWidth="0.8" rx="0.8" />
          <rect
            x={ox + 1.5}
            y={oy + 1.5}
            width={Math.min(rw, sw)}
            height={Math.min(rl, sl)}
            fill="var(--sand-300)"
            fillOpacity="0.85"
            stroke="var(--sand-600)"
            strokeWidth="0.5"
            rx="0.6" />
          
          <text x={vb / 2} y={oy - 2} textAnchor="middle" fontSize="4" fill="var(--brand-800)" fontWeight="600">
            {listing.width} ft
          </text>
          <text
            x={ox - 2}
            y={vb / 2}
            textAnchor="middle"
            fontSize="4"
            fill="var(--brand-800)"
            fontWeight="600"
            transform={`rotate(-90 ${ox - 2} ${vb / 2})`}>
            
            {listing.length} ft
          </text>
        </svg>
      </div>
      <div>
        <p className="text-3xl font-bold text-stone-900">
          {listing.width} × {listing.length} ft
          {listing.height ? <span className="text-stone-500"> × {listing.height} ft</span> : null}
        </p>
        <p className="mt-1 text-sm text-stone-600">
          {area} sq ft{listing.height ? ` · ${Math.round(area * listing.height)} cu ft` : ''}
        </p>
        <p className="mt-4 text-[15px] text-stone-800">{fitsLabel(area)}</p>
        {listing.height &&
        <p className="mt-1 text-sm text-stone-600">≈ {boxes} medium moving boxes stacked safely</p>
        }
        <fieldset className="mt-5">
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">Compare with</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(references) as RefKey[]).map((k) =>
            <button
              key={k}
              type="button"
              aria-pressed={refKey === k}
              onClick={() => setRefKey(k)}
              className={cx(ui.chip, refKey === k ? ui.chipOn : ui.chipOff)}>
              
                {references[k].label}
              </button>
            )}
          </div>
        </fieldset>
        <p className="mt-3 text-sm text-stone-600">
          {fitsCount > 0 ?
          `Fits ${fitsCount} × ${ref.label.toLowerCase()} side by side` :
          `A ${ref.label.toLowerCase()} won’t fit flat in this space`}
        </p>
      </div>
    </div>);

}
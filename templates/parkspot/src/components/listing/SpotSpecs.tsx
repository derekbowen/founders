import React from 'react';
import { CameraIcon, CarIcon, CheckIcon, ClockIcon, LockIcon, RulerIcon, UmbrellaIcon, ZapIcon } from 'lucide-react';
import { vehicleExamples } from '../../data/vehicles';
import type { Listing } from '../../types/listing';

export function SpotHighlights({ listing }: {listing: Listing;}) {
  const items = [
  { on: listing.covered, icon: <UmbrellaIcon size={18} />, label: 'Covered', off: 'Uncovered' },
  { on: listing.evCharging, icon: <ZapIcon size={18} />, label: 'EV charging', off: 'No EV charger' },
  { on: listing.access247, icon: <ClockIcon size={18} />, label: '24/7 access', off: 'Limited hours' },
  { on: listing.securityCamera, icon: <CameraIcon size={18} />, label: 'Security camera', off: 'No camera' }];

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((i) =>
      <li
        key={i.label}
        className={`flex flex-col gap-2 rounded-xl border p-3 text-sm ${
        i.on ? 'border-ink/15 bg-surface font-medium' : 'border-dashed border-line text-muted'}`
        }>
        
          <span className={`grid h-8 w-8 place-items-center rounded-lg ${i.on ? 'bg-accent text-ink' : 'bg-canvas'}`} aria-hidden>
            {i.icon}
          </span>
          {i.on ? i.label : i.off}
        </li>
      )}
    </ul>);

}

export function AccessPreview({ listing }: {listing: Listing;}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-sm leading-relaxed">{listing.accessPreview}</p>
      <div className="mt-4 flex items-start gap-3 rounded-xl bg-navy p-4 text-white">
        <LockIcon size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
        <div className="text-sm">
          <p className="font-semibold">Full directions & access code</p>
          <p className="mt-0.5 text-white/70">Unlocked in your inbox once the host confirms your reservation.</p>
        </div>
      </div>
    </div>);

}

export function SizeLimits({ listing }: {listing: Listing;}) {
  const { lengthFt, widthFt, clearanceFt } = listing.dimensions;
  const rows = [
  { label: 'Length', value: `${lengthFt} ft` },
  { label: 'Width', value: `${widthFt} ft` },
  { label: 'Height clearance', value: clearanceFt ? `${clearanceFt} ft` : 'No limit' }];

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
      <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {rows.map((r) =>
        <div key={r.label} className="flex items-center justify-between px-4 py-3 text-sm">
            <dt className="flex items-center gap-2 text-muted">
              <RulerIcon size={14} aria-hidden /> {r.label}
            </dt>
            <dd className="font-semibold">{r.value}</dd>
          </div>
        )}
      </dl>
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy text-accent" aria-hidden>
          <CarIcon size={22} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Fits up to</p>
          <p className="text-lg font-bold">{listing.maxVehicle}</p>
          <p className="text-xs text-muted">e.g. {vehicleExamples[listing.maxVehicle]}</p>
        </div>
      </div>
    </div>);

}

export function AmenityList({ amenities }: {amenities: string[];}) {
  return (
    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {amenities.map((a) =>
      <li key={a} className="flex items-center gap-2.5 text-sm">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-success/10 text-success" aria-hidden>
            <CheckIcon size={12} />
          </span>
          {a}
        </li>
      )}
    </ul>);

}
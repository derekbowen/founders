import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { listings } from '../../data/listings';
import type { StepProps } from '../../types/draft';
import { formatMoney } from '../../utils/format';
import { getSpaceType } from '../../utils/lookup';

export function PricingStep({ draft, update, errors }: StepProps) {
  const type = getSpaceType(draft.spaceType);
  const similar = listings.filter((l) => l.spaceType === draft.spaceType);
  const avgHour = similar.length ? similar.reduce((s, l) => s + l.pricePerHour, 0) / similar.length : 0;
  const avgDay = similar.length ? similar.reduce((s, l) => s + l.pricePerDay, 0) / similar.length : 0;
  const hour = Number(draft.pricePerHour) || 0;
  const day = Number(draft.pricePerDay) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl bg-brand-50 p-4 text-sm text-brand-900">
        <LightbulbIcon size={18} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
        <p>
          Similar {type.label.toLowerCase()}s charge around <strong>{formatMoney(Math.round(avgHour))}/hour</strong> and{' '}
          <strong>{formatMoney(Math.round(avgDay))}/day</strong>. A day rate of 4–5× the hourly price converts best.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="w-hour"
          label={`Price per hour, per ${type.unit.one}`}
          type="number"
          inputMode="decimal"
          min={1}
          value={draft.pricePerHour}
          error={errors.pricePerHour}
          onChange={(e) => update({ pricePerHour: e.target.value })}
          startAdornment={<span className="text-sm text-ink-muted">€</span>} />
        
        <Input
          id="w-day"
          label={`Price per day, per ${type.unit.one}`}
          type="number"
          inputMode="decimal"
          min={1}
          value={draft.pricePerDay}
          error={errors.pricePerDay}
          onChange={(e) => update({ pricePerDay: e.target.value })}
          startAdornment={<span className="text-sm text-ink-muted">€</span>} />
        
      </div>
      <div>
        <label htmlFor="w-min" className="field-label">Minimum booking</label>
        <select id="w-min" value={draft.minHours} onChange={(e) => update({ minHours: Number(e.target.value) })} className="field sm:w-60">
          {[1, 2, 3, 4].map((h) =>
          <option key={h} value={h}>{h} {h === 1 ? 'hour' : 'hours'}</option>
          )}
        </select>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl border border-line p-4">
        <div>
          <p className="text-sm font-semibold">Instant book</p>
          <p className="text-xs text-ink-muted">Guests can book without waiting for your approval. Instant-book spaces get 2× more bookings.</p>
        </div>
        <Toggle checked={draft.instantBook} onChange={(instantBook) => update({ instantBook })} aria-label="Instant book" />
      </div>
      {(hour > 0 || day > 0) &&
      <dl className="grid grid-cols-2 gap-3 rounded-xl bg-mist p-4 text-sm">
          <div>
            <dt className="text-ink-muted">You earn per hour</dt>
            <dd className="font-display text-xl font-semibold">{formatMoney(hour * 0.9)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">You earn per day</dt>
            <dd className="font-display text-xl font-semibold">{formatMoney(day * 0.9)}</dd>
          </div>
          <p className="col-span-2 text-xs text-ink-muted">After 10% host commission, per {type.unit.one}.</p>
        </dl>
      }
    </div>);

}
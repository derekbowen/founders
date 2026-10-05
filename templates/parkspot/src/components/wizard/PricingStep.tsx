import React from 'react';
import { Input } from '../Input';
import { Toggle } from '../Toggle';
import { FieldError } from './FieldError';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/format';
import { fieldClass, labelClass } from '../../utils/styles';
import type { StepProps } from '../../types/listingDraft';

export function PricingStep({ draft, update, errors }: StepProps) {
  const keep = 1 - brand.fees.hostCommissionRate;
  const hourly = Number(draft.hourlyPrice) || 0;
  const daily = Number(draft.dailyPrice) || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className={`rounded-xl border-2 p-5 ${draft.hourlyEnabled ? 'border-navy' : 'border-line'}`}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Hourly bookings</p>
            <Toggle checked={draft.hourlyEnabled} onChange={(v) => update({ hourlyEnabled: v })} aria-label="Enable hourly bookings" />
          </div>
          <div className="mt-4">
            <Input
              id="w-hourly"
              label="Price per hour"
              type="number"
              min={0}
              step="0.5"
              startAdornment={<span className="text-sm font-semibold">$</span>}
              value={draft.hourlyPrice}
              disabled={!draft.hourlyEnabled}
              onChange={(e) => update({ hourlyPrice: e.target.value })}
              error={errors.hourlyPrice} />
            
          </div>
          <div className="mt-4">
            <label htmlFor="w-min" className={labelClass}>
              Minimum booking
            </label>
            <select id="w-min" className={fieldClass} value={draft.minHours} disabled={!draft.hourlyEnabled} onChange={(e) => update({ minHours: e.target.value })}>
              {['1', '2', '3', '4'].map((h) =>
              <option key={h} value={h}>
                  {h} {h === '1' ? 'hour' : 'hours'}
                </option>
              )}
            </select>
          </div>
        </div>

        <div className={`rounded-xl border-2 p-5 ${draft.dailyEnabled ? 'border-navy' : 'border-line'}`}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Daily bookings</p>
            <Toggle checked={draft.dailyEnabled} onChange={(v) => update({ dailyEnabled: v })} aria-label="Enable daily bookings" />
          </div>
          <div className="mt-4">
            <Input
              id="w-daily"
              label="Price per day (24h)"
              type="number"
              min={0}
              startAdornment={<span className="text-sm font-semibold">$</span>}
              value={draft.dailyPrice}
              disabled={!draft.dailyEnabled}
              onChange={(e) => update({ dailyPrice: e.target.value })}
              error={errors.dailyPrice} />
            
          </div>
          <p className="mt-4 text-sm text-muted">Tip: hosts near venues charge 4–6× their hourly rate per day.</p>
        </div>
      </div>
      <FieldError message={errors.hourlyEnabled} />

      <div className="flex items-center justify-between gap-4 rounded-xl border border-line p-4">
        <div>
          <p className="font-medium">Instant book</p>
          <p className="text-sm text-muted">Confirm bookings automatically. Instant-book spots get 2× more reservations.</p>
        </div>
        <Toggle checked={draft.instantBook} onChange={(v) => update({ instantBook: v })} aria-label="Instant book" />
      </div>

      <div className="rounded-xl bg-navy p-5 text-white">
        <p className="text-sm font-semibold text-accent">Your earnings preview</p>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          {draft.hourlyEnabled &&
          <div>
              <dt className="text-xs text-white/60">3-hour booking</dt>
              <dd className="text-2xl font-bold">{formatMoney(Math.round(hourly * 3 * keep * 100) / 100)}</dd>
            </div>
          }
          {draft.dailyEnabled &&
          <div>
              <dt className="text-xs text-white/60">1-day booking</dt>
              <dd className="text-2xl font-bold">{formatMoney(Math.round(daily * keep * 100) / 100)}</dd>
            </div>
          }
        </dl>
        <p className="mt-3 text-xs text-white/60">After the {Math.round(brand.fees.hostCommissionRate * 100)}% host fee. Drivers pay a separate service fee.</p>
      </div>
    </div>);

}
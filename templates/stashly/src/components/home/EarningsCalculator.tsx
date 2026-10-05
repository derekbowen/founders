import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { spaceTypes } from '../../data/spaceTypes';
import { earningsRates } from '../../data/content';
import { brand } from '../../data/brand';
import { formatMoney, hostPayout } from '../../utils/pricing';
import type { SpaceType } from '../../types/marketplace';
import { ui, cx } from '../../utils/styles';

export function EarningsCalculator() {
  const [type, setType] = useState<SpaceType>('garage');
  const [size, setSize] = useState(240);
  const monthly = Math.round(size * earningsRates[type]);
  const payout = hostPayout(monthly);

  return (
    <section id="earnings" className="bg-brand-800 py-20 text-white">
      <div className={cx(ui.container, 'grid gap-12 lg:grid-cols-2 lg:items-center')}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-300">For hosts</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Turn empty space into monthly income</h2>
          <p className="mt-4 max-w-md text-brand-100">
            Hosts in {brand.homeCity.split(',')[0]} earn an average of $1,740 a year. You set the price, access hours and rules — we handle payments and protection.
          </p>
          <Link to="/listings/new" className="mt-8 inline-flex items-center rounded-lg bg-sand-400 px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-sand-300">
            Rent out your space
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 text-stone-900 shadow-lift sm:p-8">
          <h3 className="text-lg font-semibold">Earnings calculator</h3>
          <fieldset className="mt-5">
            <legend className={ui.label}>Space type</legend>
            <div className="flex flex-wrap gap-2">
              {spaceTypes.map((t) =>
              <button
                key={t.value}
                type="button"
                aria-pressed={type === t.value}
                onClick={() => setType(t.value)}
                className={cx(ui.chip, type === t.value ? ui.chipOn : ui.chipOff)}>
                
                  {t.label}
                </button>
              )}
            </div>
          </fieldset>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label htmlFor="earn-size" className={ui.label}>Size</label>
              <span className="text-sm font-semibold text-brand-700">{size} sq ft</span>
            </div>
            <input
              id="earn-size"
              type="range"
              min={10}
              max={500}
              step={10}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-[var(--brand-600)]" />
            
            <div className="mt-1 flex justify-between text-xs text-stone-500">
              <span>10</span>
              <span>500 sq ft</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-sand-50 p-4">
              <p className="text-xs font-medium text-stone-600">Suggested price</p>
              <p className="mt-1 text-2xl font-bold">{formatMoney(monthly)}<span className="text-sm font-medium text-stone-500">/mo</span></p>
            </div>
            <div className="rounded-xl bg-brand-50 p-4">
              <p className="text-xs font-medium text-brand-800">You’d earn per year</p>
              <p className="mt-1 text-2xl font-bold text-brand-800">{formatMoney(payout * 12)}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-500">
            After {Math.round(brand.marketplace.hostCommissionRate * 100)}% host fee. Estimates based on nearby bookings.
          </p>
        </div>
      </div>
    </section>);

}
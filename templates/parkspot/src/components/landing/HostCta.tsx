import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { hostCta } from '../../data/landing';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/format';

export function HostCta() {
  const [rate, setRate] = useState(5);
  const [hours, setHours] = useState(20);
  const monthly = rate * hours * 4.3 * (1 - brand.fees.hostCommissionRate);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" aria-labelledby="host-heading">
      <div className="grid overflow-hidden rounded-3xl bg-accent text-ink lg:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-12">
          <p className="text-sm font-bold uppercase tracking-wider">Become a host</p>
          <h2 id="host-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {hostCta.heading}
          </h2>
          <p className="mt-4 max-w-lg text-ink/80">{hostCta.text}</p>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
            {hostCta.stats.map((s) =>
            <div key={s.label}>
                <dd className="text-2xl font-bold">{s.value}</dd>
                <dt className="text-xs text-ink/70">{s.label}</dt>
              </div>
            )}
          </dl>
          <Link
            to="/listings/new"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-navy px-6 font-semibold text-white transition-colors hover:bg-navy-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-accent">
            
            List your space <ArrowRightIcon size={16} aria-hidden />
          </Link>
        </div>

        <div className="bg-navy p-8 text-white sm:p-12">
          <h3 className="text-lg font-semibold">Estimate your earnings</h3>
          <div className="mt-6 space-y-6">
            <RangeField label="Hourly price" display={formatMoney(rate)} min={2} max={15} value={rate} onChange={setRate} />
            <RangeField label="Hours booked per week" display={`${hours} hrs`} min={5} max={80} value={hours} onChange={setHours} />
          </div>
          <div className="mt-8 rounded-2xl border border-white/15 p-5">
            <p className="text-sm text-white/70">You could earn about</p>
            <p className="mt-1 text-4xl font-bold text-accent">
              {formatMoney(Math.round(monthly))}
              <span className="text-base font-medium text-white/70"> /month</span>
            </p>
            <p className="mt-2 text-xs text-white/60">After the {Math.round(brand.fees.hostCommissionRate * 100)}% host fee. Actual earnings vary by location and demand.</p>
          </div>
        </div>
      </div>
    </section>);

}

interface RangeFieldProps {
  label: string;
  display: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}

function RangeField({ label, display, min, max, value, onChange }: RangeFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="text-white/80">
          {label}
        </label>
        <span className="font-semibold">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[rgb(var(--c-accent))]" />
      
    </div>);

}
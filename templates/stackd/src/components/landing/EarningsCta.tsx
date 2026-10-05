import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { formatMoneyExact, formatMoney } from '../../utils/format';

export function EarningsCta() {
  const [price, setPrice] = useState(14);
  const [sales, setSales] = useState(120);
  const gross = price * sales;
  const fee = gross * brand.commissionRate;
  const net = gross - fee;
  const feePct = Math.round(brand.commissionRate * 100);

  return (
    <div className="grid gap-10 overflow-hidden rounded-3xl border-2 border-ink bg-ink p-8 text-white md:p-12 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-brand">For creators</p>
        <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Sell the files you already make.
        </h2>
        <p className="mt-4 max-w-md text-white/75">
          Upload a PDF, ZIP or spreadsheet, set a price (or let fans pay what they want) and get paid every week. No monthly fees.
        </p>
        <ul className="mt-6 space-y-2.5">
          {[`Flat ${feePct}% fee — you keep the rest`, 'Instant delivery & download links handled for you', 'Pay-what-you-want and free products', 'Weekly payouts to your bank'].map((item) =>
          <li key={item} className="flex items-center gap-2.5 text-sm">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-ink">
                <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          )}
        </ul>
        <Link to="/listings/new" className="btn btn-accent btn-lg mt-8 border-brand">
          Start selling — it’s free
        </Link>
      </div>

      <div className="rounded-2xl border-2 border-white bg-white p-6 text-ink shadow-pop-accent md:p-8">
        <p className="font-display text-lg font-bold">Earnings example</p>
        <p className="text-sm text-muted">Drag to see what a month could look like.</p>
        <div className="mt-6 space-y-6">
          <div>
            <div className="flex justify-between text-sm">
              <label htmlFor="earn-price" className="font-semibold">
                Product price
              </label>
              <span className="font-display font-bold">{formatMoney(price)}</span>
            </div>
            <input id="earn-price" type="range" min={1} max={60} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-2 w-full" />
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <label htmlFor="earn-sales" className="font-semibold">
                Sales per month
              </label>
              <span className="font-display font-bold">{sales}</span>
            </div>
            <input id="earn-sales" type="range" min={10} max={500} step={10} value={sales} onChange={(e) => setSales(Number(e.target.value))} className="mt-2 w-full" />
          </div>
        </div>
        <dl className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Gross sales</dt>
            <dd>{formatMoneyExact(gross)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{brand.name} fee ({feePct}%)</dt>
            <dd>−{formatMoneyExact(fee)}</dd>
          </div>
          <div className="flex items-end justify-between border-t border-line pt-3">
            <dt className="font-semibold">You keep / month</dt>
            <dd className="rounded-md border border-ink bg-brand px-2 font-display text-3xl font-bold">{formatMoneyExact(net)}</dd>
          </div>
        </dl>
      </div>
    </div>);

}
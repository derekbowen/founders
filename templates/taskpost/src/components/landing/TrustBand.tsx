import React from 'react';
import { BadgeCheckIcon, LockIcon, ShieldCheckIcon, StarIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { formatMoney } from '../../utils/format';

const items = [
{ icon: BadgeCheckIcon, title: 'Verified pros', text: 'Every pro passes ID verification and a background check before sending offers.' },
{ icon: LockIcon, title: 'Payment held safely', text: 'You pay when you accept, but funds are only released once you confirm the job is done.' },
{ icon: ShieldCheckIcon, title: `${brand.name} Guarantee`, text: `Covered for property damage up to ${formatMoney(brand.guaranteeAmount)} on every booked job.` },
{ icon: StarIcon, title: 'Real reviews only', text: 'Reviews can only be left after a paid, completed job — no fake ratings.' }];


export function TrustBand() {
  return (
    <section className="bg-ink-900" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-primary-400">Trust & safety</p>
          <h2 id="trust-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Built so both sides can say yes with confidence
          </h2>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) =>
          <li key={title} className="rounded-2xl border border-ink-700 bg-ink-800/60 p-6">
              <Icon className="h-7 w-7 text-primary-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-extrabold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{text}</p>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
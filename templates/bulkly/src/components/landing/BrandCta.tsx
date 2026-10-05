import React from 'react';
import { ButtonLink } from '../ui/ButtonLink';
import { brand } from '../../data/brand';
import { sellerSteps } from '../../data/landing';

export function BrandCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl bg-primary-800 lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-300">For brands</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Sell wholesale to {brand.stats.retailers} independent retailers
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-100">
            List your line with case packs and tiered pricing, and we handle payments, credit risk and net terms. No monthly fees —
            just {brand.sellerCommission} on orders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/sell/new" variant="accent" size="lg">
              Start selling wholesale
            </ButtonLink>
            <ButtonLink to="/about" size="lg" className="bg-transparent ring-1 ring-inset ring-white/30 hover:bg-white/10">
              How it works
            </ButtonLink>
          </div>
        </div>
        <ol className="grid gap-px bg-primary-700/60 sm:grid-cols-3 lg:grid-cols-1">
          {sellerSteps.map((s, i) =>
          <li key={s.id} className="flex gap-4 bg-primary-900 p-6 sm:p-8">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-400 text-sm font-bold text-primary-950">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-primary-200">{s.body}</p>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}
import React from 'react';
import { clientLogos } from '../../data/marketing';

export function ClientLogos() {
  return (
    <section className="border-y border-slate-200 bg-white" aria-labelledby="clients-heading">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 id="clients-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Trusted by teams at fast-growing companies
        </h2>
        <ul className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
          {clientLogos.map((name, i) =>
          <li key={name} className="flex items-center justify-center gap-2 text-slate-400 transition-colors hover:text-slate-700">
              <span className={`h-5 w-5 ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-md' : 'rotate-45 rounded-sm'} bg-current`} aria-hidden="true" />
              <span className="text-lg font-extrabold tracking-tight">{name}</span>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
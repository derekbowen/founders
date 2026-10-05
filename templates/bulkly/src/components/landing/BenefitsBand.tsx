import React from 'react';
import { CalendarClockIcon, PackageOpenIcon, Undo2Icon } from 'lucide-react';
import { brand } from '../../data/brand';
import { retailerBenefits } from '../../data/landing';

const icons = { terms: CalendarClockIcon, minimums: PackageOpenIcon, returns: Undo2Icon };

export function BenefitsBand() {
  return (
    <section className="mt-20 bg-accent-300" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-800">For retailers</p>
            <h2 id="benefits-heading" className="mt-2 text-2xl font-bold tracking-tight text-primary-950 sm:text-3xl">
              Buy wholesale with less risk
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-900">
              {brand.name} is built for small shops: buy by the case, try new lines with low minimums, and grow into tier pricing.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {retailerBenefits.map((b) => {
              const Icon = icons[b.id];
              return (
                <li key={b.id} className="rounded-xl bg-white/70 p-5 ring-1 ring-inset ring-primary-950/10">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-800 text-accent-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {'note' in b &&
                    <span className="rounded-full bg-primary-900 px-2 py-0.5 text-[11px] font-semibold text-white">{b.note}</span>
                    }
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-primary-950">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{b.body}</p>
                </li>);

            })}
          </ul>
        </div>
      </div>
    </section>);

}
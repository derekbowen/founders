import React from 'react';
import { CalendarCheckIcon, KeyRoundIcon, SearchIcon, SendIcon } from 'lucide-react';
import { howItWorks } from '../../data/discover';

const icons = [
<SearchIcon key="s" size={22} />,
<SendIcon key="m" size={22} />,
<CalendarCheckIcon key="c" size={22} />,
<KeyRoundIcon key="k" size={22} />];


export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="how-heading">
      <div className="max-w-2xl">
        <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-navy-900">
          How it works
        </h2>
        <p className="mt-2 text-navy-600">
          No online payments, no hidden fees. You talk directly with landlords and flatmates.
        </p>
      </div>
      <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((step, i) =>
        <li key={step.title} className="relative rounded-2xl border border-navy-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-primary-800">
                {icons[i]}
              </span>
              <span className="text-4xl font-bold text-navy-100" aria-hidden>
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-5 font-semibold text-navy-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.text}</p>
          </li>
        )}
      </ol>
    </section>);

}
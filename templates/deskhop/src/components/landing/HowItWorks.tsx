import React from 'react';
import { CalendarCheckIcon, KeyRoundIcon, SearchIcon } from 'lucide-react';

const steps = [
{ icon: SearchIcon, title: 'Find your spot', text: 'Filter by city, space type, amenities and how many seats you need.' },
{ icon: CalendarCheckIcon, title: 'Book by the hour or day', text: 'Pick a time, choose your seats and pay securely. Invoices include your VAT number.' },
{ icon: KeyRoundIcon, title: 'Walk in and work', text: 'Get your door code and wifi details in your inbox the moment the host confirms.' }];


export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="border-y border-line bg-white py-16">
      <div className="container-page">
        <h2 id="how-heading" className="sr-only">
          How it works
        </h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) =>
          <li key={s.title} className="flex gap-4">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white text-brand-700">
                <s.icon size={20} aria-hidden="true" />
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brand-700 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <div>
                <h3 className="font-sans text-base font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.text}</p>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}
import React from 'react';
import type { ItineraryStep } from '../../types/marketplace';

export function Itinerary({ steps }: {steps: ItineraryStep[];}) {
  return (
    <ol className="relative space-y-6 border-l-2 border-dashed border-primary-200 pl-8">
      {steps.map((s, i) =>
      <li key={s.title} className="relative">
          <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white ring-4 ring-white">
            {i + 1}
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-700">{s.time === '0:00' ? 'Start' : `+${s.time}`}</p>
          <h3 className="mt-0.5 text-base font-semibold text-slate-900">{s.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{s.description}</p>
        </li>
      )}
    </ol>);

}
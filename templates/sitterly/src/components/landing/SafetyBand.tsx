import React from 'react';
import { HeartPulseIcon, ShieldCheckIcon, BadgeCheckIcon } from 'lucide-react';
import { safetyPoints, safetyStats } from '../../data/landing';

const icons: Record<string, React.ElementType> = { shield: ShieldCheckIcon, heart: HeartPulseIcon, star: BadgeCheckIcon };

export function SafetyBand() {
  return (
    <section className="bg-primary-900 text-white" aria-labelledby="safety-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-accent-300">Safety you can feel</p>
            <h2 id="safety-heading" className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Peace of mind is built into every booking
            </h2>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {safetyStats.map((s) =>
              <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-heading text-2xl font-bold sm:text-3xl">{s.value}</dd>
                  <dd className="mt-1 text-xs text-primary-200 sm:text-sm">{s.label}</dd>
                </div>
              )}
            </dl>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {safetyPoints.map((p) => {
              const Icon = icons[p.icon];
              return (
                <li key={p.title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
                  <Icon className="h-8 w-8 text-accent-300" aria-hidden />
                  <h3 className="mt-4 font-heading text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-100">{p.text}</p>
                </li>);

            })}
          </ul>
        </div>
      </div>
    </section>);

}
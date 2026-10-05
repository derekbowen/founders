import React from 'react';
import { platformStats, trustPoints } from '../../data/landing';

export function TrustBand() {
  return (
    <section className="bg-primary-800 text-white" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">For parents</p>
            <h2 id="trust-heading" className="mt-3 text-3xl font-semibold tracking-tight">
              Peace of mind, built into every lesson
            </h2>
            <p className="mt-3 text-primary-100">
              We vet every tutor, protect every payment, and stand behind your first lesson — so you can focus on
              progress.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              {platformStats.map((s) =>
              <div key={s.label} className="rounded-2xl bg-white/10 p-4">
                  <dt className="text-sm text-primary-100">{s.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold">{s.value}</dd>
                </div>
              )}
            </dl>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {trustPoints.map((p) =>
            <li key={p.title} className="rounded-2xl bg-white p-6 text-ink-900">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-300 text-ink-900">
                  <p.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{p.text}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}
import React from 'react';
import { howItWorksSteps } from '../../data/landing';

export function HowItWorks() {
  return (
    <section className="container-page py-16" aria-labelledby="how-heading">
      <p className="eyebrow">How it works</p>
      <h2 id="how-heading" className="heading-lg mt-2">From search to serve</h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {howItWorksSteps.map((step, i) =>
        <li key={step.title} className="card p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent font-display text-2xl font-extrabold text-ink">{i + 1}</span>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase">{step.title}</h3>
            <p className="mt-1 text-slate-600">{step.body}</p>
          </li>
        )}
      </ol>
    </section>);

}
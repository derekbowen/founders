import React from 'react';
import { howItWorks } from '../../data/landing';

export function HowItWorks() {
  return (
    <section className="bg-white" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-700">How it works</p>
          <h2 id="how-heading" className="mt-2 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            A trusted sitter in three easy steps
          </h2>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {howItWorks.map((step, i) =>
          <li key={step.title} className="relative rounded-3xl bg-ink-50 p-6 ring-1 ring-ink-200/70">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 font-heading text-lg font-bold text-white">{i + 1}</span>
              <h3 className="mt-5 font-heading text-xl font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{step.text}</p>
            </li>
          )}
        </ol>
      </div>
    </section>);

}
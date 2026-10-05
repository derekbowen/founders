import React from 'react';
import { howItWorksSteps } from '../../data/landing';

export function HowItWorks() {
  return (
    <section className="bg-ink-50" aria-labelledby="how-heading">
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 md:py-20">
        <div className="max-w-xl">
          <h2 id="how-heading" className="text-3xl font-semibold tracking-tight text-ink-900">
            How it works
          </h2>
          <p className="mt-2 text-ink-600">Three steps from "I'm stuck" to "I've got this."</p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {howItWorksSteps.map((step, i) =>
          <li key={step.title} className="relative rounded-2xl border border-ink-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white">
                  <step.icon size={22} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-primary-700">Step {i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
            </li>
          )}
        </ol>
      </div>
    </section>);

}
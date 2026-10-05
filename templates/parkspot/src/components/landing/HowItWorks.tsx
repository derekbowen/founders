import React from 'react';
import { howItWorksSteps } from '../../data/landing';

export function HowItWorks() {
  return (
    <section className="border-y border-line bg-surface" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">How it works</p>
            <h2 id="how-heading" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Reserve before you leave home
            </h2>
          </div>
          <p className="max-w-sm text-muted">No meters, no tickets, no circling the block. Your spot is waiting when you arrive.</p>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, i) =>
          <li key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-ink">
                  {i + 1}
                </span>
                {i < howItWorksSteps.length - 1 && <span className="hidden h-px flex-1 border-t-2 border-dashed border-line lg:block" aria-hidden />}
              </div>
              <h3 className="mt-5 font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{step.text}</p>
            </li>
          )}
        </ol>
      </div>
    </section>);

}
import React from 'react';
import { howItWorks } from '../../data/content';
import { SectionHeader } from './SectionHeader';

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
      <SectionHeader
        kicker="How renting works"
        title={
        <>
            Four steps to <em className="text-accent-dark">your best-dressed</em> night
          </>
        } />
      
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((s) =>
        <li key={s.step} className="bg-paper p-6 transition-colors hover:bg-cream/60 md:p-8">
            <span className="font-display text-5xl italic text-accent">{s.step}</span>
            <h3 className="mt-6 font-display text-2xl text-ink">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
          </li>
        )}
      </ol>
    </section>);

}
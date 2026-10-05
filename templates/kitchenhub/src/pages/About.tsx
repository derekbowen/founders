import React from 'react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { brand } from '../data/brand';
import { segments } from '../data/catalog';
import { images } from '../data/images';
import { aboutValues, stats } from '../data/marketing';
import { cn, containerClass } from '../utils/styles';

export function AboutPage() {
  return (
    <>
      <section className={cn(containerClass, 'py-16 lg:py-24')}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About {brand.name}</p>
        <h1 className="mt-3 max-w-4xl font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-steel-900 sm:text-6xl">
          Every great food business deserves a licensed kitchen
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-600">
          {brand.name} started when a caterer and a commissary owner realized the same thing: thousands of commercial kitchens sit empty every night while food entrepreneurs can’t find a place to cook legally.
        </p>
      </section>
      <div className={containerClass}>
        <img src={images.team} alt="Food entrepreneurs cooking together in a shared commercial kitchen" className="aspect-[21/9] w-full rounded-3xl object-cover" />
      </div>
      <section className={cn(containerClass, 'py-16')} aria-label="By the numbers">
        <dl className="grid grid-cols-2 gap-8 border-y border-steel-200 py-10 md:grid-cols-4">
          {stats.map((s) =>
          <div key={s.label}>
              <dd className="font-heading text-4xl font-bold text-steel-900">{s.value}</dd>
              <dt className="mt-1 text-sm text-steel-500">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>
      <section className={cn(containerClass, 'pb-16')} aria-labelledby="values-heading">
        <h2 id="values-heading" className="font-heading text-3xl font-bold uppercase tracking-tight text-steel-900 sm:text-4xl">What we believe</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {aboutValues.map((v, i) =>
          <div key={v.title} className="border-t-2 border-steel-900 pt-5">
              <span className="font-heading text-4xl font-bold text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-steel-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-600">{v.body}</p>
            </div>
          )}
        </div>
      </section>
      <section className="bg-steel-50 py-16" aria-labelledby="who-heading">
        <div className={containerClass}>
          <h2 id="who-heading" className="font-heading text-3xl font-bold uppercase tracking-tight text-steel-900">Who we serve</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {segments.map((s) =>
            <li key={s.key} className="rounded-2xl bg-white p-5 shadow-card">
                <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-steel-900">{s.label}</h3>
                <p className="mt-1.5 text-sm text-steel-600">{s.description}</p>
              </li>
            )}
          </ul>
        </div>
      </section>
      <section className={cn(containerClass, 'py-20 text-center')}>
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-steel-900 sm:text-4xl">Ready to cook?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/search" size="lg">Find a kitchen</ButtonLink>
          <ButtonLink to="/listings/new" variant="accent" size="lg">List your kitchen</ButtonLink>
        </div>
      </section>
    </>);

}
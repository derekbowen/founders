import React from 'react';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ButtonLink } from '../components/ui/ButtonLink';
import { brand } from '../data/brand';
import { aboutStats, aboutValues } from '../data/marketing';
import { covers } from '../data/images';

export function About() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">About {brand.name}</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Great work starts with a clear agreement.</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {brand.name} is a marketplace where clients describe what they need and independent freelancers respond with tailored offers. No bidding wars, no guesswork — just a transparent negotiation and protected payments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/s" size="lg">Find a freelancer</ButtonLink>
              <ButtonLink to="/create-listing" size="lg" variant="secondary">Offer your services</ButtonLink>
            </div>
          </div>
          <img src={covers.saasUi} alt="A designer's workspace showing a dashboard design" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-label="Company facts">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {aboutStats.map((s) =>
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6">
              <dt className="text-sm text-slate-500">{s.label}</dt>
              <dd className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">{s.value}</dd>
            </div>
          )}
        </dl>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What we believe</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {aboutValues.map((v, i) =>
          <article key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold ${i === 1 ? 'bg-accent-100 text-accent-800' : 'bg-primary-50 text-primary-700'}`}>0{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
            </article>
          )}
        </div>
      </section>
    </div>);

}
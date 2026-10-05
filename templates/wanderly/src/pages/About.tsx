import React from 'react';
import { Button } from '../components/ui/Button';
import { aboutStats, aboutValues } from '../data/marketing';
import { images } from '../data/images';
import { brand } from '../data/brand';

export function About() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">About {brand.name}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          We believe the best way to see a city is through the eyes of someone who loves it.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          {brand.name} started in 2020 with a single food walk in Lisbon. Today thousands of locals host small-group experiences in cities around the world — and keep most of what they earn.
        </p>
      </section>
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <img src={images.aboutTeam} alt="Hosts and travelers sharing a rooftop dinner" className="aspect-[21/9] w-full rounded-3xl object-cover" />
      </div>
      <section className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {aboutStats.map((s) =>
          <div key={s.label} className="rounded-2xl bg-sand-100 p-6">
              <dd className="font-display text-4xl font-bold text-primary-700">{s.value}</dd>
              <dt className="mt-1 text-sm font-medium text-slate-700">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>
      <section className="bg-sand-50 py-16">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">What we stand for</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {aboutValues.map(({ icon: Icon, title, text }) =>
            <li key={title} className="rounded-2xl bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700"><Icon className="h-5 w-5" aria-hidden /></span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            )}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button to="/s" size="lg">Find an experience</Button>
            <Button to="/host/new/details" size="lg" variant="outline">Become a host</Button>
          </div>
        </div>
      </section>
    </div>);

}
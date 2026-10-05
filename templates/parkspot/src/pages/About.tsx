import React from 'react';
import { Link } from 'react-router-dom';
import { aboutStats, aboutValues } from '../data/about';
import { brand } from '../data/brand';
import { heroImage } from '../data/landing';
import { buttonClass } from '../utils/styles';

export function About() {
  return (
    <div className="w-full bg-canvas">
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">About {brand.name}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            We turn the city’s empty driveways into the easiest parking you’ll ever find.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            {brand.name} started when our founder spent 25 minutes circling Mission Bay before a Warriors game — past dozens of empty driveways. Today, thousands of neighbors share their spaces with drivers across the {brand.marketCity}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <dl className="-mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card md:grid-cols-4">
          {aboutStats.map((s) =>
          <div key={s.label} className="bg-surface p-6">
              <dd className="text-3xl font-bold">{s.value}</dd>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
        <img src={heroImage} alt="A San Francisco street with a private driveway" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">What we believe</h2>
          <ul className="mt-6 space-y-6">
            {aboutValues.map((v, i) =>
            <li key={v.title} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted">{v.text}</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Ready to park — or host?</h2>
            <p className="mt-1 text-muted">Questions? Write to us at {brand.supportEmail}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/s" className={buttonClass('primary')}>
              Find parking
            </Link>
            <Link to="/listings/new" className={buttonClass('accent')}>
              List your space
            </Link>
          </div>
        </div>
      </section>
    </div>);

}
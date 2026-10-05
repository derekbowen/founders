import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../data/brand';
import { aboutStats, aboutValues, howItWorks } from '../data/about';
import { makers } from '../data/makers';
import { ButtonLink } from '../components/ui/ButtonLink';

const HERO = "/0e73a767-45e6-4dec-addd-eb214622f70e.jpg";

export function About() {
  return (
    <div>
      <section className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">About {brand.name}</p>
          <h1 className="mt-3 text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            A marketplace with <em className="italic text-primary">clay on its hands</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {brand.name} started in a shared studio in Portland, when a handful of makers got tired of competing with factories on platforms that weren’t built for them. Today, we’re home to thousands of independent studios — and the people who love what they make.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/s" size="lg">Explore the marketplace</ButtonLink>
            <ButtonLink to="/signup" variant="secondary" size="lg">Become a maker</ButtonLink>
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-[5/6]">
          <img src={HERO} alt="A weaver at her floor loom" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <dl className="container-page grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {aboutStats.map((s) =>
          <div key={s.label}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-1 font-heading text-4xl font-medium text-primary-ink">{s.value}</dd>
            </div>
          )}
        </dl>
      </section>

      <section className="container-page py-20">
        <h2 className="text-4xl font-medium tracking-tight">What we stand for</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {aboutValues.map((v, i) =>
          <div key={v.title} className="card p-7">
              <span className="font-heading text-3xl italic text-primary">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-2xl font-medium">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-accent-soft py-20">
        <div className="container-page">
          <h2 className="text-4xl font-medium tracking-tight">How buying works</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) =>
            <li key={s.step}>
                <span className="text-sm font-semibold text-accent-ink">{s.step}</span>
                <h3 className="mt-2 text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.body}</p>
              </li>
            )}
          </ol>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-4xl font-medium tracking-tight">A few of our makers</h2>
        <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {makers.map((m) =>
          <li key={m.id}>
              <Link to={`/shop/${m.id}`} className="group block">
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img src={m.portrait} alt={m.ownerName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-3 text-sm font-medium group-hover:text-primary-ink">{m.shopName}</p>
                <p className="text-xs text-muted">{m.location}</p>
              </Link>
            </li>
          )}
        </ul>
      </section>
    </div>);

}
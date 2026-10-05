import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshakeIcon, MapPinnedIcon, PawPrintIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { aboutImage, aboutValues, landingStats } from '../data/landing';

const icons = [PawPrintIcon, HeartHandshakeIcon, MapPinnedIcon];

export function About() {
  return (
    <div>
      <section className="bg-primary-50">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow">About {brand.name}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight text-ink-900 sm:text-5xl">Neighbors caring for each other’s pets</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-700">
              {brand.name} started in 2020 when our founders couldn’t find anyone they trusted to watch their anxious rescue pup. Today we help thousands of pet parents find loving, vetted sitters just around the corner.
            </p>
            <dl className="mt-8 flex flex-wrap gap-8">
              {landingStats.map((s) =>
              <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-black text-ink-900">{s.value}</dd>
                  <dd className="text-sm font-semibold text-ink-600">{s.label}</dd>
                </div>
              )}
            </dl>
          </div>
          <img src={aboutImage} alt={`The ${brand.name} team with their dogs`} className="aspect-[16/10] w-full rounded-[2.5rem] object-cover shadow-lift" />
        </div>
      </section>

      <section className="container-page py-16 lg:py-24" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-3xl font-black tracking-tight text-ink-900">
          What we believe
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {aboutValues.map((v, i) => {
            const Icon = icons[i];
            return (
              <li key={v.title} className="card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.text}</p>
              </li>);

          })}
        </ul>
      </section>

      <section className="container-page pb-16 lg:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2.5rem] bg-accent-800 p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">Ready to meet your sitter?</h2>
            <p className="mt-2 text-accent-100">Browse vetted sitters near you or start earning by caring for pets.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/search" className="btn btn-lg btn-primary">
              Find a sitter
            </Link>
            <Link to="/create-listing" className="btn btn-lg border border-white/30 text-white hover:bg-white/10">
              Become a sitter
            </Link>
          </div>
        </div>
      </section>
    </div>);

}
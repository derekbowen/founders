import React from 'react';
import { Link } from 'react-router-dom';
import { Building2Icon, GlobeIcon, LeafIcon, UsersIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { photos } from '../data/images';

const values = [
{ icon: GlobeIcon, title: 'Work is a place, not a lease', text: 'Book exactly the space you need, for exactly as long as you need it.' },
{ icon: Building2Icon, title: 'Great hosts, fairly paid', text: 'Hosts keep 90% of every booking and get paid weekly.' },
{ icon: UsersIcon, title: 'Built for teams', text: 'Team plans give distributed companies one bill and an office in every city.' },
{ icon: LeafIcon, title: 'Less commuting', text: 'Work near home and cut the average commute by 38 minutes a day.' }];


const stats = [
{ value: '1,200+', label: 'Bookable spaces' },
{ value: '18k', label: 'Bookings last month' },
{ value: '4.9', label: 'Average rating' },
{ value: '5', label: 'Cities and growing' }];


export function About() {
  return (
    <div>
      <section className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">About {brand.name}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            We help people work wherever they do their best work
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            {brand.name} started in 2023 when two freelancers got tired of paying for monthly desks they used twice a week. Today we connect thousands of people with independent coworking spaces across Europe and the US.
          </p>
        </div>
        <img src={photos.teamBand} alt="Team working together in a bright coworking space" className="aspect-[4/3] w-full rounded-3xl object-cover" />
      </section>

      <section className="border-y border-line bg-mist">
        <dl className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) =>
          <div key={s.label}>
              <dd className="font-display text-3xl font-semibold">{s.value}</dd>
              <dt className="mt-1 text-sm text-ink-muted">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>

      <section className="container-page py-16 lg:py-20">
        <h2 className="text-3xl font-semibold">What we believe</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) =>
          <li key={v.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <v.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-sans text-base font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{v.text}</p>
            </li>
          )}
        </ul>
      </section>

      <section className="container-page pb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-900 p-8 sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Have spare desks or rooms?</h2>
            <p className="mt-2 text-brand-100">Join hundreds of hosts earning from their space on {brand.name}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/listings/new" className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-50">
              List your space
            </Link>
            <a href={`mailto:${brand.salesEmail}`} className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Ask about team plans
            </a>
          </div>
        </div>
      </section>
    </div>);

}
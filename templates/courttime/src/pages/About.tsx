import React from 'react';
import { Link } from 'react-router-dom';
import { HandshakeIcon, TimerIcon, UsersIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { images } from '../data/images';

const values = [
{ icon: TimerIcon, title: 'Seconds, not phone calls', body: 'Live hourly availability means no more calling the front desk to ask if Court 3 is free.' },
{ icon: UsersIcon, title: 'Nobody plays alone', body: 'Open-play seats let solo players drop into skill-matched games any day of the week.' },
{ icon: HandshakeIcon, title: 'Fair for hosts', body: 'Clubs and court owners keep their pricing, rules and calendar — we just fill the empty hours.' }];


const stats = [
{ value: '120k', label: 'hours booked' },
{ value: '38', label: 'partner clubs' },
{ value: '9,400', label: 'open-play seats filled' },
{ value: '4.8★', label: 'average review' }];


export function About() {
  return (
    <>
      <section className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">About {brand.name}</p>
          <h1 className="heading-xl mt-3">More time <span className="text-brand">on court</span></h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-700">
            We started {brand.name} in {brand.city} after one too many evenings spent driving between full courts. Today players book tennis, pickleball, padel, basketball, soccer and volleyball in a few taps — and clubs turn quiet hours into community.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/search" className="btn btn-primary btn-lg">Find a court</Link>
            <Link to="/create-listing" className="btn btn-outline btn-lg">List your court</Link>
          </div>
        </div>
        <img src={images.openPlay} alt="Players high-fiving after an open-play pickleball session" className="aspect-[4/3] w-full rounded-3xl object-cover" />
      </section>

      <section className="bg-ink py-14" aria-label="By the numbers">
        <dl className="container-page grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s) =>
          <div key={s.label}>
              <dd className="font-display text-5xl font-extrabold text-accent">{s.value}</dd>
              <dt className="mt-1 text-sm uppercase tracking-wide text-white/70">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>

      <section className="container-page py-16" aria-labelledby="values-heading">
        <h2 id="values-heading" className="heading-lg">What we believe</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((v) =>
          <div key={v.title} className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand"><v.icon size={22} aria-hidden="true" /></span>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase">{v.title}</h3>
              <p className="mt-1 text-slate-600">{v.body}</p>
            </div>
          )}
        </div>
      </section>

      <section className="container-page pb-20" aria-labelledby="hosting-heading">
        <div className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 md:grid-cols-2">
          <img src={images.coach} alt="" className="h-64 w-full object-cover md:h-full" />
          <div className="p-8 sm:p-12">
            <p className="eyebrow">How hosting works</p>
            <h2 id="hosting-heading" className="heading-lg mt-2">List once, fill every week</h2>
            <ol className="mt-5 space-y-3 text-slate-700">
              <li><strong>1.</strong> Create a listing with photos, surface, amenities and weekly hours.</li>
              <li><strong>2.</strong> Set an hourly price and optional open-play seat price.</li>
              <li><strong>3.</strong> Accept bookings, chat with players and get paid weekly.</li>
            </ol>
            <Link to="/create-listing" className="btn btn-accent btn-lg mt-8">Start your listing</Link>
          </div>
        </div>
      </section>
    </>);

}
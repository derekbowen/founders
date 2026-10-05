import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshakeIcon, LeafIcon, SproutIcon } from 'lucide-react';
import { brand } from '../data/brand';
import { images } from '../data/images';

const values = [
{ icon: LeafIcon, title: 'Leave it better', text: 'Every booking funds trail work and habitat restoration through our 1% for the Wild pledge.' },
{ icon: SproutIcon, title: 'Keep land working', text: 'Camping income helps family farms and ranches stay in the family — and stay open space.' },
{ icon: HeartHandshakeIcon, title: 'Hosts first', text: 'Landowners set the rules. We back them with insurance, support and fair fees.' }];


export function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={images.stars} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-primary-900/60" />
        <div className="container-page py-24 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-100">About {brand.name}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">More places to camp. More reasons to keep land wild.</h1>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-2 text-3xl font-bold text-ink-900">It started with a full campground</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink-700">
            <p>
              In 2019 we drove six hours to Yosemite only to find every site booked months out. A rancher down the road let us pitch by his creek for
              twenty bucks and a promise to close the gate. It was the best night of the trip.
            </p>
            <p>
              {brand.name} connects campers with thousands of landowners like him — farmers, ranchers, vintners and foresters who have room to share and
              stories to tell. Campers get quiet, uncrowded sites. Hosts earn income that helps keep their land open.
            </p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-4 self-start">
          {[
          ['4,200+', 'private sites'],
          ['$38M', 'paid to hosts'],
          ['1.2M', 'nights camped'],
          ['48', 'states']].
          map(([v, l]) =>
          <div key={l} className="card p-6">
              <dd className="font-serif text-3xl font-extrabold text-primary-700">{v}</dd>
              <dt className="mt-1 text-sm text-ink-500">{l}</dt>
            </div>
          )}
        </dl>
      </section>

      <section className="border-y border-sand-200 bg-white py-16 md:py-20">
        <div className="container-page">
          <p className="eyebrow">What we believe</p>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {values.map((v) =>
            <li key={v.title}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary-700">
                  <v.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.text}</p>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="container-page py-16 text-center md:py-24">
        <h2 className="text-3xl font-bold text-ink-900">Ready to head out?</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-500">Find a quiet site for this weekend, or share your land with campers who’ll love it as much as you do.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/s" className="btn-primary btn-lg">
            Find a campsite
          </Link>
          <Link to="/l/new" className="btn-outline btn-lg">
            {brand.hostCta}
          </Link>
        </div>
      </section>
    </>);

}
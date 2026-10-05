import React from 'react';
import { ArrowRightIcon, HandshakeIcon, MapPinIcon, ScaleIcon, ShieldCheckIcon } from 'lucide-react';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ButtonLink } from '../components/ui/ButtonLink';
import { brand } from '../data/brand';
import { images } from '../data/images';

const values = [
{ icon: ScaleIcon, title: 'Fair prices, both ways', text: 'Customers set a budget, pros set their price. Negotiation happens in the open — no lead fees, no bidding wars.' },
{ icon: MapPinIcon, title: 'Local first', text: `Every pro on ${brand.name} lives and works in the neighborhoods they serve.` },
{ icon: ShieldCheckIcon, title: 'Safety built in', text: 'Verified identities, payment held until completion, and a guarantee on every booked job.' },
{ icon: HandshakeIcon, title: 'Respect for the trade', text: 'Pros keep 90% of every job and get paid within two business days of completion.' }];


export function About() {
  return (
    <div className="bg-ink-50">
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary-700">About {brand.name}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
              We flipped the home-services marketplace.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              On most platforms, you scroll through hundreds of profiles and hope someone is free. On {brand.name}, you describe the job once and
              local pros come to you with real prices and real dates. It’s faster for customers and fairer for pros.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/post-job" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
                Post a job
              </ButtonLink>
              <ButtonLink to="/search" variant="secondary">
                Find work
              </ButtonLink>
            </div>
          </div>
          <img src={images.hero} alt="A pro and homeowner working together" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
          { v: brand.stats.pros, k: 'verified local pros' },
          { v: `${brand.stats.avgRating}★`, k: 'average job rating' },
          { v: brand.stats.firstOffer, k: 'median time to first offer' }].
          map((s) =>
          <li key={s.k} className="rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-card">
              <p className="text-4xl font-extrabold text-ink-900">{s.v}</p>
              <p className="mt-1 text-sm font-semibold text-ink-600">{s.k}</p>
            </li>
          )}
        </ul>
      </section>

      <HowItWorks />

      <section className="border-t border-ink-200 bg-white" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 id="values-heading" className="text-3xl font-extrabold tracking-tight text-ink-900">
            What we believe
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) =>
            <li key={title} className="flex gap-4 rounded-2xl border border-ink-200 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-ink-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{text}</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>);

}
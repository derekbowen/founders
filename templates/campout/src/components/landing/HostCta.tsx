import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { images } from '../../data/images';

const perks = [
'You set prices, rules and which nights are open',
'Up to $1M liability coverage on every booking',
'Payouts land 24 hours after guests check in'];


export function HostCta() {
  return (
    <section className="container-page py-16 md:py-24" aria-labelledby="host-cta-heading">
      <div className="grid overflow-hidden rounded-3xl bg-primary-800 lg:grid-cols-2">
        <div className="p-8 md:p-12 lg:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-200">For landowners</p>
          <h2 id="host-cta-heading" className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
            Turn your back forty into a favorite place to camp
          </h2>
          <p className="mt-4 max-w-md text-primary-100">
            Farms, ranches, orchards and woodlots earn an average of <span className="font-semibold text-white">$9,400 a year</span> hosting a
            few campsites on {brand.name}. No building required.
          </p>
          <ul className="mt-6 space-y-3">
            {perks.map((p) =>
            <li key={p} className="flex items-start gap-3 text-sm text-primary-50">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500 text-white">
                  <CheckIcon size={12} aria-hidden="true" />
                </span>
                {p}
              </li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/l/new" className="btn-accent btn-lg">
              {brand.hostCta}
            </Link>
            <Link to="/about" className="btn btn-lg border border-primary-500 text-white hover:bg-primary-700">
              How hosting works
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px]">
          <img src={images.host} alt="A farmer standing beside a campsite on his land" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>);

}
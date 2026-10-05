import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { photos } from '../../data/images';

const perks = [
'One monthly invoice with VAT for the whole team',
'Pooled credits — anyone can book any city',
'Spend limits, approvals and usage reports',
'Priority support and dedicated account manager'];


export function TeamPlans() {
  return (
    <section aria-labelledby="teams-heading" className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-3xl bg-brand-900 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-200">Team plans</p>
            <h2 id="teams-heading" className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              A flexible office for your whole distributed team
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-brand-100">
              Give everyone access to {brand.name} spaces in every city, without long leases. Plans start at €490/month for 10 people.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((p) =>
              <li key={p} className="flex items-start gap-3 text-sm text-white">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/25 text-brand-200">
                    <CheckIcon size={13} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              )}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${brand.salesEmail}`}
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900">
                
                Talk to sales
              </a>
              <Link
                to="/about"
                className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                
                How team plans work
              </Link>
            </div>
          </div>
          <div className="relative min-h-[280px]">
            <img src={photos.teamBand} alt="Team collaborating around a large table" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>);

}
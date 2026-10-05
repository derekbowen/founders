import React from 'react';
import { CheckIcon } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { freelancerBenefits } from '../../data/marketing';
import { covers } from '../../data/images';
import { brand } from '../../data/brand';

export function FreelancerCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
      <div className="grid overflow-hidden rounded-3xl bg-primary-900 lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">For freelancers</p>
          <h2 id="cta-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Turn your skills into steady, well-paid work
          </h2>
          <p className="mt-4 max-w-md text-primary-100">
            Publish a service on {brand.name}, receive project briefs from serious clients, and send offers on your terms.
          </p>
          <ul className="mt-6 space-y-3">
            {freelancerBenefits.map((b) =>
            <li key={b} className="flex items-start gap-3 text-sm text-white">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-400 text-accent-900">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {b}
              </li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/create-listing" variant="accent" size="lg">Offer your services</ButtonLink>
            <ButtonLink to="/about" size="lg" className="bg-transparent text-white shadow-none ring-1 ring-inset ring-primary-400 hover:bg-primary-800">
              Learn more
            </ButtonLink>
          </div>
        </div>
        <div className="relative hidden min-h-[320px] lg:block">
          <img src={covers.webflowLanding} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>);

}
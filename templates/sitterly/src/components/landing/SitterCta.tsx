import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { sitterPerks } from '../../data/landing';
import { buttonLinkClass } from '../ui/BrandButton';

const CTA_IMAGE = "/43a501a4-8bb4-44ad-9ed5-b4ede2d820e2.jpg";

export function SitterCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24" aria-labelledby="sitter-cta-heading">
      <div className="grid overflow-hidden rounded-[2rem] bg-accent-100 lg:grid-cols-2">
        <div className="p-8 sm:p-12 lg:p-14">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-800">For sitters</p>
          <h2 id="sitter-cta-heading" className="mt-2 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            Earn $18–35/hour caring for local kids
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-700">
            Join thousands of sitters building flexible income around school, work, and life. Sign up in 10 minutes.
          </p>
          <ul className="mt-6 space-y-3">
            {sitterPerks.map((p) =>
            <li key={p} className="flex items-center gap-3 text-ink-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-accent-700">
                  <CheckIcon className="h-4 w-4" aria-hidden />
                </span>
                {p}
              </li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup?type=sitter" className={buttonLinkClass('primary', 'lg')}>
              Become a sitter
            </Link>
            <Link to="/about" className={buttonLinkClass('outline', 'lg')}>
              Learn more
            </Link>
          </div>
        </div>
        <img src={CTA_IMAGE} alt="A sitter building wooden blocks with a toddler" className="h-72 w-full object-cover lg:h-full" />
      </div>
    </section>);

}
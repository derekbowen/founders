import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BabyIcon, BackpackIcon, BedDoubleIcon, HeartHandshakeIcon, MoonStarIcon } from 'lucide-react';
import { careTypes } from '../../data/careTypes';
import { CareTypeId } from '../../types/sitter';

const icons: Record<CareTypeId, React.ElementType> = {
  'date-night': MoonStarIcon,
  'after-school': BackpackIcon,
  overnight: BedDoubleIcon,
  'special-needs': HeartHandshakeIcon,
  newborn: BabyIcon
};

export function CareTypes() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="care-types-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary-700">Care for every moment</p>
          <h2 id="care-types-heading" className="mt-2 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">
            What kind of help do you need?
          </h2>
        </div>
        <Link to="/s" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
          Browse all sitters <ArrowRightIcon className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {careTypes.map((c) => {
          const Icon = icons[c.id];
          return (
            <li key={c.id}>
              <Link
                to={`/s?care=${c.id}`}
                className="group flex h-full flex-col rounded-3xl border border-ink-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tone === 'primary' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'}`}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-ink-900">{c.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">{c.description}</p>
                <p className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-ink-600">
                    From <span className="font-bold text-ink-900">${c.fromRate}/hr</span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-primary-600 transition group-hover:translate-x-1" aria-hidden />
                </p>
              </Link>
            </li>);

        })}
      </ul>
    </section>);

}
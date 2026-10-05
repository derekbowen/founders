import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { listings } from '../../data/listings';
import { spaceTypes } from '../../data/spaceTypes';
import { formatMoney } from '../../utils/format';

export function SpaceTypesSection() {
  return (
    <section aria-labelledby="space-types-heading" className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Space types</p>
            <h2 id="space-types-heading" className="mt-2 text-3xl font-semibold sm:text-4xl">
              The right space for every kind of work
            </h2>
          </div>
          <Link to="/s" className="link inline-flex items-center gap-1 text-sm">
            Browse all spaces <ArrowRightIcon size={15} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {spaceTypes.map((t) => {
            const ofType = listings.filter((l) => l.spaceType === t.id);
            const from = Math.min(...ofType.map((l) => l.pricePerHour));
            return (
              <li key={t.id}>
                <Link
                  to={`/s?type=${t.id}`}
                  className="focus-ring group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-pop">
                  
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <t.icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-sans text-base font-semibold">{t.label}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-muted">{t.description}</p>
                  <p className="mt-4 text-sm">
                    <span className="text-ink-muted">From </span>
                    <span className="font-semibold">{formatMoney(from)}</span>
                    <span className="text-ink-muted">/hour</span>
                  </p>
                </Link>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}
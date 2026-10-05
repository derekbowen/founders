import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { siteTypes } from '../../data/siteTypes';
import { listings } from '../../data/listings';

export function SiteTypeGrid() {
  return (
    <section className="container-page py-16 md:py-20" aria-labelledby="site-types-heading">
      <p className="eyebrow">Find your kind of camp</p>
      <h2 id="site-types-heading" className="mt-2 text-3xl font-bold text-ink-900 md:text-4xl">
        Every way to sleep outside
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {siteTypes.map((t) => {
          const Icon = t.icon;
          const count = listings.filter((l) => l.siteType === t.key).length;
          return (
            <li key={t.key}>
              <Link
                to={`/s?type=${t.key}`}
                className="group flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card">
                
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="mt-4 font-serif text-lg font-bold text-ink-900">{t.label}</span>
                <span className="mt-1 text-xs leading-relaxed text-ink-500">{t.description}</span>
                <span className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-primary-700">
                  {count} {count === 1 ? 'site' : 'sites'}
                  <ArrowRightIcon size={13} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>);

        })}
      </ul>
    </section>);

}
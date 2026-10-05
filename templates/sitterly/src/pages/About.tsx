import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from 'lucide-react';
import { aboutStats, aboutValues } from '../data/about';
import { brand } from '../data/brand';
import { buttonLinkClass } from '../components/ui/BrandButton';

const TEAM_IMAGE = "/a1b0a6b6-faeb-472c-968a-201a1f542e7c.jpg";

export function About() {
  return (
    <div>
      <section className="bg-primary-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-wider text-primary-700">About {brand.name}</p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-ink-900 sm:text-5xl">Making it easy to say yes to a night out</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
            {brand.name} connects families in {brand.city} with caring, vetted sitters — and gives sitters a fair, flexible way to earn.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <img src={TEAM_IMAGE} alt={`A group of smiling ${brand.name} sitters in a park`} className="-mt-8 aspect-[16/7] w-full rounded-[2rem] object-cover shadow-lift" />
        <dl className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {aboutStats.map((s) =>
          <div key={s.label} className="rounded-3xl bg-white p-6 text-center ring-1 ring-ink-200">
              <dd className="font-heading text-3xl font-bold text-primary-700">{s.value}</dd>
              <dt className="mt-1 text-sm text-ink-600">{s.label}</dt>
            </div>
          )}
        </dl>
        <section className="py-16 lg:py-24" aria-labelledby="values-heading">
          <h2 id="values-heading" className="font-heading text-3xl font-bold text-ink-900">What we believe</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {aboutValues.map((v) =>
            <li key={v.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink-200">
                <HeartIcon className="h-6 w-6 fill-accent-200 text-accent-600" aria-hidden />
                <h3 className="mt-4 font-heading text-xl font-bold text-ink-900">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{v.text}</p>
              </li>
            )}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/s" className={buttonLinkClass('primary', 'lg')}>Find a sitter</Link>
            <Link to="/listings/new" className={buttonLinkClass('outline', 'lg')}>Become a sitter</Link>
          </div>
        </section>
      </div>
    </div>);

}
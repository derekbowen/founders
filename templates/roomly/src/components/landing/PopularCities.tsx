import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, GraduationCapIcon, MapPinIcon } from 'lucide-react';
import { popularCities, universities } from '../../data/discover';
import { formatMoney } from '../../utils/format';

export function PopularCities() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="cities-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="cities-heading" className="text-3xl font-bold tracking-tight text-navy-900">
            Popular cities
          </h2>
          <p className="mt-2 text-navy-600">Where students and remote workers are moving this season.</p>
        </div>
        <Link to="/s" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
          See all rooms →
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {popularCities.map((city) =>
        <li key={city.name}>
            <Link
            to={`/s?city=${city.name}`}
            className={`group flex h-full flex-col justify-between rounded-2xl ${city.color} p-5 transition hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200`}>
            
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-navy-900">
                  <MapPinIcon size={18} />
                </span>
                <ArrowUpRightIcon
                size={18}
                className="text-navy-400 transition group-hover:text-navy-900"
                aria-hidden />
              
              </div>
              <div className="mt-8">
                <p className="text-lg font-semibold text-navy-900">{city.name}</p>
                <p className="text-xs text-navy-600">{city.country}</p>
                <p className="mt-3 text-xs text-navy-700">
                  {city.rooms.toLocaleString()} rooms · avg {formatMoney(city.avgRent)}
                </p>
              </div>
            </Link>
          </li>
        )}
      </ul>

      <div className="mt-12">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-navy-900">
          <GraduationCapIcon size={20} className="text-primary-700" aria-hidden /> Rooms near universities
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {universities.map((u) =>
          <li key={u.name}>
              <Link
              to={`/s?city=${u.city}`}
              className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm text-navy-700 transition hover:border-primary-400 hover:bg-primary-50 hover:text-navy-900">
              
                <span className="font-semibold text-navy-900">{u.short}</span>
                <span className="text-navy-400">·</span>
                {u.name}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
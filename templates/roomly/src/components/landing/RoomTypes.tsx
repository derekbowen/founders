import React from 'react';
import { Link } from 'react-router-dom';
import { BedDoubleIcon, Building2Icon, SofaIcon, UsersIcon } from 'lucide-react';
import { roomTypes } from '../../data/discover';
import type { RoomType } from '../../types/listing';

const icons: Record<RoomType, React.ReactNode> = {
  private: <BedDoubleIcon size={24} />,
  studio: <SofaIcon size={24} />,
  shared: <UsersIcon size={24} />,
  whole: <Building2Icon size={24} />
};

export function RoomTypes() {
  return (
    <section className="bg-white" aria-labelledby="room-types-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 id="room-types-heading" className="text-3xl font-bold tracking-tight text-navy-900">
          Browse by room type
        </h2>
        <p className="mt-2 text-navy-600">From budget shared rooms to a whole flat for the year.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roomTypes.map((type) =>
          <li key={type.id}>
              <Link
              to={`/s?type=${type.id}`}
              className="group flex h-full items-start gap-4 rounded-2xl border border-navy-100 p-5 transition hover:border-primary-300 hover:bg-primary-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200">
              
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-primary-300 transition group-hover:bg-primary-400 group-hover:text-navy-900">
                  {icons[type.id]}
                </span>
                <span>
                  <span className="block font-semibold text-navy-900">{type.label}</span>
                  <span className="mt-1 block text-sm text-navy-500">{type.description}</span>
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
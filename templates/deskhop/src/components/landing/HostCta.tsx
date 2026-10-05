import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { photos } from '../../data/images';

const stats = [
{ value: '€2,400', label: 'Avg. monthly host earnings' },
{ value: '72%', label: 'Average desk occupancy' },
{ value: '0€', label: 'To list — pay only when booked' }];


export function HostCta() {
  return (
    <section aria-labelledby="host-heading" className="bg-mist py-16 lg:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">For space hosts</p>
          <h2 id="host-heading" className="mt-2 text-3xl font-semibold sm:text-4xl">
            Turn empty desks into steady revenue
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
            List hot desks, offices and meeting rooms in minutes. Set your hours, seats and prices — {brand.name} handles bookings, payments and invoices.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) =>
            <div key={s.label} className="rounded-2xl bg-white p-4 shadow-card">
                <dt className="text-xs text-ink-muted">{s.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-ink">{s.value}</dd>
              </div>
            )}
          </dl>
          <Link to="/listings/new" className="btn-primary mt-8 !px-5 !py-3">
            List your space <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="order-1 overflow-hidden rounded-3xl lg:order-2">
          <img src={photos.hostCta} alt="Welcoming coworking reception with an emerald sofa" className="aspect-[4/3] w-full object-cover" />
        </div>
      </div>
    </section>);

}
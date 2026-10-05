import React from 'react';
import { ServiceIcon } from '../common/ServiceIcon';
import { getServiceMeta } from '../../utils/listing';
import { formatMoney } from '../../utils/format';
import type { Listing } from '../../types/listing';

export function ServicesSection({ listing }: {listing: Listing;}) {
  return (
    <section aria-labelledby="services-heading" className="py-8">
      <h2 id="services-heading" className="text-xl font-black text-ink-900">
        Services & prices
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {listing.services.map((s) => {
          const meta = getServiceMeta(s.serviceId)!;
          return (
            <article key={s.serviceId} className="rounded-3xl border border-ink-200/70 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
                  <ServiceIcon serviceId={s.serviceId} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-ink-900">{meta.name}</h3>
                  <p className="text-xs text-ink-600">{meta.shortDescription}</p>
                </div>
              </div>
              <ul className="mt-4 divide-y divide-ink-100">
                {s.variants.map((v) =>
                <li key={v.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div>
                      <p className="text-sm font-bold text-ink-900">{v.label}</p>
                      <p className="text-xs text-ink-600">{v.description}</p>
                    </div>
                    <p className="whitespace-nowrap text-sm">
                      <span className="font-black text-ink-900">{formatMoney(v.price)}</span>
                      <span className="text-ink-600"> / {meta.unitLabel}</span>
                    </p>
                  </li>
                )}
              </ul>
              <p className="mt-2 text-xs font-semibold text-ink-600">Additional pet: +{formatMoney(s.extraPetFee)} / {meta.unitLabel}</p>
            </article>);

        })}
      </div>
    </section>);

}
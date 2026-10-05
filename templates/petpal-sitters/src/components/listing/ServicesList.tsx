import React from 'react';
import { ServiceIcon } from '../ui/ServiceIcon';
import type { Listing } from '../../types/marketplace';
import { formatMoney } from '../../utils/format';
import { getService } from '../../utils/pricing';

export function ServicesList({ listing }: {listing: Listing;}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {listing.services.map((o) => {
        const s = getService(o.serviceId);
        return (
          <li key={o.serviceId} className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <ServiceIcon id={o.serviceId} />
              </span>
              <div>
                <h3 className="font-extrabold text-stone-900">{s.label}</h3>
                <p className="text-sm text-stone-500">{s.description}</p>
              </div>
            </div>
            <ul className="mt-4 divide-y divide-stone-100">
              {o.variations.map((v) =>
              <li key={v.id} className="flex items-center justify-between py-2 text-[15px]">
                  <span className="text-stone-700">{v.label}</span>
                  <span className="font-extrabold text-stone-900">
                    {formatMoney(v.price)}
                    <span className="text-sm font-semibold text-stone-500"> / {s.unitLabel}</span>
                  </span>
                </li>
              )}
            </ul>
            <p className="mt-2 text-xs font-semibold text-stone-500">+{formatMoney(o.extraPetPrice)} per additional pet</p>
          </li>);

      })}
    </ul>);

}
import React from 'react';
import { amenities } from '../../data/amenities';
import type { AmenityId } from '../../types/listing';

export function AmenitiesGrid({ ids }: {ids: AmenityId[];}) {
  const included = amenities.filter((a) => ids.includes(a.id));
  const missing = amenities.filter((a) => !ids.includes(a.id) && a.filterable);
  return (
    <div>
      <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {included.map((a) =>
        <li key={a.id} className="flex items-center gap-3 text-sm">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <a.icon size={17} aria-hidden="true" />
            </span>
            {a.label}
          </li>
        )}
      </ul>
      {missing.length > 0 &&
      <p className="mt-5 text-sm text-ink-muted">
          Not available: {missing.map((a) => a.label.toLowerCase()).join(', ')}
        </p>
      }
    </div>);

}
import React from 'react';
import { CatIcon, CigaretteIcon, HeartIcon, UserIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import type { Listing } from '../../types/listing';

const genderCopy = {
  any: 'Open to all genders',
  female: 'Women only',
  male: 'Men only'
};

export function FlatmatesSummary({ listing }: {listing: Listing;}) {
  const prefs = [
  { icon: <UserIcon size={15} />, label: genderCopy[listing.genderPreference], ok: true },
  { icon: <HeartIcon size={15} />, label: listing.couplesAllowed ? 'Couples welcome' : 'No couples', ok: listing.couplesAllowed },
  { icon: <CatIcon size={15} />, label: listing.petsAllowed ? 'Pets allowed' : 'No pets', ok: listing.petsAllowed },
  { icon: <CigaretteIcon size={15} />, label: listing.smokingAllowed ? 'Smoking allowed' : 'Non-smoking', ok: !listing.smokingAllowed }];


  return (
    <div>
      {listing.flatmates.length === 0 ?
      <p className="rounded-2xl border border-dashed border-navy-200 bg-white p-5 text-sm text-navy-600">
          You'll have the whole place to yourself — no flatmates.
        </p> :

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {listing.flatmates.map((m) =>
        <li key={m.name} className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4">
              <Avatar name={m.name} alt={m.name} size="md" />
              <div className="min-w-0">
                <p className="font-semibold text-navy-900">
                  {m.name}, {m.age}
                </p>
                <p className="truncate text-sm text-navy-500">{m.occupation}</p>
              </div>
            </li>
        )}
        </ul>
      }
      <ul className="mt-4 flex flex-wrap gap-2">
        {prefs.map((p) =>
        <li
          key={p.label}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
          p.ok ? 'bg-navy-50 text-navy-800' : 'bg-coral-50 text-coral-800'}`
          }>
          
            {p.icon}
            {p.label}
          </li>
        )}
      </ul>
    </div>);

}
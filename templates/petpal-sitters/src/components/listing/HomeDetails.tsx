import React from 'react';
import { BabyIcon, BuildingIcon, CatIcon, CheckIcon, CigaretteOffIcon, FenceIcon, HouseIcon, PawPrintIcon, XIcon } from 'lucide-react';
import { petSizeOptions } from '../../data/services';
import type { Listing } from '../../types/marketplace';
import { cn } from '../../utils/cn';

const yardLabel = { fenced: 'Fenced yard', unfenced: 'Unfenced yard', none: 'No yard' };

export function HomeDetails({ listing }: {listing: Listing;}) {
  const { home } = listing;
  const rows = [
  { icon: home.homeType === 'Apartment' ? BuildingIcon : HouseIcon, label: 'Home type', value: home.homeType },
  { icon: FenceIcon, label: 'Yard', value: yardLabel[home.yard] },
  { icon: BabyIcon, label: 'Children', value: home.children },
  { icon: PawPrintIcon, label: 'Other pets', value: home.otherPets ?? 'No other pets' },
  { icon: CigaretteOffIcon, label: 'Smoking', value: home.smokeFree ? 'Smoke-free home' : 'Smoking allowed' },
  { icon: HouseIcon, label: 'Schedule', value: home.homeFullTime ? 'Sitter home full-time' : 'Sitter works part of the day' }];


  return (
    <div className="space-y-8">
      <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {rows.map((row) =>
        <div key={row.label} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
              <row.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <dt className="text-sm font-semibold text-stone-500">{row.label}</dt>
              <dd className="font-bold text-stone-900">{row.value}</dd>
            </div>
          </div>
        )}
      </dl>
      <div>
        <h3 className="font-extrabold text-stone-900">Accepted pet sizes</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {petSizeOptions.map((size) => {
            const ok = listing.petSizes.includes(size.id);
            return (
              <li
                key={size.id}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold',
                  ok ? 'border-accent-200 bg-accent-50 text-accent-800' : 'border-stone-200 bg-stone-50 text-stone-400 line-through'
                )}>
                
                {ok ? <CheckIcon className="h-4 w-4" aria-hidden="true" /> : <XIcon className="h-4 w-4" aria-hidden="true" />}
                {size.label} <span className="font-semibold opacity-75">{size.range}</span>
                <span className="sr-only">{ok ? 'accepted' : 'not accepted'}</span>
              </li>);

          })}
          <li
            className={cn(
              'flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold',
              listing.acceptsCats ? 'border-accent-200 bg-accent-50 text-accent-800' : 'border-stone-200 bg-stone-50 text-stone-400 line-through'
            )}>
            
            <CatIcon className="h-4 w-4" aria-hidden="true" />
            Cats
            <span className="sr-only">{listing.acceptsCats ? 'accepted' : 'not accepted'}</span>
          </li>
        </ul>
        <p className="mt-3 text-sm text-stone-500">Up to {listing.maxPets} {listing.maxPets === 1 ? 'pet' : 'pets'} at a time.</p>
      </div>
    </div>);

}
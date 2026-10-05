import React from 'react';
import { BabyIcon, CatIcon, CheckIcon, CigaretteOffIcon, FenceIcon, HomeIcon, PawPrintIcon, UserRoundCheckIcon, XIcon } from 'lucide-react';
import { petSizes } from '../../data/services';
import type { Listing } from '../../types/listing';

const yardLabel = { fenced: 'Fenced yard', unfenced: 'Unfenced yard', none: 'No yard' };

export function HomeSection({ listing }: {listing: Listing;}) {
  const h = listing.home;
  const details = [
  { icon: HomeIcon, label: 'Home type', value: h.homeType },
  { icon: FenceIcon, label: 'Outdoor space', value: yardLabel[h.yard] },
  { icon: BabyIcon, label: 'Children', value: h.childrenAtHome },
  { icon: PawPrintIcon, label: 'Other pets', value: h.otherPets ?? 'No other pets' },
  { icon: UserRoundCheckIcon, label: 'Sitter availability', value: h.fullTimeHome ? 'Home full-time' : 'Home part of the day' },
  { icon: CigaretteOffIcon, label: 'Smoking', value: h.smokeFree ? 'Smoke-free home' : 'Smoking allowed' }];

  return (
    <>
      <section aria-labelledby="home-heading" className="py-8">
        <h2 id="home-heading" className="text-xl font-black text-ink-900">
          Home details
        </h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {details.map((d) =>
          <div key={d.label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ink-100 text-ink-700">
                <d.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">{d.label}</dt>
                <dd className="text-sm font-bold text-ink-900">{d.value}</dd>
              </div>
            </div>
          )}
        </dl>
      </section>

      <section aria-labelledby="pets-heading" className="py-8">
        <h2 id="pets-heading" className="text-xl font-black text-ink-900">
          Pets {listing.sitter.firstName} accepts
        </h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {petSizes.map((s) => {
            const ok = listing.acceptedSizes.includes(s.id);
            return (
              <li key={s.id} className={`rounded-2xl border p-3 ${ok ? 'border-accent-200 bg-accent-50' : 'border-ink-200 bg-ink-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-extrabold ${ok ? 'text-ink-900' : 'text-ink-500'}`}>{s.label} dogs</span>
                  {ok ? <CheckIcon className="h-4 w-4 text-accent-700" aria-label="Accepted" /> : <XIcon className="h-4 w-4 text-ink-400" aria-label="Not accepted" />}
                </div>
                <span className="text-xs text-ink-600">{s.range}</span>
              </li>);

          })}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-ink-800">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink-200">
            <CatIcon className="h-4 w-4" aria-hidden="true" />
            {listing.acceptsCats ? 'Cats welcome' : 'No cats'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink-200">
            <PawPrintIcon className="h-4 w-4" aria-hidden="true" />
            Up to {listing.maxPets} pets per booking
          </span>
        </div>
      </section>
    </>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, AwardIcon } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import type { CaptainMode, User } from '../../types/marketplace';

export function CaptainCard({ captain, mode }: {captain: User;mode: CaptainMode;}) {
  return (
    <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
      <div className="flex items-start gap-4">
        <Avatar initials={captain.initials} seed={captain.id} size="lg" className="ring-4 ring-white/10" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand">{mode === 'required' ? 'Your captain' : 'Captain available as an add-on'}</p>
          <h3 className="mt-1 font-heading text-2xl">{captain.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/80">
            <BadgeCheckIcon className="h-4 w-4 text-coral" aria-hidden="true" />
            {captain.license}
          </p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-white/85">{captain.bio}</p>
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/15 pt-5 text-sm">
        <div>
          <dt className="text-white/60">Experience</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1.5 font-semibold">
            <AwardIcon className="h-4 w-4 text-coral" aria-hidden="true" />
            {captain.yearsExperience} years
          </dd>
        </div>
        <div>
          <dt className="text-white/60">Languages</dt>
          <dd className="mt-0.5 font-semibold">{captain.languages.join(', ')}</dd>
        </div>
      </dl>
      {captain.specialties &&
      <ul className="mt-5 flex flex-wrap gap-2">
          {captain.specialties.map((s) =>
        <li key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs">
              {s}
            </li>
        )}
        </ul>
      }
      <Link to={`/u/${captain.id}`} className="mt-6 inline-block text-sm font-semibold text-sand underline-offset-4 hover:underline">
        View captain profile
      </Link>
    </div>);

}
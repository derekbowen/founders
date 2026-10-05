import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, ClockIcon, LanguagesIcon, MessageCircleIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { formatDate } from '../../utils/format';
import type { User } from '../../types/user';

export function LandlordCard({ landlord }: {landlord: User;}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6">
      <div className="flex items-start gap-4">
        <Avatar name={landlord.name} alt={landlord.name} size="lg" src={landlord.avatar} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-navy-900">{landlord.name}</h3>
            {landlord.verified &&
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-800">
                <BadgeCheckIcon size={13} aria-hidden /> Verified
              </span>
            }
          </div>
          <p className="text-sm text-navy-500">
            Landlord in {landlord.city} · Member since {formatDate(landlord.joined, 'MMM yyyy')}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-navy-700">{landlord.bio}</p>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="flex items-center gap-2 text-navy-700">
          <MessageCircleIcon size={16} className="text-primary-700" aria-hidden />
          <dt className="sr-only">Response rate</dt>
          <dd>{landlord.responseRate ?? 100}% response rate</dd>
        </div>
        <div className="flex items-center gap-2 text-navy-700">
          <ClockIcon size={16} className="text-primary-700" aria-hidden />
          <dt className="sr-only">Response time</dt>
          <dd>Replies {landlord.responseTime ?? 'within a day'}</dd>
        </div>
        <div className="flex items-center gap-2 text-navy-700">
          <LanguagesIcon size={16} className="text-primary-700" aria-hidden />
          <dt className="sr-only">Languages</dt>
          <dd>{landlord.languages.join(', ')}</dd>
        </div>
      </dl>
      <Link
        to={`/u/${landlord.id}`}
        className="mt-5 inline-flex text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-800 hover:underline">
        
        View full profile →
      </Link>
    </div>);

}
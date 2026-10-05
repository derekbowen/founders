import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, ClockIcon, LanguagesIcon, RepeatIcon, SparklesIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Avatar } from '../Avatar';
import type { Listing } from '../../types/listing';

export function SitterSection({ listing }: {listing: Listing;}) {
  const s = listing.sitter;
  const facts = [
  { icon: ClockIcon, label: `Responds ${s.responseTime}` },
  { icon: RepeatIcon, label: `${s.repeatClients} repeat clients` },
  { icon: SparklesIcon, label: `${s.experienceYears} years of experience` },
  { icon: LanguagesIcon, label: s.languages.join(', ') }];

  return (
    <section aria-labelledby="sitter-heading" className="py-8">
      <div className="flex items-center gap-4">
        <Avatar name={s.name} alt={s.name} size="xl" />
        <div>
          <h2 id="sitter-heading" className="text-xl font-black text-ink-900">
            Meet {s.firstName}
          </h2>
          <p className="text-sm text-ink-600">Member since {format(parseISO(s.memberSince), 'MMMM yyyy')}</p>
          {s.verified &&
          <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-accent-700">
              <BadgeCheckIcon className="h-4 w-4" aria-hidden="true" /> ID & background checked
            </p>
          }
        </div>
      </div>
      <p className="mt-5 leading-relaxed text-ink-700">{s.bio}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {facts.map((f) =>
        <li key={f.label} className="flex items-center gap-2.5 text-sm font-semibold text-ink-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
              <f.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            {f.label}
          </li>
        )}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {listing.highlights.map((h) =>
        <span key={h} className="rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-800">
            {h}
          </span>
        )}
      </div>
      <Link to={`/profile/${s.id}`} className="btn btn-md btn-secondary mt-6">
        View {s.firstName}’s profile
      </Link>
    </section>);

}
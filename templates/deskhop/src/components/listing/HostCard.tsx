import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, ClockIcon, LanguagesIcon, MessageSquareIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import type { User } from '../../types/user';
import { formatDate } from '../../utils/time';
import { getHostListings } from '../../utils/lookup';

export function HostCard({ host }: {host: User;}) {
  const count = getHostListings(host.id).length;
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-start gap-4">
        <Avatar name={host.name} alt={host.name} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-ink-muted">Hosted by</p>
          <h3 className="flex items-center gap-1.5 font-sans text-lg font-semibold">
            {host.name}
            {host.verified && <BadgeCheckIcon size={18} className="text-brand-700" aria-label="Verified host" />}
          </h3>
          <p className="text-sm text-ink-muted">
            {host.city} · Hosting since {formatDate(host.joined, 'MMMM yyyy')} · {count} {count === 1 ? 'space' : 'spaces'}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{host.bio}</p>
      <ul className="mt-4 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <ClockIcon size={15} className="text-ink-subtle" aria-hidden="true" /> Usually responds {host.responseTime}
        </li>
        <li className="flex items-center gap-2">
          <LanguagesIcon size={15} className="text-ink-subtle" aria-hidden="true" /> Speaks {host.languages.join(', ')}
        </li>
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link to={`/u/${host.id}`} className="btn-secondary !py-2">
          View profile
        </Link>
        <Link to="/inbox" className="btn-secondary !py-2">
          <MessageSquareIcon size={15} aria-hidden="true" /> Contact host
        </Link>
      </div>
    </div>);

}
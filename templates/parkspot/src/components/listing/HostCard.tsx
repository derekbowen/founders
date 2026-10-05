import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, MessageCircleIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { buttonClass } from '../../utils/styles';
import type { User } from '../../types/user';

export function HostCard({ host, listingCount }: {host: User;listingCount: number;}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <Avatar name={host.name} alt={host.name} src={host.avatar} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Hosted by</p>
          <h3 className="flex items-center gap-1.5 text-lg font-bold">
            {host.name}
            {host.verified && <BadgeCheckIcon size={18} className="text-success" aria-label="Verified host" />}
          </h3>
          <p className="text-sm text-muted">
            {host.location} · Joined {host.joined}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed">{host.bio}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-canvas p-3">
          <dt className="text-xs text-muted">Responds</dt>
          <dd className="font-semibold">{host.responseTime}</dd>
        </div>
        <div className="rounded-xl bg-canvas p-3">
          <dt className="text-xs text-muted">Spots listed</dt>
          <dd className="font-semibold">{listingCount}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to={`/u/${host.id}`} className={buttonClass('secondary', 'sm')}>
          View profile
        </Link>
        <Link to="/inbox" className={buttonClass('ghost', 'sm')}>
          <MessageCircleIcon size={14} aria-hidden /> Contact host
        </Link>
      </div>
    </div>);

}
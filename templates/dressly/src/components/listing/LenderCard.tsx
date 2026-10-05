import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, MapPinIcon, StarIcon } from 'lucide-react';
import type { User } from '../../types/marketplace';
import { UserAvatar } from '../UserAvatar';
import { btn } from '../../utils/styles';

export function LenderCard({ lender }: {lender: User;}) {
  return (
    <section aria-labelledby="lender-heading" className="bg-cream p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-dark">
        From the closet of
      </p>
      <div className="mt-4 flex items-start gap-4">
        <UserAvatar user={lender} size="lg" />
        <div className="flex-1">
          <h2 id="lender-heading" className="font-display text-2xl text-ink">
            {lender.name}
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPinIcon size={12} aria-hidden="true" /> {lender.city}
            </span>
            <span className="flex items-center gap-1">
              <StarIcon size={12} className="fill-ink text-ink" aria-hidden="true" /> {lender.rating} ·{' '}
              {lender.rentalsCompleted} rentals
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon size={12} aria-hidden="true" /> Replies {lender.responseTime}
            </span>
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink/85">{lender.bio}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to={`/closet/${lender.id}`} className={btn('secondary', 'sm')}>
          View closet
        </Link>
        <Link to="/inbox" className={btn('ghost', 'sm')}>
          Message {lender.name.split(' ')[0]}
        </Link>
      </div>
    </section>);

}
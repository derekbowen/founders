import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, ChevronRightIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StarRating } from '../ui/StarRating';
import type { User } from '../../types/marketplace';
import { formatDate } from '../../utils/format';

export function CustomerCard({ customer }: {customer: User;}) {
  return (
    <Link
      to={`/profile/${customer.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition-colors hover:border-ink-300">
      
      <Avatar name={customer.name} alt={customer.name} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Posted by</p>
        <p className="flex items-center gap-1.5 text-base font-extrabold text-ink-900 group-hover:text-primary-700">
          {customer.name}
          {customer.verified && <BadgeCheckIcon className="h-4 w-4 text-primary-600" aria-label="Verified" />}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-600">
          {customer.rating !== undefined && <StarRating rating={customer.rating} count={customer.reviewCount} />}
          <span>{customer.jobsPosted ?? 1} jobs posted</span>
          <span>Member since {formatDate(customer.memberSince, 'MMM yyyy')}</span>
        </div>
      </div>
      <ChevronRightIcon className="h-5 w-5 text-ink-400 group-hover:text-ink-700" aria-hidden="true" />
    </Link>);

}
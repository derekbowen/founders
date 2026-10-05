import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, BriefcaseIcon, ClockIcon, GlobeIcon, MapPinIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StarRating } from '../ui/StarRating';
import { ButtonLink } from '../ui/ButtonLink';
import { User } from '../../types/marketplace';
import { formatDate } from '../../utils/format';

export function FreelancerSummary({ freelancer }: {freelancer: User;}) {
  const stats = [
  { icon: ClockIcon, label: 'Response time', value: freelancer.responseTime },
  { icon: BriefcaseIcon, label: 'Completed jobs', value: String(freelancer.completedJobs) },
  { icon: MapPinIcon, label: 'Location', value: freelancer.location },
  { icon: GlobeIcon, label: 'Languages', value: freelancer.languages.join(', ') }];


  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6" aria-labelledby="freelancer-heading">
      <h2 id="freelancer-heading" className="sr-only">About the freelancer</h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar name={freelancer.name} alt={freelancer.name} src={freelancer.avatar} size="xl" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-lg font-bold text-slate-900">
            {freelancer.name}
            {freelancer.verified && <BadgeCheckIcon className="h-5 w-5 text-primary-600" aria-label="Verified freelancer" />}
          </p>
          <p className="text-sm text-slate-600">{freelancer.headline}</p>
          <div className="mt-1.5 flex items-center gap-3 text-sm">
            <StarRating rating={freelancer.rating} count={freelancer.reviewCount} />
            <span className="text-slate-500">Member since {formatDate(freelancer.memberSince, 'MMM yyyy')}</span>
          </div>
        </div>
        <ButtonLink to={`/u/${freelancer.id}`} variant="secondary" size="sm">View profile</ButtonLink>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) =>
        <div key={label}>
            <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
          </div>
        )}
      </dl>
      <p className="mt-5 text-sm leading-relaxed text-slate-600">{freelancer.bio}</p>
      <Link to={`/u/${freelancer.id}`} className="mt-3 inline-block text-sm font-semibold text-primary-700 hover:text-primary-800">
        See all services by {freelancer.name.split(' ')[0]} →
      </Link>
    </section>);

}
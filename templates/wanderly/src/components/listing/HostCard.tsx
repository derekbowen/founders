import React from 'react';
import { Link } from 'react-router-dom';
import { AwardIcon, BadgeCheckIcon, MessageCircleIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { Button } from '../ui/Button';
import type { Host } from '../../types/marketplace';
import { formatDate } from '../../utils/format';

export function HostCard({ host }: {host: Host;}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-sand-50 p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Link to={`/u/${host.id}`} className="shrink-0">
          <Avatar name={host.name} alt={host.name} src={host.avatar} size="xl" />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">Your host</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            <Link to={`/u/${host.id}`} className="hover:text-primary-700">{host.name}</Link>
          </h3>
          <p className="text-sm text-slate-600">{host.headline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {host.verified &&
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                <BadgeCheckIcon className="h-3.5 w-3.5 text-accent-700" aria-hidden /> Identity verified
              </span>
            }
            {host.localLegend &&
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-800">
                <AwardIcon className="h-3.5 w-3.5" aria-hidden /> Local Legend
              </span>
            }
          </div>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-700">{host.bio}</p>
          <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Guests hosted</dt>
              <dd className="font-semibold text-slate-900">{host.guestsHosted.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Response rate</dt>
              <dd className="font-semibold text-slate-900">{host.responseRate}%</dd>
            </div>
            <div>
              <dt className="text-slate-500">Hosting since</dt>
              <dd className="font-semibold text-slate-900">{formatDate(host.joined, 'yyyy')}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" to={`/u/${host.id}`}>View profile</Button>
            <Button variant="ghost" size="sm" to="/inbox/trips" leftIcon={<MessageCircleIcon className="h-4 w-4" />}>
              Contact host
            </Button>
          </div>
        </div>
      </div>
    </div>);

}
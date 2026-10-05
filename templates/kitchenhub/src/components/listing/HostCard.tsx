import React from 'react';
import { BadgeCheckIcon, ClockIcon, LanguagesIcon, MessageSquareIcon } from 'lucide-react';
import type { Host } from '../../types/marketplace';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { ButtonLink } from '../ui/ButtonLink';

export function HostCard({ host }: {host: Host;}) {
  return (
    <div className="rounded-2xl border border-steel-200 bg-steel-50 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name={host.name} src={host.avatar} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-steel-900">Hosted by {host.name}</h3>
          <p className="text-sm text-steel-500">{host.business} · Hosting since {host.joined}</p>
        </div>
        {host.verified &&
        <Badge tone="accent" icon={<BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}>Verified host</Badge>
        }
      </div>
      <p className="mt-5 text-sm leading-relaxed text-steel-700">{host.bio}</p>
      <ul className="mt-5 grid gap-2 text-sm text-steel-600 sm:grid-cols-2">
        <li className="flex items-center gap-2"><ClockIcon className="h-4 w-4" aria-hidden="true" />Responds {host.responseTime}</li>
        <li className="flex items-center gap-2"><MessageSquareIcon className="h-4 w-4" aria-hidden="true" />{host.responseRate}% response rate</li>
        <li className="flex items-center gap-2"><LanguagesIcon className="h-4 w-4" aria-hidden="true" />{host.languages.join(', ')}</li>
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink to={`/profile/${host.id}`} variant="outline">View profile</ButtonLink>
        <ButtonLink to="/inbox" variant="dark">
          <MessageSquareIcon className="h-4 w-4" aria-hidden="true" />
          Message host
        </ButtonLink>
      </div>
    </div>);

}
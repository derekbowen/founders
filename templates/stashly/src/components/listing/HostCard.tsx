import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, MessageCircleIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Avatar } from '../Avatar';
import type { Host } from '../../types/marketplace';
import { ui } from '../../utils/styles';

export function HostCard({ host }: {host: Host;}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
      <div className="flex items-center gap-4">
        <Avatar name={host.name} alt={host.name} size="lg" />
        <div>
          <p className="text-sm text-stone-600">Hosted by</p>
          <p className="text-lg font-semibold text-stone-900">{host.name}</p>
          <p className="text-sm text-stone-600">Joined {format(parseISO(host.joined), 'MMMM yyyy')}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-stone-700">{host.bio}</p>
      <ul className="mt-4 grid gap-1.5 text-sm text-stone-700">
        {host.verified &&
        <li className="flex items-center gap-2">
            <BadgeCheckIcon className="h-4 w-4 text-brand-600" aria-hidden="true" /> Identity verified
          </li>
        }
        <li>Response rate: <span className="font-semibold">{host.responseRate}%</span></li>
        <li>Responds {host.responseTime}</li>
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link to={`/u/${host.id}`} className={ui.linkOutline}>View profile</Link>
        <Link to="/inbox/storing" className={ui.linkOutline}>
          <MessageCircleIcon className="h-4 w-4" aria-hidden="true" /> Contact host
        </Link>
      </div>
    </div>);

}
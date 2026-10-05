import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheckIcon, MessageCircleIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import type { User } from '../../types/user';

export function HostCard({ host }: {host: User;}) {
  return (
    <div className="card p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex items-center gap-4 md:w-64 md:shrink-0 md:flex-col md:items-start">
          <Avatar name={host.name} alt={host.name} size="xl" />
          <div>
            <p className="font-serif text-xl font-bold text-ink-900">{host.name}</p>
            <p className="text-sm text-ink-500">
              Hosting since {host.joinedYear} · {host.location}
            </p>
            {host.verified &&
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
                <BadgeCheckIcon size={14} aria-hidden="true" /> Verified host
              </p>
            }
          </div>
        </div>
        <div className="flex-1">
          <p className="leading-relaxed text-ink-700">{host.bio}</p>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {host.responseRate !== undefined &&
            <div>
                <dt className="text-ink-500">Response rate</dt>
                <dd className="font-semibold text-ink-900">{host.responseRate}%</dd>
              </div>
            }
            {host.responseTime &&
            <div>
                <dt className="text-ink-500">Responds</dt>
                <dd className="font-semibold text-ink-900">{host.responseTime}</dd>
              </div>
            }
            <div>
              <dt className="text-ink-500">Languages</dt>
              <dd className="font-semibold text-ink-900">{host.languages.join(', ')}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/inbox" className="btn-outline">
              <MessageCircleIcon size={16} aria-hidden="true" /> Contact host
            </Link>
            <Link to={`/u/${host.id}`} className="btn-ghost">
              View profile
            </Link>
          </div>
        </div>
      </div>
    </div>);

}
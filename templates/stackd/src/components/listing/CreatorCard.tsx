import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon } from 'lucide-react';
import type { Creator } from '../../types/marketplace';
import { Avatar } from '../Avatar';
import { formatCompact } from '../../utils/format';

export function CreatorCard({ creator, productCount }: {creator: Creator;productCount: number;}) {
  const [following, setFollowing] = useState(false);
  return (
    <div className="card p-5">
      <div className="flex items-center gap-4">
        <Avatar name={creator.name} alt={creator.name} src={creator.avatar} size="lg" hasBorder />
        <div className="min-w-0">
          <p className="eyebrow">Created by</p>
          <Link to={`/u/${creator.id}`} className="font-display text-lg font-bold hover:underline">
            {creator.name}
          </Link>
          <p className="truncate text-sm text-muted">{creator.headline}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink/85">{creator.bio}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1">
          <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {creator.location}
        </span>
        <span>
          <strong className="text-ink">{formatCompact(creator.followers + (following ? 1 : 0))}</strong> followers
        </span>
        <span>
          <strong className="text-ink">{productCount}</strong> products
        </span>
      </div>
      <div className="mt-5 flex gap-2">
        <Link to={`/u/${creator.id}`} className="btn btn-outline btn-sm flex-1">
          View profile
        </Link>
        <button
          type="button"
          aria-pressed={following}
          onClick={() => setFollowing((f) => !f)}
          className={`btn btn-sm flex-1 ${following ? 'btn-outline' : 'btn-ink'}`}>
          
          {following ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>);

}
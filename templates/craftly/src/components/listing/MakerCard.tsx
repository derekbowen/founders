import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, MessageCircleIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import type { Maker } from '../../types/marketplace';
import { formatDate } from '../../utils/format';
import { ButtonLink } from '../ui/ButtonLink';
import { StarRating } from '../ui/StarRating';

export function MakerCard({ maker }: {maker: Maker;}) {
  return (
    <section className="card p-6" aria-labelledby="maker-heading">
      <div className="flex items-start gap-4">
        <img src={maker.portrait} alt={maker.ownerName} className="h-16 w-16 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Meet the maker</p>
          <h2 id="maker-heading" className="mt-1 text-2xl font-medium">
            <Link to={`/shop/${maker.id}`} className="hover:text-primary-ink">
              {maker.shopName}
            </Link>
          </h2>
          <p className="flex items-center gap-1 text-sm text-muted">
            {maker.ownerName} · <MapPinIcon className="h-3.5 w-3.5" aria-hidden /> {maker.location}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{maker.bio}</p>
      <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-5 text-sm">
        <div>
          <dt className="text-xs text-muted">Rating</dt>
          <dd className="mt-1">
            <StarRating rating={maker.rating} showValue />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Sales</dt>
          <dd className="mt-1 font-medium">{maker.sales.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">On {brand.name} since</dt>
          <dd className="mt-1 font-medium">{formatDate(maker.joined, 'yyyy')}</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        <MessageCircleIcon className="h-3.5 w-3.5" aria-hidden /> Usually responds {maker.responseTime}
      </p>
      <ButtonLink to={`/shop/${maker.id}`} variant="secondary" className="mt-5 w-full">
        Visit shop
      </ButtonLink>
    </section>);

}
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { BadgeCheckIcon, MapPinIcon, StarIcon, UserXIcon, WarehouseIcon, PencilIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { ListingCard } from '../components/listing/ListingCard';
import { ReviewList } from '../components/ReviewList';
import { EmptyState } from '../components/EmptyState';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { findHost } from '../data/hosts';
import { reviews, hostReviews } from '../data/reviews';
import { ui, cx } from '../utils/styles';

export function Profile() {
  const { id = '' } = useParams();
  const { listings, user } = useMarketplace();
  const host = findHost(id);

  if (!host) {
    return (
      <div className={cx(ui.container, 'py-20')}>
        <EmptyState icon={<UserXIcon className="h-5 w-5" />} title="Profile not found" text="This member may have closed their account." action={<Link to="/s" className={ui.linkBrand}>Browse spaces</Link>} />
      </div>);

  }

  const own = listings.filter((l) => l.hostId === host.id);
  const ids = new Set(own.map((l) => l.id));
  const asHost = reviews.filter((r) => ids.has(r.listingId));
  const asStorer = host.id === 'me' ? hostReviews : [];
  const all = [...asHost, ...asStorer];
  const avg = all.length ? all.reduce((s, r) => s + r.rating, 0) / all.length : 0;
  const isMe = user?.id === host.id;
  const displayName = isMe && user ? user.name : host.name;

  return (
    <div className="pb-20">
      <div className="h-36 bg-sand-100 sm:h-44" aria-hidden="true" />
      <div className={cx(ui.container, '-mt-14 grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]')}>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-soft">
            <Avatar name={displayName} alt={displayName} size="xl" hasBorder />
            <h1 className="mt-4 text-2xl font-bold text-stone-900">{displayName}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-stone-600"><MapPinIcon className="h-4 w-4" aria-hidden="true" />{host.city}</p>
            <p className="text-sm text-stone-600">Member since {format(parseISO(host.joined), 'MMMM yyyy')}</p>
            <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-stone-100 py-4 text-center">
              <div><dt className="text-xs text-stone-500">Spaces</dt><dd className="text-lg font-bold text-stone-900">{own.length}</dd></div>
              <div><dt className="text-xs text-stone-500">Reviews</dt><dd className="text-lg font-bold text-stone-900">{all.length}</dd></div>
              <div><dt className="text-xs text-stone-500">Rating</dt><dd className="flex items-center justify-center gap-0.5 text-lg font-bold text-stone-900">{avg ? avg.toFixed(1) : '—'}{avg > 0 && <StarIcon className="h-3.5 w-3.5 fill-sand-500 text-sand-500" aria-hidden="true" />}</dd></div>
            </dl>
            {host.verified &&
            <p className="mt-4 flex items-center gap-2 text-sm text-stone-700"><BadgeCheckIcon className="h-4 w-4 text-brand-600" aria-hidden="true" />Identity verified</p>
            }
            <p className="mt-1 text-sm text-stone-700">Responds {host.responseTime}</p>
            {isMe &&
            <Link to="/account/contact" className={cx(ui.linkOutline, 'mt-5 w-full')}>
                <PencilIcon className="h-4 w-4" aria-hidden="true" /> Edit account
              </Link>
            }
          </div>
        </aside>

        <div className="space-y-12 pt-4 lg:pt-20">
          <section>
            <h2 className="text-xl font-semibold text-stone-900">About {displayName.split(' ')[0]}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-stone-700">{host.bio}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-stone-900">{isMe ? 'Your spaces' : `${displayName.split(' ')[0]}’s spaces`}</h2>
            <div className="mt-5">
              {own.length ?
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {own.map((l) => <ListingCard key={l.id} listing={l} />)}
                </div> :

              <EmptyState
                icon={<WarehouseIcon className="h-5 w-5" />}
                title="No spaces listed yet"
                text={isMe ? 'List your garage, basement or closet in about 5 minutes.' : 'This member stores with neighbors but hasn’t listed a space.'}
                action={isMe ? <Link to="/listings/new" className={ui.linkBrand}>Rent out your space</Link> : undefined} />

              }
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-stone-900">Reviews</h2>
            <div className="mt-5"><ReviewList items={all} /></div>
          </section>
        </div>
      </div>
    </div>);

}
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BadgeCheckIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  LanguagesIcon,
  MapPinIcon,
  PlusIcon,
  StarIcon,
  UserXIcon } from
'lucide-react';
import { Avatar } from '../components/Avatar';
import { ListingCard } from '../components/listing/ListingCard';
import { ReviewsList } from '../components/listing/ReviewsList';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { getHostListings, getHostReviews, getUser } from '../utils/lookup';
import { formatDate } from '../utils/time';

export function Profile() {
  const { id } = useParams();
  const { user: me } = useAuth();
  const base = getUser(id);
  const user = base && me && me.id === base.id ? me : base;

  if (!user) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={UserXIcon}
          title="Profile not found"
          description="This member may have closed their account."
          action={<Link to="/" className="btn-primary">Go home</Link>} />
        
      </div>);

  }

  const isMe = me?.id === user.id;
  const spaces = getHostListings(user.id);
  const reviews = getHostReviews(user.id);
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside>
          <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-card lg:sticky lg:top-24">
            <div className="flex justify-center">
              <Avatar name={user.name} alt={user.name} size="xl" />
            </div>
            <h1 className="mt-4 flex items-center justify-center gap-1.5 text-2xl font-semibold">
              {user.name}
              {user.verified && <BadgeCheckIcon size={20} className="text-brand-700" aria-label="Verified" />}
            </h1>
            <p className="text-sm text-ink-muted">{user.isHost ? 'Space host' : 'Member'}</p>

            {user.isHost &&
            <dl className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl bg-mist py-3">
                <div>
                  <dd className="text-lg font-semibold">{reviews.length}</dd>
                  <dt className="text-xs text-ink-muted">Reviews</dt>
                </div>
                <div>
                  <dd className="flex items-center justify-center gap-1 text-lg font-semibold">
                    {avg ? avg.toFixed(1) : '–'} <StarIcon size={13} className="fill-ink" aria-hidden="true" />
                  </dd>
                  <dt className="text-xs text-ink-muted">Rating</dt>
                </div>
                <div>
                  <dd className="text-lg font-semibold">{spaces.length}</dd>
                  <dt className="text-xs text-ink-muted">Spaces</dt>
                </div>
              </dl>
            }

            <ul className="mt-5 space-y-2.5 text-left text-sm">
              <li className="flex items-center gap-2.5"><MapPinIcon size={15} className="text-ink-subtle" aria-hidden="true" /> Lives in {user.city}</li>
              <li className="flex items-center gap-2.5"><CalendarIcon size={15} className="text-ink-subtle" aria-hidden="true" /> Joined {formatDate(user.joined, 'MMMM yyyy')}</li>
              <li className="flex items-center gap-2.5"><LanguagesIcon size={15} className="text-ink-subtle" aria-hidden="true" /> {user.languages.join(', ')}</li>
              <li className="flex items-center gap-2.5"><ClockIcon size={15} className="text-ink-subtle" aria-hidden="true" /> Responds {user.responseTime}</li>
              {user.company &&
              <li className="flex items-center gap-2.5"><BuildingIcon size={15} className="text-ink-subtle" aria-hidden="true" /> {user.company}</li>
              }
            </ul>

            {isMe ?
            <Link to="/account/contact" className="btn-secondary mt-6 w-full">Edit account</Link> :

            <Link to="/inbox" className="btn-secondary mt-6 w-full">Message {user.firstName}</Link>
            }
          </div>
        </aside>

        <div className="min-w-0 space-y-12">
          <section>
            <h2 className="font-sans text-xl font-semibold">About {isMe ? 'you' : user.firstName}</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{user.bio}</p>
          </section>

          <section>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-sans text-xl font-semibold">
                {isMe ? 'Your spaces' : `${user.firstName}’s spaces`} ({spaces.length})
              </h2>
              {isMe &&
              <Link to="/listings/new" className="btn-secondary !py-2">
                  <PlusIcon size={15} aria-hidden="true" /> New listing
                </Link>
              }
            </div>
            {spaces.length === 0 ?
            <div className="mt-6">
                <EmptyState
                icon={BuildingIcon}
                title={isMe ? 'You haven’t listed a space yet' : 'No spaces listed'}
                description={isMe ? 'Turn spare desks into revenue — listing takes about 10 minutes.' : `${user.firstName} isn’t hosting any spaces right now.`}
                action={isMe ? <Link to="/listings/new" className="btn-primary">List your space</Link> : undefined} />
              
              </div> :

            <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {spaces.map((l) =>
              <ListingCard key={l.id} listing={l} />
              )}
              </div>
            }
          </section>

          {user.isHost &&
          <section>
              <h2 className="mb-6 font-sans text-xl font-semibold">Reviews from guests</h2>
              <ReviewsList reviews={reviews} />
            </section>
          }
        </div>
      </div>
    </div>);

}
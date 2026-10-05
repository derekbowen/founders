import React from 'react';
import { useParams } from 'react-router-dom';
import { BadgeCheckIcon, CalendarIcon, ClockIcon, LanguagesIcon, MapPinIcon, StoreIcon, UserXIcon } from 'lucide-react';
import { ListingCard } from '../components/listing/ListingCard';
import { ReviewList } from '../components/listing/ReviewList';
import { Avatar } from '../components/ui/Avatar';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { getHost, getListing, getListingsByHost, getReviewsForHost } from '../utils/listings';
import { cn, containerClass } from '../utils/styles';

export function ProfilePage() {
  const { hostId } = useParams();
  const { user } = useAuth();
  const host = getHost(hostId);

  if (!host) {
    return (
      <div className={cn(containerClass, 'py-20')}>
        <EmptyState icon={<UserXIcon className="h-5 w-5" aria-hidden="true" />} title="Profile not found" body="This member may have closed their account." action={<ButtonLink to="/search">Browse kitchens</ButtonLink>} />
      </div>);

  }

  const own = user?.id === host.id;
  const name = own && user ? user.name : host.name;
  const first = name.split(' ')[0];
  const hostListings = getListingsByHost(host.id);
  const hostReviews = getReviewsForHost(host.id);
  const avg = hostReviews.length ? hostReviews.reduce((s, r) => s + r.rating, 0) / hostReviews.length : 0;

  return (
    <div className={cn(containerClass, 'py-10 lg:py-14')}>
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-steel-200 p-6 text-center shadow-card">
            <Avatar name={name} src={own ? user?.avatar : host.avatar} size="xl" className="mx-auto" />
            <h1 className="mt-4 font-heading text-2xl font-bold uppercase tracking-wide text-steel-900">{name}</h1>
            <p className="text-sm text-steel-500">{own && user ? user.business : host.business}</p>
            <dl className="mt-6 grid grid-cols-3 divide-x divide-steel-200 border-y border-steel-200 py-4">
              <div><dt className="text-xs text-steel-500">Kitchens</dt><dd className="font-heading text-xl font-bold">{hostListings.length}</dd></div>
              <div><dt className="text-xs text-steel-500">Reviews</dt><dd className="font-heading text-xl font-bold">{hostReviews.length}</dd></div>
              <div><dt className="text-xs text-steel-500">Rating</dt><dd className="font-heading text-xl font-bold">{avg ? avg.toFixed(1) : '—'}</dd></div>
            </dl>
            <ul className="mt-5 space-y-2.5 text-left text-sm text-steel-700">
              {host.verified && <li className="flex items-center gap-2"><BadgeCheckIcon className="h-4 w-4 text-accent" aria-hidden="true" />Identity & business verified</li>}
              <li className="flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-steel-500" aria-hidden="true" />{host.city}</li>
              <li className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-steel-500" aria-hidden="true" />Member since {host.joined}</li>
              <li className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-steel-500" aria-hidden="true" />Responds {host.responseTime}</li>
              <li className="flex items-center gap-2"><LanguagesIcon className="h-4 w-4 text-steel-500" aria-hidden="true" />{host.languages.join(', ')}</li>
            </ul>
            <div className="mt-6">
              {own ?
              <ButtonLink to="/account/contact" variant="outline" fullWidth>Edit profile</ButtonLink> :

              <ButtonLink to="/inbox" variant="dark" fullWidth>Message {first}</ButtonLink>
              }
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-14">
          <section>
            <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-steel-900">Hi, I’m {first}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-steel-700">{host.bio}</p>
          </section>

          <section aria-labelledby="kitchens-heading">
            <h2 id="kitchens-heading" className="font-heading text-2xl font-semibold uppercase tracking-wide text-steel-900">{first}’s kitchens</h2>
            <div className="mt-6">
              {hostListings.length === 0 ?
              <EmptyState
                icon={<StoreIcon className="h-5 w-5" aria-hidden="true" />}
                title="No kitchens listed yet"
                body={own ? 'List your kitchen to start earning from idle hours.' : undefined}
                action={own ? <ButtonLink to="/listings/new" variant="accent">List your kitchen</ButtonLink> : undefined} /> :


              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                  {hostListings.map((l) =>
                <ListingCard key={l.id} listing={l} />
                )}
                </div>
              }
            </div>
          </section>

          <section aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="font-heading text-2xl font-semibold uppercase tracking-wide text-steel-900">Reviews from renters</h2>
            <div className="mt-6">
              <ReviewList reviews={hostReviews} showListingTitle={(id) => getListing(id)?.title} />
            </div>
          </section>
        </div>
      </div>
    </div>);

}
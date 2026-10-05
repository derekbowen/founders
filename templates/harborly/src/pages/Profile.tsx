import React from 'react';
import { useParams } from 'react-router-dom';
import { BadgeCheckIcon, MapPinIcon, CalendarIcon, MessageCircleIcon, LanguagesIcon, UserXIcon, SailboatIcon } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ListingCard } from '../components/ListingCard';
import { ReviewsList } from '../components/listing/ReviewsList';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { reviews as allReviews } from '../data/reviews';
import { memberSince } from '../utils/format';

export function Profile() {
  const { id = '' } = useParams();
  const { getUser, listings, currentUser, isAuthenticated } = useMarketplace();
  const user = getUser(id);

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState icon={UserXIcon} title="Profile not found" text="This member may have closed their account." action={<Button to="/">Go home</Button>} />
      </div>);

  }

  const isMe = isAuthenticated && user.id === currentUser.id;
  const owned = listings.filter((l) => l.ownerId === user.id);
  const captained = listings.filter((l) => l.captainId === user.id);
  const boats = user.role === 'captain' ? captained : owned;
  const boatIds = new Set(boats.map((b) => b.id));
  const reviews = allReviews.filter((r) => boatIds.has(r.listingId));
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const facts = [
  { icon: MapPinIcon, text: user.location },
  { icon: CalendarIcon, text: `Member since ${memberSince(user.joined)}` },
  { icon: MessageCircleIcon, text: `Responds ${user.responseTime}` },
  { icon: LanguagesIcon, text: user.languages.join(', ') }];


  return (
    <div className="w-full bg-white">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8 lg:py-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-line p-6 text-center shadow-card">
            <Avatar initials={user.initials} seed={user.id} size="xl" className="mx-auto" />
            <h1 className="mt-4 font-heading text-2xl text-navy">{user.name}</h1>
            <p className="mt-1 text-sm capitalize text-muted">{user.role === 'renter' ? 'Member' : user.role}</p>
            {user.verified &&
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Identity verified
              </p>
            }
            <ul className="mt-6 space-y-3 border-t border-line pt-6 text-left text-sm text-ink">
              {facts.map(({ icon: Icon, text }) =>
              <li key={text} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />
                  {text}
                </li>
              )}
            </ul>
            {isMe &&
            <Button to="/account/contact" variant="outline" className="mt-6 w-full">
                Edit account
              </Button>
            }
          </div>
        </aside>

        <div className="min-w-0 space-y-12">
          <section aria-labelledby="bio-heading">
            <h2 id="bio-heading" className="font-heading text-3xl text-navy">
              Hi, I’m {user.name.replace('Capt. ', '').split(' ')[0]}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink/85">{user.bio}</p>
            {user.license &&
            <dl className="mt-6 grid max-w-xl grid-cols-2 gap-4 rounded-2xl bg-sand-light p-5 text-sm">
                <div>
                  <dt className="text-muted">License</dt>
                  <dd className="font-semibold text-ink">{user.license}</dd>
                </div>
                <div>
                  <dt className="text-muted">Experience</dt>
                  <dd className="font-semibold text-ink">{user.yearsExperience} years at the helm</dd>
                </div>
              </dl>
            }
          </section>

          <section aria-labelledby="boats-heading">
            <h2 id="boats-heading" className="font-heading text-2xl text-navy">
              {user.role === 'captain' ? 'Boats I captain' : isMe ? 'Your listings' : `${user.name.split(' ')[0]}’s boats`}
              <span className="ml-2 font-sans text-base text-muted">({boats.length})</span>
            </h2>
            {boats.length === 0 ?
            <div className="mt-6">
                <EmptyState icon={SailboatIcon} title="No boats listed yet" text={isMe ? 'List your boat and start earning on the days you’re not using it.' : 'Check back soon.'} action={isMe ? <Button to="/listings/new">List your boat</Button> : undefined} />
              </div> :

            <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {boats.map((l) =>
              <ListingCard key={l.id} listing={l} />
              )}
              </div>
            }
          </section>

          {boats.length > 0 && <ReviewsList reviews={reviews} rating={avg} total={reviews.length} />}
        </div>
      </div>
    </div>);

}
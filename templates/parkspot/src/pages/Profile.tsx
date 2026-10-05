import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheckIcon, CalendarIcon, ClockIcon, MapPinIcon, ParkingSquareIcon, UserXIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { ListingCard } from '../components/listing/ListingCard';
import { ReviewList } from '../components/listing/ReviewList';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { reviews } from '../data/reviews';
import { getListingsByHost, getUser } from '../utils/lookup';
import { buttonClass } from '../utils/styles';

export function Profile() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const isMe = currentUser?.id === userId;
  const user = isMe ? currentUser : getUser(userId);

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <EmptyState icon={<UserXIcon size={24} aria-hidden />} title="Profile not found" text="This member may have closed their account." action={<Link to="/s" className={buttonClass('primary')}>Find parking</Link>} />
      </div>);

  }

  const hosted = getListingsByHost(user.id);
  const hostedIds = hosted.map((l) => l.id);
  const aboutReviews = reviews.filter((r) => hostedIds.includes(r.listingId));
  const avg = aboutReviews.length ? aboutReviews.reduce((s, r) => s + r.rating, 0) / aboutReviews.length : 0;

  return (
    <div className="w-full bg-canvas pb-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-6 text-center">
            <div className="flex justify-center">
              <Avatar name={user.name} alt={user.name} src={user.avatar} size="xl" />
            </div>
            <h1 className="mt-4 flex items-center justify-center gap-1.5 text-2xl font-bold">
              {user.name}
              {user.verified && <BadgeCheckIcon size={20} className="text-success" aria-label="Verified" />}
            </h1>
            <ul className="mt-4 space-y-2 text-left text-sm">
              <li className="flex items-center gap-2 text-muted">
                <MapPinIcon size={14} aria-hidden /> {user.location}
              </li>
              <li className="flex items-center gap-2 text-muted">
                <CalendarIcon size={14} aria-hidden /> Joined {user.joined}
              </li>
              <li className="flex items-center gap-2 text-muted">
                <ClockIcon size={14} aria-hidden /> Responds {user.responseTime}
              </li>
            </ul>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5">
              <div>
                <dd className="text-xl font-bold">{hosted.length}</dd>
                <dt className="text-xs text-muted">Spots</dt>
              </div>
              <div>
                <dd className="text-xl font-bold">{avg ? avg.toFixed(1) : '—'}</dd>
                <dt className="text-xs text-muted">Host rating</dt>
              </div>
            </dl>
            {isMe ?
            <Link to="/account/contact" className={buttonClass('secondary', 'md', 'mt-5 w-full')}>
                Edit profile
              </Link> :

            <Link to="/inbox" className={buttonClass('primary', 'md', 'mt-5 w-full')}>
                Message {user.name.split(' ')[0]}
              </Link>
            }
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          <section aria-labelledby="bio">
            <h2 id="bio" className="text-xl font-bold">
              About {isMe ? 'you' : user.name.split(' ')[0]}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/85">{user.bio}</p>
          </section>

          <section aria-labelledby="spots">
            <div className="flex items-center justify-between">
              <h2 id="spots" className="text-xl font-bold">
                {isMe ? 'Your spots' : 'Spots'} ({hosted.length})
              </h2>
              {isMe &&
              <Link to="/listings/new" className={buttonClass('accent', 'sm')}>
                  Add a spot
                </Link>
              }
            </div>
            {hosted.length === 0 ?
            <div className="mt-4 rounded-2xl border border-dashed border-line bg-surface">
                <EmptyState icon={<ParkingSquareIcon size={22} aria-hidden />} title="No spots listed yet" text={isMe ? 'Turn your empty driveway into weekly income.' : 'This member hasn’t listed a space.'} />
              </div> :

            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {hosted.map((l) =>
              <ListingCard key={l.id} listing={l} />
              )}
              </div>
            }
          </section>

          <section aria-labelledby="profile-reviews">
            <h2 id="profile-reviews" className="text-xl font-bold">
              Reviews from drivers ({aboutReviews.length})
            </h2>
            <div className="mt-4">
              <ReviewList reviews={aboutReviews} />
            </div>
          </section>
        </div>
      </div>
    </div>);

}
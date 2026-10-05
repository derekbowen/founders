import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheckIcon, CalendarIcon, ClockIcon, MapPinIcon, UserXIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/common/EmptyState';
import { ReviewsSection } from '../components/listing/ReviewsSection';
import { ListingCard } from '../components/search/ListingCard';
import { useBookings } from '../contexts/BookingContext';
import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { sports } from '../data/sports';
import { currentUserId, users } from '../data/users';

export function Profile() {
  const { userId } = useParams();
  const { transactions } = useBookings();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="container-page py-16">
        <EmptyState icon={<UserXIcon size={26} />} title="Profile not found" description="This member may have deleted their account." action={<Link to="/search" className="btn btn-primary btn-md">Browse courts</Link>} />
      </div>);

  }

  const isMe = user.id === currentUserId;
  const hosted = listings.filter((l) => l.hostId === user.id);
  const hostedReviews = reviews.filter((r) => hosted.some((l) => l.id === r.listingId));
  const avgRating = hostedReviews.length ? hostedReviews.reduce((s, r) => s + r.rating, 0) / hostedReviews.length : 0;
  const gamesPlayed = isMe ? transactions.filter((t) => t.role === 'customer' && t.status === 'played').length : null;

  const stats = [
  { label: 'Courts listed', value: hosted.length },
  { label: 'Reviews', value: hostedReviews.length },
  ...(gamesPlayed !== null ? [{ label: 'Games played', value: gamesPlayed }] : [])];


  return (
    <div className="container-page py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="card self-start p-6 lg:sticky lg:top-24">
          <Avatar name={user.name} alt={user.name} size="xl" />
          <h1 className="heading-md mt-4 flex items-center gap-2">
            {user.name}
            {user.verified && <BadgeCheckIcon size={20} className="text-brand" aria-label="Verified" />}
          </h1>
          <p className="mt-1 text-sm capitalize text-slate-500">{user.role === 'both' ? 'Player & host' : user.role}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2"><MapPinIcon size={15} className="text-brand" aria-hidden="true" /> {user.location}</li>
            <li className="flex items-center gap-2"><CalendarIcon size={15} className="text-brand" aria-hidden="true" /> Joined {user.joined}</li>
            {user.responseTime && <li className="flex items-center gap-2"><ClockIcon size={15} className="text-brand" aria-hidden="true" /> Responds {user.responseTime}</li>}
          </ul>
          <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 text-center">
            {stats.map((s) =>
            <div key={s.label}>
                <dd className="font-display text-3xl font-bold">{s.value}</dd>
                <dt className="text-[11px] uppercase tracking-wide text-slate-500">{s.label}</dt>
              </div>
            )}
          </dl>
          {isMe ?
          <Link to="/account/contact" className="btn btn-outline btn-md mt-5 w-full">Edit account</Link> :

          <Link to="/inbox" className="btn btn-primary btn-md mt-5 w-full">Message</Link>
          }
        </aside>

        <div className="space-y-10">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="heading-md">About</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{user.bio}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Sports">
              {user.sports.map((id) =>
              <li key={id} className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-dark">{sports.find((s) => s.id === id)?.label}</li>
              )}
            </ul>
          </section>

          <section aria-labelledby="hosted-heading" className="border-t border-slate-200 pt-8">
            <h2 id="hosted-heading" className="heading-md">{isMe ? 'Your courts' : `Courts by ${user.name}`}</h2>
            {hosted.length ?
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {hosted.map((l) => <ListingCard key={l.id} listing={l} />)}
              </div> :

            <EmptyState
              className="mt-5"
              icon={<MapPinIcon size={24} />}
              title="No courts listed"
              description={isMe ? 'Have a court, field or club? List it and start earning from empty hours.' : `${user.name} hasn’t listed any courts yet.`}
              action={isMe ? <Link to="/create-listing" className="btn btn-primary btn-md">List your court</Link> : undefined} />

            }
          </section>

          {hosted.length > 0 &&
          <div className="border-t border-slate-200 pt-8">
              <ReviewsSection title="Reviews from players" reviews={hostedReviews} rating={avgRating} reviewCount={hostedReviews.length} />
            </div>
          }
        </div>
      </div>
    </div>);

}
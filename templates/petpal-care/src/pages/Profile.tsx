import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheckIcon, CatIcon, DogIcon, MapPinIcon, PencilIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Avatar } from '../components/Avatar';
import { ListingCard } from '../components/listing/ListingCard';
import { ReviewList } from '../components/listing/ReviewList';
import { StarRating } from '../components/common/StarRating';
import { EmptyState } from '../components/common/EmptyState';
import { currentUser, myPets } from '../data/currentUser';
import { getListingsBySitter, getReviewsForSitter } from '../utils/listing';

export function Profile() {
  const { userId = '' } = useParams();
  const sitterListings = getListingsBySitter(userId);
  const isMe = userId === currentUser.id;
  const sitter = sitterListings[0]?.sitter;

  if (!sitter && !isMe) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Profile not found"
          description="This member may have closed their account."
          action={
          <Link to="/search" className="btn btn-md btn-primary">
              Browse sitters
            </Link>
          } />
        
      </div>);

  }

  const name = sitter?.name ?? currentUser.name;
  const firstName = sitter?.firstName ?? currentUser.firstName;
  const bio = isMe ? currentUser.bio : sitter!.bio;
  const memberSince = sitter?.memberSince ?? currentUser.memberSince;
  const reviews = getReviewsForSitter(userId);
  const totalReviews = sitterListings.reduce((n, l) => n + l.reviewCount, 0);
  const avg = sitterListings.length ? sitterListings.reduce((n, l) => n + l.rating, 0) / sitterListings.length : 0;
  const location = sitterListings[0] ? `${sitterListings[0].neighborhood}, ${sitterListings[0].city}` : currentUser.neighborhood;

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside>
          <div className="card p-6 text-center lg:sticky lg:top-24">
            <div className="flex justify-center">
              <Avatar name={name} alt={name} size="xl" />
            </div>
            <h1 className="mt-4 text-2xl font-black text-ink-900">{name}</h1>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-ink-600">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" /> {location}
            </p>
            {sitterListings.length > 0 &&
            <div className="mt-3 flex justify-center">
                <StarRating rating={avg} count={totalReviews} size="md" />
              </div>
            }
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-ink-100 pt-5 text-left">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">Member since</dt>
                <dd className="font-extrabold text-ink-900">{format(parseISO(memberSince), 'MMM yyyy')}</dd>
              </div>
              {sitter &&
              <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">Response</dt>
                  <dd className="font-extrabold text-ink-900">{sitter.responseTime.replace('within ', '< ')}</dd>
                </div>
              }
            </dl>
            {sitter?.verified &&
            <p className="mt-5 flex items-center justify-center gap-1.5 rounded-2xl bg-accent-50 py-2.5 text-sm font-bold text-accent-800">
                <BadgeCheckIcon className="h-4 w-4" aria-hidden="true" /> Identity verified
              </p>
            }
            {isMe &&
            <Link to="/account/contact" className="btn btn-md btn-secondary mt-4 w-full">
                <PencilIcon className="h-4 w-4" aria-hidden="true" /> Edit account
              </Link>
            }
          </div>
        </aside>

        <div className="space-y-12">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-2xl font-black text-ink-900">
              Hi, I’m {firstName}!
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-700">{bio}</p>
          </section>

          {isMe &&
          <section aria-labelledby="pets-heading">
              <h2 id="pets-heading" className="text-xl font-black text-ink-900">
                My pets
              </h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                {myPets.map((p) => {
                const Icon = p.species === 'Cat' ? CatIcon : DogIcon;
                return (
                  <li key={p.id} className="card p-4">
                      {p.photo ?
                    <img src={p.photo} alt={p.name} className="aspect-square w-full rounded-2xl object-cover" /> :

                    <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
                          <Icon className="h-12 w-12" aria-hidden="true" />
                        </div>
                    }
                      <p className="mt-3 font-extrabold text-ink-900">{p.name}</p>
                      <p className="text-sm text-ink-600">
                        {p.breed} · {p.age}
                      </p>
                    </li>);

              })}
              </ul>
            </section>
          }

          <section aria-labelledby="listings-heading">
            <div className="flex items-center justify-between gap-3">
              <h2 id="listings-heading" className="text-xl font-black text-ink-900">
                {isMe ? 'My listings' : `${firstName}’s listings`}
              </h2>
              {isMe &&
              <Link to="/create-listing" className="btn btn-sm btn-primary">
                  New listing
                </Link>
              }
            </div>
            <div className="mt-4">
              {sitterListings.length ?
              <div className="grid gap-5 sm:grid-cols-2">
                  {sitterListings.map((l) =>
                <ListingCard key={l.id} listing={l} />
                )}
                </div> :

              <EmptyState title="No listings yet" description="Create a listing to start accepting bookings." />
              }
            </div>
          </section>

          {sitterListings.length > 0 &&
          <section aria-labelledby="reviews-heading">
              <h2 id="reviews-heading" className="text-xl font-black text-ink-900">
                Reviews from pet owners
              </h2>
              <div className="mt-4">
                <ReviewList reviews={reviews} />
              </div>
            </section>
          }
        </div>
      </div>
    </div>);

}
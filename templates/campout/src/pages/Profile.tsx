import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheckIcon, CalendarIcon, LanguagesIcon, MapPinIcon, MessageCircleIcon, PencilIcon, PlusIcon, TentIcon, UserXIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/EmptyState';
import { ListingCard } from '../components/ListingCard';
import { ReviewList } from '../components/listing/ReviewList';
import { currentUserId } from '../data/users';
import { findUser, getHostListings, getHostReviews, getListing } from '../utils/lookup';

export function Profile() {
  const { id } = useParams();
  const userId = id ?? currentUserId;
  const user = findUser(userId);
  const isOwn = userId === currentUserId;

  if (!user) {
    return (
      <div className="container-page py-20">
        <EmptyState icon={UserXIcon} title="Profile not found" description="This member may have closed their account." action={<Link to="/" className="btn-primary">Go home</Link>} />
      </div>);

  }

  const hostListings = getHostListings(user.id);
  const reviews = getHostReviews(user.id);
  const first = user.name.split(' ')[0];

  return (
    <div className="container-page py-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside>
          <div className="card sticky top-24 p-6 text-center shadow-card">
            <div className="flex justify-center">
              <Avatar name={user.name} alt={user.name} size="xl" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-ink-900">{user.name}</h1>
            <p className="mt-1 text-sm text-ink-500">{user.isHost ? 'Host' : 'Camper'} on CampOut</p>
            {user.verified &&
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
                <BadgeCheckIcon size={14} aria-hidden="true" /> Identity verified
              </p>
            }
            <ul className="mt-6 space-y-3 border-t border-sand-200 pt-6 text-left text-sm text-ink-700">
              <li className="flex items-center gap-2.5">
                <MapPinIcon size={16} className="text-ink-400" aria-hidden="true" /> {user.location}
              </li>
              <li className="flex items-center gap-2.5">
                <CalendarIcon size={16} className="text-ink-400" aria-hidden="true" /> Joined in {user.joinedYear}
              </li>
              <li className="flex items-center gap-2.5">
                <LanguagesIcon size={16} className="text-ink-400" aria-hidden="true" /> Speaks {user.languages.join(', ')}
              </li>
              {user.responseTime &&
              <li className="flex items-center gap-2.5">
                  <MessageCircleIcon size={16} className="text-ink-400" aria-hidden="true" /> Responds {user.responseTime} · {user.responseRate}%
                </li>
              }
            </ul>
            <div className="mt-6">
              {isOwn ?
              <Link to="/account/contact" className="btn-outline w-full">
                  <PencilIcon size={15} aria-hidden="true" /> Edit profile
                </Link> :

              <Link to="/inbox" className="btn-primary w-full">
                  <MessageCircleIcon size={15} aria-hidden="true" /> Message {first}
                </Link>
              }
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-12">
          <section aria-labelledby="about-user">
            <p className="eyebrow">{isOwn ? 'Your profile' : 'Member profile'}</p>
            <h2 id="about-user" className="mt-2 text-3xl font-bold text-ink-900">
              Hi, I’m {first}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-700">{user.bio}</p>
          </section>

          <section aria-labelledby="user-listings">
            <div className="flex items-center justify-between gap-4">
              <h2 id="user-listings" className="text-2xl font-bold text-ink-900">
                {isOwn ? 'Your listings' : `${first}’s sites`}
              </h2>
              {isOwn &&
              <Link to="/l/new" className="btn-outline">
                  <PlusIcon size={15} aria-hidden="true" /> New listing
                </Link>
              }
            </div>
            <div className="mt-6">
              {hostListings.length ?
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                  {hostListings.map((l) =>
                <ListingCard key={l.id} listing={l} />
                )}
                </div> :

              <EmptyState
                icon={TentIcon}
                title={isOwn ? 'You haven’t listed any land yet' : `${first} isn’t hosting yet`}
                description={isOwn ? 'Share a meadow, a pad or a cabin and start earning from your land.' : 'Check back later for sites from this member.'}
                action={isOwn ? <Link to="/l/new" className="btn-primary">Host on your land</Link> : undefined} />

              }
            </div>
          </section>

          {user.isHost &&
          <section aria-labelledby="user-reviews">
              <h2 id="user-reviews" className="text-2xl font-bold text-ink-900">
                Reviews from campers ({reviews.length})
              </h2>
              <div className="mt-6">
                <ReviewList reviews={reviews} showListing={(lid) => `Stayed at ${getListing(lid)?.title ?? ''}`} />
              </div>
            </section>
          }
        </div>
      </div>
    </div>);

}
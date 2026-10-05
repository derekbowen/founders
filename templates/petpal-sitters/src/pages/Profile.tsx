import React from 'react';
import { useParams } from 'react-router-dom';
import { BadgeCheckIcon, CalendarIcon, CatIcon, ClockIcon, DogIcon, HeartIcon, MapPinIcon, PencilIcon, PlusIcon, StarIcon } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { ListingCard } from '../components/listing/ListingCard';
import { ReviewsSection } from '../components/listing/ReviewsSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingsContext';
import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { NotFound } from './NotFound';

export function Profile() {
  const { id } = useParams();
  return id === 'me' ? <MyProfile /> : <SitterProfile id={id ?? ''} />;
}

function SitterProfile({ id }: {id: string;}) {
  const sitterListings = listings.filter((l) => l.sitter.id === id);
  if (sitterListings.length === 0) return <NotFound />;
  const sitter = sitterListings[0].sitter;
  const main = sitterListings[0];
  const sitterReviews = reviews.filter((r) => sitterListings.some((l) => l.id === r.listingId));
  const stats = [
  { label: 'Rating', value: main.rating.toFixed(2) },
  { label: 'Reviews', value: String(main.reviewCount) },
  { label: 'Repeat clients', value: String(sitter.repeatClients) },
  { label: 'Years caring', value: String(sitter.yearsExperience) }];


  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-6 text-center shadow-card ring-1 ring-stone-100">
            <img src={sitter.avatar} alt={sitter.name} className="mx-auto h-36 w-36 rounded-full object-cover ring-4 ring-primary-100" />
            <h1 className="mt-4 flex items-center justify-center gap-2 text-2xl font-black text-stone-900">
              {sitter.name}
              {sitter.verified && <BadgeCheckIcon className="h-6 w-6 text-accent-600" aria-label="Verified" />}
            </h1>
            <p className="mt-1 flex items-center justify-center gap-1 text-[15px] text-stone-600">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" /> {main.neighborhood}, {main.city}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) =>
              <div key={s.label} className="rounded-2xl bg-primary-50 px-3 py-3">
                  <dt className="text-xs font-bold text-stone-500">{s.label}</dt>
                  <dd className="text-xl font-black text-stone-900">{s.value}</dd>
                </div>
              )}
            </dl>
            <ul className="mt-6 space-y-2 text-left text-sm font-semibold text-stone-600">
              <li className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-stone-400" aria-hidden="true" /> Responds {sitter.responseTime}
              </li>
              <li className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-stone-400" aria-hidden="true" /> Member since {sitter.memberSince}
              </li>
              {sitter.verified &&
              <li className="flex items-center gap-2">
                  <BadgeCheckIcon className="h-4 w-4 text-accent-600" aria-hidden="true" /> ID & background check passed
                </li>
              }
            </ul>
            <ButtonLink to={`/l/${main.id}`} fullWidth className="mt-6">
              Book {sitter.firstName}
            </ButtonLink>
          </div>
        </aside>

        <div className="min-w-0">
          <section aria-labelledby="bio-heading">
            <h2 id="bio-heading" className="text-2xl font-black text-stone-900">
              Hi, I’m {sitter.firstName}!
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-stone-700">{sitter.bio}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {main.highlights.map((h) =>
              <li key={h} className="rounded-full bg-primary-100 px-3.5 py-1.5 text-sm font-extrabold text-primary-800">
                  {h}
                </li>
              )}
            </ul>
          </section>
          <section aria-labelledby="listings-heading" className="mt-12 border-t border-stone-200 pt-10">
            <h2 id="listings-heading" className="text-2xl font-black text-stone-900">
              {sitter.firstName}’s listings
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {sitterListings.map((l) =>
              <ListingCard key={l.id} listing={l} />
              )}
            </div>
          </section>
          <section aria-labelledby="sitter-reviews-heading" className="mt-12 border-t border-stone-200 pt-10">
            <h2 id="sitter-reviews-heading" className="mb-6 text-2xl font-black text-stone-900">
              Reviews from pet parents
            </h2>
            <ReviewsSection reviews={sitterReviews} rating={main.rating} total={main.reviewCount} />
          </section>
        </div>
      </div>
    </div>);

}

function MyProfile() {
  const { user } = useAuth();
  const { pets, favorites } = useBookings();
  if (!user) return <NotFound />;
  const saved = listings.filter((l) => favorites.includes(l.id));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-stone-100 sm:flex-row sm:items-center sm:p-8">
        <Avatar name={user.name} alt={user.name} src={user.avatar} size="xl" />
        <div className="flex-1">
          <h1 className="text-3xl font-black tracking-tight text-stone-900">{user.name}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-stone-600">
            <span className="flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" /> {user.location}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" aria-hidden="true" /> Member since {user.memberSince}
            </span>
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-stone-700">{user.bio}</p>
        </div>
        <ButtonLink to="/account/contact" variant="secondary" leftIcon={<PencilIcon className="h-4 w-4" />}>
          Edit account
        </ButtonLink>
      </div>

      <section aria-labelledby="my-pets-heading" className="mt-12">
        <h2 id="my-pets-heading" className="text-2xl font-black text-stone-900">
          My pets
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) =>
          <li key={pet.id} className="flex gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-stone-100">
              {pet.photo ?
            <img src={pet.photo} alt={pet.name} className="h-20 w-20 shrink-0 rounded-2xl object-cover" /> :

            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                  {pet.species === 'Cat' ? <CatIcon className="h-8 w-8" /> : <DogIcon className="h-8 w-8" />}
                </span>
            }
              <div className="min-w-0">
                <p className="text-lg font-extrabold text-stone-900">{pet.name}</p>
                <p className="text-sm font-semibold text-stone-500">
                  {pet.breed} · {pet.age}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-stone-600">{pet.careNotes}</p>
              </div>
            </li>
          )}
        </ul>
      </section>

      <section aria-labelledby="my-listings-heading" className="mt-12">
        <h2 id="my-listings-heading" className="text-2xl font-black text-stone-900">
          My listings
        </h2>
        <EmptyState
          className="mt-6"
          title="You haven’t published a listing yet"
          text="Share your love of animals and earn on your own schedule. It only takes about 10 minutes."
          action={
          <ButtonLink to="/listings/new" leftIcon={<PlusIcon className="h-4 w-4" />}>
              Create a listing
            </ButtonLink>
          } />
        
      </section>

      <section aria-labelledby="saved-heading" className="mt-12">
        <h2 id="saved-heading" className="flex items-center gap-2 text-2xl font-black text-stone-900">
          <HeartIcon className="h-6 w-6 fill-red-500 text-red-500" aria-hidden="true" /> Saved sitters
        </h2>
        {saved.length === 0 ?
        <EmptyState
          className="mt-6"
          icon={<StarIcon className="h-7 w-7" />}
          title="No saved sitters yet"
          text="Tap the heart on any sitter to keep them here for later."
          action={<ButtonLink to="/s">Browse sitters</ButtonLink>} /> :


        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
          </div>
        }
      </section>
    </div>);

}
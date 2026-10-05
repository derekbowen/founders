import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  CheckIcon,
  MapPinIcon,
  SearchXIcon,
  Share2Icon,
  UsersIcon,
  ZapIcon } from
'lucide-react';
import { Avatar } from '../components/Avatar';
import { AmenitiesGrid } from '../components/listing/AmenitiesGrid';
import { BookingPanel } from '../components/listing/BookingPanel';
import { Gallery } from '../components/listing/Gallery';
import { HostCard } from '../components/listing/HostCard';
import { MapView } from '../components/listing/MapView';
import { OpeningHours } from '../components/listing/OpeningHours';
import { Rating } from '../components/listing/Rating';
import { ReviewsList } from '../components/listing/ReviewsList';
import { EmptyState } from '../components/ui/EmptyState';
import { formatMoney } from '../utils/format';
import { getListing, getListingReviews, getSpaceType, getUser } from '../utils/lookup';

export function Listing() {
  const { id } = useParams();
  const listing = getListing(id);

  if (!listing) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={SearchXIcon}
          title="This space isn’t available"
          description="It may have been removed by the host. Explore other spaces nearby."
          action={<Link to="/s" className="btn-primary">Browse spaces</Link>} />
        
      </div>);

  }

  const type = getSpaceType(listing.spaceType);
  const host = getUser(listing.hostId);
  const reviews = getListingReviews(listing.id);

  const facts = [
  {
    icon: type.icon,
    title: type.label,
    text: type.description
  },
  {
    icon: UsersIcon,
    title:
    type.bookBy === 'seat' ?
    `${listing.seats} ${type.unit.many} per slot` :
    `${listing.seats} ${listing.seats === 1 ? type.unit.one : type.unit.many} · up to ${listing.capacity} people each`,
    text: type.bookBy === 'seat' ? 'Book several seats for your team in one go.' : 'Book the whole room for your group.'
  },
  {
    icon: CalendarClockIcon,
    title: `Minimum ${listing.minHours} ${listing.minHours === 1 ? 'hour' : 'hours'}`,
    text: 'Free cancellation up to 24 hours before your booking.'
  },
  listing.instantBook ?
  { icon: ZapIcon, title: 'Instant book', text: 'Confirmed immediately — no waiting for the host.' } :
  { icon: CheckIcon, title: 'Request to book', text: 'The host usually confirms within 2 hours.' }];


  return (
    <div className="pb-28 lg:pb-16">
      <div className="container-page pt-6">
        <Link to="/s" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
          <ArrowLeftIcon size={15} aria-hidden="true" /> Back to search
        </Link>

        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{listing.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              <Rating value={listing.rating} count={listing.reviewCount} className="text-ink" />
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPinIcon size={14} aria-hidden="true" /> {listing.neighborhood}, {listing.city}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-800">
                <type.icon size={12} aria-hidden="true" /> {type.label}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="btn-secondary self-start !py-2 sm:self-auto">
            
            <Share2Icon size={15} aria-hidden="true" /> Share
          </button>
        </div>

        <div className="mt-6">
          <Gallery images={listing.images} title={listing.title} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 space-y-10">
            <section className="flex items-center justify-between gap-4 border-b border-line pb-8">
              <div>
                <h2 className="font-sans text-xl font-semibold">
                  {type.label} hosted by {host?.firstName}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{listing.summary}</p>
              </div>
              {host &&
              <Link to={`/u/${host.id}`} className="focus-ring shrink-0 rounded-full" aria-label={`${host.name}'s profile`}>
                  <Avatar name={host.name} alt={host.name} size="lg" />
                </Link>
              }
            </section>

            <section aria-label="Key details">
              <ul className="grid gap-5 sm:grid-cols-2">
                {facts.map((f) =>
                <li key={f.title} className="flex gap-3">
                    <f.icon size={22} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold">{f.title}</p>
                      <p className="text-sm text-ink-muted">{f.text}</p>
                    </div>
                  </li>
                )}
              </ul>
            </section>

            <section aria-labelledby="about-space" className="border-t border-line pt-10">
              <h2 id="about-space" className="font-sans text-xl font-semibold">About this space</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{listing.description}</p>
            </section>

            <section aria-labelledby="amenities" className="border-t border-line pt-10">
              <h2 id="amenities" className="mb-5 font-sans text-xl font-semibold">What this space offers</h2>
              <AmenitiesGrid ids={listing.amenities} />
            </section>

            <section className="grid gap-10 border-t border-line pt-10 md:grid-cols-2">
              <div>
                <h2 className="mb-4 font-sans text-xl font-semibold">Opening hours</h2>
                <OpeningHours hours={listing.openingHours} />
              </div>
              <div>
                <h2 className="mb-4 font-sans text-xl font-semibold">House rules</h2>
                <ul className="space-y-3">
                  {listing.houseRules.map((r) =>
                  <li key={r} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
                      {r}
                    </li>
                  )}
                </ul>
              </div>
            </section>

            <section aria-labelledby="location" className="border-t border-line pt-10">
              <h2 id="location" className="font-sans text-xl font-semibold">Where you’ll be</h2>
              <p className="mt-1 text-sm text-ink-muted">{listing.address}</p>
              <MapView listings={[listing]} single className="mt-5 h-72 sm:h-80" label={`Map showing ${listing.title}`} />
            </section>

            <section aria-labelledby="reviews" className="border-t border-line pt-10">
              <h2 id="reviews" className="mb-6 flex items-center gap-3 font-sans text-xl font-semibold">
                Reviews <Rating value={listing.rating} count={listing.reviewCount} />
              </h2>
              <ReviewsList reviews={reviews} />
            </section>

            {host &&
            <section aria-label="Your host" className="border-t border-line pt-10">
                <HostCard host={host} />
              </section>
            }
          </div>

          <aside className="lg:block">
            <div className="lg:sticky lg:top-24">
              <BookingPanel listing={listing} />
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">
            <span className="font-semibold">{formatMoney(listing.pricePerHour)}</span>
            <span className="text-ink-muted"> /hour · </span>
            <span className="font-semibold">{formatMoney(listing.pricePerDay)}</span>
            <span className="text-ink-muted"> /day</span>
          </p>
          <a href="#booking" className="btn-primary">
            Check availability
          </a>
        </div>
      </div>
    </div>);

}
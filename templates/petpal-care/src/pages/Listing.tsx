import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon, MapPinIcon } from 'lucide-react';
import { PhotoCarousel } from '../components/listing/PhotoCarousel';
import { SitterSection } from '../components/listing/SitterSection';
import { ServicesSection } from '../components/listing/ServicesSection';
import { HomeSection } from '../components/listing/HomeSection';
import { AvailabilityCalendar } from '../components/listing/AvailabilityCalendar';
import { ReviewList } from '../components/listing/ReviewList';
import { BookingPanel } from '../components/listing/BookingPanel';
import { ApproxLocationMap } from '../components/map/ApproxLocationMap';
import { StarRating } from '../components/common/StarRating';
import { EmptyState } from '../components/common/EmptyState';
import { getListingById, getReviewsForListing, getStartingPrice, isDateBlocked } from '../utils/listing';
import { formatMoney } from '../utils/format';

export function Listing() {
  const { listingId } = useParams();
  const listing = getListingById(listingId);

  if (!listing) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Listing not found"
          description="This sitter may have paused their listing. Try browsing other sitters nearby."
          action={
          <Link to="/search" className="btn btn-md btn-primary">
              Browse sitters
            </Link>
          } />
        
      </div>);

  }

  const listingReviews = getReviewsForListing(listing.id);
  const price = getStartingPrice(listing);

  return (
    <div className="bg-ink-50 pb-24 lg:pb-16">
      <div className="container-page pt-6">
        <Link to="/search" className="inline-flex items-center gap-1 text-sm font-bold text-ink-700 hover:text-ink-900">
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to search
        </Link>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">{listing.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <StarRating rating={listing.rating} count={listing.reviewCount} />
              <span className="inline-flex items-center gap-1 font-semibold text-ink-700">
                <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                {listing.neighborhood}, {listing.city}
              </span>
              <span className="font-semibold text-ink-600">{listing.tagline}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <PhotoCarousel photos={listing.photos} altBase={`${listing.sitter.firstName}’s home in ${listing.neighborhood}`} />
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="divide-y divide-ink-200">
            <SitterSection listing={listing} />
            <ServicesSection listing={listing} />
            <HomeSection listing={listing} />

            <section aria-labelledby="availability-heading" className="py-8">
              <h2 id="availability-heading" className="text-xl font-black text-ink-900">
                Availability
              </h2>
              <p className="mt-1 text-sm text-ink-600">Crossed-out dates are already booked or blocked by {listing.sitter.firstName}.</p>
              <div className="card mt-5 p-5">
                <AvailabilityCalendar monthsShown={2} isBlocked={(d) => isDateBlocked(listing, d)} />
                <div className="mt-4 flex gap-5 text-xs font-semibold text-ink-600">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-white ring-1 ring-ink-300" /> Available
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-ink-200" /> Unavailable
                  </span>
                </div>
              </div>
            </section>

            <section aria-labelledby="reviews-heading" className="py-8">
              <div className="flex items-center gap-3">
                <h2 id="reviews-heading" className="text-xl font-black text-ink-900">
                  Reviews
                </h2>
                <StarRating rating={listing.rating} count={listing.reviewCount} size="md" />
              </div>
              <div className="mt-5">
                <ReviewList reviews={listingReviews} />
              </div>
            </section>

            <section aria-labelledby="location-heading" className="py-8">
              <h2 id="location-heading" className="text-xl font-black text-ink-900">
                Location
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                {listing.neighborhood}, {listing.city}. The exact address is shared once your booking is confirmed.
              </p>
              <div className="mt-5 h-80 overflow-hidden rounded-3xl border border-ink-200">
                <ApproxLocationMap lat={listing.lat} lng={listing.lng} />
              </div>
            </section>
          </div>

          <aside id="book" aria-label="Book this sitter" className="scroll-mt-24">
            <div className="lg:sticky lg:top-24">
              <BookingPanel listing={listing} />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-ink-200 bg-white px-4 py-3 lg:hidden">
        <p className="text-sm text-ink-600">
          From <span className="text-lg font-black text-ink-900">{formatMoney(price.price)}</span> / {price.unitLabel}
        </p>
        <a href="#book" className="btn btn-md btn-primary">
          Check availability
        </a>
      </div>
    </div>);

}
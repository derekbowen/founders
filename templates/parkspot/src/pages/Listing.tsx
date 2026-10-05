import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, NavigationIcon, SearchXIcon, ZapIcon } from 'lucide-react';
import { PhotoCarousel } from '../components/listing/PhotoCarousel';
import { BookingPanel } from '../components/listing/BookingPanel';
import { HostCard } from '../components/listing/HostCard';
import { ReviewList } from '../components/listing/ReviewList';
import { AccessPreview, AmenityList, SizeLimits, SpotHighlights } from '../components/listing/SpotSpecs';
import { SpotLocationMap } from '../components/map/SpotLocationMap';
import { Rating } from '../components/common/Rating';
import { SpotTypeChip } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { getListing, getListingsByHost, getReviewsForListing, getUser } from '../utils/lookup';
import { defaultArriveLeave, formatMoney } from '../utils/format';
import { buttonClass } from '../utils/styles';

export function Listing() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { currentUser } = useAuth();
  const listing = getListing(id);

  if (!listing) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <EmptyState
          icon={<SearchXIcon size={24} aria-hidden />}
          title="This spot isn’t available"
          text="It may have been removed by the host. Plenty of others are nearby."
          action={<Link to="/s" className={buttonClass('primary')}>Browse spots</Link>} />
        
      </div>);

  }

  const host = getUser(listing.hostId);
  const reviews = getReviewsForListing(listing.id);
  const defaults = defaultArriveLeave();
  const arrive = params.get('arrive') ?? defaults.arrive;
  const leave = params.get('leave') ?? defaults.leave;
  const backSearch = new URLSearchParams({ arrive, leave }).toString();

  return (
    <div className="w-full bg-canvas pb-28 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link to={`/s?${backSearch}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
          <ArrowLeftIcon size={16} aria-hidden /> Back to results
        </Link>

        <header className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{listing.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <Rating value={listing.rating} count={listing.reviewCount} />
            <span className="inline-flex items-center gap-1 text-muted">
              <MapPinIcon size={14} aria-hidden /> {listing.neighborhood}, {listing.city} · near {listing.addressHint}
            </span>
          </div>
        </header>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-10">
            <PhotoCarousel
              photos={listing.photos}
              title={listing.title}
              badge={
              <>
                  <SpotTypeChip label={listing.spotType} tone="solid" />
                  {listing.instantBook &&
                <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-ink">
                      <ZapIcon size={12} aria-hidden /> Instant book
                    </span>
                }
                </>
              } />
            

            <section aria-labelledby="about-spot">
              <h2 id="about-spot" className="text-xl font-bold">About this spot</h2>
              <p className="mt-3 leading-relaxed text-ink/85">{listing.description}</p>
              <div className="mt-5">
                <SpotHighlights listing={listing} />
              </div>
            </section>

            <section aria-labelledby="access">
              <h2 id="access" className="text-xl font-bold">Access instructions</h2>
              <div className="mt-4">
                <AccessPreview listing={listing} />
              </div>
            </section>

            <section aria-labelledby="size">
              <h2 id="size" className="text-xl font-bold">Size limits</h2>
              <div className="mt-4">
                <SizeLimits listing={listing} />
              </div>
            </section>

            <section aria-labelledby="amenities">
              <h2 id="amenities" className="text-xl font-bold">Amenities</h2>
              <div className="mt-4">
                <AmenityList amenities={listing.amenities} />
              </div>
            </section>

            <section aria-labelledby="location">
              <h2 id="location" className="text-xl font-bold">Location</h2>
              <p className="mt-1 text-sm text-muted">Exact address shared after booking is confirmed.</p>
              <div className="mt-4 h-72 overflow-hidden rounded-2xl border border-line">
                <SpotLocationMap lat={listing.lat} lng={listing.lng} />
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {listing.nearby.map((n) =>
                <li key={n} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm">
                    <NavigationIcon size={12} aria-hidden /> {n}
                  </li>
                )}
              </ul>
            </section>

            <section aria-labelledby="reviews">
              <div className="flex items-baseline justify-between">
                <h2 id="reviews" className="text-xl font-bold">Reviews</h2>
                <Rating value={listing.rating} count={listing.reviewCount} size="md" />
              </div>
              <div className="mt-4">
                <ReviewList reviews={reviews} />
              </div>
            </section>

            {host &&
            <section aria-labelledby="host">
                <h2 id="host" className="sr-only">Your host</h2>
                <HostCard host={host} listingCount={getListingsByHost(host.id).length} />
              </section>
            }
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Booking">
            <BookingPanel
              listing={listing}
              initialArrive={arrive}
              initialLeave={leave}
              isOwnListing={currentUser?.id === listing.hostId} />
            
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[800] flex items-center justify-between gap-4 border-t border-line bg-surface px-4 py-3 lg:hidden">
        <p className="text-sm">
          <span className="text-lg font-bold">{formatMoney(listing.hourlyPrice)}</span>
          <span className="text-muted"> /hr · {formatMoney(listing.dailyPrice)} /day</span>
        </p>
        <a href="#booking" className={buttonClass('accent', 'md')}>
          Reserve
        </a>
      </div>
    </div>);

}
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRightIcon, RulerIcon, SearchXIcon, ShirtIcon, SparklesIcon, StarIcon } from 'lucide-react';
import { listings } from '../data/listings';
import { Gallery } from '../components/listing/Gallery';
import { BookingPanel } from '../components/listing/BookingPanel';
import { AvailabilityCalendar } from '../components/listing/AvailabilityCalendar';
import { ReviewsSection } from '../components/listing/ReviewsSection';
import { LenderCard } from '../components/listing/LenderCard';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import type { RentalDays } from '../types/marketplace';
import { formatMoney, sizeLabel } from '../utils/format';
import { getListing, getUser, occasionLabel, reviewsForListing } from '../utils/lookup';
import { btn, eyebrow } from '../utils/styles';

export function ListingPage() {
  const { id } = useParams();
  const listing = getListing(id);
  const [days, setDays] = useState<RentalDays>(4);
  const [eventDate, setEventDate] = useState<Date | null>(null);

  if (!listing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24">
        <EmptyState
          icon={SearchXIcon}
          title="This dress has left the closet"
          text="The listing may have been removed or the link is incorrect."
          action={
          <Link to="/s" className={btn('primary', 'md')}>
              Browse dresses
            </Link>
          } />
        
      </div>);

  }

  const lender = getUser(listing.lenderId);
  const reviews = reviewsForListing(listing.id);
  const similar = listings.
  filter((l) => l.id !== listing.id && l.occasions.some((o) => listing.occasions.includes(o))).
  slice(0, 4);
  const m = listing.measurements;

  return (
    <div className="pb-28 lg:pb-0">
      <div className="mx-auto max-w-[1400px] px-4 pt-6 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
          <Link to="/s" className="hover:text-ink">
            Dresses
          </Link>
          <ChevronRightIcon size={12} aria-hidden="true" />
          <Link to={`/s?occasion=${listing.occasions[0]}`} className="hover:text-ink">
            {occasionLabel(listing.occasions[0])}
          </Link>
          <ChevronRightIcon size={12} aria-hidden="true" />
          <span className="truncate text-ink">{listing.title}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-6 md:px-8 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div className="min-w-0 space-y-12">
          <Gallery listing={listing} />

          <header>
            <Link
              to={`/s?designer=${encodeURIComponent(listing.designer)}`}
              className={`${eyebrow} hover:underline`}>
              
              {listing.designer}
            </Link>
            <h1 className="mt-2 font-display text-4xl leading-tight text-ink md:text-5xl">{listing.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-1">
                <StarIcon size={14} className="fill-ink text-ink" aria-hidden="true" />
                <span className="text-ink">{listing.rating.toFixed(1)}</span> ({listing.reviewCount})
              </span>
              <span>{sizeLabel(listing.size)}</span>
              <span>{listing.length}</span>
              <span>{listing.color}</span>
              <span>
                Retail value <span className="text-ink">{formatMoney(listing.retailPrice)}</span>
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {listing.occasions.map((o) =>
              <Link
                key={o}
                to={`/s?occasion=${o}`}
                className="bg-accent-soft px-3 py-1 text-xs text-ink transition hover:bg-accent/40">
                
                  {occasionLabel(o)}
                </Link>
              )}
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/85">{listing.description}</p>
          </header>

          <section aria-labelledby="fit-heading" className="grid gap-px border border-line bg-line md:grid-cols-2">
            <div className="bg-paper p-6">
              <h2 id="fit-heading" className="flex items-center gap-2 font-display text-2xl">
                <ShirtIcon size={18} className="text-accent-dark" aria-hidden="true" /> Size & fit
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                ['Size', sizeLabel(listing.size)],
                ['Fit', listing.fit],
                ['Stretch', listing.stretch],
                ['Fabric', listing.fabric]].
                map(([k, v]) =>
                <div key={k} className="flex justify-between gap-4 border-b border-line pb-3 last:border-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right text-ink">{v}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-4 bg-cream p-3 text-xs leading-relaxed text-ink/85">
                <strong className="font-semibold">Lender’s note:</strong> {listing.fitNotes}
              </p>
            </div>
            <div className="bg-paper p-6">
              <h2 className="flex items-center gap-2 font-display text-2xl">
                <RulerIcon size={18} className="text-accent-dark" aria-hidden="true" /> Measurements
              </h2>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                {[
                ['Bust', m.bust],
                ['Waist', m.waist],
                ['Hips', m.hips],
                ['Length', m.length]].
                map(([k, v]) =>
                <div key={k} className="border border-line p-4">
                    <dt className="text-[11px] uppercase tracking-eyebrow text-muted">{k}</dt>
                    <dd className="mt-1 font-display text-3xl text-ink">
                      {v}
                      <span className="ml-0.5 text-sm text-muted">″</span>
                    </dd>
                  </div>
                )}
              </dl>
              <p className="mt-4 text-xs text-muted">Garment measured flat and doubled, in inches. Length from shoulder to hem.</p>
            </div>
          </section>

          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="font-display text-3xl">Rental options</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {([4, 8] as RentalDays[]).map((d) =>
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                aria-pressed={days === d}
                className={`border p-5 text-left transition ${days === d ? 'border-ink bg-cream' : 'border-line hover:border-ink'}`}>
                
                  <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted">{d}-day rental</p>
                  <p className="mt-2 font-display text-4xl text-ink">
                    {formatMoney(d === 4 ? listing.price4 : listing.price8)}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {d === 4 ?
                  'Arrives the day before your event. Ideal for a single night out.' :
                  'Extra time for try-ons, rehearsal dinners or destination travel.'}
                  </p>
                </button>
              )}
            </div>
            <div className="mt-4 flex items-start gap-3 border border-accent/60 bg-accent-soft/60 p-4 text-sm text-ink">
              <SparklesIcon size={18} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden="true" />
              <p>
                <strong className="font-semibold">Cleaning is on us.</strong> Every dress is professionally cleaned
                after each rental — no dry cleaning bills, just send it back as is.
              </p>
            </div>
          </section>

          <section aria-labelledby="availability-heading">
            <h2 id="availability-heading" className="font-display text-3xl">Availability</h2>
            <p className="mt-2 text-sm text-muted">
              Choose your event date — your {days}-day window is highlighted.
            </p>
            <div className="mt-6 border border-line p-5 md:p-6">
              <AvailabilityCalendar
                listing={listing}
                days={days}
                eventDate={eventDate}
                onSelect={setEventDate}
                months={2} />
              
            </div>
          </section>

          {lender && <LenderCard lender={lender} />}

          <ReviewsSection listing={listing} reviews={reviews} />
        </div>

        <aside id="booking" aria-label="Book this dress" className="lg:block">
          <div className="lg:sticky lg:top-24">
            <BookingPanel
              listing={listing}
              days={days}
              setDays={setDays}
              eventDate={eventDate}
              setEventDate={setEventDate} />
            
          </div>
        </aside>
      </div>

      {similar.length > 0 &&
      <section className="mx-auto max-w-[1400px] border-t border-line px-4 py-16 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl">You might also love</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {similar.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
          </div>
        </section>
      }

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-paper px-4 py-3 lg:hidden">
        <p>
          <span className="font-display text-2xl">{formatMoney(days === 4 ? listing.price4 : listing.price8)}</span>
          <span className="text-xs text-muted"> / {days} days</span>
        </p>
        <a href="#booking" className={btn('primary', 'md')}>
          Check dates
        </a>
      </div>
    </div>);

}
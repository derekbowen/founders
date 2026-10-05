import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, BadgeCheckIcon, ClockIcon, HeartIcon, MapPinIcon, RepeatIcon, Share2Icon, SparklesIcon, StarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader } from '../components/Dialog';
import { AvailabilityCalendar } from '../components/listing/AvailabilityCalendar';
import { BookingPanel } from '../components/listing/BookingPanel';
import { HomeDetails } from '../components/listing/HomeDetails';
import { PhotoCarousel } from '../components/listing/PhotoCarousel';
import { ReviewsSection } from '../components/listing/ReviewsSection';
import { ServicesList } from '../components/listing/ServicesList';
import { MapView } from '../components/search/MapView';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { useBookings } from '../contexts/BookingsContext';
import { listings } from '../data/listings';
import { reviews } from '../data/reviews';
import { useBookingForm } from '../hooks/useBookingForm';
import type { Listing } from '../types/marketplace';
import { cn } from '../utils/cn';
import { formatMoney } from '../utils/format';
import { NotFound } from './NotFound';

export function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  if (!listing) return <NotFound />;
  return <ListingContent key={listing.id} listing={listing} />;
}

function Section({ id, title, children }: {id: string;title: string;children: React.ReactNode;}) {
  return (
    <section aria-labelledby={id} className="border-t border-stone-200 py-10">
      <h2 id={id} className="mb-6 text-2xl font-black tracking-tight text-stone-900">
        {title}
      </h2>
      {children}
    </section>);

}

function ListingContent({ listing }: {listing: Listing;}) {
  const [params] = useSearchParams();
  const { favorites, toggleFavorite } = useBookings();
  const [bookingOpen, setBookingOpen] = useState(false);
  const form = useBookingForm(listing, {
    serviceId: params.get('service'),
    start: params.get('start'),
    end: params.get('end'),
    pets: Number(params.get('pets')) || 1
  });
  const listingReviews = reviews.filter((r) => r.listingId === listing.id);
  const isFavorite = favorites.includes(listing.id);
  const { sitter } = listing;

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Couldn’t copy the link');
    }
  };

  return (
    <div className="w-full pb-28 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link to="/s" className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 hover:text-stone-900">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to search
        </Link>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{listing.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-stone-600">
              <span className="flex items-center gap-1 font-bold text-stone-900">
                <StarIcon className="h-4 w-4 fill-primary-400 text-primary-400" aria-hidden="true" />
                {listing.rating.toFixed(2)}
              </span>
              <a href="#reviews-heading" className="underline-offset-2 hover:underline">
                {listing.reviewCount} reviews
              </a>
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" aria-hidden="true" /> {listing.neighborhood}, {listing.city}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" leftIcon={<Share2Icon className="h-4 w-4" />} onClick={share}>
              Share
            </Button>
            <Button
              variant="secondary"
              size="sm"
              aria-pressed={isFavorite}
              leftIcon={<HeartIcon className={cn('h-4 w-4', isFavorite && 'fill-red-500 text-red-500')} />}
              onClick={() => toggleFavorite(listing.id)}>
              
              {isFavorite ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <PhotoCarousel photos={listing.photos} title={listing.title} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            {/* Sitter intro */}
            <section aria-label="About the sitter" className="pb-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img src={sitter.avatar} alt={sitter.name} className="h-24 w-24 rounded-3xl object-cover shadow-card" />
                <div className="flex-1">
                  <h2 className="flex items-center gap-2 text-2xl font-black text-stone-900">
                    Hosted by {sitter.firstName}
                    {sitter.verified && <BadgeCheckIcon className="h-6 w-6 text-accent-600" aria-label="Verified" />}
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-semibold text-stone-600">
                    <li className="flex items-center gap-1.5">
                      <ClockIcon className="h-4 w-4 text-stone-400" aria-hidden="true" /> Responds {sitter.responseTime}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <RepeatIcon className="h-4 w-4 text-stone-400" aria-hidden="true" /> {sitter.repeatClients} repeat clients
                    </li>
                    <li className="flex items-center gap-1.5">
                      <SparklesIcon className="h-4 w-4 text-stone-400" aria-hidden="true" /> {sitter.yearsExperience} years experience
                    </li>
                  </ul>
                </div>
                <ButtonLink to={`/u/${sitter.id}`} variant="secondary" size="sm">
                  View profile
                </ButtonLink>
              </div>
              <p className="mt-6 text-[17px] leading-relaxed text-stone-700">{sitter.bio}</p>
              <p className="mt-4 text-[17px] leading-relaxed text-stone-700">{listing.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {listing.highlights.map((h) =>
                <li key={h} className="rounded-full bg-primary-100 px-3.5 py-1.5 text-sm font-extrabold text-primary-800">
                    {h}
                  </li>
                )}
              </ul>
            </section>

            <Section id="services-heading" title="Services & rates">
              <ServicesList listing={listing} />
            </Section>

            <Section id="home-heading" title="Home & pet preferences">
              <HomeDetails listing={listing} />
            </Section>

            <Section id="availability-heading" title="Availability">
              <p className="-mt-3 mb-6 text-[15px] text-stone-600">
                {form.isNight ? 'Tap a drop-off date, then a pick-up date.' : 'Tap a date to choose your session day.'}
              </p>
              <AvailabilityCalendar blocked={form.blocked} start={form.start} end={form.isNight ? form.end : undefined} onPick={form.pickDate} />
            </Section>

            <Section id="reviews-heading" title="Reviews">
              <ReviewsSection reviews={listingReviews} rating={listing.rating} total={listing.reviewCount} />
            </Section>

            <Section id="location-heading" title="Where you’ll drop off">
              <p className="-mt-3 mb-5 text-[15px] text-stone-600">
                {listing.neighborhood}, {listing.city}. The exact address is shared once your booking is confirmed.
              </p>
              <div className="h-80 overflow-hidden rounded-3xl ring-1 ring-stone-200">
                <MapView listings={[listing]} approximate />
              </div>
            </Section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingPanel listing={listing} form={form} />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div>
            <p className="text-stone-500">
              <span className="text-lg font-black text-stone-900">{formatMoney(form.variation.price)}</span> / {form.service.unitLabel}
            </p>
            <p className="text-xs font-semibold text-stone-500">{form.service.label}</p>
          </div>
          <Button onClick={() => setBookingOpen(true)}>Check availability</Button>
        </div>
      </div>
      <Dialog isOpen={bookingOpen} onClose={() => setBookingOpen(false)} size="md">
        <DialogHeader>Book {sitter.firstName}</DialogHeader>
        <DialogContent>
          <div className="-mx-2 max-h-[70vh] overflow-y-auto">
            <BookingPanel listing={listing} form={form} />
          </div>
        </DialogContent>
      </Dialog>
    </div>);

}
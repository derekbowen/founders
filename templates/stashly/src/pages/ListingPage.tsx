import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronLeftIcon,
  StarIcon,
  MapPinIcon,
  ThermometerIcon,
  ClockIcon,
  ArrowDownToLineIcon,
  CarIcon,
  CalendarClockIcon,
  DoorOpenIcon,
  ShieldIcon,
  BanIcon,
  CheckIcon,
  XIcon,
  HomeIcon,
  HeartIcon } from
'lucide-react';
import { BookingPanel } from '../components/listing/BookingPanel';
import { SizeComparison } from '../components/listing/SizeComparison';
import { HostCard } from '../components/listing/HostCard';
import { ReviewList } from '../components/ReviewList';
import { MapView } from '../components/MapView';
import { EmptyState } from '../components/EmptyState';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { findHost } from '../data/hosts';
import { reviews } from '../data/reviews';
import { sqft } from '../data/listings';
import { spaceTypeLabel, accessFrequencyLabel } from '../data/spaceTypes';
import { formatMoney } from '../utils/pricing';
import { ui, cx } from '../utils/styles';

export function ListingPage() {
  const { id = '' } = useParams();
  const { getListing, user, favorites, toggleFavorite } = useMarketplace();
  const listing = getListing(id);
  const [photo, setPhoto] = useState(0);

  if (!listing) {
    return (
      <div className={cx(ui.container, 'py-20')}>
        <EmptyState
          icon={<HomeIcon className="h-5 w-5" />}
          title="This space isn’t available"
          text="It may have been unlisted by the host. Browse similar spaces nearby."
          action={<Link to="/s" className={ui.linkBrand}>Browse spaces</Link>} />
        
      </div>);

  }

  const host = findHost(listing.hostId);
  const listingReviews = reviews.filter((r) => r.listingId === listing.id);
  const isOwn = user?.id === listing.hostId;
  const fav = favorites.includes(listing.id);

  const facts = [
  { icon: HomeIcon, label: spaceTypeLabel(listing.type), sub: `${sqft(listing)} sq ft` },
  { icon: ClockIcon, label: listing.access247 ? '24/7 access' : 'Set hours', sub: listing.accessHours },
  { icon: ThermometerIcon, label: listing.climateControlled ? 'Climate controlled' : 'Not climate controlled', sub: listing.climateControlled ? 'Temp & humidity managed' : 'Seasonal temps' },
  { icon: ArrowDownToLineIcon, label: listing.groundFloor ? 'Ground floor' : 'Stairs or ladder', sub: listing.groundFloor ? 'Step-free loading' : 'Lighter items best' }];


  const features = [
  { label: 'Climate controlled', on: listing.climateControlled },
  { label: '24/7 access', on: listing.access247 },
  { label: 'Ground-floor / step-free', on: listing.groundFloor },
  { label: 'Vehicle storage', on: listing.vehicleStorage },
  ...listing.security.map((s) => ({ label: s, on: true }))];


  return (
    <div className="pb-24 lg:pb-16">
      <div className={cx(ui.container, 'pt-6')}>
        <Link to="/s" className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-brand-700">
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to search
        </Link>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">{listing.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-700">
              <span className="flex items-center gap-1 font-semibold">
                <StarIcon className="h-4 w-4 fill-sand-500 text-sand-500" aria-hidden="true" />
                {listing.rating.toFixed(2)}
              </span>
              <a href="#reviews" className="underline underline-offset-2 hover:text-brand-700">{listing.reviewCount} reviews</a>
              <span className="flex items-center gap-1"><MapPinIcon className="h-4 w-4" aria-hidden="true" />{listing.neighborhood}, {listing.city}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(listing.id)}
            aria-pressed={fav}
            className={cx(ui.linkOutline, 'self-start')}>
            
            <HeartIcon className={cx('h-4 w-4', fav && 'fill-sand-500 text-sand-500')} aria-hidden="true" />
            {fav ? 'Saved' : 'Save'}
          </button>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid gap-2 md:grid-cols-4 md:grid-rows-2">
          <div className="relative overflow-hidden rounded-2xl bg-stone-100 md:col-span-3 md:row-span-2">
            <img src={listing.images[photo]} alt={`${listing.title} — photo ${photo + 1}`} className="aspect-[16/10] h-full w-full object-cover" />
            <span className="absolute bottom-3 right-3 rounded-full bg-stone-900/75 px-3 py-1 text-xs font-medium text-white">
              {photo + 1} / {listing.images.length}
            </span>
          </div>
          <div className="flex gap-2 md:contents">
            {listing.images.slice(0, 3).map((src, i) =>
            <button
              key={src + i}
              type="button"
              onClick={() => setPhoto(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={photo === i}
              className={cx(
                'relative w-1/3 overflow-hidden rounded-xl bg-stone-100 md:w-auto',
                i === 2 && 'md:hidden',
                photo === i ? 'ring-2 ring-brand-600 ring-offset-2' : 'opacity-90 hover:opacity-100'
              )}>
              
                <img src={src} alt="" className="aspect-[4/3] h-full w-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={cx(ui.container, 'mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]')}>
        <div className="min-w-0 space-y-12">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((f) =>
            <li key={f.label} className="rounded-xl border border-stone-200 p-4">
                <f.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold text-stone-900">{f.label}</p>
                <p className="text-xs text-stone-600">{f.sub}</p>
              </li>
            )}
          </ul>

          <Section title="About this space">
            <p className="leading-relaxed text-stone-700">{listing.description}</p>
          </Section>

          <Section title="Size & dimensions">
            <SizeComparison listing={listing} />
          </Section>

          <Section title="Access">
            <div className="grid gap-4 sm:grid-cols-3">
              <InfoTile icon={<ClockIcon className="h-5 w-5" />} label="Access hours" value={listing.accessHours} />
              <InfoTile icon={<CalendarClockIcon className="h-5 w-5" />} label="Visit frequency" value={accessFrequencyLabel[listing.accessFrequency]} />
              <InfoTile icon={<DoorOpenIcon className="h-5 w-5" />} label="Entry" value={listing.accessNotes} />
            </div>
          </Section>

          <Section title="Climate & security">
            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((f) =>
              <li key={f.label} className={cx('flex items-center gap-3 text-sm', f.on ? 'text-stone-800' : 'text-stone-500 line-through decoration-stone-300')}>
                  <span className={cx('grid h-7 w-7 place-items-center rounded-full', f.on ? 'bg-brand-50 text-brand-700' : 'bg-stone-100 text-stone-400')}>
                    {f.on ? <CheckIcon className="h-4 w-4" aria-hidden="true" /> : <XIcon className="h-4 w-4" aria-hidden="true" />}
                  </span>
                  {f.label}
                  {!f.on && <span className="sr-only">(not available)</span>}
                </li>
              )}
              {listing.vehicleStorage &&
              <li className="flex items-center gap-3 text-sm text-stone-800">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-50 text-brand-700"><CarIcon className="h-4 w-4" aria-hidden="true" /></span>
                  Fits vehicles up to {listing.length} ft
                </li>
              }
            </ul>
          </Section>

          <Section title="What can’t be stored">
            <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {listing.prohibited.map((p) =>
                <li key={p} className="flex items-center gap-2.5 text-sm text-stone-800">
                    <BanIcon className="h-4 w-4 shrink-0 text-red-600" aria-hidden="true" /> {p}
                  </li>
                )}
              </ul>
            </div>
          </Section>

          {host &&
          <Section title="Your host">
              <HostCard host={host} />
            </Section>
          }

          <Section title={`Reviews (${listingReviews.length})`} id="reviews">
            <ReviewList items={listingReviews} />
          </Section>

          <Section title="Location">
            <p className="mb-4 text-sm text-stone-600">
              {listing.neighborhood}, {listing.city}. The exact address is shared after your booking is accepted.
            </p>
            <MapView listings={[listing]} approximate zoom={14} className="h-72 overflow-hidden rounded-2xl border border-stone-200" />
          </Section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingPanel listing={listing} isOwn={isOwn} />
        </aside>
      </div>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-stone-200 bg-white px-4 py-3 lg:hidden">
        <p>
          <span className="text-lg font-bold text-stone-900">{formatMoney(listing.monthlyPrice)}</span>
          <span className="text-sm text-stone-600"> / month</span>
        </p>
        <a href="#book" className={ui.linkBrand}>Check dates</a>
      </div>
    </div>);

}

function Section({ title, children, id }: {title: string;children: React.ReactNode;id?: string;}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-stone-200 pt-10 first:border-0 first:pt-0">
      <h2 className="mb-5 text-xl font-semibold text-stone-900">{title}</h2>
      {children}
    </section>);

}

function InfoTile({ icon, label, value }: {icon: React.ReactNode;label: string;value: string;}) {
  return (
    <div className="rounded-xl bg-sand-50 p-4">
      <span className="text-brand-700" aria-hidden="true">{icon}</span>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-stone-500">{label}</p>
      <p className="mt-1 text-sm text-stone-800">{value}</p>
    </div>);

}
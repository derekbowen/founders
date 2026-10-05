import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BadgeCheckIcon,
  ChefHatIcon,
  ChevronRightIcon,
  ClockIcon,
  HeartIcon,
  KeyRoundIcon,
  MapPinIcon,
  RulerIcon,
  SearchXIcon,
  Share2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon } from
'lucide-react';
import { BookingPanel } from '../components/listing/BookingPanel';
import { EquipmentSection } from '../components/listing/EquipmentSection';
import { Gallery } from '../components/listing/Gallery';
import { HostCard } from '../components/listing/HostCard';
import { KitchenMap } from '../components/listing/KitchenMap';
import { ReviewList } from '../components/listing/ReviewList';
import { StorageTable } from '../components/listing/StorageTable';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { StarRating } from '../components/ui/StarRating';
import { certifications } from '../data/catalog';
import { formatMoney } from '../utils/format';
import { getHost, getListing, getReviewsForListing, hoursLabel, segmentLabel } from '../utils/listings';
import { cn, containerClass } from '../utils/styles';

const sectionTitle = 'font-heading text-2xl font-semibold uppercase tracking-wide text-steel-900';

export function ListingPage() {
  const { id } = useParams();
  const listing = getListing(id);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!listing) {
    return (
      <div className={cn(containerClass, 'py-20')}>
        <EmptyState
          icon={<SearchXIcon className="h-5 w-5" aria-hidden="true" />}
          title="This kitchen isn’t available"
          body="It may have been unlisted by the host. Browse other licensed kitchens nearby."
          action={<ButtonLink to="/search">Browse kitchens</ButtonLink>} />
        
      </div>);

  }

  const host = getHost(listing.hostId);
  const listingReviews = getReviewsForListing(listing.id);

  const share = () => {
    void navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(containerClass, 'pb-28 pt-6 lg:pb-20')}>
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-steel-500">
        <Link to="/search" className="hover:text-steel-900 hover:underline">Kitchens</Link>
        <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <Link to={`/search?city=${encodeURIComponent(listing.city)}`} className="hover:text-steel-900 hover:underline">{listing.city}</Link>
        <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="truncate text-steel-700" aria-current="page">{listing.title}</span>
      </nav>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-steel-900 sm:text-4xl">{listing.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-steel-600">
            <StarRating rating={listing.rating} count={listing.reviewCount} />
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1"><MapPinIcon className="h-4 w-4" aria-hidden="true" />{listing.neighborhood}, {listing.city}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1"><ClockIcon className="h-4 w-4" aria-hidden="true" />{hoursLabel(listing)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={share}>
            <Share2Icon className="h-4 w-4" aria-hidden="true" />
            {copied ? 'Link copied' : 'Share'}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSaved((s) => !s)} aria-pressed={saved}>
            <HeartIcon className={cn('h-4 w-4', saved && 'fill-primary text-primary')} aria-hidden="true" />
            {saved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <Gallery images={listing.images} title={listing.title} />
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 divide-y divide-steel-200">
          {/* Summary */}
          <section className="pb-8" aria-label="Summary">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-steel-900">{listing.tagline}</h2>
                <p className="mt-1 text-sm text-steel-500">Hosted by {host?.name} · {host?.business}</p>
              </div>
              {host && <Avatar name={host.name} src={host.avatar} size="lg" />}
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
              { icon: RulerIcon, label: `${listing.squareFeet.toLocaleString()} sq ft` },
              { icon: UsersIcon, label: `${listing.stations} stations` },
              { icon: ClockIcon, label: `${listing.minHours}h minimum` },
              { icon: KeyRoundIcon, label: listing.access247 ? '24/7 access' : 'Staffed hours' }].
              map((f) =>
              <li key={f.label} className="flex items-center gap-2 rounded-xl border border-steel-200 px-3 py-3 text-sm font-medium text-steel-800">
                  <f.icon className="h-4 w-4 text-steel-500" aria-hidden="true" />
                  {f.label}
                </li>
              )}
            </ul>
          </section>

          {/* Certifications */}
          <section className="py-8" aria-labelledby="certs-heading">
            <h2 id="certs-heading" className={sectionTitle}>Certifications</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {listing.certifications.map((key) => {
                const c = certifications.find((x) => x.key === key);
                return (
                  <li key={key}>
                    <Badge tone="accent" className="px-3 py-1.5 text-sm" icon={<BadgeCheckIcon className="h-4 w-4" aria-hidden="true" />}>
                      {c?.label}
                    </Badge>
                  </li>);

              })}
            </ul>
          </section>

          {/* About */}
          <section className="py-8" aria-labelledby="about-heading">
            <h2 id="about-heading" className={sectionTitle}>About this kitchen</h2>
            <p className="mt-4 leading-relaxed text-steel-700">{listing.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-steel-600">Best for:</span>
              {listing.useCases.map((u) =>
              <Badge key={u} icon={<ChefHatIcon className="h-3.5 w-3.5" aria-hidden="true" />}>{segmentLabel(u)}</Badge>
              )}
            </div>
          </section>

          {/* Equipment */}
          <section className="py-8" aria-labelledby="equipment-heading">
            <h2 id="equipment-heading" className={sectionTitle}>Equipment</h2>
            <p className="mt-1 text-sm text-steel-500">Everything below is included in the hourly rate.</p>
            <div className="mt-5">
              <EquipmentSection equipment={listing.equipment} />
            </div>
          </section>

          {/* Storage */}
          <section className="py-8" aria-labelledby="storage-heading">
            <h2 id="storage-heading" className={sectionTitle}>Storage options</h2>
            <p className="mt-1 text-sm text-steel-500">Add monthly storage at checkout. Cancel anytime with 30 days’ notice.</p>
            <div className="mt-5">
              <StorageTable storage={listing.storage} />
            </div>
          </section>

          {/* Rules */}
          <section className="py-8" aria-labelledby="rules-heading">
            <h2 id="rules-heading" className={sectionTitle}>Kitchen rules</h2>
            <ul className="mt-5 space-y-3">
              {listing.rules.map((rule) => {
                const insurance = /insurance/i.test(rule);
                const Icon = insurance ? ShieldCheckIcon : SparklesIcon;
                return (
                  <li key={rule} className="flex items-start gap-3 text-sm text-steel-700">
                    <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg', insurance ? 'bg-primary-soft text-primary' : 'bg-steel-100 text-steel-700')}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="pt-1.5">{rule}</span>
                  </li>);

              })}
            </ul>
            <p className="mt-5 text-sm text-steel-500">Cleaning fee of {formatMoney(listing.cleaningFee)} covers deep cleans between sessions — you’re still responsible for the sign-off checklist.</p>
          </section>

          {/* Location */}
          <section className="py-8" aria-labelledby="location-heading">
            <h2 id="location-heading" className={sectionTitle}>Location</h2>
            <p className="mt-1 text-sm text-steel-500">{listing.neighborhood}, {listing.city}. Exact address shared once your booking is approved.</p>
            <div className="mt-5 h-80 overflow-hidden rounded-2xl border border-steel-200">
              <KitchenMap listings={[listing]} approximate />
            </div>
          </section>

          {/* Reviews */}
          <section className="py-8" aria-labelledby="reviews-heading">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 id="reviews-heading" className={sectionTitle}>Reviews</h2>
              <StarRating rating={listing.rating} count={listing.reviewCount} />
            </div>
            <div className="mt-6">
              <ReviewList reviews={listingReviews} />
            </div>
          </section>

          {/* Host */}
          {host &&
          <section className="pt-8" aria-labelledby="host-heading">
              <h2 id="host-heading" className="sr-only">About the host</h2>
              <HostCard host={host} />
            </section>
          }
        </div>

        <aside id="book" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <BookingPanel listing={listing} />
        </aside>
      </div>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-steel-200 bg-white px-4 py-3 lg:hidden">
        <p className="text-sm">
          <span className="font-semibold text-steel-900">{formatMoney(listing.pricePerHour)}</span>
          <span className="text-steel-500"> / hour · {listing.minHours}h min</span>
        </p>
        <Button onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}>Check availability</Button>
      </div>
    </div>);

}
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon, MapPinIcon, HeartIcon, RulerIcon, UsersIcon, GaugeIcon, CalendarIcon, CheckIcon, CloudRainIcon, CalendarXIcon, AnchorIcon, ShareIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Gallery } from '../components/listing/Gallery';
import { BookingPanel } from '../components/listing/BookingPanel';
import { CaptainCard } from '../components/listing/CaptainCard';
import { ReviewsList } from '../components/listing/ReviewsList';
import { ListingsMap } from '../components/ListingsMap';
import { Avatar } from '../components/ui/Avatar';
import { Rating } from '../components/ui/Rating';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { reviews as allReviews } from '../data/reviews';
import { destinations } from '../data/destinations';
import { boatTypes } from '../data/boatTypes';
import { cancellationPolicies, weatherPolicy } from '../data/booking';
import { formatMoney } from '../utils/pricing';
import { cn } from '../utils/ui';

export function ListingPage() {
  const { id = '' } = useParams();
  const { getListing, getUser, favorites, toggleFavorite } = useMarketplace();
  const listing = getListing(id);

  if (!listing) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState icon={AnchorIcon} title="This boat has sailed" text="The listing you’re looking for doesn’t exist or is no longer available." action={<Button to="/s">Browse boats</Button>} />
      </div>);

  }

  const owner = getUser(listing.ownerId);
  const captain = listing.captainId ? getUser(listing.captainId) : undefined;
  const destination = destinations.find((d) => d.id === listing.destinationId);
  const type = boatTypes.find((t) => t.id === listing.type);
  const reviews = allReviews.filter((r) => r.listingId === listing.id);
  const isFav = favorites.includes(listing.id);
  const policy = cancellationPolicies[listing.cancellation];

  const quickSpecs = [
  { icon: RulerIcon, label: 'Length', value: `${listing.specs.length} ft` },
  { icon: UsersIcon, label: 'Capacity', value: `${listing.specs.capacity} guests` },
  { icon: GaugeIcon, label: 'Engine', value: listing.specs.engine.split('·')[1]?.trim() ?? listing.specs.engine },
  { icon: CalendarIcon, label: 'Year', value: String(listing.specs.year) }];


  const specRows = [
  ['Make & model', `${listing.specs.make} ${listing.specs.model}`],
  ['Boat type', type?.label ?? ''],
  ['Length', `${listing.specs.length} ft`],
  ['Capacity', `${listing.specs.capacity} guests`],
  ['Engine', listing.specs.engine],
  ['Year', String(listing.specs.year)],
  ['Cabins', listing.specs.cabins ? String(listing.specs.cabins) : 'None'],
  ['Fishing gear', listing.fishingGear ? 'On board' : 'Not included'],
  ['Overnight stays', listing.overnight ? 'Allowed' : 'Not allowed']];


  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Couldn’t copy the link');
    }
  };

  return (
    <div className="w-full bg-white pb-28 lg:pb-0">
      <div className="mx-auto max-w-content px-4 pt-6 sm:px-6 lg:px-8">
        <Link to="/s" className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-navy">
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to search
        </Link>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sea">{type?.label}</p>
            <h1 className="mt-1 font-heading text-3xl text-navy sm:text-4xl">{listing.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <Rating value={listing.rating} count={listing.reviewCount} />
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                {listing.marina.name}, {destination?.name}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={share}>
              <ShareIcon className="h-4 w-4" aria-hidden="true" /> Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleFavorite(listing.id)} aria-pressed={isFav}>
              <HeartIcon className={cn('h-4 w-4', isFav && 'fill-coral-dark text-coral-dark')} aria-hidden="true" /> {isFav ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Gallery images={listing.images} title={listing.title} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0 space-y-12">
            {owner &&
            <div className="flex items-center gap-4 border-b border-line pb-8">
                <Avatar initials={owner.initials} seed={owner.id} size="md" />
                <div>
                  <p className="font-semibold text-ink">
                    Hosted by{' '}
                    <Link to={`/u/${owner.id}`} className="underline-offset-4 hover:underline">
                      {owner.name}
                    </Link>
                  </p>
                  <p className="text-sm text-muted">Typically responds {owner.responseTime}</p>
                </div>
              </div>
            }

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {quickSpecs.map(({ icon: Icon, label, value }) =>
              <li key={label} className="rounded-2xl bg-sand-light p-4">
                  <Icon className="h-5 w-5 text-coral-dark" aria-hidden="true" />
                  <p className="mt-3 text-xs text-muted">{label}</p>
                  <p className="text-sm font-semibold text-ink">{value}</p>
                </li>
              )}
            </ul>

            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="font-heading text-2xl text-navy">
                About this boat
              </h2>
              <p className="mt-4 leading-relaxed text-ink/85">{listing.description}</p>
            </section>

            <section aria-labelledby="specs-heading">
              <h2 id="specs-heading" className="font-heading text-2xl text-navy">
                Specifications
              </h2>
              <dl className="mt-5 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
                {specRows.map(([k, v]) =>
                <div key={k} className="flex justify-between gap-4 border-b border-line px-5 py-3.5 text-sm sm:[&:nth-last-child(-n+2)]:border-b-0 sm:odd:border-r">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section aria-labelledby="included-heading">
              <h2 id="included-heading" className="font-heading text-2xl text-navy">
                What’s included
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {listing.included.map((item) =>
                <li key={item} className="flex items-center gap-3 text-sm text-ink">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                      <CheckIcon className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                )}
              </ul>
            </section>

            {captain && listing.captainMode !== 'none' &&
            <section aria-label="Captain">
                <CaptainCard captain={captain} mode={listing.captainMode} />
              </section>
            }
            {!captain && listing.captainMode === 'optional' &&
            <p className="rounded-2xl border border-line p-5 text-sm text-ink/85">
                <span className="font-semibold">Need a captain?</span> The owner can arrange a licensed local captain for {formatMoney(listing.pricing.captainFullDay)} per full day.
              </p>
            }

            <section aria-labelledby="marina-heading">
              <h2 id="marina-heading" className="font-heading text-2xl text-navy">
                Departure marina
              </h2>
              <p className="mt-2 text-sm text-muted">
                <span className="font-semibold text-ink">{listing.marina.name}</span> · {listing.marina.address}
              </p>
              <div className="mt-5 h-72 overflow-hidden rounded-2xl border border-line">
                <ListingsMap listings={[listing]} interactive={false} zoom={14} />
              </div>
              <p className="mt-2 text-xs text-muted">Exact slip number is shared after your booking is confirmed.</p>
            </section>

            <section aria-labelledby="policy-heading" className="grid gap-4 sm:grid-cols-2">
              <h2 id="policy-heading" className="sr-only">
                Policies
              </h2>
              <div className="rounded-2xl border border-line p-6">
                <CalendarXIcon className="h-5 w-5 text-coral-dark" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink">Cancellation · {policy.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{policy.summary}</p>
              </div>
              <div className="rounded-2xl border border-line p-6">
                <CloudRainIcon className="h-5 w-5 text-coral-dark" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink">Weather policy</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{weatherPolicy}</p>
              </div>
            </section>

            <ReviewsList reviews={reviews} rating={listing.rating} total={listing.reviewCount} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Booking">
            <BookingPanel listing={listing} />
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-white px-4 py-3 lg:hidden">
        <p className="text-sm">
          <span className="font-semibold text-ink">{formatMoney(listing.pricing.fullDay)}</span>
          <span className="text-muted"> / day</span>
        </p>
        <a href="#booking" className="inline-flex h-11 items-center rounded-full bg-coral-dark px-5 text-sm font-semibold text-white">
          Check availability
        </a>
      </div>
    </div>);

}
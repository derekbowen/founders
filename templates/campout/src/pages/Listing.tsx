import React from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarClockIcon, CarIcon, ChevronLeftIcon, CompassIcon, DoorClosedIcon, DropletsIcon, FlameIcon, MapPinIcon, RulerIcon, ShieldCheckIcon, ShowerHeadIcon, TentIcon, TreesIcon, UsersIcon, ZapIcon, BoxIcon } from "lucide-react";
import { Gallery } from "../components/listing/Gallery";
import { BookingPanel } from "../components/listing/BookingPanel";
import { HostCard } from "../components/listing/HostCard";
import { ReviewList } from "../components/listing/ReviewList";
import { LocationMap } from "../components/maps/LocationMap";
import { EmptyState } from "../components/EmptyState";
import { Rating } from "../components/Rating";
import { activities, amenities } from "../data/amenities";
import { brand } from "../data/brand";
import { EssentialKey } from "../types/listing";
import { formatMoney } from "../utils/currency";
import { getListing, getListingReviews, getSiteType, getUser } from "../utils/lookup";
const essentialMeta: Record<EssentialKey, {
  label: string;
  icon: BoxIcon;
}> = {
  water: {
    label: 'Water',
    icon: DropletsIcon
  },
  toilets: {
    label: 'Toilets',
    icon: DoorClosedIcon
  },
  fires: {
    label: 'Campfires',
    icon: FlameIcon
  },
  showers: {
    label: 'Showers',
    icon: ShowerHeadIcon
  }
};
export function Listing() {
  const {
    id
  } = useParams();
  const listing = getListing(id);
  if (!listing) {
    return <div className="container-page py-20">
        <EmptyState icon={TentIcon} title="This site isn’t available" description="It may have been unlisted by the host. Explore other sites nearby." action={<Link to="/s" className="btn-primary">
              Browse sites
            </Link>} />
      </div>;
  }
  const host = getUser(listing.hostId);
  const type = getSiteType(listing.siteType);
  const reviews = getListingReviews(listing.id);
  const facts = [{
    icon: UsersIcon,
    label: `Up to ${listing.maxCampers} campers`
  }, {
    icon: CarIcon,
    label: `${listing.maxVehicles} ${listing.maxVehicles === 1 ? 'vehicle' : 'vehicles'}`
  }, {
    icon: RulerIcon,
    label: listing.maxVehicleLength > 0 ? `RVs up to ${listing.maxVehicleLength} ft` : 'No RVs'
  }, {
    icon: TreesIcon,
    label: `${listing.acres} acres`
  }];
  return <div className="pb-28 lg:pb-16">
      <div className="container-page pt-6">
        <Link to="/s" className="inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-ink-900">
          <ChevronLeftIcon size={16} aria-hidden="true" /> All sites
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-ink-900 md:text-4xl">{listing.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-600">
              <Rating value={listing.rating} count={listing.reviewCount} />
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPinIcon size={14} aria-hidden="true" /> {listing.location.town}, {listing.location.region}
              </span>
              <span aria-hidden="true">·</span>
              <span>{listing.location.park}</span>
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Gallery images={listing.images} title={listing.title} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-12">
            <section className="flex items-start justify-between gap-4 border-b border-sand-200 pb-8">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
                  <type.icon size={14} aria-hidden="true" /> {type.label}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-ink-900">{listing.summary}</h2>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-700">
                  {facts.map((f) => <li key={f.label} className="inline-flex items-center gap-1.5">
                      <f.icon size={16} className="text-primary-700" aria-hidden="true" /> {f.label}
                    </li>)}
                </ul>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              {listing.instantBook && <Highlight icon={ZapIcon} title="Instant book" text="Confirmed the moment you book." />}
              <Highlight icon={ShieldCheckIcon} title={`${listing.cancellation} cancellation`} text="See the policy before you pay." />
              <Highlight icon={CompassIcon} title={listing.location.driveToPark} text={listing.location.park} />
            </section>

            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-2xl font-bold">
                About this site
              </h2>
              <p className="mt-3 leading-relaxed text-ink-700">{listing.description}</p>
            </section>

            <section aria-labelledby="essentials-heading">
              <h2 id="essentials-heading" className="text-2xl font-bold">
                Essentials
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(Object.keys(essentialMeta) as EssentialKey[]).map((key) => {
                const meta = essentialMeta[key];
                const info = listing.essentials[key];
                return <div key={key} className={`flex gap-3 rounded-2xl border p-4 ${info.available ? 'border-sand-200 bg-white' : 'border-dashed border-sand-300 bg-sand-50'}`}>
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${info.available ? 'bg-primary-50 text-primary-700' : 'bg-sand-200 text-ink-400'}`}>
                        <meta.icon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">
                          {meta.label} <span className={`ml-1 text-xs font-medium ${info.available ? 'text-primary-700' : 'text-ink-500'}`}>{info.available ? 'Available' : 'Not available'}</span>
                        </p>
                        <p className="text-sm text-ink-500">{info.detail}</p>
                      </div>
                    </div>;
              })}
              </div>
            </section>

            <section aria-labelledby="amenities-heading">
              <h2 id="amenities-heading" className="text-2xl font-bold">
                Amenities
              </h2>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {amenities.map((a) => {
                const has = listing.amenities.includes(a.key);
                return <li key={a.key} className={`flex items-center gap-3 text-sm ${has ? 'text-ink-900' : 'text-ink-400 line-through'}`}>
                      <a.icon size={19} className={has ? 'text-primary-700' : 'text-ink-300'} aria-hidden="true" />
                      {a.label}
                      {!has && <span className="sr-only">(not available)</span>}
                    </li>;
              })}
              </ul>
            </section>

            <section aria-labelledby="activities-heading">
              <h2 id="activities-heading" className="text-2xl font-bold">
                Activities nearby
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {activities.filter((a) => listing.activities.includes(a.key)).map((a) => <li key={a.key} className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-medium text-ink-700">
                      <a.icon size={16} className="text-accent-600" aria-hidden="true" /> {a.label}
                    </li>)}
              </ul>
            </section>

            <section aria-labelledby="rules-heading" className="card p-6">
              <h2 id="rules-heading" className="flex items-center gap-2 text-2xl font-bold">
                <CalendarClockIcon size={22} className="text-primary-700" aria-hidden="true" /> Check-in & site rules
              </h2>
              <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[['Check-in', `After ${listing.checkIn}`], ['Check-out', `Before ${listing.checkOut}`], ['Minimum stay', `${listing.minNights} ${listing.minNights === 1 ? 'night' : 'nights'}`], ['Extra campers', listing.extraCamperFee ? `${formatMoney(listing.extraCamperFee)} / night` : 'Free']].map(([k, v]) => <div key={k}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{k}</dt>
                    <dd className="mt-1 font-semibold text-ink-900">{v}</dd>
                  </div>)}
              </dl>
              <ul className="mt-6 space-y-2 border-t border-sand-200 pt-5 text-sm text-ink-700">
                {listing.rules.map((r) => <li key={r} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" /> {r}
                  </li>)}
              </ul>
            </section>

            <section aria-labelledby="location-heading">
              <h2 id="location-heading" className="text-2xl font-bold">
                Where you’ll be
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                {listing.location.town}, {listing.location.region} · {listing.location.driveToPark}. Exact location and directions are shared after booking.
              </p>
              <div className="mt-4">
                <LocationMap lat={listing.location.lat} lng={listing.location.lng} label={`Approximate location of ${listing.title}`} />
              </div>
            </section>

            <section aria-labelledby="reviews-heading">
              <h2 id="reviews-heading" className="flex items-center gap-3 text-2xl font-bold">
                <Rating value={listing.rating} size="md" /> · {listing.reviewCount} reviews
              </h2>
              <div className="mt-6">
                <ReviewList reviews={reviews} />
              </div>
            </section>

            <section aria-labelledby="host-heading">
              <h2 id="host-heading" className="text-2xl font-bold">
                Meet your host
              </h2>
              <div className="mt-4">
                <HostCard host={host} />
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingPanel listing={listing} />
            </div>
          </aside>
        </div>

        <div className="mt-12 lg:hidden">
          <BookingPanel listing={listing} anchorId="booking" />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">
            <span className="font-serif text-lg font-bold text-ink-900">{formatMoney(listing.price)}</span>
            <span className="text-ink-500"> / {brand.unitLabel}</span>
          </p>
          <a href="#booking" className="btn-accent">
            Book site
          </a>
        </div>
      </div>
    </div>;
}
function Highlight({
  icon: Icon,
  title,
  text




}: {icon: BoxIcon;title: string;text: string;}) {
  return <div className="flex gap-3">
      <Icon size={22} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p className="text-sm text-ink-500">{text}</p>
      </div>
    </div>;
}
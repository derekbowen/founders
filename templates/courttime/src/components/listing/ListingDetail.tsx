import React, { useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRightIcon, ClockIcon, LightbulbIcon, MapPinIcon, PackageIcon, ShieldCheckIcon, UsersIcon, WarehouseIcon, CircleDotIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { AmenityIcon } from '../common/AmenityIcon';
import { Rating } from '../common/Rating';
import { ListingsMap } from '../search/ListingsMap';
import { AvailabilityGrid } from './AvailabilityGrid';
import { BookingPanel } from './BookingPanel';
import { Gallery } from './Gallery';
import { ReviewsSection } from './ReviewsSection';
import { useAuth } from '../../contexts/AuthContext';
import { useBookings } from '../../contexts/BookingContext';
import { reviews as allReviews } from '../../data/reviews';
import { amenities, sports } from '../../data/sports';
import { users } from '../../data/users';
import { useBookingForm } from '../../hooks/useBookingForm';
import { Listing } from '../../types/marketplace';
import { formatHour, formatMoney } from '../../utils/format';

export function ListingDetail({ listing }: {listing: Listing;}) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setDraft } = useBookings();
  const start = params.get('start');
  const form = useBookingForm(listing, { dateKey: params.get('date'), startHour: start ? Number(start) : null, sessionId: params.get('session') });
  const sport = sports.find((s) => s.id === listing.sport);
  const host = users.find((u) => u.id === listing.hostId);
  const listingReviews = allReviews.filter((r) => r.listingId === listing.id);
  const mapListings = useMemo(() => [listing], [listing]);

  const onBook = () => {
    if (!form.draft) return;
    setDraft(form.draft);
    navigate(user ? '/checkout' : '/login?redirect=/checkout');
  };

  const facts = [
  { icon: <CircleDotIcon size={18} />, label: 'Sport', value: sport?.label ?? '' },
  { icon: <PackageIcon size={18} />, label: 'Surface', value: listing.surface },
  { icon: <WarehouseIcon size={18} />, label: 'Setting', value: listing.setting === 'indoor' ? 'Indoor' : 'Outdoor' },
  { icon: <LightbulbIcon size={18} />, label: 'Lights', value: listing.lights ? 'Yes, for night play' : 'Daylight only' },
  { icon: <UsersIcon size={18} />, label: 'Capacity', value: `Up to ${listing.capacity} players` },
  { icon: <ClockIcon size={18} />, label: 'Hours', value: `${formatHour(listing.hours.open)} – ${formatHour(listing.hours.close)}` }];


  return (
    <div className="container-page py-6 pb-28 lg:py-8 lg:pb-16">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-sm text-slate-500">
        <Link to="/search" className="hover:text-brand">All courts</Link>
        <ChevronRightIcon size={14} aria-hidden="true" />
        <Link to={`/search?sport=${listing.sport}`} className="hover:text-brand">{sport?.label}</Link>
        <ChevronRightIcon size={14} aria-hidden="true" />
        <span className="truncate text-slate-700" aria-current="page">{listing.title}</span>
      </nav>
      <header className="mb-5">
        <p className="eyebrow">{listing.clubName}</p>
        <h1 className="heading-lg mt-1">{listing.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
          <Rating rating={listing.rating} reviewCount={listing.reviewCount || undefined} />
          <span className="inline-flex items-center gap-1"><MapPinIcon size={14} aria-hidden="true" /> {listing.location.neighborhood}</span>
          {listing.openPlay && <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-ink">Open play available</span>}
        </div>
      </header>

      <Gallery images={listing.images} title={listing.title} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-10">
          <section aria-label="Court details">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((f) =>
              <li key={f.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
                  <span className="text-brand" aria-hidden="true">{f.icon}</span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{f.label}</span>
                    <span className="block text-sm font-medium">{f.value}</span>
                  </span>
                </li>
              )}
            </ul>
            <p className="mt-6 leading-relaxed text-slate-700">{listing.description}</p>
          </section>

          <section aria-labelledby="amenities-heading" className="border-t border-slate-200 pt-8">
            <h2 id="amenities-heading" className="heading-md">Amenities</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {amenities.map((a) => {
                const has = listing.amenities.includes(a.id);
                return (
                  <li key={a.id} className={`flex items-center gap-2.5 text-sm ${has ? 'text-ink' : 'text-slate-400 line-through'}`}>
                    <AmenityIcon id={a.id} className={has ? 'text-brand' : 'text-slate-300'} />
                    {a.label}
                    {!has && <span className="sr-only">(not available)</span>}
                  </li>);

              })}
            </ul>
          </section>

          <div className="border-t border-slate-200 pt-8">
            <AvailabilityGrid form={form} />
          </div>

          {listing.addOns.length > 0 &&
          <section aria-labelledby="addons-heading" className="border-t border-slate-200 pt-8">
              <h2 id="addons-heading" className="heading-md">Equipment rental & extras</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {listing.addOns.map((addOn) => {
                const selected = form.addOnIds.includes(addOn.id);
                return (
                  <li key={addOn.id}>
                      <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => form.toggleAddOn(addOn.id)}
                      className={`flex w-full items-start justify-between gap-3 rounded-xl border p-4 text-left transition-colors ${selected ? 'border-brand bg-brand-soft' : 'border-slate-200 bg-white hover:border-brand'}`}>
                      
                        <span>
                          <span className="block text-sm font-semibold">{addOn.label}</span>
                          <span className="block text-xs text-slate-600">{addOn.description}</span>
                        </span>
                        <span className="shrink-0 text-sm font-semibold">
                          {formatMoney(addOn.price)}
                          <span className="font-normal text-slate-500">{addOn.per === 'hour' ? '/hr' : ''}</span>
                        </span>
                      </button>
                    </li>);

              })}
              </ul>
            </section>
          }

          <section aria-labelledby="rules-heading" className="border-t border-slate-200 pt-8">
            <h2 id="rules-heading" className="heading-md">House rules</h2>
            <ul className="mt-4 space-y-2">
              {listing.houseRules.map((rule) =>
              <li key={rule} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" /> {rule}
                </li>
              )}
            </ul>
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-white p-4 text-sm text-slate-700 ring-1 ring-slate-200">
              <ShieldCheckIcon size={18} className="shrink-0 text-brand" aria-hidden="true" />
              <span><strong>Cancellation policy:</strong> {listing.cancellationPolicy}</span>
            </p>
          </section>

          <div className="border-t border-slate-200 pt-8">
            <ReviewsSection reviews={listingReviews} rating={listing.rating} reviewCount={listing.reviewCount} />
          </div>

          <section aria-labelledby="location-heading" className="border-t border-slate-200 pt-8">
            <h2 id="location-heading" className="heading-md">Location</h2>
            <p className="mt-1 text-sm text-slate-600">{listing.location.address}</p>
            <div className="isolate mt-4 h-72 overflow-hidden rounded-2xl border border-slate-200">
              <ListingsMap listings={mapListings} showPopups={false} />
            </div>
          </section>

          {host &&
          <section aria-labelledby="host-heading" className="card flex flex-wrap items-center gap-4 p-5">
              <Avatar name={host.name} alt={host.name} size="lg" />
              <div className="min-w-0 flex-1">
                <h2 id="host-heading" className="font-semibold">Hosted by {host.name}</h2>
                <p className="text-sm text-slate-600">Joined {host.joined}{host.responseTime ? ` · Responds ${host.responseTime}` : ''}</p>
              </div>
              <Link to={`/profile/${host.id}`} className="btn btn-outline btn-md">View profile</Link>
            </section>
          }
        </div>

        <aside id="booking-panel" className="self-start lg:sticky lg:top-24">
          <BookingPanel listing={listing} form={form} onBook={onBook} />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
        <p>
          <span className="text-lg font-bold">{form.draft ? formatMoney(form.quote.total) : formatMoney(listing.pricePerHour)}</span>
          <span className="text-sm text-slate-500">{form.draft ? ' total' : ' /hour'}</span>
        </p>
        {form.draft ?
        <button type="button" onClick={onBook} className="btn btn-primary btn-md">Book court</button> :

        <a href="#booking-panel" className="btn btn-primary btn-md">Choose a time</a>
        }
      </div>
    </div>);

}
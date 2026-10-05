import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, BathIcon, BedDoubleIcon, HomeIcon, MapPinIcon, RulerIcon, SofaIcon, SearchXIcon } from 'lucide-react';
import { ListingGallery } from '../components/listing/ListingGallery';
import { ListingSection } from '../components/listing/ListingSection';
import { RentTerms } from '../components/listing/RentTerms';
import { FeatureList } from '../components/listing/FeatureList';
import { FlatmatesSummary } from '../components/listing/FlatmatesSummary';
import { NeighborhoodSection } from '../components/listing/NeighborhoodSection';
import { LandlordCard } from '../components/listing/LandlordCard';
import { InquiryPanel } from '../components/listing/InquiryPanel';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import { useApp } from '../contexts/AppContext';
import { roomTypeLabels } from '../data/discover';
import { formatMoney } from '../utils/format';

export function ListingPage() {
  const { id } = useParams();
  const { getListing, getUser, listings } = useApp();
  const listing = id ? getListing(id) : undefined;

  if (!listing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <EmptyState
          icon={<SearchXIcon size={26} />}
          title="This room is no longer available"
          text="It may have been rented or removed by the landlord."
          action={
          <Link to="/s" className="font-semibold text-primary-700 hover:text-primary-800">
              Browse other rooms →
            </Link>
          } />
        
      </div>);

  }

  const landlord = getUser(listing.landlordId);
  const similar = listings.filter((l) => l.city === listing.city && l.id !== listing.id).slice(0, 3);
  const quickFacts = [
  { icon: <HomeIcon size={16} />, label: roomTypeLabels[listing.roomType] },
  { icon: <RulerIcon size={16} />, label: `${listing.roomSize} m² room · ${listing.flatSize} m² flat` },
  { icon: <BedDoubleIcon size={16} />, label: `${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}` },
  { icon: <BathIcon size={16} />, label: `${listing.bathrooms} bathroom${listing.bathrooms > 1 ? 's' : ''}` },
  { icon: <SofaIcon size={16} />, label: listing.furnished ? 'Furnished' : 'Unfurnished' }];


  return (
    <div className="pb-28 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          to={`/s?city=${listing.city}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 transition hover:text-navy-900">
          
          <ArrowLeftIcon size={16} /> Rooms in {listing.city}
        </Link>
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{listing.title}</h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-navy-600">
              <MapPinIcon size={16} aria-hidden /> {listing.neighborhood}, {listing.city}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {listing.idealFor.map((tag) =>
            <span key={tag} className="rounded-full bg-coral-50 px-3 py-1 text-xs font-semibold text-coral-800">
                Ideal for {tag.toLowerCase()}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6">
          <ListingGallery images={listing.images} title={listing.title} />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <ul className="flex flex-wrap gap-2 pb-8">
              {quickFacts.map((f) =>
              <li
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3.5 py-2 text-sm text-navy-800">
                
                  <span className="text-primary-700">{f.icon}</span>
                  {f.label}
                </li>
              )}
            </ul>

            <ListingSection title="Rent & stay" id="terms">
              <RentTerms listing={listing} />
            </ListingSection>
            <ListingSection title="About the room" id="about">
              <p className="whitespace-pre-line leading-relaxed text-navy-700">{listing.description}</p>
            </ListingSection>
            <ListingSection title="Room & flat features" id="features">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-500">In your room</h3>
                  <FeatureList items={listing.roomFeatures} />
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-500">In the flat</h3>
                  <FeatureList items={listing.flatFeatures} />
                </div>
              </div>
            </ListingSection>
            <ListingSection title={`Flatmates${listing.flatmates.length ? ` (${listing.flatmates.length})` : ''}`} id="flatmates">
              <FlatmatesSummary listing={listing} />
            </ListingSection>
            <ListingSection title="House rules" id="rules">
              <ul className="space-y-2">
                {listing.houseRules.map((r) =>
                <li key={r} className="flex items-start gap-3 text-navy-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" aria-hidden />
                    {r}
                  </li>
                )}
              </ul>
            </ListingSection>
            <ListingSection title="Neighbourhood & transit" id="location">
              <NeighborhoodSection listing={listing} />
            </ListingSection>
            {landlord &&
            <ListingSection title="Meet your landlord" id="landlord">
                <LandlordCard landlord={landlord} />
              </ListingSection>
            }
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <InquiryPanel listing={listing} />
          </aside>
        </div>

        {similar.length > 0 &&
        <section className="mt-12 border-t border-navy-100 pt-10" aria-labelledby="similar-heading">
            <h2 id="similar-heading" className="text-xl font-semibold text-navy-900">
              More rooms in {listing.city}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((l) =>
            <ListingCard key={l.id} listing={l} />
            )}
            </div>
          </section>
        }
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-navy-100 bg-white px-4 py-3 lg:hidden">
        <p>
          <span className="text-lg font-bold text-navy-900">{formatMoney(listing.rent)}</span>
          <span className="text-sm text-navy-500"> / month</span>
        </p>
        <a
          href="#inquiry"
          className="rounded-xl bg-primary-400 px-5 py-3 text-sm font-semibold text-navy-900 transition hover:bg-primary-500">
          
          Send an inquiry
        </a>
      </div>
    </div>);

}
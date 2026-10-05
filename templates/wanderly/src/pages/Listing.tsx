import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BackpackIcon, ChevronRightIcon, MapPinIcon, MapPinOffIcon, Share2Icon } from 'lucide-react';
import { Gallery } from '../components/listing/Gallery';
import { BookingPanel } from '../components/listing/BookingPanel';
import { Itinerary } from '../components/listing/Itinerary';
import { IncludedList } from '../components/listing/IncludedList';
import { HostCard } from '../components/listing/HostCard';
import { ReviewsSection } from '../components/listing/ReviewsSection';
import { ListingFacts } from '../components/listing/ListingFacts';
import { MapView } from '../components/map/MapView';
import { ExperienceCard } from '../components/ExperienceCard';
import { StarRating } from '../components/ui/StarRating';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { experiences } from '../data/experiences';
import { getCategory, getDestination, getExperience, getHost, getReviewsFor } from '../utils/lookup';
import { formatPrice } from '../utils/format';

export function Listing() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const experience = getExperience(id);

  if (!experience) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState icon={MapPinOffIcon} title="Experience not found" description="This listing may have been removed or the link is incorrect." action={<Button to="/s">Browse experiences</Button>} />
      </div>);

  }

  const host = getHost(experience.hostId);
  const destination = getDestination(experience.destinationId);
  const category = getCategory(experience.categoryId);
  const reviews = getReviewsFor(experience.id);
  const similar = experiences.filter((e) => e.id !== experience.id && (e.destinationId === experience.destinationId || e.categoryId === experience.categoryId)).slice(0, 4);

  const section = 'border-t border-slate-200 py-10';
  const h2 = 'mb-6 text-2xl font-bold tracking-tight text-slate-900';

  return (
    <div className="mx-auto max-w-page px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-16">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-sm text-slate-600">
        <Link to="/s" className="hover:text-slate-900">Experiences</Link>
        <ChevronRightIcon className="h-4 w-4" aria-hidden />
        <Link to={`/s?dest=${destination?.id}`} className="hover:text-slate-900">{destination?.city}</Link>
        <ChevronRightIcon className="h-4 w-4" aria-hidden />
        <Link to={`/s?cat=${category?.id}`} className="hover:text-slate-900">{category?.label}</Link>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{experience.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-700">
            <StarRating rating={experience.rating} count={experience.reviewCount} />
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1"><MapPinIcon className="h-4 w-4 text-primary-600" aria-hidden />{destination?.city}, {destination?.country}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Share2Icon className="h-4 w-4" />} onClick={() => navigator.clipboard?.writeText(window.location.href)}>
          Share
        </Button>
      </div>

      <Gallery images={experience.gallery} title={experience.title} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div>
          <p className="text-lg leading-relaxed text-slate-800">{experience.summary}</p>
          <div className="mt-6"><ListingFacts experience={experience} /></div>

          <section className={`${section} mt-10`} aria-labelledby="about-title">
            <h2 id="about-title" className={h2}>About this experience</h2>
            <p className="leading-relaxed text-slate-700">{experience.description}</p>
          </section>

          <section className={section} aria-labelledby="itinerary-title">
            <h2 id="itinerary-title" className={h2}>What you'll do</h2>
            <Itinerary steps={experience.itinerary} />
          </section>

          <section className={section} aria-labelledby="included-title">
            <h2 id="included-title" className={h2}>What's included</h2>
            <IncludedList included={experience.included} notIncluded={experience.notIncluded} />
            <div className="mt-6 flex gap-3 rounded-2xl border border-slate-200 p-5">
              <BackpackIcon className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">What to bring</h3>
                <p className="mt-1 text-sm text-slate-700">{experience.whatToBring.join(' · ')}</p>
              </div>
            </div>
          </section>

          <section className={section} aria-labelledby="meeting-title">
            <h2 id="meeting-title" className={h2}>Meeting point</h2>
            <p className="font-semibold text-slate-900">{experience.meetingPoint.name}</p>
            <p className="text-sm text-slate-600">{experience.meetingPoint.address}</p>
            <MapView
              variant="dot"
              zoom={15}
              markers={[{ id: 'meet', lat: experience.meetingPoint.lat, lng: experience.meetingPoint.lng }]}
              ariaLabel={`Map of meeting point: ${experience.meetingPoint.name}`}
              className="mt-4 h-72 overflow-hidden rounded-2xl border border-slate-200" />
            
            <p className="mt-3 text-sm text-slate-700">{experience.meetingPoint.instructions}</p>
          </section>

          {host &&
          <section className={section} aria-label="Host">
              <HostCard host={host} />
            </section>
          }

          <section className={section} aria-labelledby="reviews-title">
            <h2 id="reviews-title" className={h2}>Guest reviews</h2>
            <ReviewsSection reviews={reviews} rating={experience.rating} reviewCount={experience.reviewCount} />
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Booking">
          <BookingPanel
            experience={experience}
            initialDate={params.get('date') ?? undefined}
            initialGuests={Number(params.get('guests')) || undefined} />
          
        </aside>
      </div>

      {similar.length > 0 &&
      <section className="mt-6 border-t border-slate-200 pt-12" aria-labelledby="similar-title">
          <h2 id="similar-title" className={h2}>You might also like</h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((e) => <ExperienceCard key={e.id} experience={e} />)}
          </div>
        </section>
      }

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
        <p className="text-sm text-slate-900">
          <span className="font-display text-lg font-bold">{formatPrice(experience.pricePerPerson)}</span> / person
        </p>
        <Button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          Check availability
        </Button>
      </div>
    </div>);

}
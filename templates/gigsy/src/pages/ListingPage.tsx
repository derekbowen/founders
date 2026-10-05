import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon, SearchXIcon } from 'lucide-react';
import { ListingGallery } from '../components/listing/ListingGallery';
import { FreelancerSummary } from '../components/listing/FreelancerSummary';
import { FaqAccordion } from '../components/listing/FaqAccordion';
import { ReviewList } from '../components/listing/ReviewList';
import { QuoteRequestPanel } from '../components/listing/QuoteRequestPanel';
import { Avatar } from '../components/Avatar';
import { StarRating } from '../components/ui/StarRating';
import { EmptyState } from '../components/ui/EmptyState';
import { ButtonLink } from '../components/ui/ButtonLink';
import { deliveryLabel, formatMoney } from '../utils/format';
import { getCategory, getListing, getReviewsForListing, getUser } from '../utils/lookup';

export function ListingPage() {
  const { listingId = '' } = useParams();
  const listing = getListing(listingId);
  const freelancer = listing ? getUser(listing.freelancerId) : undefined;

  if (!listing || !freelancer) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24">
        <EmptyState
          icon={<SearchXIcon className="h-6 w-6" />}
          title="This service isn't available"
          text="It may have been closed by the freelancer. Browse similar services instead."
          action={<ButtonLink to="/s">Browse services</ButtonLink>} />
        
      </div>);

  }

  const category = getCategory(listing.category);
  const reviews = getReviewsForListing(listing.id);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-16">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
          <li><Link to="/" className="hover:text-slate-800">Home</Link></li>
          <li aria-hidden="true"><ChevronRightIcon className="h-3.5 w-3.5" /></li>
          <li><Link to={`/s?category=${listing.category}`} className="hover:text-slate-800">{category?.name}</Link></li>
          <li aria-hidden="true"><ChevronRightIcon className="h-3.5 w-3.5" /></li>
          <li aria-current="page" className="truncate font-medium text-slate-700">{listing.title}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-10">
          <header>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{listing.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link to={`/u/${freelancer.id}`} className="flex items-center gap-2 font-semibold text-slate-800 hover:text-primary-700">
                <Avatar name={freelancer.name} alt="" src={freelancer.avatar} size="xs" />
                {freelancer.name}
              </Link>
              <StarRating rating={listing.rating} count={listing.reviewCount} />
              <span className="text-slate-500">{freelancer.completedJobs} jobs completed</span>
            </div>
          </header>

          <ListingGallery images={listing.gallery} title={listing.title} />

          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-xl font-bold text-slate-900">About this service</h2>
            <p className="mt-2 text-base font-medium text-slate-700">{listing.summary}</p>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-600">
              {listing.description.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <dt className="text-xs font-medium text-slate-500">Starting at</dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">{formatMoney(listing.startingPrice)}</dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <dt className="text-xs font-medium text-slate-500">Typical delivery</dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">{deliveryLabel(listing.deliveryDays)}</dd>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <dt className="text-xs font-medium text-slate-500">Languages</dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">{listing.languages.join(', ')}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="includes-heading">
            <h2 id="includes-heading" className="text-xl font-bold text-slate-900">What's typically included</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {listing.includes.map((item) =>
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              )}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {listing.skills.map((s) =>
              <Link key={s} to={`/s?q=${encodeURIComponent(s)}`} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-100">
                  {s}
                </Link>
              )}
            </div>
          </section>

          <FreelancerSummary freelancer={freelancer} />

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-4 text-xl font-bold text-slate-900">Frequently asked questions</h2>
            <FaqAccordion items={listing.faq} />
          </section>

          <section aria-labelledby="reviews-heading">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 id="reviews-heading" className="text-xl font-bold text-slate-900">Reviews</h2>
              <StarRating rating={listing.rating} count={listing.reviewCount} size="md" />
            </div>
            <ReviewList reviews={reviews} />
          </section>
        </div>

        <aside className="lg:block" aria-label="Request a quote">
          <div className="lg:sticky lg:top-24">
            <QuoteRequestPanel listing={listing} freelancer={freelancer} />
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-4 py-3 shadow-pop lg:hidden">
        <div>
          <p className="text-xs text-slate-500">Starting at</p>
          <p className="text-lg font-extrabold text-slate-900">{formatMoney(listing.startingPrice)}</p>
        </div>
        <a href="#request-quote" className="inline-flex h-11 items-center rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-700">
          Request a quote
        </a>
      </div>
    </div>);

}
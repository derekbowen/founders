import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon, PackageOpenIcon } from 'lucide-react';
import { PreviewCarousel } from '../components/listing/PreviewCarousel';
import { BuyPanel } from '../components/listing/BuyPanel';
import { ReviewList } from '../components/listing/ReviewList';
import { CreatorCard } from '../components/listing/CreatorCard';
import { ListingCard } from '../components/listing/ListingCard';
import { RatingStars } from '../components/common/RatingStars';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../contexts/StoreContext';
import { categories } from '../data/categories';
import { reviews } from '../data/reviews';
import { formatCompact, priceLabel } from '../utils/format';

export function Listing() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { getListing, getCreator, listings } = useStore();
  const listing = getListing(slug);

  if (!listing) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={PackageOpenIcon}
          title="This product isn’t available"
          body="It may have been unpublished by the creator, or the link is mistyped."
          action={
          <Link to="/s" className="btn btn-ink">
              Browse products
            </Link>
          } />
        
      </div>);

  }

  const creator = getCreator(listing.creatorId);
  const category = categories.find((c) => c.id === listing.category);
  const listingReviews = reviews.filter((r) => r.listingSlug === listing.slug);
  const moreFromCreator = listings.filter((l) => l.creatorId === listing.creatorId && l.id !== listing.id).slice(0, 3);
  const creatorProductCount = listings.filter((l) => l.creatorId === listing.creatorId).length;

  return (
    <div className="pb-28 lg:pb-0">
      <div className="container-page py-6 md:py-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <Link to={`/s?category=${listing.category}`} className="hover:text-ink">
            {category?.name}
          </Link>
          <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span aria-current="page" className="truncate text-ink">
            {listing.title}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] xl:gap-14">
          <div className="min-w-0 space-y-10">
            <PreviewCarousel listing={listing} />

            <header>
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">{listing.title}</h1>
              <p className="mt-3 text-lg text-muted">{listing.subtitle}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {creator &&
                <Link to={`/u/${creator.id}`} className="flex items-center gap-2 font-semibold hover:underline">
                    <img src={creator.avatar} alt="" className="h-7 w-7 rounded-full border border-ink object-cover" />
                    {creator.name}
                  </Link>
                }
                {listing.reviewCount > 0 ? <RatingStars rating={listing.rating} count={listing.reviewCount} /> : <span className="chip">New</span>}
                <span className="text-muted">{formatCompact(listing.sales)} downloads</span>
              </div>
            </header>

            <section aria-labelledby="included-heading" className="card p-6">
              <h2 id="included-heading" className="font-display text-xl font-bold">
                What’s included
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {listing.included.map((item) =>
                <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-ink bg-brand">
                      <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                )}
              </ul>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Files you’ll get</p>
                <ul className="mt-2 divide-y divide-line">
                  {listing.files.map((f) =>
                  <li key={f.name} className="flex justify-between py-2 text-sm">
                      <span className="truncate font-medium">{f.name}</span>
                      <span className="shrink-0 pl-4 text-muted">{f.size}</span>
                    </li>
                  )}
                </ul>
              </div>
            </section>

            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="font-display text-2xl font-bold">
                About this product
              </h2>
              <div className="mt-3 space-y-4 leading-relaxed text-ink/85">
                {listing.description.map((p, i) =>
                <p key={i}>{p}</p>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {listing.tags.map((t) =>
                <Link key={t} to={`/s?q=${encodeURIComponent(t)}`} className="chip">
                    #{t}
                  </Link>
                )}
              </div>
            </section>

            {creator && <CreatorCard creator={creator} productCount={creatorProductCount} />}

            <section aria-labelledby="reviews-heading">
              <h2 id="reviews-heading" className="mb-5 font-display text-2xl font-bold">
                Ratings & reviews
              </h2>
              {listing.reviewCount === 0 ?
              <EmptyState icon={PackageOpenIcon} title="No reviews yet" body="Be one of the first to download and review this product." /> :

              <ReviewList reviews={listingReviews} rating={listing.rating} reviewCount={listing.reviewCount} />
              }
            </section>
          </div>

          <aside id="buy" aria-label="Purchase" className="scroll-mt-24">
            <div className="lg:sticky lg:top-24">
              <BuyPanel listing={listing} />
            </div>
          </aside>
        </div>
      </div>

      {moreFromCreator.length > 0 && creator &&
      <section className="mt-16 border-t border-ink bg-paper py-14">
          <div className="container-page">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold md:text-3xl">More from {creator.name}</h2>
              <Link to={`/u/${creator.id}`} className="text-sm font-semibold hover:text-brand-ink">
                View shop →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {moreFromCreator.map((l) =>
            <ListingCard key={l.id} listing={l} />
            )}
            </div>
          </div>
        </section>
      }

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink bg-white p-3 lg:hidden">
        <div className="container-page flex items-center gap-3 px-0">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{listing.title}</p>
            <p className="font-display text-lg font-bold">{priceLabel(listing)}</p>
          </div>
          <button
            type="button"
            className="btn btn-accent"
            onClick={() =>
            listing.payWhatYouWant ? (
            document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' }), document.getElementById('pwyw')?.focus({ preventScroll: true })) :
            navigate(`/checkout/${listing.slug}?amount=${listing.price}`)
            }>
            
            Buy & download
          </button>
        </div>
      </div>
    </div>);

}
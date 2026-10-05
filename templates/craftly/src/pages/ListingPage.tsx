import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRightIcon, PackageSearchIcon } from 'lucide-react';
import { categories } from '../data/categories';
import { reviews } from '../data/reviews';
import { useListings } from '../contexts/ListingsContext';
import { ImageGallery } from '../components/listing/ImageGallery';
import { PurchasePanel } from '../components/listing/PurchasePanel';
import { MakerCard } from '../components/listing/MakerCard';
import { ReviewList } from '../components/listing/ReviewList';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';
import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeader } from '../components/ui/SectionHeader';

export function ListingPage() {
  const { id = '' } = useParams();
  const { getListing, getMaker, listings } = useListings();
  const listing = getListing(id);
  const maker = listing ? getMaker(listing.makerId) : undefined;

  if (!listing || !maker) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={<PackageSearchIcon className="h-5 w-5" />}
          title="This listing isn’t available"
          description="It may have sold out or been removed by the maker. There’s plenty more handmade goodness to explore."
          action={<ButtonLink to="/s">Browse all</ButtonLink>} />
        
      </div>);

  }

  const category = categories.find((c) => c.id === listing.categoryId);
  const listingReviews = reviews.filter((r) => r.listingId === listing.id);
  const moreFromMaker = listings.filter((l) => l.makerId === maker.id && l.id !== listing.id).slice(0, 4);

  return (
    <div className="container-page py-6 lg:py-10">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <li><Link to="/" className="hover:text-ink">Home</Link></li>
          <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden />
          <li><Link to={`/s?category=${listing.categoryId}`} className="hover:text-ink">{category?.name}</Link></li>
          <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden />
          <li aria-current="page" className="line-clamp-1 text-ink">{listing.title}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div className="space-y-12">
          <ImageGallery image={listing.image} title={listing.title} />
          <section aria-labelledby="about-heading" className="space-y-6">
            <h2 id="about-heading" className="text-3xl font-medium tracking-tight">About this piece</h2>
            <p className="text-base leading-relaxed text-ink/90">{listing.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <h3 className="font-sans text-sm font-semibold">Materials</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {listing.materials.map((m) =>
                  <li key={m}>
                      <Link to={`/s?materials=${encodeURIComponent(m)}`} className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink hover:bg-accent-soft/70">
                        {m}
                      </Link>
                    </li>
                  )}
                </ul>
                <p className="mt-4 text-xs text-muted">Colors: {listing.colors.join(', ')}</p>
              </div>
              <div className="card p-5">
                <h3 className="font-sans text-sm font-semibold">Care</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{listing.care}</p>
              </div>
            </div>
          </section>
          <ReviewList reviews={listingReviews} rating={listing.rating} total={listing.reviewCount} />
        </div>

        <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <PurchasePanel listing={listing} maker={maker} />
          <MakerCard maker={maker} />
        </div>
      </div>

      {moreFromMaker.length > 0 &&
      <section className="mt-20 border-t border-line pt-14">
          <SectionHeader title={`More from ${maker.shopName}`} link={{ to: `/shop/${maker.id}`, label: 'Visit shop' }} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:gap-x-6">
            {moreFromMaker.map((l) =>
          <ProductCard key={l.id} listing={l} showMaker={false} />
          )}
          </div>
        </section>
      }
    </div>);

}
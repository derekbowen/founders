import React from "react";
import { Link, useParams } from "react-router-dom";
import { AwardIcon, ChevronRightIcon, ClockIcon, LanguagesIcon, MapPinIcon, SearchXIcon, UsersIcon } from "lucide-react";
import { getCategory, getOwner, getSimilarVendors, getVendorBySlug, getVendorReviews } from "../utils/vendors";
import { formatPrice, priceSuffix } from "../utils/format";
import { PortfolioGallery } from "../components/listing/PortfolioGallery";
import { PackagesList } from "../components/listing/PackagesList";
import { ReviewsList } from "../components/listing/ReviewsList";
import { InquiryPanel } from "../components/listing/InquiryPanel";
import { OwnerCard } from "../components/listing/OwnerCard";
import { ListingSection } from "../components/listing/ListingSection";
import { VendorMap } from "../components/map/VendorMap";
import { VendorCard } from "../components/vendor/VendorCard";
import { StarRating } from "../components/ui/StarRating";
import { EmptyState } from "../components/ui/EmptyState";
import { ButtonLink } from "../components/ui/ButtonLink";

export function Listing() {
  const { slug = "" } = useParams();
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    return (
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <EmptyState
          icon={SearchXIcon}
          title="Listing not found"
          description="This vendor may have paused their listing. Browse other vendors near you."
          action={<ButtonLink to="/search">Browse vendors</ButtonLink>} />
        
      </div>);

  }

  const category = getCategory(vendor.category);
  const owner = getOwner(vendor.ownerId);
  const reviews = getVendorReviews(vendor.id);
  const similar = getSimilarVendors(vendor);

  const facts = [
  { icon: UsersIcon, label: "Guests", value: vendor.guestCapacity ? `${vendor.guestCapacity.min}–${vendor.guestCapacity.max}` : "Any size" },
  { icon: ClockIcon, label: "Responds", value: vendor.responseTime },
  { icon: LanguagesIcon, label: "Languages", value: vendor.languages.join(", ") },
  { icon: AwardIcon, label: "Experience", value: `${vendor.yearsInBusiness} years` }];


  return (
    <div className="pb-28 lg:pb-16">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="py-5">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li aria-hidden="true"><ChevronRightIcon className="h-3.5 w-3.5" /></li>
            <li><Link to={`/search?category=${vendor.category}`} className="hover:text-primary">{category?.label}</Link></li>
            <li aria-hidden="true"><ChevronRightIcon className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="truncate text-ink">{vendor.name}</li>
          </ol>
        </nav>

        <PortfolioGallery images={vendor.images} title={vendor.name} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <div>
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">{category?.singular}</p>
              <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl">{vendor.name}</h1>
              <p className="mt-3 text-lg text-ink/80">{vendor.tagline}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <StarRating rating={vendor.rating} count={vendor.reviewCount} size="md" />
                <span className="flex items-center gap-1 text-muted">
                  <MapPinIcon aria-hidden="true" className="h-4 w-4" />
                  {vendor.city}, CA
                </span>
              </div>
            </header>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((fact) =>
              <div key={fact.label} className="rounded-2xl border border-line bg-surface p-4">
                  <fact.icon aria-hidden="true" className="h-4 w-4 text-gold-dark" />
                  <dt className="mt-2 text-xs text-muted">{fact.label}</dt>
                  <dd className="text-sm font-medium text-ink">{fact.value}</dd>
                </div>
              )}
            </dl>

            <section aria-labelledby="about-title" className="py-10">
              <h2 id="about-title" className="sr-only">About {vendor.name}</h2>
              <p className="text-base leading-relaxed text-ink/85">{vendor.description}</p>
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Style tags">
                {vendor.styles.map((style) =>
                <Link
                  key={style}
                  to={`/search?styles=${encodeURIComponent(style)}`}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary hover:text-primary">
                  
                    {style}
                  </Link>
                )}
              </div>
            </section>

            <ListingSection id="packages-title" title="Packages overview" aside={<span className="text-sm text-muted">From {formatPrice(vendor.startingPrice)} {priceSuffix(vendor.priceUnit)}</span>}>
              <PackagesList packages={vendor.packages} priceUnit={vendor.priceUnit} vendorName={vendor.name} />
            </ListingSection>

            <ListingSection id="area-title" title="Service area">
              <p className="mb-4 text-sm text-muted">
                {vendor.travelRadius > 0 ?
                `Based in ${vendor.city}. Travels up to ${vendor.travelRadius} miles — travel fees may apply outside core regions.` :
                `On-site at ${vendor.city}. Serving couples from across the region.`}
              </p>
              <ul className="mb-5 flex flex-wrap gap-2">
                {vendor.serviceArea.map((area) =>
                <li key={area} className="rounded-full bg-blush/60 px-3 py-1.5 text-xs font-medium text-ink">{area}</li>
                )}
              </ul>
              <div className="h-72 overflow-hidden rounded-2xl border border-line sm:h-80">
                <VendorMap vendors={[vendor]} radiusMiles={vendor.travelRadius} label={`${vendor.name} service area map`} />
              </div>
            </ListingSection>

            {vendor.awards.length > 0 &&
            <ListingSection id="awards-title" title="Awards & features">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {vendor.awards.map((award) =>
                <li key={award} className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/5 p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                        <AwardIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium text-ink">{award}</span>
                    </li>
                )}
                </ul>
              </ListingSection>
            }

            <ListingSection
              id="reviews-title"
              title="Reviews from couples"
              aside={<StarRating rating={vendor.rating} count={vendor.reviewCount} showStars size="md" />}>
              
              <ReviewsList reviews={reviews} />
              {reviews.length > 0 && reviews.length < vendor.reviewCount &&
              <p className="mt-4 text-sm text-muted">Showing {reviews.length} of {vendor.reviewCount} verified reviews.</p>
              }
            </ListingSection>

            {owner &&
            <ListingSection id="owner-title" title="About the business">
                <OwnerCard owner={owner} businessName={vendor.name} />
              </ListingSection>
            }
          </div>

          <aside aria-label="Send an inquiry" className="lg:block">
            <div className="lg:sticky lg:top-24">
              <InquiryPanel key={vendor.id} vendor={vendor} />
            </div>
          </aside>
        </div>

        {similar.length > 0 &&
        <section aria-labelledby="similar-title" className="mt-10 border-t border-line pt-12">
            <h2 id="similar-title" className="mb-6 font-display text-3xl font-semibold text-ink">You might also love</h2>
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((v) =>
            <li key={v.id}><VendorCard vendor={v} /></li>
            )}
            </ul>
          </section>
        }
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-surface px-4 py-3 lg:hidden">
        <p className="text-sm">
          <span className="text-muted">From </span>
          <span className="font-semibold text-ink">{formatPrice(vendor.startingPrice)}</span>
          <span className="block text-xs text-muted">{vendor.priceUnit}</span>
        </p>
        <a href="#inquiry" className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-white hover:bg-primary-hover">
          Send inquiry
        </a>
      </div>
    </div>);

}
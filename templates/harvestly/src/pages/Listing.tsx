import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon, LeafIcon, PackageXIcon } from "lucide-react";
import { FarmSummaryCard } from "../components/listing/FarmSummaryCard";
import { FulfillmentDetails } from "../components/listing/FulfillmentDetails";
import { ImageGallery } from "../components/listing/ImageGallery";
import { PurchasePanel } from "../components/listing/PurchasePanel";
import { ReviewList } from "../components/listing/ReviewList";
import { PracticeBadges } from "../components/marketplace/PracticeBadges";
import { ProductCard } from "../components/marketplace/ProductCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { useCatalog } from "../contexts/CatalogContext";
import { categories } from "../data/categories";

export function Listing() {
  const { id = "" } = useParams();
  const { getProduct, getFarm, productsByFarm, reviewsForProduct } = useCatalog();
  const product = getProduct(id);
  const farm = product ? getFarm(product.farmId) : undefined;

  if (!product || !farm) {
    return (
      <div className="container-site py-16">
        <EmptyState
          icon={<PackageXIcon className="h-6 w-6" />}
          title="This listing isn't available"
          text="It may have been removed by the farm or the season has ended."
          action={<Button to="/search">Browse what's in season</Button>} />
        
      </div>);

  }

  const category = categories.find((c) => c.id === product.category);
  const reviews = reviewsForProduct(product.id);
  const moreFromFarm = productsByFarm(farm.id).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container-site py-6 lg:py-10">
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
          <li>
            <Link to="/search" className="hover:text-primary hover:underline">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link to={`/search?category=${product.category}`} className="hover:text-primary hover:underline">
              {category?.label}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-medium text-ink">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div className="space-y-10">
          <ImageGallery images={product.images} title={product.title} />

          <div className="lg:hidden">
            <PurchasePanel product={product} farmName={farm.name} />
          </div>

          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="font-display text-2xl font-semibold text-ink">
              About this harvest
            </h2>
            <p className="mt-3 leading-relaxed text-ink/90">{product.description}</p>
            <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
              <LeafIcon className="h-4 w-4 text-primary" aria-hidden="true" /> Growing practices
            </h3>
            <PracticeBadges practices={product.practices} />
          </section>

          <section aria-labelledby="fulfillment-heading">
            <h2 id="fulfillment-heading" className="mb-4 font-display text-2xl font-semibold text-ink">
              Pickup & delivery
            </h2>
            <FulfillmentDetails farm={farm} options={product.fulfillment} />
          </section>

          <section aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="mb-4 font-display text-2xl font-semibold text-ink">
              Reviews <span className="text-muted">({reviews.length})</span>
            </h2>
            <ReviewList reviews={reviews} />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="hidden lg:sticky lg:top-24 lg:block lg:space-y-6">
            <PurchasePanel product={product} farmName={farm.name} />
            <FarmSummaryCard farm={farm} />
          </div>
          <div className="lg:hidden">
            <FarmSummaryCard farm={farm} />
          </div>
        </aside>
      </div>

      {moreFromFarm.length > 0 &&
      <section className="mt-16" aria-labelledby="more-heading">
          <h2 id="more-heading" className="mb-6 font-display text-2xl font-semibold text-ink">
            More from {farm.name}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {moreFromFarm.map((p) =>
          <ProductCard key={p.id} product={p} />
          )}
          </div>
        </section>
      }
    </div>);

}
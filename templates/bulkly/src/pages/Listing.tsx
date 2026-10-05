import React from 'react';
import { CheckIcon, ChevronRightIcon, PackageXIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BrandSummaryCard } from '../components/brand/BrandSummaryCard';
import { ProductCard } from '../components/product/ProductCard';
import { ProductGallery } from '../components/product/ProductGallery';
import { PurchasePanel } from '../components/product/PurchasePanel';
import { ReviewList } from '../components/product/ReviewList';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { RatingStars } from '../components/ui/RatingStars';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ValueTags } from '../components/ui/ValueTags';
import { getBrand, getBrandProducts, getCategory, getProduct, getProductReviews } from '../utils/catalog';

export function Listing() {
  const { productId } = useParams();
  const product = getProduct(productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={PackageXIcon}
          title="This listing isn’t available"
          description="It may have been removed by the brand or the link is incorrect."
          action={<ButtonLink to="/search">Browse products</ButtonLink>} />
        
      </div>);

  }

  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);
  const reviews = getProductReviews(product.id);
  const moreFromBrand = getBrandProducts(product.brandId).filter((p) => p.id !== product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
          <li className="flex items-center gap-1">
            <Link to="/" className="hover:text-primary-700">
              Home
            </Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
          </li>
          <li className="flex items-center gap-1">
            <Link to={`/search?category=${category?.id}`} className="hover:text-primary-700">
              {category?.name}
            </Link>
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
          </li>
          <li aria-current="page" className="truncate font-medium text-slate-700">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="space-y-8">
          <ProductGallery product={product} />

          <section aria-labelledby="details-heading" className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 id="details-heading" className="text-lg font-semibold text-slate-900">
              Product details
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{product.description}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) =>
              <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-700" aria-hidden="true" />
                  {h}
                </li>
              )}
            </ul>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-4">
              {[
              ['SKU', product.sku],
              ['Unit', product.unitDescription],
              ['Made in', product.madeIn],
              ['Ships from', product.shipsFrom]].
              map(([k, v]) =>
              <div key={k}>
                  <dt className="text-xs text-slate-500">{k}</dt>
                  <dd className={`mt-0.5 font-medium text-slate-900 ${k === 'SKU' ? 'font-mono text-xs' : ''}`}>{v}</dd>
                </div>
              )}
            </dl>
          </section>
        </div>

        <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <div>
            {brand &&
            <Link to={`/brands/${brand.id}`} className="text-sm font-semibold text-primary-700 hover:text-primary-900">
                {brand.name}
              </Link>
            }
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{product.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
              <ValueTags values={product.values} size="md" />
            </div>
          </div>
          <PurchasePanel product={product} />
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <ReviewList reviews={reviews} rating={product.rating} count={product.reviewCount} />
        {brand &&
        <div>
            <BrandSummaryCard brand={brand} />
          </div>
        }
      </div>

      {moreFromBrand.length > 0 && brand &&
      <section className="mt-14">
          <SectionHeading title={`More from ${brand.name}`} linkLabel="View brand" linkTo={`/brands/${brand.id}`} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {moreFromBrand.slice(0, 4).map((p) =>
          <ProductCard key={p.id} product={p} />
          )}
          </div>
        </section>
      }
    </div>);

}
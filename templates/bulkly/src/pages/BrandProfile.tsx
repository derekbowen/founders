import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, MessageCircleIcon, PencilIcon, StoreIcon, UserIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { ReviewList } from '../components/product/ReviewList';
import { BrandMonogram } from '../components/ui/BrandMonogram';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { RatingStars } from '../components/ui/RatingStars';
import { ValueTags } from '../components/ui/ValueTags';
import { useAuth } from '../contexts/AuthContext';
import { getBrand, getBrandProducts, getBrandReviews } from '../utils/catalog';
import { formatCurrency, getProductMargin } from '../utils/pricing';

export function BrandProfile() {
  const { brandId } = useParams();
  const { user } = useAuth();
  const brand = getBrand(brandId);

  if (!brand) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={StoreIcon}
          title="Brand not found"
          description="This brand may no longer sell on the marketplace."
          action={<ButtonLink to="/search">Browse products</ButtonLink>} />
        
      </div>);

  }

  const products = getBrandProducts(brand.id);
  const reviews = getBrandReviews(brand.id);
  const isOwner = user?.ownedBrandId === brand.id;
  const avgMargin = Math.round(products.reduce((s, p) => s + getProductMargin(p), 0) / Math.max(products.length, 1));

  const stats = [
  { label: 'Brand minimum', value: formatCurrency(brand.minOrderValue).replace('.00', '') },
  { label: 'Avg. margin', value: `${avgMargin}%` },
  { label: 'Retailers', value: brand.retailerCount.toLocaleString() },
  { label: 'Products', value: products.length.toString() }];


  return (
    <div>
      <div className="bg-primary-900">
        <div className="mx-auto grid h-40 max-w-7xl grid-cols-4 gap-1 overflow-hidden opacity-40 sm:h-52">
          {products.slice(0, 4).map((p) =>
          <img key={p.id} src={p.image} alt="" className="h-full w-full object-cover" />
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 rounded-xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="rounded-2xl ring-4 ring-white">
                <BrandMonogram brand={brand} size="xl" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{brand.name}</h1>
                <p className="mt-1 text-sm text-slate-600">{brand.tagline}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {brand.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Founded {brand.founded}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {brand.ownerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {brand.responseTime}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <RatingStars rating={brand.rating} count={brand.reviewCount} size="md" />
                  <ValueTags values={brand.values} size="md" />
                </div>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              {isOwner ?
              <>
                  <ButtonLink to="/sell/new" variant="secondary">
                    Add product
                  </ButtonLink>
                  <ButtonLink to="/account/contact">
                    <PencilIcon className="h-4 w-4" aria-hidden="true" />
                    Edit profile
                  </ButtonLink>
                </> :

              <ButtonLink to="/inbox/purchases">
                  <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                  Message brand
                </ButtonLink>
              }
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-4">
            {stats.map((s) =>
            <div key={s.label} className="bg-slate-50 px-4 py-3">
                <dt className="text-xs text-slate-500">{s.label}</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums text-slate-900">{s.value}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="grid gap-8 py-10 lg:grid-cols-[1fr_300px]">
          <section aria-labelledby="products-heading">
            <h2 id="products-heading" className="mb-4 text-lg font-semibold text-slate-900">
              Wholesale catalog <span className="font-normal text-slate-500">({products.length})</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {products.map((p) =>
              <ProductCard key={p.id} product={p} />
              )}
            </div>
          </section>
          <aside className="space-y-5">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900">Our story</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{brand.story}</p>
            </section>
            <section className="rounded-xl border border-slate-200 bg-white p-5 text-sm">
              <h2 className="font-semibold text-slate-900">Wholesale terms</h2>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>Opening order minimum {formatCurrency(brand.minOrderValue).replace('.00', '')}</li>
                <li>Reorders: no minimum after first order</li>
                <li>Tiered pricing at 5+ and 10+ cases</li>
                <li>Ships from {brand.location}</li>
              </ul>
            </section>
          </aside>
        </div>

        <div className="pb-16">
          <ReviewList reviews={reviews} rating={brand.rating} count={brand.reviewCount} />
        </div>
      </div>
    </div>);

}
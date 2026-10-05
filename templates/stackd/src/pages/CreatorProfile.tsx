import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, PackageOpenIcon, PencilIcon, UserXIcon } from 'lucide-react';
import { ListingCard } from '../components/listing/ListingCard';
import { ReviewList } from '../components/listing/ReviewList';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../contexts/StoreContext';
import { reviews } from '../data/reviews';
import { formatCompact, formatDate } from '../utils/format';

export function CreatorProfile() {
  const { creatorId = '' } = useParams();
  const { getCreator, listings, user } = useStore();
  const creator = getCreator(creatorId);
  const [following, setFollowing] = useState(false);

  if (!creator) {
    return (
      <div className="container-page py-20">
        <EmptyState icon={UserXIcon} title="Creator not found" body="This shop may have closed or moved." action={<Link to="/s" className="btn btn-ink">Browse products</Link>} />
      </div>);

  }

  const products = listings.filter((l) => l.creatorId === creator.id);
  const productSlugs = products.map((p) => p.slug);
  const creatorReviews = reviews.filter((r) => productSlugs.includes(r.listingSlug));
  const totalSales = products.reduce((s, p) => s + p.sales, 0);
  const rated = products.filter((p) => p.reviewCount > 0);
  const totalReviews = rated.reduce((s, p) => s + p.reviewCount, 0);
  const avgRating = totalReviews ? rated.reduce((s, p) => s + p.rating * p.reviewCount, 0) / totalReviews : 0;
  const isMe = user?.creatorId === creator.id;

  return (
    <div>
      <div className="h-40 border-b border-ink md:h-56" style={{ backgroundColor: creator.tint }} />
      <div className="container-page">
        <div className="-mt-14 flex flex-col gap-6 border-b border-ink pb-8 md:-mt-16 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <img src={creator.avatar} alt={creator.name} className="h-28 w-28 rounded-full border-2 border-ink bg-white object-cover shadow-pop md:h-32 md:w-32" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{creator.name}</h1>
              <p className="text-muted">@{creator.handle} · {creator.headline}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {creator.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Joined {formatDate(creator.joinedAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {isMe ?
            <>
                <Link to="/account/contact" className="btn btn-outline">
                  <PencilIcon className="h-4 w-4" aria-hidden="true" />
                  Edit profile
                </Link>
                <Link to="/listings/new" className="btn btn-accent">
                  New listing
                </Link>
              </> :

            <button type="button" aria-pressed={following} onClick={() => setFollowing((f) => !f)} className={`btn ${following ? 'btn-outline' : 'btn-ink'}`}>
                {following ? 'Following' : 'Follow'}
              </button>
            }
          </div>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
              {[
              { label: 'Followers', value: formatCompact(creator.followers + (following ? 1 : 0)) },
              { label: 'Sales', value: formatCompact(totalSales) },
              { label: 'Avg. rating', value: avgRating ? avgRating.toFixed(1) : '—' }].
              map((s) =>
              <div key={s.label} className="rounded-xl border border-ink p-4">
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{s.label}</p>
                </div>
              )}
            </div>
            <div>
              <h2 className="font-display text-lg font-bold">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">{creator.bio}</p>
            </div>
          </aside>

          <div className="min-w-0 space-y-14">
            <section aria-labelledby="products-heading">
              <h2 id="products-heading" className="mb-5 text-2xl font-bold">
                Products <span className="text-muted">({products.length})</span>
              </h2>
              {products.length === 0 ?
              <EmptyState icon={PackageOpenIcon} title="No products yet" body={`${creator.name.split(' ')[0]} hasn’t published anything yet.`} /> :

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((l) =>
                <ListingCard key={l.id} listing={l} />
                )}
                </div>
              }
            </section>
            {totalReviews > 0 &&
            <section aria-labelledby="creator-reviews">
                <h2 id="creator-reviews" className="mb-5 text-2xl font-bold">
                  Reviews
                </h2>
                <ReviewList
                reviews={creatorReviews}
                rating={avgRating}
                reviewCount={totalReviews}
                showListingTitle={(slug) => products.find((p) => p.slug === slug)?.title} />
              
              </section>
            }
          </div>
        </div>
      </div>
    </div>);

}
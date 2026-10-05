import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, PackageIcon, PlusIcon, SettingsIcon, StoreIcon } from 'lucide-react';
import { reviews } from '../data/reviews';
import { useAuth } from '../contexts/AuthContext';
import { useListings } from '../contexts/ListingsContext';
import { ProductCard } from '../components/product/ProductCard';
import { ReviewList } from '../components/listing/ReviewList';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { StarRating } from '../components/ui/StarRating';
import { formatDate } from '../utils/format';

type ShopTab = 'listings' | 'reviews' | 'about';

export function MakerShop() {
  const { makerId = '' } = useParams();
  const { getMaker, listings } = useListings();
  const { user } = useAuth();
  const [tab, setTab] = useState<ShopTab>('listings');
  const maker = getMaker(makerId);

  if (!maker) {
    return (
      <div className="container-page py-16">
        <EmptyState icon={<StoreIcon className="h-5 w-5" />} title="Shop not found" description="This maker may have closed their shop." action={<ButtonLink to="/s">Browse all makers</ButtonLink>} />
      </div>);

  }

  const isOwner = user?.shopId === maker.id;
  const shopListings = listings.filter((l) => l.makerId === maker.id);
  const shopReviews = reviews.filter((r) => r.makerId === maker.id);
  const tabs: {id: ShopTab;label: string;count?: number;}[] = [
  { id: 'listings', label: 'Listings', count: shopListings.length },
  { id: 'reviews', label: 'Reviews', count: maker.reviewCount },
  { id: 'about', label: 'About' }];


  return (
    <div>
      <section className="border-b border-line bg-subtle">
        <div className="container-page grid gap-8 py-10 md:grid-cols-[auto_1fr] md:items-center lg:py-14">
          <img src={maker.portrait} alt={`${maker.ownerName} in the studio`} className="h-36 w-36 rounded-3xl object-cover shadow-soft md:h-44 md:w-44" />
          <div>
            <p className="eyebrow">{maker.location}</p>
            <h1 className="mt-2 text-4xl font-medium tracking-tight sm:text-5xl">{maker.shopName}</h1>
            <p className="mt-2 text-lg text-muted">{maker.tagline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <StarRating rating={maker.rating} count={maker.reviewCount} size="md" showValue />
              <span className="flex items-center gap-1.5 text-muted"><PackageIcon className="h-4 w-4" aria-hidden /> {maker.sales.toLocaleString()} sales</span>
              <span className="flex items-center gap-1.5 text-muted"><CalendarIcon className="h-4 w-4" aria-hidden /> Since {formatDate(maker.joined, 'MMMM yyyy')}</span>
              <span className="flex items-center gap-1.5 text-muted"><ClockIcon className="h-4 w-4" aria-hidden /> Responds {maker.responseTime}</span>
            </div>
            {isOwner &&
            <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to="/listings/new" size="sm"><PlusIcon className="h-4 w-4" aria-hidden /> New listing</ButtonLink>
                <ButtonLink to="/inbox/sales" variant="secondary" size="sm">Manage orders</ButtonLink>
                <ButtonLink to="/account/contact" variant="ghost" size="sm"><SettingsIcon className="h-4 w-4" aria-hidden /> Settings</ButtonLink>
              </div>
            }
          </div>
        </div>
      </section>

      <div className="container-page py-10">
        <div className="flex gap-8 border-b border-line" role="tablist" aria-label="Shop sections">
          {tabs.map((t) =>
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`relative pb-3 text-sm font-medium transition-colors ${tab === t.id ? 'text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary' : 'text-muted hover:text-ink'}`}>
            
              {t.label} {t.count !== undefined && <span className="text-muted">({t.count})</span>}
            </button>
          )}
        </div>

        <div className="mt-8" role="tabpanel">
          {tab === 'listings' && (
          shopListings.length ?
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                {shopListings.map((l) =>
            <ProductCard key={l.id} listing={l} showMaker={false} />
            )}
              </div> :

          <EmptyState
            icon={<StoreIcon className="h-5 w-5" />}
            title={isOwner ? 'Your shelves are empty' : 'No listings right now'}
            description={isOwner ? 'Add your first piece — it only takes a few minutes.' : 'Check back soon for new work from this maker.'}
            action={isOwner ? <ButtonLink to="/listings/new">Create a listing</ButtonLink> : undefined} />)

          }
          {tab === 'reviews' && <ReviewList reviews={shopReviews} rating={maker.rating} total={maker.reviewCount} title="Shop reviews" />}
          {tab === 'about' &&
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="text-3xl font-medium">About {maker.ownerName.split(' ')[0]}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink/90">{maker.bio}</p>
              </div>
              <div className="card space-y-4 p-6 text-sm">
                <div>
                  <h3 className="font-sans font-semibold">Local pickup</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-muted"><MapPinIcon className="h-4 w-4" aria-hidden /> {maker.pickupArea}</p>
                </div>
                <div>
                  <h3 className="font-sans font-semibold">Ships from</h3>
                  <p className="mt-1 text-muted">{maker.location}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}
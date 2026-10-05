import React from "react";
import { useParams } from "react-router-dom";
import { CalendarIcon, MapPinIcon, MessageCircleIcon, PlusIcon, RulerIcon, TractorIcon } from "lucide-react";
import { FulfillmentDetails } from "../components/listing/FulfillmentDetails";
import { ReviewList } from "../components/listing/ReviewList";
import { FarmMap } from "../components/marketplace/FarmMap";
import { PracticeBadges } from "../components/marketplace/PracticeBadges";
import { ProductCard } from "../components/marketplace/ProductCard";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Stars } from "../components/ui/Stars";
import { useAuth } from "../contexts/AuthContext";
import { useCatalog } from "../contexts/CatalogContext";

export function FarmProfile() {
  const { id = "" } = useParams();
  const { getFarm, productsByFarm, reviewsForFarm } = useCatalog();
  const { user } = useAuth();
  const farm = getFarm(id);

  if (!farm) {
    return (
      <div className="container-site py-16">
        <EmptyState
          icon={<TractorIcon className="h-6 w-6" />}
          title="Farm not found"
          text="This farm may have paused its shop for the season."
          action={<Button to="/search">Browse all farms</Button>} />
        
      </div>);

  }

  const items = productsByFarm(farm.id);
  const reviews = reviewsForFarm(farm.id);
  const isOwner = user?.farmId === farm.id;

  return (
    <div>
      <div className="relative h-56 sm:h-72 lg:h-80">
        <img src={farm.coverImage} alt={`${farm.name} landscape`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />
      </div>

      <div className="container-site">
        <div className="relative -mt-16 rounded-2xl border border-line bg-paper p-6 shadow-lift sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{farm.tagline}</p>
              <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">{farm.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" aria-hidden="true" /> {farm.location} · {farm.distanceMi} mi
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" aria-hidden="true" /> Farming since {farm.since}
                </span>
                {farm.acres > 0 &&
                <span className="flex items-center gap-1.5">
                    <RulerIcon className="h-4 w-4" aria-hidden="true" /> {farm.acres} acres
                  </span>
                }
                <Stars rating={farm.rating} count={farm.reviewCount} />
              </div>
              <div className="mt-4">
                <PracticeBadges practices={farm.practices} size="sm" />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Avatar name={farm.owner} size="lg" />
              <div className="mr-2">
                <p className="text-sm font-semibold text-ink">{farm.owner}</p>
                <p className="text-xs text-muted">Responds {farm.responseTime}</p>
              </div>
              {isOwner ?
              <Button to="/listings/new" size="sm">
                  <PlusIcon className="h-4 w-4" aria-hidden="true" /> New listing
                </Button> :

              <Button to="/inbox/orders" size="sm" variant="outline">
                  <MessageCircleIcon className="h-4 w-4" aria-hidden="true" /> Message
                </Button>
              }
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <section aria-labelledby="story-h">
              <h2 id="story-h" className="font-display text-3xl font-semibold text-ink">
                Our story
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/90">
                {farm.story.map((p) =>
                <p key={p.slice(0, 20)}>{p}</p>
                )}
              </div>
            </section>

            <section aria-labelledby="products-h">
              <h2 id="products-h" className="mb-5 font-display text-3xl font-semibold text-ink">
                This week's harvest <span className="text-muted">({items.length})</span>
              </h2>
              {items.length === 0 ?
              <EmptyState
                icon={<TractorIcon className="h-6 w-6" />}
                title="Nothing listed this week"
                text="Check back soon — new harvests are listed every Monday." /> :


              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((p) =>
                <ProductCard key={p.id} product={p} />
                )}
                </div>
              }
            </section>

            <section aria-labelledby="farm-fulfil-h">
              <h2 id="farm-fulfil-h" className="mb-5 font-display text-3xl font-semibold text-ink">
                Pickup days & delivery
              </h2>
              <FulfillmentDetails farm={farm} options={["pickup", "delivery"]} />
            </section>

            <section aria-labelledby="farm-reviews-h">
              <h2 id="farm-reviews-h" className="mb-5 font-display text-3xl font-semibold text-ink">
                What neighbors say
              </h2>
              <ReviewList reviews={reviews} />
            </section>
          </div>

          <aside className="space-y-5">
            <div className="lg:sticky lg:top-24">
              <FarmMap farms={[farm]} activeFarmId={farm.id} className="h-72" />
              <div className="mt-4 rounded-2xl border border-line bg-paper p-5 text-sm">
                <p className="font-semibold text-ink">Farm address</p>
                <p className="mt-1 text-muted">{farm.address}</p>
                <p className="mt-4 font-semibold text-ink">Pickup instructions</p>
                <p className="mt-1 text-muted">{farm.pickupInstructions}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>);

}
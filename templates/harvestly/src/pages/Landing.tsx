import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { CategoryRow } from "../components/landing/CategoryRow";
import { FarmerCta } from "../components/landing/FarmerCta";
import { Hero } from "../components/landing/Hero";
import { PickupBand } from "../components/landing/PickupBand";
import { FarmStoryCard } from "../components/marketplace/FarmStoryCard";
import { ProductCard } from "../components/marketplace/ProductCard";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useCatalog } from "../contexts/CatalogContext";

const featuredFarmIds = ["willow-creek", "little-hen", "bee-kind-apiary"];

export function Landing() {
  const { products, farms } = useCatalog();
  const inSeason = products.filter((p) => p.inSeason && p.stock > 0).slice(0, 8);
  const featured = farms.filter((f) => featuredFarmIds.includes(f.id));

  return (
    <>
      <Hero />
      <CategoryRow />

      <section className="bg-paper py-16" aria-labelledby="in-season-heading">
        <div className="container-site">
          <SectionHeading
            id="in-season-heading"
            eyebrow="In season now"
            title="Picked this week"
            text="Early-autumn favorites from farms within 25 miles. Stock is limited — when it's gone, it's gone."
            action={
            <Button to="/search" variant="outline" size="sm">
                See all products <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            } />
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {inSeason.map((p) =>
            <ProductCard key={p.id} product={p} />
            )}
          </div>
        </div>
      </section>

      <section className="container-site py-16" aria-labelledby="farms-heading">
        <SectionHeading
          id="farms-heading"
          eyebrow="Featured farms"
          title="Meet the people who grow your food"
          text="Every farm on Harvestly is independently owned and within a short drive of your kitchen." />
        
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((f) =>
          <FarmStoryCard key={f.id} farm={f} />
          )}
        </div>
      </section>

      <PickupBand />
      <FarmerCta />
    </>);

}
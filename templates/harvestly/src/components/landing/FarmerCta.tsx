import React from "react";
import { CheckIcon } from "lucide-react";
import { brand } from "../../data/brand";
import { images } from "../../data/images";
import { sellerSteps } from "../../data/pickupDays";
import { Button } from "../ui/Button";

export function FarmerCta() {
  return (
    <section className="container-site py-16" aria-labelledby="farmer-cta-heading">
      <div className="grid overflow-hidden rounded-[2rem] border border-line bg-accent-soft lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-dark">For farmers</p>
          <h2 id="farmer-cta-heading" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Grow it. List it. Sell it by Saturday.
          </h2>
          <p className="mt-3 max-w-md text-muted">
            {brand.name} handles payments, orders and customer messages so you can stay in the field. Keep 92% of every
            sale.
          </p>
          <ol className="mt-8 space-y-4">
            {sellerSteps.map((s, i) =>
            <li key={s.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="text-sm text-muted">{s.text}</p>
                </div>
              </li>
            )}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/listings/new" variant="accent" size="lg">
              {brand.sellerCta}
            </Button>
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <CheckIcon className="h-4 w-4 text-primary" aria-hidden="true" />
              No setup or monthly fees
            </span>
          </div>
        </div>
        <img
          src={images.farmStand}
          alt="A farmer handing a bag of produce to a customer at a farm stand"
          loading="lazy"
          className="h-72 w-full object-cover lg:h-full" />
        
      </div>
    </section>);

}
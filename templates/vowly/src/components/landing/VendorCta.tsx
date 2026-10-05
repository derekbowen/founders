import React from "react";
import { CheckIcon } from "lucide-react";
import { brand } from "../../data/brand";
import { images } from "../../data/images";
import { ButtonLink } from "../ui/ButtonLink";

const perks = [
"Free listing with portfolio, packages and service area",
"Qualified inquiries with date, guest count and budget",
"No commissions — book couples directly"];


export function VendorCta() {
  return (
    <section aria-labelledby="vendor-cta-title" className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid overflow-hidden rounded-3xl bg-ink text-canvas lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <img src={images.floristStudio} alt="Florist arranging blush roses in her studio" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">For wedding pros</p>
          <h2 id="vendor-cta-title" className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Grow your wedding business with {brand.name}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-canvas/80">
            Join hundreds of photographers, florists, planners and venues meeting couples who are ready to book.
          </p>
          <ul className="mt-6 space-y-3">
            {perks.map((perk) =>
            <li key={perk} className="flex items-start gap-3 text-sm text-canvas/90">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <CheckIcon aria-hidden="true" className="h-3 w-3" />
                </span>
                {perk}
              </li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/listings/new" variant="gold" size="lg">List your business</ButtonLink>
            <ButtonLink to="/about" variant="ghost" size="lg" className="text-canvas hover:bg-canvas/10">
              How it works
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>);

}
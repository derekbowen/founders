import React from "react";
import { Link } from "react-router-dom";
import { realWeddings } from "../../data/realWeddings";
import { getVendorById } from "../../utils/vendors";
import { SectionHeading } from "../ui/SectionHeading";

export function RealWeddings() {
  return (
    <section id="real-weddings" aria-labelledby="real-weddings-title" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          id="real-weddings-title"
          eyebrow="Real weddings"
          title="Love stories, beautifully made"
          description="See how couples brought their day to life — and meet the vendors who made it happen." />
        
        <div className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {realWeddings.map((wedding, i) =>
          <article key={wedding.id} className={i === 1 ? "md:mt-12" : ""}>
              <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-blush">
                <img src={wedding.image} alt={`${wedding.couple}'s wedding at ${wedding.location}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
                {wedding.style} · {wedding.season}
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold text-ink">{wedding.couple}</h3>
              <p className="text-sm text-muted">{wedding.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{wedding.excerpt}</p>
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-muted">Vendor team</p>
                <ul className="flex flex-wrap gap-2">
                  {wedding.vendorIds.map((id) => {
                  const vendor = getVendorById(id);
                  if (!vendor) return null;
                  return (
                    <li key={id}>
                        <Link
                        to={`/l/${vendor.slug}`}
                        className="inline-flex rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-primary hover:text-primary">
                        
                          {vendor.name}
                        </Link>
                      </li>);

                })}
                </ul>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}
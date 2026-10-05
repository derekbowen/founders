import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "lucide-react";
import { categories } from "../../data/categories";
import { countByCategory } from "../../utils/vendors";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/ButtonLink";

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-title" className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        id="categories-title"
        eyebrow="Browse by category"
        title="Every vendor for your day"
        description="From your first venue tour to the last song of the night — find trusted pros for every part of your celebration."
        action={<ButtonLink to="/search" variant="secondary">View all vendors</ButtonLink>} />
      
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        {categories.map((category) =>
        <li key={category.id}>
            <Link
            to={`/search?category=${category.id}`}
            className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-canvas">
            
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush">
                <img
                src={category.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/95 text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold text-ink transition-colors group-hover:text-primary">
                  {category.label}
                </h3>
                <span className="text-xs text-muted">{countByCategory(category.id)} listed</span>
              </div>
              <p className="text-sm text-muted">{category.description}</p>
            </Link>
          </li>
        )}
      </ul>
    </section>);

}
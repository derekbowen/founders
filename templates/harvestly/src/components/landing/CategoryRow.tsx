import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { CategoryIcon } from "../marketplace/CategoryIcon";
import { SectionHeading } from "../ui/SectionHeading";

export function CategoryRow() {
  return (
    <section className="container-site py-16" aria-labelledby="categories-heading">
      <SectionHeading id="categories-heading" eyebrow="Shop by category" title="What's growing" />
      <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
        {categories.map((c) =>
        <li key={c.id} className="w-36 shrink-0 snap-start sm:w-auto">
            <Link
            to={`/search?category=${c.id}`}
            className="group block overflow-hidden rounded-2xl border border-line bg-paper transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift">
            
              <div className="aspect-square overflow-hidden">
                <img
                src={c.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              
              </div>
              <div className="p-3">
                <p className="flex items-center gap-1.5 font-semibold text-ink">
                  <CategoryIcon id={c.id} className="h-4 w-4 text-primary" />
                  {c.label}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted">{c.blurb}</p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </section>);

}
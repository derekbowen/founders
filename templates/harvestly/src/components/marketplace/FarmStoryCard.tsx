import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";
import { Farm } from "../../types/marketplace";
import { Stars } from "../ui/Stars";

export function FarmStoryCard({ farm }: {farm: Farm;}) {
  return (
    <Link
      to={`/farms/${farm.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
      
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={farm.coverImage}
          alt={`${farm.name} in ${farm.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        
        <span className="absolute bottom-3 left-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-ink">
          Since {farm.since}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1 text-sm text-muted">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {farm.location}
          </p>
          <Stars rating={farm.rating} />
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{farm.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{farm.shortStory}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2">
          Meet {farm.owner.split(" ")[0]}
          <ArrowRightIcon className="h-4 w-4 transition-all" aria-hidden="true" />
        </span>
      </div>
    </Link>);

}
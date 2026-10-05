import React from "react";
import { Link } from "react-router-dom";
import { MapPinIcon, MessageCircleIcon } from "lucide-react";
import { Farm } from "../../types/marketplace";
import { Button } from "../ui/Button";
import { Stars } from "../ui/Stars";

export function FarmSummaryCard({ farm }: {farm: Farm;}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <img src={farm.coverImage} alt="" className="h-32 w-full object-cover" />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Grown by</p>
        <Link to={`/farms/${farm.id}`} className="mt-1 block font-display text-xl font-semibold text-ink hover:text-primary">
          {farm.name}
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {farm.location} · {farm.distanceMi} mi away
        </p>
        <div className="mt-2">
          <Stars rating={farm.rating} count={farm.reviewCount} />
        </div>
        <p className="mt-3 text-sm text-muted">{farm.shortStory}</p>
        <p className="mt-3 text-xs text-muted">
          {farm.owner} usually responds <span className="font-semibold text-ink">{farm.responseTime}</span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button to={`/farms/${farm.id}`} variant="outline" size="sm">
            View farm
          </Button>
          <Button to="/inbox/orders" variant="ghost" size="sm" className="border border-line">
            <MessageCircleIcon className="h-4 w-4" aria-hidden="true" /> Message
          </Button>
        </div>
      </div>
    </div>);

}
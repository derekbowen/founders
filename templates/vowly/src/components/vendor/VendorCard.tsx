import React from "react";
import { Link } from "react-router-dom";
import { MapPinIcon } from "lucide-react";
import { StarRating } from "../ui/StarRating";
import { formatPrice, priceSuffix } from "../../utils/format";
import { getCategory } from "../../utils/vendors";
import type { Vendor } from "../../types/marketplace";

interface VendorCardProps {
  vendor: Vendor;
  active?: boolean;
  onHover?: (id: string | null) => void;
  compact?: boolean;
}

export function VendorCard({ vendor, active = false, onHover, compact = false }: VendorCardProps) {
  const category = getCategory(vendor.category);
  return (
    <Link
      to={`/l/${vendor.slug}`}
      onMouseEnter={() => onHover?.(vendor.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(vendor.id)}
      onBlur={() => onHover?.(null)}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-canvas">
      
      <div
        className={`relative overflow-hidden rounded-2xl bg-blush ${compact ? "aspect-[3/2]" : "aspect-[4/3]"} ${
        active ? "ring-2 ring-primary ring-offset-2 ring-offset-canvas" : ""}`
        }>
        
        <img
          src={vendor.images[0]}
          alt={`${vendor.name} portfolio`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        
        {vendor.awards.some((a) => a.includes("Couples' Choice")) &&
        <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-semibold text-gold-dark shadow-sm">
            Couples' Choice
          </span>
        }
      </div>
      <div className="pt-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark">{category?.singular}</p>
          <StarRating rating={vendor.rating} count={vendor.reviewCount} />
        </div>
        <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
          {vendor.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <MapPinIcon aria-hidden="true" className="h-3.5 w-3.5" />
          {vendor.city}
        </p>
        <p className="mt-2 text-sm text-ink">
          <span className="text-muted">From </span>
          <span className="font-semibold">{formatPrice(vendor.startingPrice)}</span>
          <span className="text-muted"> {priceSuffix(vendor.priceUnit)}</span>
        </p>
      </div>
    </Link>);

}
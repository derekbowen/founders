import React from "react";
import { Link } from "react-router-dom";
import { MapPinIcon, StoreIcon, TruckIcon } from "lucide-react";
import { useCatalog } from "../../contexts/CatalogContext";
import { Product } from "../../types/marketplace";
import { formatPrice, formatUnit } from "../../utils/format";
import { Badge } from "../ui/Badge";

interface ProductCardProps {
  product: Product;
  highlighted?: boolean;
  onHover?: (farmId: string | null) => void;
}

export function ProductCard({ product, highlighted, onHover }: ProductCardProps) {
  const { getFarm } = useCatalog();
  const farm = getFarm(product.farmId);
  const soldOut = product.stock === 0;
  const lowStock = !soldOut && product.stock <= 10;

  return (
    <Link
      to={`/listings/${product.id}`}
      onMouseEnter={() => onHover?.(product.farmId)}
      onMouseLeave={() => onHover?.(null)}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-paper transition hover:-translate-y-0.5 hover:shadow-lift ${
      highlighted ? "border-primary shadow-lift" : "border-line shadow-card"}`
      }>
      
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${soldOut ? "opacity-60 grayscale-[40%]" : ""}`} />
        
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.organic && <Badge tone="green">Organic</Badge>}
          {soldOut ?
          <Badge tone="neutral" className="bg-white/90">
              Sold out
            </Badge> :

          lowStock && <Badge tone="orange">Only {product.stock} left</Badge>
          }
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-primary-dark">
          {product.title}
        </h3>
        {farm &&
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {farm.name} · {farm.distanceMi} mi
            </span>
          </p>
        }
        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="text-ink">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>{" "}
            <span className="text-sm text-muted">{formatUnit(product.unit)}</span>
          </p>
          <div className="flex gap-1 text-muted" aria-label="Fulfillment options">
            {product.fulfillment.includes("pickup") &&
            <span title="Farm pickup" className="rounded-full bg-ink/5 p-1.5">
                <StoreIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Pickup available</span>
              </span>
            }
            {product.fulfillment.includes("delivery") &&
            <span title="Local delivery" className="rounded-full bg-ink/5 p-1.5">
                <TruckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Delivery available</span>
              </span>
            }
          </div>
        </div>
      </div>
    </Link>);

}
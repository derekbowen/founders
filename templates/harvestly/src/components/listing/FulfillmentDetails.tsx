import React from "react";
import { StoreIcon, TruckIcon } from "lucide-react";
import { Farm, FulfillmentType } from "../../types/marketplace";
import { formatPrice } from "../../utils/format";

export function FulfillmentDetails({ farm, options }: {farm: Farm;options: FulfillmentType[];}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className={`rounded-2xl border border-line bg-paper p-5 ${options.includes("pickup") ? "" : "opacity-60"}`}>
        <h3 className="flex items-center gap-2 font-semibold text-ink">
          <StoreIcon className="h-5 w-5 text-primary" aria-hidden="true" /> Farm pickup
          <span className="ml-auto rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary-dark">Free</span>
        </h3>
        {options.includes("pickup") ?
        <ul className="mt-4 space-y-3">
            {farm.pickup.map((p) =>
          <li key={p.day + p.location} className="flex gap-3 text-sm">
                <span className="w-20 shrink-0 font-semibold text-ink">{p.day}</span>
                <span>
                  <span className="block text-ink">{p.window}</span>
                  <span className="block text-muted">{p.location}</span>
                </span>
              </li>
          )}
          </ul> :

        <p className="mt-3 text-sm text-muted">Not available for this product.</p>
        }
      </div>
      <div className={`rounded-2xl border border-line bg-paper p-5 ${options.includes("delivery") ? "" : "opacity-60"}`}>
        <h3 className="flex items-center gap-2 font-semibold text-ink">
          <TruckIcon className="h-5 w-5 text-primary" aria-hidden="true" /> Local delivery
        </h3>
        {options.includes("delivery") ?
        <ul className="mt-4 divide-y divide-line">
            {farm.deliveryZones.map((z) =>
          <li key={z.name} className="flex items-start justify-between gap-3 py-2.5 text-sm first:pt-0">
                <span>
                  <span className="block text-ink">{z.name}</span>
                  <span className="block text-muted">
                    {z.days} · min. {formatPrice(z.minOrder)}
                  </span>
                </span>
                <span className="font-semibold text-ink">{formatPrice(z.fee)}</span>
              </li>
          )}
          </ul> :

        <p className="mt-3 text-sm text-muted">This item is pickup only — it's too delicate to travel.</p>
        }
      </div>
    </div>);

}
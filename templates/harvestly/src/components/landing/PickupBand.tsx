import React from "react";
import { Link } from "react-router-dom";
import { CalendarDaysIcon } from "lucide-react";
import { pickupDays } from "../../data/pickupDays";

export function PickupBand() {
  return (
    <section className="bg-primary text-white" aria-labelledby="pickup-heading">
      <div className="container-site grid gap-8 py-12 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-soft">
            <CalendarDaysIcon className="h-4 w-4" aria-hidden="true" />
            Pickup days
          </p>
          <h2 id="pickup-heading" className="font-display text-3xl font-semibold sm:text-4xl">
            There's a farm open almost every day
          </h2>
          <p className="mt-3 text-white/80">
            Order by 8 pm the night before, then swing by the farm stand, barn or market booth.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {pickupDays.map((d) =>
          <li key={d.day}>
              <Link
              to="/search?fulfillment=pickup"
              className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.07] p-4 transition hover:bg-white/15">
              
                <span className="font-display text-2xl font-semibold">{d.day}</span>
                <span className="mt-1 text-xs font-semibold text-accent-soft">
                  {d.spots} pickup {d.spots === 1 ? "spot" : "spots"}
                </span>
                <span className="mt-2 text-xs text-white/75">{d.highlight}</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>);

}
import React from "react";
import { Button } from "../components/ui/Button";
import { brand } from "../data/brand";
import { images } from "../data/images";

const values = [
{ title: "Short food miles", text: "Every farm is within 25 miles. Food travels hours, not weeks." },
{ title: "Farmers set prices", text: "Growers keep 92% of every sale and decide what their harvest is worth." },
{ title: "Know your grower", text: "Message the person who grew your food, visit the farm, ask about practices." }];


export function About() {
  return (
    <div>
      <section className="kraft-texture">
        <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">About {brand.name}</p>
            <h1 className="mt-2 font-display text-5xl font-semibold leading-tight text-primary-dark">
              A farmers market that's open all week
            </h1>
            <p className="mt-5 text-lg text-muted">
              {brand.name} started in 2023 when a handful of {brand.region} farmers wanted an easier way to sell directly to
              neighbors — without standing in a parking lot every Saturday or giving up half their margin to a distributor.
            </p>
            <Button to="/search" size="lg" className="mt-8">
              Shop local farms
            </Button>
          </div>
          <img src={images.farmOrchard} alt="Orchard rows with a red barn" className="rounded-[2rem] border-4 border-paper shadow-lift" />
        </div>
      </section>
      <section className="container-site py-16" aria-label="Our values">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) =>
          <div key={v.title} className="rounded-2xl border border-line bg-paper p-6">
              <h2 className="font-display text-2xl font-semibold text-ink">{v.title}</h2>
              <p className="mt-2 text-muted">{v.text}</p>
            </div>
          )}
        </div>
      </section>
    </div>);

}
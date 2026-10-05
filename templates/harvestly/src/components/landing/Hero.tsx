import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LocateFixedIcon, MapPinIcon, SearchIcon } from "lucide-react";
import { brand } from "../../data/brand";
import { images } from "../../data/images";

export function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [what, setWhat] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (what) params.set("q", what);
    params.set("location", location || brand.defaultLocation);
    navigate(`/search?${params.toString()}`);
  }

  return (
    <section className="kraft-texture relative overflow-hidden">
      <div className="container-site grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Harvested this week in the {brand.region}
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-primary-dark sm:text-6xl lg:text-7xl">
            Fresh from farms <em className="font-medium italic text-accent">near you</em>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            Order produce, eggs, honey, meat and bread straight from the people who grow it. Pick up at the farm or
            get it delivered locally.
          </p>

          <form
            onSubmit={onSubmit}
            role="search"
            className="mt-8 flex max-w-xl flex-col gap-2 rounded-3xl border border-line bg-white p-2 shadow-lift sm:flex-row sm:items-center sm:rounded-full">
            
            <div className="relative flex-1">
              <label htmlFor="hero-location" className="sr-only">
                Your location
              </label>
              <MapPinIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <input
                id="hero-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={`Town or ZIP — e.g. ${brand.defaultLocation}`}
                className="h-12 w-full rounded-full bg-transparent pl-10 pr-10 text-sm text-ink placeholder:text-muted/80 focus:outline-none" />
              
              <button
                type="button"
                onClick={() => setLocation(brand.defaultLocation)}
                aria-label="Use my current location"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted hover:bg-ink/5 hover:text-primary">
                
                <LocateFixedIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
            <div className="relative flex-1">
              <label htmlFor="hero-what" className="sr-only">
                What are you looking for?
              </label>
              <input
                id="hero-what"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                placeholder="Eggs, honey, tomatoes…"
                className="h-12 w-full rounded-full bg-transparent px-4 text-sm text-ink placeholder:text-muted/80 focus:outline-none" />
              
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-dark">
              
              <SearchIcon className="h-4 w-4" aria-hidden="true" />
              Find food
            </button>
          </form>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
            ["8", "local farms"],
            ["60+", "products this week"],
            ["< 20 mi", "average food mile"]].
            map(([n, l]) =>
            <div key={l} className="flex items-baseline gap-1.5">
                <dt className="font-display text-2xl font-semibold text-primary-dark">{n}</dt>
                <dd className="text-muted">{l}</dd>
              </div>
            )}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative">
          
          <div className="overflow-hidden rounded-[2rem] border-4 border-paper shadow-lift lg:rotate-[1.5deg]">
            <img
              src={images.hero}
              alt="A farm stand table with tomatoes, carrots, eggs, honey and sourdough"
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-[5/4]" />
            
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-lift lg:-left-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-xl" aria-hidden="true">
              🥚
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Pickup today</p>
              <p className="text-xs text-muted">Little Hen egg fridge · 4–7 pm</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}
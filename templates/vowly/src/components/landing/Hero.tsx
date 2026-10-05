import React from "react";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import { brand } from "../../data/brand";
import { images } from "../../data/images";
import { vendors } from "../../data/vendors";
import { HeroSearch } from "./HeroSearch";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-blush/40">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7">
          
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-surface/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Wedding vendors in {brand.region}
          </p>
          <h1 id="hero-title" className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-[84px]">
            Find your <em className="font-medium italic text-primary">dream</em>
            <br className="hidden sm:block" /> wedding team
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Discover photographers, venues, florists and more. Send an inquiry in minutes, chat in one inbox, and book directly — no fees, no checkout.
          </p>
          <div className="mt-8 lg:mr-8">
            <HeroSearch />
          </div>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <StarIcon aria-hidden="true" className="h-4 w-4 fill-gold text-gold" />
              <dt className="sr-only">Average rating</dt>
              <dd><span className="font-semibold text-ink">4.9</span> <span className="text-muted">avg. vendor rating</span></dd>
            </div>
            <div>
              <dt className="sr-only">Vendors</dt>
              <dd><span className="font-semibold text-ink">{vendors.length * 20}+</span> <span className="text-muted">vetted vendors</span></dd>
            </div>
            <div>
              <dt className="sr-only">Couples</dt>
              <dd><span className="font-semibold text-ink">12,000+</span> <span className="text-muted">couples matched</span></dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          
          <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-3xl border-[6px] border-surface shadow-lift">
            <img src={images.heroCouple} alt="Couple walking through a sunlit olive grove on their wedding day" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-56 items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-lift sm:flex lg:-left-12">
            <img src={images.floralsBouquet} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div>
              <p className="text-xs text-muted">Just booked</p>
              <p className="font-display text-lg font-semibold leading-tight text-ink">Hart & Bloom Florals</p>
            </div>
          </div>
          <div className="absolute -right-2 top-10 hidden h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-surface text-center shadow-soft sm:flex lg:-right-6">
            <span className="font-display text-sm font-semibold italic leading-tight text-gold-dark">Est.<br />2018</span>
          </div>
        </motion.div>
      </div>
    </section>);

}
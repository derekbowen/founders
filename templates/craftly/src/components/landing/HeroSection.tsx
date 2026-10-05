import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HandHeartIcon, LeafIcon, TruckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { ButtonLink } from '../ui/ButtonLink';

const HERO_IMAGE = "/48d40602-b925-48a7-a5f0-ffa69f13b630.jpg";
const MUG_IMAGE = "/02c818db-0beb-49e9-9e1a-a82c99581c93.jpg";

export function HeroSection() {
  return (
    <section className="container-page grid items-center gap-10 py-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow">Handmade marketplace · 2,400+ independent makers</p>
        <h1 className="mt-4 text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Made by hand, <em className="font-normal italic text-primary">made to last</em>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Discover ceramics, jewelry, candles, textiles, woodwork and prints — crafted in small studios and shipped
          straight from the maker’s bench to your door. Or pick up locally and say hello.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/s?sort=newest" size="lg">
            Shop new arrivals
          </ButtonLink>
          <ButtonLink to="/signup" variant="secondary" size="lg">
            Sell on {brand.name}
          </ButtonLink>
        </div>
        <ul className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
          {[
          { icon: HandHeartIcon, label: 'Every item handmade' },
          { icon: TruckIcon, label: 'Ships from the studio' },
          { icon: LeafIcon, label: 'Plastic-free packaging' }].
          map(({ icon: Icon, label }) =>
          <li key={label} className="flex flex-col gap-2 text-muted">
              <Icon className="h-5 w-5 text-accent-ink" aria-hidden />
              {label}
            </li>
          )}
        </ul>
      </motion.div>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}>
        
        <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-subtle">
          <img src={HERO_IMAGE} alt="A sunlit maker’s workbench with stoneware, textiles, candles and woodwork" className="h-full w-full object-cover" />
        </div>
        <Link
          to="/l/speckled-stoneware-mug"
          className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-5 shadow-lift transition-transform hover:-translate-y-0.5 sm:left-8">
          
          <img src={MUG_IMAGE} alt="" className="h-14 w-14 rounded-xl object-cover" />
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-accent-ink">Maker’s pick</span>
            <span className="block text-sm font-medium text-ink">Speckled Stoneware Mug</span>
            <span className="block text-xs text-muted">Juniper Kiln · Portland, OR</span>
          </span>
        </Link>
      </motion.div>
    </section>);

}
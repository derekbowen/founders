import React from 'react';
import { CheckCircle2Icon, HeartPulseIcon, ShieldCheckIcon } from 'lucide-react';
import { AvatarGroup } from '../Avatar';
import { brand } from '../../data/brand';
import { sitters } from '../../data/sitters';
import { HeroSearch } from './HeroSearch';

const HERO_IMAGE = "/f77a6267-12bc-412e-9610-507f98d3360f.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-50">
      <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-100" />
      <div aria-hidden className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-primary-100" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary-800 ring-1 ring-primary-200">
            <ShieldCheckIcon className="h-4 w-4 text-primary-600" aria-hidden />
            Every sitter background-checked
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            {brand.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
            Book vetted babysitters and nannies by the hour for date nights, after-school care, and last-minute help across {brand.city}.
          </p>
          <HeroSearch />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AvatarGroup size="sm" max={4} avatars={sitters.slice(0, 5).map((s) => ({ name: s.name, alt: s.name, src: s.photo }))} />
            <p className="text-sm text-ink-700">
              <span className="font-bold text-ink-900">4.9 average</span> from 12,000+ verified parent reviews
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <img src={HERO_IMAGE} alt="A smiling sitter reading a picture book with two young children on a living room rug" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift sm:left-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2Icon className="h-5 w-5 text-emerald-700" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">Maya confirmed</p>
              <p className="text-xs text-ink-600">Fri · 6:00 – 11:00 PM · 2 kids</p>
            </div>
          </div>
          <div className="absolute -top-4 right-4 hidden items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lift sm:flex">
            <HeartPulseIcon className="h-4 w-4 text-accent-600" aria-hidden />
            <span className="text-xs font-bold text-ink-900">CPR & first-aid certified</span>
          </div>
        </div>
      </div>
    </section>);

}
import React from 'react';
import { ArrowRightIcon, BadgeCheckIcon, CameraIcon, CheckIcon, StarIcon } from 'lucide-react';
import { HeroSearch } from '../components/home/HeroSearch';
import { HowItWorks } from '../components/home/HowItWorks';
import { SafetyBand } from '../components/home/SafetyBand';
import { ListingCard } from '../components/listing/ListingCard';
import { ButtonLink } from '../components/ui/ButtonLink';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { listings } from '../data/listings';

const topRated = [...listings].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 8);

export function Landing() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:pb-24 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-accent-800 shadow-sm">
              <BadgeCheckIcon className="h-4 w-4 text-accent-600" aria-hidden="true" />
              Every sitter background-checked
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              {brand.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">{brand.heroSubtitle}</p>
            <div className="mt-8">
              <HeroSearch />
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
              <img src={images.hero} alt="A smiling woman hugging her golden retriever on a sofa" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -left-8 top-12 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                <CameraIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-stone-900">New photo from Maya</p>
                <p className="text-xs text-stone-500">Biscuit · zoomies in the yard</p>
              </div>
            </div>
            <div className="absolute -right-4 bottom-14 rounded-2xl bg-white p-4 shadow-lift">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) =>
                <StarIcon key={i} className="h-4 w-4 fill-primary-400 text-primary-400" aria-hidden="true" />
                )}
              </div>
              <p className="mt-1 text-2xl font-black text-stone-900">4.9 / 5</p>
              <p className="text-xs font-semibold text-stone-500">from 18,000+ pet parents</p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Top-rated sitters */}
      <section className="bg-white py-20" aria-labelledby="top-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wider text-primary-700">Loved by locals</p>
              <h2 id="top-heading" className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                Top-rated sitters in {brand.defaultCity.split(',')[0]}
              </h2>
            </div>
            <ButtonLink to="/s" variant="secondary" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
              See all sitters
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topRated.map((listing) =>
            <ListingCard key={listing.id} listing={listing} />
            )}
          </div>
        </div>
      </section>

      <SafetyBand />

      {/* Sitter CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-primary-100 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="text-sm font-extrabold uppercase tracking-wider text-primary-800">For pet lovers</p>
            <h2 id="cta-heading" className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
              Get paid to hang out with dogs and cats
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-stone-700">
              Set your own schedule, services and prices. Sitters on {brand.name} earn an average of $1,100 a month doing what they love.
            </p>
            <ul className="mt-6 space-y-3">
              {['Free to list — no monthly fees', 'You choose which pets and dates', 'Fast payouts straight to your bank'].map((item) =>
              <li key={item} className="flex items-center gap-3 font-bold text-stone-800">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-600 text-white">
                    <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              )}
            </ul>
            <ButtonLink to="/listings/new" size="lg" variant="accent" className="mt-8" rightIcon={<ArrowRightIcon className="h-5 w-5" />}>
              Become a sitter
            </ButtonLink>
          </div>
          <img src={images.sitterCta} alt="A sitter walking three happy dogs in a park" className="h-72 w-full object-cover lg:h-full" />
        </div>
      </section>
    </div>);

}
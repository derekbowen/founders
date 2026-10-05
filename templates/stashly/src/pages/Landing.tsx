import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShirtIcon,
  BedDoubleIcon,
  WarehouseIcon,
  CaravanIcon,
  ArrowRightIcon,
  SearchIcon,
  SendIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  RotateCcwIcon,
  StarIcon } from
'lucide-react';
import { HeroSearch } from '../components/home/HeroSearch';
import { EarningsCalculator } from '../components/home/EarningsCalculator';
import { ListingCard } from '../components/listing/ListingCard';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { sizeGuide } from '../data/spaceTypes';
import { howItWorks, protection, neighborhoods } from '../data/content';
import { images } from '../data/images';
import { brand } from '../data/brand';
import { formatMoney } from '../utils/pricing';
import { ui, cx } from '../utils/styles';

const sizeIcons = { closet: ShirtIcon, room: BedDoubleIcon, garage: WarehouseIcon, parking: CaravanIcon };
const stepIcons = [SearchIcon, SendIcon, KeyRoundIcon];
const protectionIcons = [ShieldCheckIcon, BadgeCheckIcon, CreditCardIcon, RotateCcwIcon];

export function Landing() {
  const { listings } = useMarketplace();
  const featured = [...listings].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-sand-50">
        <div className={cx(ui.container, 'grid gap-10 pb-10 pt-12 lg:grid-cols-12 lg:items-center lg:pb-16 lg:pt-16')}>
          <div className="lg:col-span-6">
            <p className={ui.eyebrow}>{brand.tagline} · {brand.homeCity}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Storage next door, up to 50% cheaper
            </h1>
            <p className="mt-5 max-w-lg text-lg text-stone-600">
              Rent spare garages, basements, attics and closets from neighbors. Booked by the day, billed monthly, protected end to end.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-stone-700">
              <span className="flex items-center gap-1 font-semibold">
                <StarIcon className="h-4 w-4 fill-sand-500 text-sand-500" aria-hidden="true" /> 4.9
              </span>
              <span className="text-stone-400" aria-hidden="true">·</span>
              <span>12,400+ storers</span>
              <span className="text-stone-400" aria-hidden="true">·</span>
              <span>2,100 spaces</span>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <img
              src={images.hero}
              alt="A tidy garage with labeled boxes on shelving and a bike on the wall"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
            
            <div className="absolute -bottom-5 left-5 hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-lift sm:block">
              <p className="text-xs font-medium text-stone-500">Garage in Sellwood</p>
              <p className="mt-0.5 text-lg font-bold text-stone-900">
                {formatMoney(289)}<span className="text-sm font-medium text-stone-500">/mo</span>
              </p>
              <p className="text-xs font-semibold text-brand-700">vs. $560 at a storage facility</p>
            </div>
          </div>
        </div>
        <div className={cx(ui.container, 'pb-14')}>
          <HeroSearch />
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-stone-600">Popular:</span>
            {neighborhoods.slice(0, 6).map((n) =>
            <Link
              key={n}
              to={`/s?location=${encodeURIComponent(n)}`}
              className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-700 transition-colors hover:border-brand-500 hover:text-brand-700">
              
                {n}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Size guide */}
      <section className="py-20" aria-labelledby="size-guide">
        <div className={ui.container}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={ui.eyebrow}>Size guide</p>
              <h2 id="size-guide" className="mt-2 text-3xl font-bold tracking-tight text-stone-900">How much space do you need?</h2>
            </div>
            <Link to="/s" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
              See all spaces <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sizeGuide.map((s) => {
              const Icon = sizeIcons[s.id];
              return (
                <Link
                  key={s.id}
                  to={`/s?type=${s.query}`}
                  className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300">
                  
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-sand-100 text-sand-700 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-stone-900">{s.title}</h3>
                  <p className="text-sm font-medium text-brand-700">{s.range}</p>
                  <p className="mt-2 flex-1 text-sm text-stone-600">{s.fits}</p>
                  <p className="mt-5 border-t border-stone-100 pt-4 text-sm text-stone-600">
                    From <span className="font-semibold text-stone-900">{formatMoney(s.from)}/mo</span>
                  </p>
                </Link>);

            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-stone-200 bg-stone-50 py-20" aria-labelledby="how-it-works">
        <div className={ui.container}>
          <p className={ui.eyebrow}>How it works</p>
          <h2 id="how-it-works" className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Booked in minutes, moved in this week</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorks.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={step.title} className="relative rounded-2xl bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-stone-500">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-stone-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.text}</p>
                </li>);

            })}
          </ol>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20" aria-labelledby="featured">
        <div className={ui.container}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className={ui.eyebrow}>Featured</p>
              <h2 id="featured" className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Top-rated spaces nearby</h2>
            </div>
            <Link to="/s" className={cx(ui.linkOutline, 'hidden sm:inline-flex')}>Browse all</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((l) =>
            <ListingCard key={l.id} listing={l} />
            )}
          </div>
        </div>
      </section>

      {/* Protection */}
      <section className="pb-20" aria-labelledby="protection">
        <div className={ui.container}>
          <div className="rounded-3xl bg-sand-100 px-6 py-12 sm:px-12">
            <div className="grid gap-10 lg:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-800">{brand.name} Protect</p>
                <h2 id="protection" className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Peace of mind on every booking</h2>
                <p className="mt-3 text-stone-700">Storers and hosts are both covered — no extra paperwork.</p>
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
                {protection.map((p, i) => {
                  const Icon = protectionIcons[i];
                  return (
                    <li key={p.title} className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-stone-900">{p.title}</h3>
                        <p className="mt-1 text-sm text-stone-700">{p.text}</p>
                      </div>
                    </li>);

                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EarningsCalculator />
    </>);

}
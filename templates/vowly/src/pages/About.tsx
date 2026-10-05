import React from "react";
import { HeartIcon, StoreIcon } from "lucide-react";
import { brand } from "../data/brand";
import { images } from "../data/images";
import { aboutStats, aboutValues, howItWorks } from "../data/about";
import { ButtonLink } from "../components/ui/ButtonLink";
import { SectionHeading } from "../components/ui/SectionHeading";

export function About() {
  return (
    <div>
      <section className="bg-blush/40">
        <div className="mx-auto grid max-w-content items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">About {brand.name}</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
              Every love story deserves a <em className="font-medium italic text-primary">wonderful</em> team
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {brand.name} started in 2018 when two newlyweds realized planning a wedding meant 40 browser tabs and a dozen email threads. We built the calm, beautiful directory we wished we'd had.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/search" size="lg">Find vendors</ButtonLink>
              <ButtonLink to="/listings/new" variant="secondary" size="lg">List your business</ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-2xl">
              <img src={images.heroCouple} alt="Couple walking through an olive grove" className="h-full w-full object-cover" />
            </div>
            <div className="mt-12 aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={images.plannerTablescape} alt="Wedding reception tablescape" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="By the numbers" className="border-b border-line bg-surface">
        <dl className="mx-auto grid max-w-content grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {aboutStats.map((s) =>
          <div key={s.label} className="text-center">
              <dd className="font-display text-5xl font-semibold text-primary">{s.value}</dd>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            </div>
          )}
        </dl>
      </section>

      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="What we believe" title="A kinder way to plan" align="center" />
        <ul className="grid gap-6 md:grid-cols-3">
          {aboutValues.map((v, i) =>
          <li key={v.title} className="rounded-3xl border border-line bg-surface p-8">
              <span className="font-display text-4xl font-semibold italic text-gold">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
            </li>
          )}
        </ul>
      </section>

      <section className="bg-blush/40">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How it works" title="Simple for everyone" align="center" />
          <div className="grid gap-6 lg:grid-cols-2">
            {[
            { title: "For couples", icon: HeartIcon, steps: howItWorks.couples },
            { title: "For vendors", icon: StoreIcon, steps: howItWorks.vendors }].
            map((group) =>
            <div key={group.title} className="rounded-3xl border border-line bg-surface p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-primary">
                    <group.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-3xl font-semibold text-ink">{group.title}</h3>
                </div>
                <ol className="mt-6 space-y-5">
                  {group.steps.map((step, i) =>
                <li key={step.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/60 font-display text-sm font-semibold text-gold-dark">{i + 1}</span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{step.title}</p>
                        <p className="mt-0.5 text-sm text-muted">{step.description}</p>
                      </div>
                    </li>
                )}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>);

}
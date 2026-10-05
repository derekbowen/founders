import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarCheckIcon, InboxIcon, UsersIcon, WalletIcon, BoxIcon } from "lucide-react";
import { planningTools } from "../../data/planningTools";
import { images } from "../../data/images";
const icons: Record<string, BoxIcon> = {
  availability: CalendarCheckIcon,
  inbox: InboxIcon,
  guests: UsersIcon,
  budget: WalletIcon
};
export function PlanningTools() {
  return <section aria-labelledby="tools-title" className="bg-blush/50">
      <div className="mx-auto grid max-w-content gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-24">
        <div className="lg:col-span-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Planning tools</p>
          <h2 id="tools-title" className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            Planning, made a little more lovely
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Simple tools that keep every vendor conversation, date and budget in one calm place.
          </p>
          <div className="mt-8 hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            <img src={images.stationery} alt="Wedding invitation suite and planner on a linen table" className="h-full w-full object-cover" />
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {planningTools.map((tool) => {
          const Icon = icons[tool.id];
          return <li key={tool.id}>
                <Link to={tool.to} className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush text-primary">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{tool.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {tool.cta}
                    <ArrowRightIcon aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>;
        })}
        </ul>
      </div>
    </section>;
}
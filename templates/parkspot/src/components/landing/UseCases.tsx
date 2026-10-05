import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BriefcaseIcon, CalendarDaysIcon, PlaneIcon, TicketIcon } from 'lucide-react';
import { useCaseCards, type UseCaseIcon } from '../../data/landing';

const icons: Record<UseCaseIcon, React.ReactNode> = {
  briefcase: <BriefcaseIcon size={22} aria-hidden />,
  ticket: <TicketIcon size={22} aria-hidden />,
  plane: <PlaneIcon size={22} aria-hidden />,
  calendar: <CalendarDaysIcon size={22} aria-hidden />
};

export function UseCases() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="use-cases-heading">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted">Parking for every plan</p>
        <h2 id="use-cases-heading" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Wherever the day takes you
        </h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {useCaseCards.map((u) =>
        <Link
          key={u.id}
          to={`/s?useCase=${u.id}`}
          className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
              {icons[u.icon]}
            </span>
            <h3 className="mt-5 text-lg font-semibold">{u.title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-muted">{u.description}</p>
            <p className="mt-5 flex items-center justify-between text-sm font-semibold">
              {u.fromPrice}
              <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </p>
          </Link>
        )}
      </div>
    </section>);

}
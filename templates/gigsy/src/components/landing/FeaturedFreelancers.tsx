import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BadgeCheckIcon, BriefcaseIcon } from 'lucide-react';
import { listings } from '../../data/listings';
import { Avatar } from '../Avatar';
import { StarRating } from '../ui/StarRating';
import { formatMoney } from '../../utils/format';
import { getUser } from '../../utils/lookup';

export function FeaturedFreelancers() {
  const featured = listings.filter((l) => l.featured);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="featured-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Featured freelancers</h2>
          <p className="mt-2 text-slate-600">Top-rated specialists, hand-picked by our team this month.</p>
        </div>
        <Link to="/s?sort=rating" className="hidden items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 sm:inline-flex">
          View all <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((listing) => {
          const f = getUser(listing.freelancerId);
          if (!f) return null;
          return (
            <li key={listing.id}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card">
                <div className="flex items-start gap-4">
                  <Avatar name={f.name} alt="" src={f.avatar} size="lg" />
                  <div className="min-w-0 flex-1">
                    <h3 className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Link to={`/u/${f.id}`} className="after:absolute after:inset-0 focus:outline-none">{f.name}</Link>
                      {f.verified && <BadgeCheckIcon className="h-4 w-4 text-primary-600" aria-label="Verified" />}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">{f.headline}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <StarRating rating={f.rating} count={f.reviewCount} />
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <BriefcaseIcon className="h-3.5 w-3.5" aria-hidden="true" /> {f.completedJobs} jobs
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-2.5">
                  <img src={listing.cover} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{listing.title}</p>
                    <p className="text-xs text-slate-500">From <span className="font-semibold text-slate-900">{formatMoney(listing.startingPrice)}</span></p>
                  </div>
                </div>
              </article>
            </li>);

        })}
      </ul>
    </section>);

}
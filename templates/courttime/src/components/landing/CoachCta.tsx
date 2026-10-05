import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { images } from '../../data/images';
import { coachPerks } from '../../data/landing';

export function CoachCta() {
  return (
    <section className="container-page pb-20" aria-labelledby="coach-heading">
      <div className="grid overflow-hidden rounded-3xl bg-brand md:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">For coaches, clubs & court owners</p>
          <h2 id="coach-heading" className="heading-lg mt-3 text-white">Turn empty hours into game time</h2>
          <ul className="mt-6 space-y-3">
            {coachPerks.map((perk) =>
            <li key={perk} className="flex gap-3 text-white/90">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-ink">
                  <CheckIcon size={13} strokeWidth={3} aria-hidden="true" />
                </span>
                {perk}
              </li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/create-listing" className="btn btn-accent btn-lg">List your court</Link>
            <Link to="/about" className="btn btn-lg border border-white/40 text-white hover:bg-white/10">How hosting works</Link>
          </div>
        </div>
        <img src={images.coach} alt="A coach giving a tennis lesson on a hard court" className="h-64 w-full object-cover md:h-full" loading="lazy" />
      </div>
    </section>);

}
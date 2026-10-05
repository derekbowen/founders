import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { lenderPerks } from '../../data/content';
import { btn } from '../../utils/styles';

export function LenderCta() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="aspect-[4/3] lg:aspect-auto">
          <img
            src={brand.images.lender}
            alt="Rail of designer evening dresses in a minimalist closet"
            loading="lazy"
            className="h-full w-full object-cover" />
          
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:px-14 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">
            For lenders
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Your closet could be <em className="text-accent">earning</em> while you sleep.
          </h2>
          <p className="mt-5 max-w-md text-paper/75">
            Top Dressly lenders earn $600+ a month from dresses they’ve already worn. List in minutes.
          </p>
          <ul className="mt-8 space-y-3">
            {lenderPerks.map((p) =>
            <li key={p} className="flex items-start gap-3 text-sm text-paper/90">
                <CheckIcon size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                {p}
              </li>
            )}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/l/new" className={btn('light', 'lg')}>
              Lend your wardrobe
            </Link>
            <Link to="/closet/u3" className="text-sm text-paper/80 underline underline-offset-4 hover:text-paper">
              See a top lender’s closet
            </Link>
          </div>
        </div>
      </div>
    </section>);

}
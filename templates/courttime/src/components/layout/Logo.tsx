import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} home`}
      className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
      
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand">
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" className="fill-accent" />
          <path d="M5.2 6.5c3 2.2 3 8.8 0 11" className="stroke-brand" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M18.8 6.5c-3 2.2-3 8.8 0 11" className="stroke-brand" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </span>
      <span className={`font-display text-2xl font-extrabold uppercase italic tracking-tight ${inverted ? 'text-white' : 'text-ink'}`}>
        {brand.name}
      </span>
    </Link>);

}
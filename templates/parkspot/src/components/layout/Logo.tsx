import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

export function Logo({ tone = 'light' }: {tone?: 'light' | 'dark';}) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`${brand.name} home`}>
      
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-lg font-bold text-ink">P</span>
      <span className={`text-lg font-bold tracking-tight ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
        {brand.name}
      </span>
    </Link>);

}
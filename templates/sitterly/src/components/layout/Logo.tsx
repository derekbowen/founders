import React from 'react';
import { Link } from 'react-router-dom';
import { MoonStarIcon } from 'lucide-react';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400" aria-label={`${brand.name} home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
        <MoonStarIcon className="h-5 w-5" aria-hidden />
      </span>
      <span className={`font-heading text-xl font-bold tracking-tight ${inverted ? 'text-white' : 'text-ink-900'}`}>{brand.name}</span>
    </Link>);

}
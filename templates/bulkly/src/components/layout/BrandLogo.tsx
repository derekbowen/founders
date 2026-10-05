import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

export function BrandLogo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label={`${brand.name} home`}>
      <span className="grid h-8 w-8 grid-cols-2 gap-0.5 rounded-lg bg-primary-700 p-1.5" aria-hidden="true">
        <span className="rounded-[2px] bg-accent-400" />
        <span className="rounded-[2px] bg-white/90" />
        <span className="rounded-[2px] bg-white/90" />
        <span className="rounded-[2px] bg-accent-400" />
      </span>
      <span className={`text-lg font-bold tracking-tight ${inverted ? 'text-white' : 'text-primary-900'}`}>{brand.name}</span>
    </Link>);

}
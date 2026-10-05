import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
      aria-label={`${brand.name} home`}>
      
      <span
        aria-hidden="true"
        className={`grid h-8 w-8 place-items-center rounded-lg ${inverted ? 'bg-white' : 'bg-brand-600'}`}>
        
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M4 10.5 12 5l8 5.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z"
            className={inverted ? 'fill-brand-700' : 'fill-white'} />
          
          <rect x="8" y="12.5" width="8" height="2" rx="0.5" className="fill-sand-400" />
          <rect x="8" y="15.5" width="8" height="2" rx="0.5" className="fill-sand-400" />
        </svg>
      </span>
      <span className={`text-lg font-bold tracking-tight ${inverted ? 'text-white' : 'text-stone-900'}`}>
        {brand.name}
      </span>
    </Link>);

}
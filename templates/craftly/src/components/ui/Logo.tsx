import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-md" aria-label={`${brand.name} home`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <circle cx="16" cy="16" r="15" className="fill-primary" />
        <path
          d="M21.5 11.2a7 7 0 1 0 0 9.6"
          fill="none"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round" />
        
        <circle cx="22" cy="16" r="1.8" fill="white" />
      </svg>
      <span className={`font-heading text-2xl font-semibold tracking-tight ${inverted ? 'text-canvas' : 'text-ink'}`}>
        {brand.name}
      </span>
    </Link>);

}
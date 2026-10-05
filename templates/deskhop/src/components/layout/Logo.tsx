import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link
      to="/"
      className="focus-ring flex shrink-0 items-center gap-2 rounded-lg"
      aria-label={`${brand.name} home`}>
      
      <span
        aria-hidden="true"
        className={`relative grid h-8 w-8 place-items-center rounded-lg ${inverted ? 'bg-white' : 'bg-brand-700'}`}>
        
        <span className={`absolute left-[7px] top-[7px] h-2.5 w-2.5 rounded-[3px] ${inverted ? 'bg-brand-700' : 'bg-white'}`} />
        <span className={`absolute bottom-[7px] right-[7px] h-3.5 w-3.5 rounded-[4px] ${inverted ? 'bg-brand-500' : 'bg-brand-200'}`} />
      </span>
      <span className={`font-display text-lg font-semibold tracking-tight ${inverted ? 'text-white' : 'text-ink'}`}>
        {brand.name}
      </span>
    </Link>);

}
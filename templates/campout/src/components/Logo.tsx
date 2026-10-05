import React from 'react';
import { Link } from 'react-router-dom';
import { TentTreeIcon } from 'lucide-react';
import { brand } from '../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2" aria-label={`${brand.name} home`}>
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
        inverted ? 'bg-white text-primary-800' : 'bg-primary-700 text-white group-hover:bg-primary-800'}`
        }>
        
        <TentTreeIcon size={20} aria-hidden="true" />
      </span>
      <span className={`font-serif text-xl font-extrabold tracking-tight ${inverted ? 'text-white' : 'text-primary-800'}`}>
        {brand.name}
      </span>
    </Link>);

}
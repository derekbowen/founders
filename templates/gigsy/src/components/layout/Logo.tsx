import React from 'react';
import { Link } from 'react-router-dom';
import { ZapIcon } from 'lucide-react';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label={`${brand.name} home`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white transition-transform group-hover:-rotate-6">
        <ZapIcon className="h-4 w-4 fill-accent-300 text-accent-300" aria-hidden="true" />
      </span>
      <span className={`text-lg font-extrabold tracking-tight ${inverted ? 'text-white' : 'text-slate-900'}`}>{brand.name}</span>
    </Link>);

}
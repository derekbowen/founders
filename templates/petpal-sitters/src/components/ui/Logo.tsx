import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrintIcon } from 'lucide-react';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200" aria-label={`${brand.name} home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-500 text-stone-900">
        <PawPrintIcon className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className={`text-xl font-black tracking-tight ${inverted ? 'text-white' : 'text-stone-900'}`}>{brand.name}</span>
    </Link>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCapIcon } from 'lucide-react';
import { brand } from '../../data/brand';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      aria-label={`${brand.name} home`}>
      
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white transition-transform group-hover:-rotate-6">
        <GraduationCapIcon size={20} aria-hidden="true" />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-accent-400" />
      </span>
      <span className={`text-xl font-semibold tracking-tight ${inverted ? 'text-white' : 'text-ink-900'}`}>
        {brand.name}
      </span>
    </Link>);

}
import React from 'react';
import { Link } from 'react-router-dom';
import { HammerIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { cn } from '../../utils/styles';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      aria-label={`${brand.name} home`}>
      
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
        <HammerIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className={cn('text-lg font-extrabold tracking-tight', inverted ? 'text-white' : 'text-ink-900')}>
        {brand.name}
      </span>
    </Link>);

}
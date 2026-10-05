import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { brand } from '../../data/brand';

interface LogoProps {
  inverted?: boolean;
  className?: string;
}

export function Logo({ inverted = false, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={twMerge('inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500', className)}
      aria-label={`${brand.name} home`}>
      
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
        <CompassIcon className="h-5 w-5" aria-hidden />
      </span>
      <span className={twMerge('font-display text-xl font-bold tracking-tight', inverted ? 'text-white' : 'text-slate-900')}>
        {brand.name}
      </span>
    </Link>);

}
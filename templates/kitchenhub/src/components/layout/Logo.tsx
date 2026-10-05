import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHatIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { cn, focusRing } from '../../utils/styles';

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className={cn('flex shrink-0 items-center gap-2 rounded-lg', focusRing)} aria-label={`${brand.name} home`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
        <ChefHatIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className={cn('font-heading text-xl font-bold uppercase tracking-wide', inverted ? 'text-white' : 'text-steel-900')}>
        {brand.name}
      </span>
    </Link>);

}
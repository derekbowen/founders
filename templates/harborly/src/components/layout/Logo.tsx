import React from 'react';
import { Link } from 'react-router-dom';
import { AnchorIcon } from 'lucide-react';
import { brand } from '../../data/brand';
import { cn } from '../../utils/ui';

export function Logo({ inverted, className }: {inverted?: boolean;className?: string;}) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral', className)} aria-label={`${brand.name} home`}>
      <span className={cn('flex h-8 w-8 items-center justify-center rounded-full', inverted ? 'bg-white/10' : 'bg-navy')}>
        <AnchorIcon className="h-4 w-4 text-coral" aria-hidden="true" />
      </span>
      <span className={cn('font-heading text-[22px] font-semibold tracking-tight', inverted ? 'text-white' : 'text-navy')}>{brand.name}</span>
    </Link>);

}
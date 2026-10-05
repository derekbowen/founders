import React from 'react';
import { cn } from '../../utils/ui';

const tones = ['bg-navy text-white', 'bg-sea text-white', 'bg-coral-dark text-white', 'bg-sand text-navy', 'bg-navy-soft text-white'];
const sizes = { xs: 'h-7 w-7 text-[11px]', sm: 'h-9 w-9 text-xs', md: 'h-12 w-12 text-sm', lg: 'h-20 w-20 text-xl', xl: 'h-28 w-28 text-3xl' };

interface AvatarProps {
  initials: string;
  seed?: string;
  size?: keyof typeof sizes;
  className?: string;
}

export function Avatar({ initials, seed = initials, size = 'sm', className }: AvatarProps) {
  const hash = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold', tones[hash % tones.length], sizes[size], className)}>
      
      {initials}
    </span>);

}
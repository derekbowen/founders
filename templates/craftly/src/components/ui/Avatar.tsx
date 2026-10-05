import React from 'react';
import { initials } from '../../utils/format';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-24 w-24 text-2xl'
};

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  if (src) {
    return <img src={src} alt={name} className={`${sizes[size]} shrink-0 rounded-full object-cover ring-2 ring-surface`} />;
  }
  return (
    <span
      className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent-ink ring-2 ring-surface`}
      aria-label={name}>
      
      {initials(name)}
    </span>);

}
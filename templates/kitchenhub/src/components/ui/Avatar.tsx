import React from 'react';
import { initials } from '../../utils/format';
import { cn } from '../../utils/styles';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const sizes: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-28 w-28 text-3xl'
};

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-steel-200 font-semibold text-steel-700', sizes[size], className)}>
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : <span aria-hidden="true">{initials(name)}</span>}
      {!src && <span className="sr-only">{name}</span>}
    </span>);

}
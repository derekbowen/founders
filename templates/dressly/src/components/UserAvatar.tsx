import React from 'react';
import type { User } from '../types/marketplace';
import { cx } from '../utils/styles';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-24 w-24 text-2xl'
};

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  return (
    <span
      role="img"
      aria-label={user.name}
      style={{ backgroundColor: user.avatarColor }}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full font-display font-medium text-white',
        sizeMap[size],
        className
      )}>
      
      {user.initials}
    </span>);

}
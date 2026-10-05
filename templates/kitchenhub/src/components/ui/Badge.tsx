import React from 'react';
import { cn } from '../../utils/styles';

export type BadgeTone = 'neutral' | 'primary' | 'accent' | 'warning' | 'info' | 'dark' | 'white';

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-steel-100 text-steel-700',
  primary: 'bg-primary-soft text-primary',
  accent: 'bg-accent-soft text-accent',
  warning: 'bg-amber-50 text-amber-800',
  info: 'bg-sky-50 text-sky-800',
  dark: 'bg-steel-900 text-white',
  white: 'bg-white/95 text-steel-900 shadow-sm'
};

interface BadgeProps {
  tone?: BadgeTone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', icon, children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone], className)}>
      {icon}
      {children}
    </span>);

}
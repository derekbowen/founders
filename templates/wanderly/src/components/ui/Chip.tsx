import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: React.ReactNode;
}

export function Chip({ selected = false, icon, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={twMerge(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        selected ?
        'border-accent-700 bg-accent-700 text-white' :
        'border-slate-300 bg-white text-slate-700 hover:border-slate-500 hover:text-slate-900',
        className
      )}
      {...rest}>
      
      {icon}
      {children}
    </button>);

}
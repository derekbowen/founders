import React from 'react';
import { cx } from '../../utils/styles';

interface ChipToggleProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ChipToggle({ active, onClick, children, className }: ChipToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark',
        active ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink hover:border-ink',
        className
      )}>
      
      {children}
    </button>);

}
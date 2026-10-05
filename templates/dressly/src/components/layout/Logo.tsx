import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';
import { cx } from '../../utils/styles';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export function Logo({ className, inverted }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} home`}
      className={cx(
        'font-display text-2xl font-medium italic tracking-tight transition-opacity hover:opacity-70',
        inverted ? 'text-paper' : 'text-ink',
        className
      )}>
      
      {brand.name}
      <span className="text-accent">.</span>
    </Link>);

}
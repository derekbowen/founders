import React from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';

interface LogoProps {
  inverted?: boolean;
  onClick?: () => void;
}

export function Logo({ inverted = false, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${brand.name} home`}
      className={`inline-flex items-center gap-2 rounded-lg font-display text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
      inverted ? 'text-white' : 'text-ink'}`
      }>
      
      <span
        aria-hidden="true"
        className={`grid h-8 w-8 place-items-center rounded-lg border bg-brand text-base text-ink ${
        inverted ? 'border-white' : 'border-ink shadow-pop-sm'}`
        }>
        
        {brand.name.charAt(0)}
      </span>
      {brand.name}
    </Link>);

}
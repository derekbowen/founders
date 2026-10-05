import React from 'react';
import { Link } from 'react-router-dom';
import { HouseIcon } from 'lucide-react';
import { brand } from '../../data/brand';

interface LogoProps {
  tone?: 'dark' | 'light';
}

export function Logo({ tone = 'dark' }: LogoProps) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
      aria-label={`${brand.name} home`}>
      
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-400 text-navy-900 transition group-hover:rotate-[-6deg]">
        <HouseIcon size={18} strokeWidth={2.5} />
      </span>
      <span
        className={`text-xl font-bold tracking-tight ${tone === 'dark' ? 'text-navy-900' : 'text-white'}`}>
        
        {brand.name}
      </span>
    </Link>);

}
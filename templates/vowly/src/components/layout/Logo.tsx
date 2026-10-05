import React from "react";
import { Link } from "react-router-dom";
import { brand } from "../../data/brand";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className = "", onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      aria-label={`${brand.name} home`}>
      
      <svg aria-hidden="true" viewBox="0 0 32 24" className="h-6 w-8 text-gold">
        <circle cx="11" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="21" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="font-display text-[28px] font-semibold leading-none tracking-tight text-ink">
        {brand.name}
      </span>
    </Link>);

}
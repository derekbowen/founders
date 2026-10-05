import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  linkTo?: string;
  linkLabel?: string;
}

export function SectionHeader({ eyebrow, title, linkTo, linkLabel }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      </div>
      {linkTo &&
      <Link to={linkTo} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800">
          {linkLabel}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      }
    </div>);

}
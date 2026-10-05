import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkTo?: string;
}

export function SectionHeading({ eyebrow, title, description, linkLabel, linkTo }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">{eyebrow}</p>}
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      </div>
      {linkLabel && linkTo &&
      <Link
        to={linkTo}
        className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900">
        
          {linkLabel}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      }
    </div>);

}
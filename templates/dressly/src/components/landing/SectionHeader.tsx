import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { eyebrow } from '../../utils/styles';

interface SectionHeaderProps {
  kicker: string;
  title: React.ReactNode;
  linkLabel?: string;
  linkTo?: string;
}

export function SectionHeader({ kicker, title, linkLabel, linkTo }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-10">
      <div>
        <p className={eyebrow}>{kicker}</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-5xl">{title}</h2>
      </div>
      {linkLabel && linkTo &&
      <Link
        to={linkTo}
        className="group inline-flex items-center gap-2 self-start border-b border-ink pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-accent-dark hover:text-accent-dark sm:self-auto">
        
          {linkLabel}
          <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      }
    </div>);

}
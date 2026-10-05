import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actionTo?: string;
  actionLabel?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, actionTo, actionLabel = 'See all' }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {actionTo &&
      <Link to={actionTo} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-ink">
          {actionLabel}
          <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      }
    </div>);

}
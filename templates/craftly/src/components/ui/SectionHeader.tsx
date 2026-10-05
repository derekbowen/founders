import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: {to: string;label: string;};
}

export function SectionHeader({ eyebrow, title, description, link }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">{title}</h2>
        {description && <p className="mt-2 text-base text-muted">{description}</p>}
      </div>
      {link &&
      <Link to={link.to} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary-ink hover:text-primary">
          {link.label}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      }
    </div>);

}
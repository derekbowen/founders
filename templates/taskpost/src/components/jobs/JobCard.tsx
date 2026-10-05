import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, MessageSquareIcon } from 'lucide-react';
import { CategoryIcon } from '../ui/CategoryIcon';
import { categories } from '../../data/categories';
import type { Job } from '../../types/marketplace';
import { formatBudget, formatDate, pluralize, timeAgo } from '../../utils/format';
import { cn } from '../../utils/styles';

interface JobCardProps {
  job: Job;
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
}

export function JobCard({ job, highlighted, onHover }: JobCardProps) {
  const category = categories.find((c) => c.id === job.categoryId);
  return (
    <Link
      to={`/jobs/${job.id}`}
      onMouseEnter={() => onHover?.(job.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(job.id)}
      onBlur={() => onHover?.(null)}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        highlighted ? 'border-primary-400 ring-2 ring-primary-200' : 'border-ink-200'
      )}>
      
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        {job.photos[0] ?
        <img
          src={job.photos[0]}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy" /> :


        <div className="flex h-full items-center justify-center text-ink-400">
            <CategoryIcon id={job.categoryId} className="h-10 w-10" />
          </div>
        }
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink-800 shadow-sm">
          <CategoryIcon id={job.categoryId} className="h-3.5 w-3.5 text-primary-600" />
          {category?.name}
        </span>
        {job.timing === 'asap' &&
        <span className="absolute right-3 top-3 rounded-full bg-ink-900 px-2.5 py-1 text-xs font-bold text-white">
            Urgent
          </span>
        }
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-lg font-extrabold text-ink-900">{formatBudget(job.budgetMin, job.budgetMax)}</p>
          <p className="shrink-0 text-xs text-ink-500">{timeAgo(job.postedAt)}</p>
        </div>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-ink-900 group-hover:text-primary-700">
          {job.title}
        </h3>
        <div className="mb-4 mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-ink-600">
          <span className="inline-flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {job.area} · {job.distanceMi} mi
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {job.timing === 'asap' ? 'ASAP' : formatDate(job.preferredDate, 'MMM d')}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-3">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-bold',
              job.offerCount === 0 ? 'text-emerald-700' : 'text-ink-700'
            )}>
            
            <MessageSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {job.offerCount === 0 ? 'Be the first to offer' : pluralize(job.offerCount, 'offer')}
          </span>
          <span className="text-xs font-bold capitalize text-ink-500">{job.size} job</span>
        </div>
      </div>
    </Link>);

}
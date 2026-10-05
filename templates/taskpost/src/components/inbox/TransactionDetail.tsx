import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, BadgeCheckIcon, CalendarIcon, DollarSignIcon, MapPinIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { ActionPanel } from './ActionPanel';
import { ActivityFeed } from './ActivityFeed';
import { MessageComposer } from './MessageComposer';
import { Timeline } from './Timeline';
import { StarRating } from '../ui/StarRating';
import { StatusBadge } from '../ui/StatusBadge';
import { useApp } from '../../hooks/useApp';
import type { Transaction } from '../../types/marketplace';
import { formatBudget, formatDate } from '../../utils/format';
import { viewerRole } from '../../utils/transactions';

export function TransactionDetail({ tx, tab }: {tx: Transaction;tab: 'jobs' | 'offers';}) {
  const { user, getUser, getJob } = useApp();
  const role = viewerRole(tx, user?.id ?? '');
  const other = getUser(role === 'customer' ? tx.proId : tx.customerId);
  const job = getJob(tx.jobId);
  if (!other || !job) return null;
  const otherFirst = other.name.split(' ')[0];

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-start gap-3 border-b border-ink-200 bg-white px-4 py-4 sm:px-6">
        <Link
          to={`/inbox?tab=${tab}`}
          className="-ml-1 mt-1 rounded-lg p-1.5 text-ink-600 hover:bg-ink-100 lg:hidden"
          aria-label="Back to inbox">
          
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={tx.status} />
            <span className="text-xs font-bold uppercase tracking-wide text-ink-500">
              {role === 'customer' ? 'Your job' : 'Your offer'}
            </span>
          </div>
          <Link to={`/jobs/${job.id}`} className="mt-1 block truncate text-lg font-extrabold text-ink-900 hover:text-primary-700">
            {job.title}
          </Link>
          <p className="text-sm text-ink-600">
            with{' '}
            <Link to={`/profile/${other.id}`} className="font-bold text-ink-800 hover:underline">
              {other.name}
            </Link>
          </p>
        </div>
      </header>

      <div className="grid flex-1 gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="xl:hidden">
          <ActionPanel tx={tx} />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <ActivityFeed tx={tx} />
          <MessageComposer txId={tx.id} otherName={otherFirst} />
        </div>
        <aside className="space-y-4">
          <div className="hidden xl:block">
            <ActionPanel tx={tx} />
          </div>
          <Link
            to={`/profile/${other.id}`}
            className="flex items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 transition-colors hover:border-ink-300">
            
            <Avatar name={other.name} alt={other.name} size="md" />
            <div className="min-w-0">
              <p className="flex items-center gap-1 truncate text-sm font-extrabold text-ink-900">
                {other.name}
                {other.verified && <BadgeCheckIcon className="h-4 w-4 text-primary-600" aria-label="Verified" />}
              </p>
              {other.rating !== undefined && <StarRating rating={other.rating} count={other.reviewCount} />}
              {other.completedJobs !== undefined &&
              <p className="text-xs text-ink-500">{other.completedJobs} jobs completed</p>
              }
            </div>
          </Link>
          <section aria-label="Job summary" className="rounded-2xl border border-ink-200 bg-white p-4">
            <div className="flex gap-3">
              {job.photos[0] && <img src={job.photos[0]} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />}
              <p className="line-clamp-2 text-sm font-bold text-ink-900">{job.title}</p>
            </div>
            <dl className="mt-3 space-y-1.5 text-sm text-ink-700">
              <div className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                <dt className="sr-only">Budget</dt>
                <dd>Budget {formatBudget(job.budgetMin, job.budgetMax)}</dd>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                <dt className="sr-only">Preferred date</dt>
                <dd>Preferred {formatDate(job.preferredDate, 'MMM d')}</dd>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-ink-400" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd>{job.area}</dd>
              </div>
            </dl>
          </section>
          <Timeline tx={tx} />
        </aside>
      </div>
    </div>);

}
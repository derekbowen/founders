import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { JobCard } from '../jobs/JobCard';
import { ButtonLink } from '../ui/ButtonLink';
import { useApp } from '../../hooks/useApp';

export function RecentJobs() {
  const { jobs } = useApp();
  const recent = jobs.
  filter((j) => j.status === 'open').
  sort((a, b) => b.postedAt.localeCompare(a.postedAt)).
  slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="recent-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary-700">For pros</p>
          <h2 id="recent-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Fresh jobs near you
          </h2>
        </div>
        <ButtonLink to="/search" variant="secondary" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
          See all open jobs
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recent.map((job) =>
        <JobCard key={job.id} job={job} />
        )}
      </div>
    </section>);

}
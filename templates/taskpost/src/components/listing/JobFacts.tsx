import React from 'react';
import { CalendarIcon, ClockIcon, DollarSignIcon, MapPinIcon, RulerIcon } from 'lucide-react';
import { jobSizes, timeOfDayOptions, timingOptions } from '../../data/categories';
import type { Job } from '../../types/marketplace';
import { formatBudget, formatDate } from '../../utils/format';

export function JobFacts({ job }: {job: Job;}) {
  const timing = timingOptions.find((t) => t.id === job.timing);
  const tod = timeOfDayOptions.find((t) => t.id === job.timeOfDay);
  const size = jobSizes.find((s) => s.id === job.size);

  const facts = [
  { icon: DollarSignIcon, label: 'Budget', value: formatBudget(job.budgetMin, job.budgetMax) },
  {
    icon: CalendarIcon,
    label: 'Preferred date',
    value: job.timing === 'asap' ? 'As soon as possible' : formatDate(job.preferredDate, 'EEE, MMM d')
  },
  { icon: ClockIcon, label: 'Timing', value: `${timing?.label ?? ''} · ${tod?.label ?? ''}` },
  { icon: RulerIcon, label: 'Job size', value: `${size?.label} · ${size?.description}` },
  { icon: MapPinIcon, label: 'Location', value: `${job.area}, ${job.city}` }];


  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map(({ icon: Icon, label, value }) =>
      <div key={label} className="flex items-start gap-3 bg-white p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">{label}</dt>
            <dd className="mt-0.5 text-sm font-bold text-ink-900">{value}</dd>
          </div>
        </div>
      )}
    </dl>);

}
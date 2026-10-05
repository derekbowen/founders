import React from 'react';
import { AccessibilityIcon, ClockIcon, LanguagesIcon, UsersIcon } from 'lucide-react';
import type { Experience } from '../../types/marketplace';
import { formatDuration } from '../../utils/format';

export function ListingFacts({ experience }: {experience: Experience;}) {
  const facts = [
  { icon: ClockIcon, label: 'Duration', value: formatDuration(experience.durationHours) },
  { icon: UsersIcon, label: 'Group size', value: `Up to ${experience.maxGuests} guests` },
  { icon: LanguagesIcon, label: 'Languages', value: experience.languages.join(', ') },
  {
    icon: AccessibilityIcon,
    label: 'Accessibility',
    value: experience.wheelchairAccessible ? 'Wheelchair accessible' : 'Not wheelchair accessible'
  }];

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {facts.map(({ icon: Icon, label, value }) =>
      <div key={label} className="rounded-2xl border border-slate-200 p-4">
          <Icon className="h-5 w-5 text-primary-600" aria-hidden />
          <dt className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">{label}</dt>
          <dd className="mt-0.5 text-sm font-semibold text-slate-900">{value}</dd>
        </div>
      )}
    </dl>);

}
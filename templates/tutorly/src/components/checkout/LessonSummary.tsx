import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon, PackageIcon, VideoIcon, BookOpenIcon } from 'lucide-react';
import { TutorPhoto } from '../tutors/TutorPhoto';
import { RatingStars } from '../tutors/RatingStars';
import { fromDateKey } from '../../utils/availability';
import { formatHourRange, formatMoney, pluralize } from '../../utils/format';
import { getSubjectName } from '../../utils/tutors';
import type { PriceBreakdown } from '../../utils/pricing';
import type { BookingDraft, Tutor } from '../../types/marketplace';

interface LessonSummaryProps {
  tutor: Tutor;
  draft: BookingDraft;
  price: PriceBreakdown;
}

export function LessonSummary({ tutor, draft, price }: LessonSummaryProps) {
  const rows = [
  { icon: BookOpenIcon, label: getSubjectName(draft.subject) },
  { icon: CalendarIcon, label: format(fromDateKey(draft.dateKey), 'EEEE, MMMM d, yyyy') },
  { icon: ClockIcon, label: `${formatHourRange(draft.startHour, draft.hours)} · ${pluralize(draft.hours, 'hour')}` },
  {
    icon: PackageIcon,
    label:
    draft.packageLessons > 1 ?
    `${draft.packageLessons}-lesson package · first lesson on this date` :
    'Single lesson'
  },
  { icon: VideoIcon, label: 'Online via video classroom' }];


  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-center gap-4">
        <TutorPhoto name={tutor.name} src={tutor.photo} className="h-16 w-16 rounded-2xl" />
        <div>
          <p className="font-semibold text-ink-900">{tutor.name}</p>
          <p className="line-clamp-1 text-sm text-ink-600">{tutor.headline}</p>
          <RatingStars rating={tutor.rating} size={12} showValue reviewCount={tutor.reviewCount} />
        </div>
      </div>
      <ul className="mt-5 space-y-2.5 border-t border-ink-200 pt-5">
        {rows.map((r) =>
        <li key={r.label} className="flex items-center gap-3 text-sm text-ink-700">
            <r.icon size={16} className="shrink-0 text-primary-600" aria-hidden="true" /> {r.label}
          </li>
        )}
      </ul>
      <dl className="mt-5 space-y-2 border-t border-ink-200 pt-5 text-sm">
        <div className="flex justify-between text-ink-700">
          <dt>{formatMoney(price.rate)} × {pluralize(price.hours, 'hour')}{price.lessons > 1 && ` × ${price.lessons}`}</dt>
          <dd>{formatMoney(price.subtotal)}</dd>
        </div>
        {price.discount > 0 &&
        <div className="flex justify-between text-green-700">
            <dt>Package discount ({price.discountPercent}%)</dt>
            <dd>−{formatMoney(price.discount)}</dd>
          </div>
        }
        <div className="flex justify-between text-ink-700">
          <dt>Service fee</dt>
          <dd>{formatMoney(price.serviceFee)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink-200 pt-3 text-base font-semibold text-ink-900">
          <dt>Total (USD)</dt>
          <dd>{formatMoney(price.total)}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-xl bg-primary-50 p-3 text-xs leading-relaxed text-primary-900">
        <strong>First lesson guarantee:</strong> if it's not the right fit, we'll refund your first lesson. Free
        cancellation up to 24 hours before start.
      </p>
    </div>);

}
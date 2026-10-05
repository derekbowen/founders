import React from 'react';
import type { BookingStatus } from '../../types/marketplace';
import { Badge, type BadgeTone } from '../ui/Badge';

export const statusMeta: Record<BookingStatus, {label: string;tone: BadgeTone;dot: string;}> = {
  requested: { label: 'Requested', tone: 'warning', dot: 'bg-amber-500' },
  approved: { label: 'Approved', tone: 'info', dot: 'bg-sky-600' },
  'in-session': { label: 'In session', tone: 'accent', dot: 'bg-accent' },
  completed: { label: 'Completed', tone: 'neutral', dot: 'bg-steel-500' },
  cancelled: { label: 'Cancelled', tone: 'primary', dot: 'bg-primary' }
};

export function StatusBadge({ status }: {status: BookingStatus;}) {
  const meta = statusMeta[status];
  return (
    <Badge tone={meta.tone} icon={<span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />}>
      {meta.label}
    </Badge>);

}
import React from 'react';
import { Badge } from '../Badge';
import type { LessonStatus } from '../../types/marketplace';

const config: Record<LessonStatus, {label: string;variant: 'warning' | 'primary' | 'success' | 'error';className: string;}> = {
  requested: { label: 'Requested', variant: 'warning', className: '!bg-accent-100 !text-accent-900 !border-accent-300' },
  scheduled: { label: 'Scheduled', variant: 'primary', className: '!bg-primary-100 !text-primary-900 !border-primary-200' },
  completed: { label: 'Completed', variant: 'success', className: '!bg-green-100 !text-green-900 !border-green-200' },
  cancelled: { label: 'Cancelled', variant: 'error', className: '!bg-ink-100 !text-ink-700 !border-ink-200' }
};

export const lessonStatusLabels: Record<LessonStatus, string> = {
  requested: 'Requested',
  scheduled: 'Scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export function LessonStatusBadge({ status }: {status: LessonStatus;}) {
  const c = config[status];
  return (
    <Badge variant={c.variant} size="small" className={c.className}>
      {c.label}
    </Badge>);

}
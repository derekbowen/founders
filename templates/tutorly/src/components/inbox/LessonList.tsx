import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { InboxIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { LessonStatusBadge, lessonStatusLabels } from './LessonStatusBadge';
import { EmptyState } from '../common/EmptyState';
import type { Lesson, LessonStatus } from '../../types/marketplace';

interface LessonListProps {
  lessons: Lesson[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  emptyText: string;
}

const statuses: LessonStatus[] = ['requested', 'scheduled', 'completed', 'cancelled'];

export function LessonList({ lessons, selectedId, onSelect, emptyText }: LessonListProps) {
  const [status, setStatus] = useState<LessonStatus | 'all'>('all');
  const filtered = lessons.filter((l) => status === 'all' || l.status === status);

  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-none" role="group" aria-label="Filter by status">
        {(['all', ...statuses] as const).map((s) => {
          const count = s === 'all' ? lessons.length : lessons.filter((l) => l.status === s).length;
          const active = status === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={active}
              onClick={() => setStatus(s)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
              active ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`
              }>
              
              {s === 'all' ? 'All' : lessonStatusLabels[s]} <span className="opacity-70">{count}</span>
            </button>);

        })}
      </div>

      {filtered.length === 0 ?
      <EmptyState icon={InboxIcon} title="Nothing here yet" description={emptyText} /> :

      <ul className="space-y-1.5">
          {filtered.map((l) => {
          const last = l.messages[l.messages.length - 1];
          const selected = l.id === selectedId;
          return (
            <li key={l.id}>
                <button
                type="button"
                onClick={() => onSelect(l.id)}
                aria-current={selected ? 'true' : undefined}
                className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition ${
                selected ? 'border-primary-300 bg-primary-50' : 'border-transparent hover:bg-ink-50'}`
                }>
                
                  <Avatar name={l.counterpartName} alt={l.counterpartName} src={l.counterpartPhoto} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-ink-900">{l.counterpartName}</p>
                      <LessonStatusBadge status={l.status} />
                    </div>
                    <p className="text-xs text-ink-600">
                      {l.subject} · {format(parseISO(l.startsAt), 'EEE, MMM d · h:mm a')}
                    </p>
                    {last &&
                  <p className="mt-1 truncate text-sm text-ink-500">
                        {last.sender === 'me' ? 'You: ' : ''}
                        {last.text}
                      </p>
                  }
                  </div>
                </button>
              </li>);

        })}
        </ul>
      }
    </div>);

}
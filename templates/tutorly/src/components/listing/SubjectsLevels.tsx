import React from 'react';
import { subjects } from '../../data/subjects';
import { getLevelName } from '../../utils/tutors';
import type { TutorSubject } from '../../types/marketplace';

export function SubjectsLevels({ items }: {items: TutorSubject[];}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const subject = subjects.find((s) => s.id === item.subject);
        if (!subject) return null;
        return (
          <li key={item.subject} className="rounded-2xl border border-ink-200 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <subject.icon size={20} aria-hidden="true" />
              </span>
              <p className="font-semibold text-ink-900">{subject.name}</p>
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink-500">Topics</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {item.topics.map((t) =>
              <li key={t} className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-800">{t}</li>
              )}
            </ul>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink-500">Levels</p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {item.levels.map((l) =>
              <li key={l} className="rounded-full border border-ink-200 px-2.5 py-0.5 text-xs text-ink-700">{getLevelName(l)}</li>
              )}
            </ul>
          </li>);

      })}
    </ul>);

}
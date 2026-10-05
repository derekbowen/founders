import React, { useState } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { levels, subjects } from '../../data/subjects';
import { FilterChip } from '../search/FilterSection';
import { toggleValue } from '../../hooks/useSearchFilters';
import type { ListingDraft } from '../../hooks/useListingWizard';
import type { SubjectId, TutorSubject } from '../../types/marketplace';

interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  showErrors: boolean;
}

export function SubjectsStep({ draft, update, showErrors }: StepProps) {
  const [topicInput, setTopicInput] = useState<Record<string, string>>({});

  const toggleSubject = (id: SubjectId) => {
    const exists = draft.subjects.some((s) => s.subject === id);
    update({
      subjects: exists ?
      draft.subjects.filter((s) => s.subject !== id) :
      [...draft.subjects, { subject: id, topics: [], levels: [] }]
    });
  };

  const patchSubject = (id: SubjectId, patch: Partial<TutorSubject>) =>
  update({ subjects: draft.subjects.map((s) => s.subject === id ? { ...s, ...patch } : s) });

  const addTopic = (item: TutorSubject) => {
    const value = (topicInput[item.subject] ?? '').trim();
    if (!value || item.topics.includes(value)) return;
    patchSubject(item.subject, { topics: [...item.topics, value] });
    setTopicInput((t) => ({ ...t, [item.subject]: '' }));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-ink-800">What do you teach?</p>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {subjects.map((s) => {
            const selected = draft.subjects.some((x) => x.subject === s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleSubject(s.id)}
                  className={`relative flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  selected ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' : 'border-ink-200 hover:border-primary-300'}`
                  }>
                  
                  <s.icon size={20} className="text-primary-700" aria-hidden="true" />
                  <span className="text-sm font-medium text-ink-900">{s.name}</span>
                  {selected && <CheckIcon size={16} className="ml-auto text-primary-700" aria-hidden="true" />}
                </button>
              </li>);

          })}
        </ul>
        {showErrors && draft.subjects.length === 0 && <p className="mt-2 text-sm text-red-600">Choose at least one subject.</p>}
      </div>

      {draft.subjects.map((item) => {
        const subject = subjects.find((s) => s.id === item.subject);
        return (
          <div key={item.subject} className="rounded-2xl border border-ink-200 p-4">
            <p className="font-semibold text-ink-900">{subject?.name}</p>
            <p className="mb-2 mt-4 text-sm font-medium text-ink-800">Levels</p>
            <div className="flex flex-wrap gap-1.5">
              {levels.map((l) =>
              <FilterChip
                key={l.id}
                pressed={item.levels.includes(l.id)}
                onClick={() => patchSubject(item.subject, { levels: toggleValue(item.levels, l.id) })}>
                
                  {l.name}
                </FilterChip>
              )}
            </div>
            {showErrors && item.levels.length === 0 && <p className="mt-2 text-sm text-red-600">Pick at least one level.</p>}
            <p className="mb-2 mt-4 text-sm font-medium text-ink-800">Topics <span className="font-normal text-ink-500">(optional)</span></p>
            <div className="flex gap-2">
              <label htmlFor={`topic-${item.subject}`} className="sr-only">Add topic</label>
              <input
                id={`topic-${item.subject}`}
                value={topicInput[item.subject] ?? ''}
                onChange={(e) => setTopicInput((t) => ({ ...t, [item.subject]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTopic(item);
                  }
                }}
                placeholder="e.g. AP Chemistry"
                className="h-10 flex-1 rounded-lg border border-ink-200 px-3 text-sm focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100" />
              
              <button type="button" onClick={() => addTopic(item)} className="rounded-lg border border-ink-200 px-3 text-sm font-medium text-ink-800 hover:bg-ink-50">
                Add
              </button>
            </div>
            {item.topics.length > 0 &&
            <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.topics.map((t) =>
              <li key={t}>
                    <button
                  type="button"
                  onClick={() => patchSubject(item.subject, { topics: item.topics.filter((x) => x !== t) })}
                  className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-800 hover:bg-primary-100"
                  aria-label={`Remove ${t}`}>
                  
                      {t} <XIcon size={12} aria-hidden="true" />
                    </button>
                  </li>
              )}
              </ul>
            }
          </div>);

      })}
    </div>);

}
import React, { useEffect, useState } from 'react';
import { NotebookPenIcon } from 'lucide-react';
import { Button } from '../Button';
import { useToast } from '../ToastProvider';
import { brandButton } from '../../utils/buttonStyles';
import type { Lesson } from '../../types/marketplace';

interface LessonNotesProps {
  lesson: Lesson;
  onSave: (notes: string) => void;
}

export function LessonNotes({ lesson, onSave }: LessonNotesProps) {
  const editable = lesson.role === 'tutor';
  const [draft, setDraft] = useState(lesson.notes);
  const { addToast } = useToast();

  useEffect(() => setDraft(lesson.notes), [lesson.id, lesson.notes]);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-ink-900">
        <NotebookPenIcon size={16} className="text-primary-600" aria-hidden="true" /> Lesson notes
      </h3>
      {editable ?
      <>
          <label htmlFor="lesson-notes" className="sr-only">Lesson notes</label>
          <textarea
          id="lesson-notes"
          rows={5}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share what you covered, homework and what's next. Learners see these notes."
          className="mt-3 w-full rounded-xl border border-ink-200 p-3 text-sm focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100" />
        
          <Button
          size="small"
          className={`mt-2 ${brandButton.primary}`}
          disabled={draft === lesson.notes}
          onClick={() => {
            onSave(draft);
            addToast({ type: 'success', message: 'Lesson notes saved' });
          }}>
          
            Save notes
          </Button>
        </> :
      lesson.notes ?
      <p className="mt-3 whitespace-pre-line rounded-xl bg-accent-50 p-3 text-sm leading-relaxed text-ink-800">{lesson.notes}</p> :

      <p className="mt-3 text-sm text-ink-500">Your tutor's notes and homework will appear here after the lesson.</p>
      }
    </div>);

}
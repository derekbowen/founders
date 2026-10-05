import React from 'react';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { TextField } from '../ui/TextField';
import { TextAreaField } from '../ui/TextAreaField';
import { Button } from '../ui/Button';
import { StepProps } from '../../types/listingWizard';

export function FaqStep({ draft, update, errors }: StepProps) {
  const setItem = (i: number, patch: Partial<{question: string;answer: string;}>) =>
  update({ faq: draft.faq.map((f, j) => j === i ? { ...f, ...patch } : f) });

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Answer the questions clients ask most. Good FAQs reduce back-and-forth before an offer.</p>
      {draft.faq.map((item, i) =>
      <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question {i + 1}</p>
            {draft.faq.length > 1 &&
          <button type="button" onClick={() => update({ faq: draft.faq.filter((_, j) => j !== i) })} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-rose-600" aria-label={`Remove question ${i + 1}`}>
                <Trash2Icon className="h-4 w-4" />
              </button>
          }
          </div>
          <TextField label="Question" placeholder="How many revisions are included?" value={item.question} onChange={(e) => setItem(i, { question: e.target.value })} />
          <TextAreaField className="mt-3" label="Answer" rows={2} value={item.answer} onChange={(e) => setItem(i, { answer: e.target.value })} />
        </div>
      )}
      {errors.faqItems && <p className="text-xs font-medium text-rose-600">{errors.faqItems}</p>}
      {draft.faq.length < 6 &&
      <Button variant="secondary" size="sm" leftIcon={<PlusIcon className="h-4 w-4" aria-hidden="true" />} onClick={() => update({ faq: [...draft.faq, { question: '', answer: '' }] })}>
          Add question
        </Button>
      }
    </div>);

}
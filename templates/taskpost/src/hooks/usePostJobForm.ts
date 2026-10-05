import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { categories } from '../data/categories';
import type { CategoryId, NewJobInput } from '../types/marketplace';
import { now, todayISODate } from '../utils/time';

export type StepId = 'details' | 'category' | 'location' | 'timing' | 'budget' | 'photos';
export type FormErrors = Partial<Record<keyof NewJobInput, string>>;

export const steps: {id: StepId;label: string;description: string;}[] = [
{ id: 'details', label: 'What needs doing', description: 'Title & description' },
{ id: 'category', label: 'Category', description: 'Type & size of job' },
{ id: 'location', label: 'Location', description: 'Neighborhood & access' },
{ id: 'timing', label: 'Date & timing', description: 'When you need it' },
{ id: 'budget', label: 'Budget', description: 'Your price range' },
{ id: 'photos', label: 'Photos', description: 'Help pros quote' }];


function validateStep(step: StepId, f: NewJobInput): FormErrors {
  const e: FormErrors = {};
  if (step === 'details') {
    if (f.title.trim().length < 8) e.title = 'Give your job a short, clear title (8+ characters).';
    if (f.description.trim().length < 30) e.description = 'Describe the job in a bit more detail (30+ characters).';
  }
  if (step === 'location' && !f.area) e.area = 'Choose the neighborhood where the job is.';
  if (step === 'timing' && f.timing !== 'asap') {
    if (!f.preferredDate) e.preferredDate = 'Pick a date.';else
    if (f.preferredDate < todayISODate()) e.preferredDate = 'Date can’t be in the past.';
  }
  if (step === 'budget') {
    if (!f.budgetMin || f.budgetMin < 20) e.budgetMin = 'Minimum budget is $20.';
    if (!f.budgetMax || f.budgetMax < f.budgetMin) e.budgetMax = 'Max must be at least your minimum.';
  }
  return e;
}

export function usePostJobForm(initial: {title?: string;category?: string | null;}) {
  const initialCategory = categories.find((c) => c.id === initial.category)?.id ?? 'handyman';
  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<NewJobInput>({
    title: initial.title ?? '',
    description: '',
    categoryId: initialCategory as CategoryId,
    size: 'small',
    area: '',
    accessNotes: '',
    timing: 'flexible',
    preferredDate: format(addDays(now(), 7), 'yyyy-MM-dd'),
    timeOfDay: 'any',
    budgetMin: categories.find((c) => c.id === initialCategory)?.typicalBudget[0] ?? 100,
    budgetMax: categories.find((c) => c.id === initialCategory)?.typicalBudget[1] ?? 250,
    photos: []
  });

  const step = steps[stepIndex];

  function update(patch: Partial<NewJobInput>) {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((k) => delete next[k as keyof NewJobInput]);
      return next;
    });
  }

  function next(): boolean {
    const e = validateStep(step.id, form);
    setErrors(e);
    if (Object.keys(e).length) return false;
    const n = Math.min(stepIndex + 1, steps.length - 1);
    setStepIndex(n);
    setMaxReached((m) => Math.max(m, n));
    return true;
  }

  function back() {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function goTo(i: number) {
    if (i <= maxReached) {
      setErrors({});
      setStepIndex(i);
    }
  }

  function validateAll(): boolean {
    for (let i = 0; i < steps.length; i++) {
      const e = validateStep(steps[i].id, form);
      if (Object.keys(e).length) {
        setErrors(e);
        setStepIndex(i);
        return false;
      }
    }
    return true;
  }

  return {
    form,
    update,
    errors,
    step,
    stepIndex,
    maxReached,
    next,
    back,
    goTo,
    validateAll,
    isLast: stepIndex === steps.length - 1
  };
}
import { useCallback, useState } from 'react';
import { ListingDraft } from '../types/marketplace';

export const wizardSteps = [
{ id: 'details', label: 'Service details', description: 'Title and description' },
{ id: 'category', label: 'Category & skills', description: 'Help clients find you' },
{ id: 'pricing', label: 'Price & delivery', description: 'Starting price and timing' },
{ id: 'portfolio', label: 'Portfolio', description: 'Show your best work' },
{ id: 'faq', label: 'FAQ', description: 'Answer common questions' }] as
const;

export type DraftErrors = Partial<Record<keyof ListingDraft | 'faqItems', string>>;

const emptyDraft: ListingDraft = {
  title: '',
  summary: '',
  description: '',
  category: '',
  skills: [],
  startingPrice: '',
  deliveryDays: '7',
  revisions: '2',
  portfolio: [],
  faq: [{ question: '', answer: '' }]
};

function validate(step: number, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  if (step === 0) {
    if (d.title.trim().length < 10) e.title = 'Use at least 10 characters so clients understand your service.';
    if (d.summary.trim().length < 20) e.summary = 'Add a one-line summary (20+ characters).';
    if (d.description.trim().length < 80) e.description = 'Describe your process and deliverables (80+ characters).';
  }
  if (step === 1) {
    if (!d.category) e.category = 'Choose a category.';
    if (d.skills.length === 0) e.skills = 'Select at least one skill.';
  }
  if (step === 2) {
    const price = Number(d.startingPrice);
    if (!price || price < 20) e.startingPrice = 'Starting price must be at least $20.';
  }
  if (step === 3) {
    if (d.portfolio.length === 0) e.portfolio = 'Add at least one portfolio image.';
  }
  if (step === 4) {
    const incomplete = d.faq.some((f) => f.question.trim() && !f.answer.trim() || !f.question.trim() && f.answer.trim());
    if (incomplete) e.faqItems = 'Each question needs an answer (or remove the empty row).';
  }
  return e;
}

export function useListingDraft() {
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const update = useCallback((patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((k) => delete next[k as keyof DraftErrors]);
      if ('faq' in patch) delete next.faqItems;
      return next;
    });
  }, []);

  const next = useCallback(() => {
    const e = validate(step, draft);
    setErrors(e);
    if (Object.keys(e).length) return false;
    setCompleted((c) => c.includes(step) ? c : [...c, step]);
    if (step < wizardSteps.length - 1) setStep(step + 1);
    return true;
  }, [step, draft]);

  const back = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const goTo = useCallback(
    (target: number) => {
      if (target <= step || completed.includes(target - 1)) {
        setErrors({});
        setStep(target);
      }
    },
    [step, completed]
  );

  const publish = useCallback(() => {
    const e = validate(step, draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    setPublishing(true);
    window.setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      setCompleted(wizardSteps.map((_, i) => i));
    }, 900);
  }, [step, draft]);

  const reset = useCallback(() => {
    setDraft(emptyDraft);
    setStep(0);
    setCompleted([]);
    setErrors({});
    setPublished(false);
  }, []);

  return { draft, update, step, completed, errors, next, back, goTo, publish, publishing, published, reset };
}
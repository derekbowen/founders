import { useState } from 'react';
import type { DraftErrors, ListingDraft } from '../types/listingDraft';

export const wizardSteps = [
{ id: 'product', title: 'Product', description: 'Name & description' },
{ id: 'category', title: 'Category & values', description: 'Where it’s found' },
{ id: 'pricing', title: 'Case pack & pricing', description: 'Tiers and minimums' },
{ id: 'stock', title: 'Stock & lead time', description: 'Availability' },
{ id: 'shipping', title: 'Shipping', description: 'How cases ship' },
{ id: 'photos', title: 'Photos', description: 'Show it off' }] as
const;

const initialDraft: ListingDraft = {
  title: '',
  description: '',
  sku: '',
  unitDescription: '',
  categoryId: '',
  values: [],
  madeIn: '',
  casePack: '12',
  basePrice: '',
  msrp: '',
  minOrderCases: '1',
  tier2Discount: '5',
  tier3Discount: '10',
  stockCases: '',
  leadTimeMin: '3',
  leadTimeMax: '5',
  shipsFrom: 'Portland, OR',
  shippingProfile: 'free-threshold',
  caseWeight: '',
  caseDimensions: '',
  photos: []
};

function num(v: string) {
  const n = parseFloat(v);
  return Number.isNaN(n) ? null : n;
}

function validateStep(step: number, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  if (step === 0) {
    if (d.title.trim().length < 3) e.title = 'Give your product a name (3+ characters)';
    if (d.description.trim().length < 20) e.description = 'Describe it in at least 20 characters';
    if (!d.unitDescription.trim()) e.unitDescription = 'e.g. “12 oz pouch”';
  }
  if (step === 1) {
    if (!d.categoryId) e.categoryId = 'Choose a category';
    if (!d.madeIn.trim()) e.madeIn = 'Where is it made?';
  }
  if (step === 2) {
    const pack = num(d.casePack);
    const base = num(d.basePrice);
    const msrp = num(d.msrp);
    if (!pack || pack < 1) e.casePack = 'Units per case must be 1 or more';
    if (!base || base <= 0) e.basePrice = 'Enter a wholesale unit price';
    if (!msrp || msrp <= 0) e.msrp = 'Enter the MSRP';
    if (base && msrp && base >= msrp) e.msrp = 'MSRP should be higher than wholesale';
    if (!num(d.minOrderCases) || (num(d.minOrderCases) ?? 0) < 1) e.minOrderCases = 'At least 1 case';
  }
  if (step === 3) {
    if (num(d.stockCases) === null || (num(d.stockCases) ?? 0) < 0) e.stockCases = 'Enter cases on hand';
    if (!num(d.leadTimeMin) || !num(d.leadTimeMax) || (num(d.leadTimeMin) ?? 0) > (num(d.leadTimeMax) ?? 0))
    e.leadTimeMax = 'Enter a valid range in business days';
  }
  if (step === 4) {
    if (!d.shipsFrom.trim()) e.shipsFrom = 'Required';
    if (!num(d.caseWeight)) e.caseWeight = 'Case weight helps estimate shipping';
  }
  if (step === 5) {
    if (d.photos.length === 0) e.photos = 'Add at least one photo';
  }
  return e;
}

export function useListingWizard() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    const keys = Object.keys(patch) as (keyof ListingDraft)[];
    if (keys.some((k) => errors[k])) {
      setErrors((e) => {
        const next = { ...e };
        keys.forEach((k) => delete next[k]);
        return next;
      });
    }
  };

  const next = () => {
    const e = validateStep(step, draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    setCompleted((c) => c.includes(step) ? c : [...c, step]);
    if (step === wizardSteps.length - 1) {
      setPublishing(true);
      window.setTimeout(() => {
        setPublishing(false);
        setPublished(true);
        window.scrollTo(0, 0);
      }, 1000);
      return;
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const goTo = (index: number) => {
    if (index === step) return;
    if (completed.includes(index) || completed.includes(index - 1) || index < step) {
      setErrors({});
      setStep(index);
    }
  };

  const reset = () => {
    setDraft(initialDraft);
    setStep(0);
    setCompleted([]);
    setPublished(false);
  };

  return { step, completed, draft, errors, update, next, back, goTo, published, publishing, reset };
}
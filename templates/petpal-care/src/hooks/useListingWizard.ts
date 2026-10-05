import { useState } from 'react';
import { emptyDraft, wizardSteps } from '../data/wizard';
import type { ListingDraft, WizardStepId } from '../types/wizard';

function validate(step: WizardStepId, d: ListingDraft): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 'about') {
    if (d.title.trim().length < 10) e.title = 'Give your listing a title of at least 10 characters.';
    if (d.bio.trim().length < 40) e.bio = 'Tell owners a bit more about yourself (40+ characters).';
    if (!d.neighborhood.trim()) e.neighborhood = 'Add your neighborhood.';
  }
  if (step === 'services') {
    const enabled = Object.values(d.services).filter((s) => s.enabled);
    if (!enabled.length) e.services = 'Turn on at least one service.';
    if (enabled.some((s) => s.variants.some((v) => !v.price || v.price < 5))) e.services = 'Every enabled option needs a price of at least $5.';
  }
  if (step === 'pets' && !d.acceptedSizes.length && !d.acceptsCats) e.pets = 'Choose at least one dog size or accept cats.';
  if (step === 'photos' && !d.photos.length) e.photos = 'Add at least one photo — listings with photos get 5× more requests.';
  return e;
}

export function useListingWizard() {
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState<WizardStepId[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [published, setPublished] = useState(false);
  const step = wizardSteps[index];

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors({});
  };

  const next = () => {
    const e = validate(step.id, draft);
    setErrors(e);
    if (Object.keys(e).length) return false;
    setCompleted((c) => c.includes(step.id) ? c : [...c, step.id]);
    if (index === wizardSteps.length - 1) setPublished(true);else
    setIndex((i) => i + 1);
    return true;
  };

  const goTo = (i: number) => {
    if (i <= index || completed.includes(wizardSteps[i - 1]?.id)) {
      setErrors({});
      setIndex(i);
    }
  };

  return {
    draft,
    update,
    step,
    index,
    completed,
    errors,
    published,
    next,
    back: () => {
      setErrors({});
      setIndex((i) => Math.max(0, i - 1));
    },
    goTo,
    isLast: index === wizardSteps.length - 1
  };
}
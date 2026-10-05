import { useState } from 'react';
import { wizardSteps } from '../data/listingWizard';
import type { WizardStepId } from '../data/listingWizard';
import type { DayKey, TutorSubject } from '../types/marketplace';

export interface DraftCredential {
  id: string;
  title: string;
  institution: string;
  year: string;
}

export interface DraftPackage {
  lessons: number;
  discountPercent: number;
  enabled: boolean;
}

export interface ListingDraft {
  displayName: string;
  headline: string;
  bio: string;
  country: string;
  languages: string[];
  subjects: TutorSubject[];
  credentials: DraftCredential[];
  backgroundCheck: boolean;
  hourlyRate: number;
  packages: DraftPackage[];
  trialLesson: boolean;
  availability: Record<DayKey, number[]>;
  photoUrl: string | null;
  videoUrl: string;
}

const emptyAvailability: Record<DayKey, number[]> = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };

export function useListingWizard(defaultName: string) {
  const [draft, setDraft] = useState<ListingDraft>({
    displayName: defaultName,
    headline: '',
    bio: '',
    country: 'United States',
    languages: ['English'],
    subjects: [],
    credentials: [{ id: 'c1', title: '', institution: '', year: '' }],
    backgroundCheck: true,
    hourlyRate: 40,
    packages: [
    { lessons: 5, discountPercent: 5, enabled: true },
    { lessons: 10, discountPercent: 10, enabled: true }],

    trialLesson: false,
    availability: emptyAvailability,
    photoUrl: null,
    videoUrl: ''
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [published, setPublished] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const update = (patch: Partial<ListingDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const isStepComplete = (id: WizardStepId): boolean => {
    switch (id) {
      case 'about':
        return draft.displayName.trim().length > 1 && draft.headline.trim().length >= 10 && draft.bio.trim().length >= 50;
      case 'subjects':
        return draft.subjects.length > 0 && draft.subjects.every((s) => s.levels.length > 0);
      case 'credentials':
        return draft.credentials.some((c) => c.title.trim() && c.institution.trim());
      case 'pricing':
        return draft.hourlyRate >= 10 && draft.hourlyRate <= 300;
      case 'availability':
        return Object.values(draft.availability).flat().length >= 3;
      case 'media':
        return !!draft.photoUrl;
      default:
        return false;
    }
  };

  const step = wizardSteps[stepIndex];
  const isLast = stepIndex === wizardSteps.length - 1;
  const allComplete = wizardSteps.every((s) => isStepComplete(s.id));

  const goNext = () => {
    if (!isStepComplete(step.id)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (isLast) {
      if (allComplete) setPublished(true);else
      setStepIndex(wizardSteps.findIndex((s) => !isStepComplete(s.id)));
      return;
    }
    setStepIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setShowErrors(false);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const goTo = (index: number) => {
    setShowErrors(false);
    setStepIndex(index);
  };

  return { draft, update, step, stepIndex, isLast, goNext, goBack, goTo, isStepComplete, published, showErrors };
}

export type ListingWizard = ReturnType<typeof useListingWizard>;
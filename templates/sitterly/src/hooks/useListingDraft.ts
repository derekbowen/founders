import { useState } from 'react';
import { ListingDraft, WizardStepId } from '../types/listingDraft';
import { DayKey, Slot } from '../types/sitter';

export interface StepProps {
  draft: ListingDraft;
  update: (patch: Partial<ListingDraft>) => void;
  errors: Record<string, string>;
}

const emptyDraft: ListingDraft = {
  displayName: '',
  headline: '',
  bio: '',
  experienceYears: '',
  ageGroups: [],
  careTypes: [],
  certifications: [],
  languages: ['English'],
  backgroundCheckConsent: false,
  nonSmoker: true,
  hourlyRate: '22',
  extraChildRate: '4',
  maxKids: '3',
  availability: { Mon: [], Tue: [], Wed: [], Thu: [], Fri: ['Evening'], Sat: ['Evening'], Sun: [] },
  neighborhood: 'Hyde Park',
  serviceRadiusMiles: 5,
  hasCar: false,
  photoUrl: null
};

export function validateStep(step: WizardStepId, d: ListingDraft): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 'about') {
    if (!d.displayName.trim()) e.displayName = 'Add the name families will see';
    if (d.headline.trim().length < 10) e.headline = 'Write a short headline (10+ characters)';
    if (d.bio.trim().length < 60) e.bio = `Tell families a bit more (${Math.max(0, 60 - d.bio.trim().length)} more characters)`;
  }
  if (step === 'experience') {
    if (!d.experienceYears || Number(d.experienceYears) < 0) e.experienceYears = 'Enter your years of experience';
    if (!d.ageGroups.length) e.ageGroups = 'Choose at least one age group';
    if (!d.careTypes.length) e.careTypes = 'Choose at least one type of care';
  }
  if (step === 'certifications' && !d.backgroundCheckConsent) e.backgroundCheckConsent = 'A background check is required for all sitters';
  if (step === 'rates') {
    const r = Number(d.hourlyRate);
    if (!r || r < 12 || r > 80) e.hourlyRate = 'Choose a rate between $12 and $80';
    if (d.extraChildRate === '' || Number(d.extraChildRate) < 0) e.extraChildRate = 'Enter 0 or more';
  }
  if (step === 'availability' && !Object.values(d.availability).some((s) => s.length)) e.availability = 'Select at least one time slot';
  if (step === 'photo' && !d.photoUrl) e.photoUrl = 'Add a profile photo so families can recognize you';
  return e;
}

export function useListingDraft() {
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const update = (patch: Partial<ListingDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const toggleSlot = (day: DayKey, slot: Slot) =>
  setDraft((d) => {
    const current = d.availability[day];
    const next = current.includes(slot) ? current.filter((s) => s !== slot) : [...current, slot];
    return { ...d, availability: { ...d.availability, [day]: next } };
  });
  return { draft, update, toggleSlot };
}

export function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
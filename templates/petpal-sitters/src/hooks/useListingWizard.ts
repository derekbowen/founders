import { useState } from 'react';
import type { PetSize, ServiceId, YardType } from '../types/marketplace';

export type WizardStepId = 'about' | 'services' | 'home' | 'pets' | 'availability' | 'photos';

export const wizardSteps: {id: WizardStepId;label: string;description: string;}[] = [
{ id: 'about', label: 'About you', description: 'Introduce yourself to pet parents' },
{ id: 'services', label: 'Services & pricing', description: 'Choose what you offer and set your rates' },
{ id: 'home', label: 'Home & yard', description: 'Describe where pets will stay' },
{ id: 'pets', label: 'Pet preferences', description: 'Which pets are a good fit?' },
{ id: 'availability', label: 'Availability', description: 'Set your schedule and block off dates' },
{ id: 'photos', label: 'Photos', description: 'Show off your space and furry friends' }];


export interface VariationDraft {
  id: string;
  label: string;
  price: string;
}

export interface ServiceDraft {
  enabled: boolean;
  variations: VariationDraft[];
  extraPetPrice: string;
}

export interface WizardState {
  displayName: string;
  headline: string;
  bio: string;
  neighborhood: string;
  years: string;
  services: Record<ServiceId, ServiceDraft>;
  homeType: 'House' | 'Apartment' | 'Townhouse';
  yard: YardType;
  children: string;
  otherPets: string;
  smokeFree: boolean;
  homeFullTime: boolean;
  sizes: PetSize[];
  acceptsCats: boolean;
  maxPets: number;
  specialCare: string[];
  weekdays: number[];
  notice: string;
  blocked: string[];
  photos: string[];
}

export type WizardErrors = Partial<Record<string, string>>;

const initialState: WizardState = {
  displayName: '',
  headline: '',
  bio: '',
  neighborhood: '',
  years: '',
  services: {
    boarding: { enabled: true, variations: [{ id: 'v1', label: 'Standard night', price: '45' }], extraPetPrice: '15' },
    'house-sitting': { enabled: false, variations: [{ id: 'v1', label: 'Overnight', price: '65' }], extraPetPrice: '10' },
    'drop-in': { enabled: false, variations: [{ id: 'v1', label: '30-minute visit', price: '20' }], extraPetPrice: '5' },
    'dog-walking': {
      enabled: true,
      variations: [
      { id: 'v1', label: '30-minute walk', price: '20' },
      { id: 'v2', label: '60-minute walk', price: '32' }],

      extraPetPrice: '6'
    }
  },
  homeType: 'House',
  yard: 'fenced',
  children: 'none',
  otherPets: '',
  smokeFree: true,
  homeFullTime: false,
  sizes: ['small', 'medium'],
  acceptsCats: false,
  maxPets: 2,
  specialCare: [],
  weekdays: [1, 2, 3, 4, 5],
  notice: '1',
  blocked: [],
  photos: []
};

function validate(step: WizardStepId, s: WizardState): WizardErrors {
  const e: WizardErrors = {};
  if (step === 'about') {
    if (!s.displayName.trim()) e.displayName = 'Add the name pet parents will see.';
    if (s.headline.trim().length < 10) e.headline = 'Write a headline of at least 10 characters.';
    if (s.bio.trim().length < 40) e.bio = 'Tell owners a little more — at least 40 characters.';
    if (!s.neighborhood.trim()) e.neighborhood = 'Add your neighborhood.';
  }
  if (step === 'services') {
    const enabled = Object.entries(s.services).filter(([, v]) => v.enabled);
    if (enabled.length === 0) e.services = 'Offer at least one service.';
    enabled.forEach(([id, v]) => {
      if (v.variations.some((x) => !x.label.trim() || !(Number(x.price) > 0))) e[`service-${id}`] = 'Each option needs a name and a price above $0.';
    });
  }
  if (step === 'pets') {
    if (s.sizes.length === 0 && !s.acceptsCats) e.sizes = 'Choose at least one dog size or accept cats.';
  }
  if (step === 'availability') {
    if (s.weekdays.length === 0) e.weekdays = 'Choose at least one day you’re available.';
  }
  if (step === 'photos') {
    if (s.photos.length < 3) e.photos = 'Add at least 3 photos so owners can see your space.';
  }
  return e;
}

export function useListingWizard() {
  const [state, setState] = useState<WizardState>(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState<WizardStepId[]>([]);
  const [errors, setErrors] = useState<WizardErrors>({});
  const [published, setPublished] = useState(false);

  const step = wizardSteps[stepIndex];
  const update = (patch: Partial<WizardState>) => {
    setState((s) => ({ ...s, ...patch }));
    setErrors({});
  };

  const updateService = (id: ServiceId, patch: Partial<ServiceDraft>) =>
  setState((s) => ({ ...s, services: { ...s.services, [id]: { ...s.services[id], ...patch } } }));

  const next = () => {
    const e = validate(step.id, state);
    setErrors(e);
    if (Object.keys(e).length > 0) return false;
    setCompleted((c) => c.includes(step.id) ? c : [...c, step.id]);
    if (stepIndex === wizardSteps.length - 1) {
      setPublished(true);
    } else {
      setStepIndex((i) => i + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  };

  const back = () => {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const goTo = (index: number) => {
    const target = wizardSteps[index];
    const reachable = index <= stepIndex || completed.includes(wizardSteps[index - 1]?.id) || completed.includes(target.id);
    if (!reachable) return;
    setErrors({});
    setStepIndex(index);
  };

  return { state, update, updateService, step, stepIndex, completed, errors, next, back, goTo, published, isLast: stepIndex === wizardSteps.length - 1 };
}

export type ListingWizard = ReturnType<typeof useListingWizard>;
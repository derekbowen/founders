import { useState } from 'react';
import { equipmentPresets, weekdays } from '../data/catalog';
import type { ListingDraft } from '../types/marketplace';

export const wizardSteps = [
{ key: 'details', label: 'Kitchen details', description: 'Name, location and who it’s for' },
{ key: 'equipment', label: 'Equipment', description: 'What renters can use' },
{ key: 'storage', label: 'Storage', description: 'Monthly dry, cold & frozen space' },
{ key: 'certifications', label: 'Certifications', description: 'Permits and compliance' },
{ key: 'pricing', label: 'Pricing & minimums', description: 'Hourly rate and fees' },
{ key: 'availability', label: 'Availability', description: 'Weekly bookable hours' },
{ key: 'photos', label: 'Photos', description: 'Show off your space' }];


const initialDraft: ListingDraft = {
  title: '',
  city: '',
  neighborhood: '',
  address: '',
  description: '',
  squareFeet: 1200,
  stations: 2,
  useCases: [],
  equipment: equipmentPresets.map((p) => ({ category: p.category, items: [] })),
  storage: {
    dry: { enabled: false, capacity: '', monthlyPrice: 60 },
    cold: { enabled: false, capacity: '', monthlyPrice: 120 },
    frozen: { enabled: false, capacity: '', monthlyPrice: 140 }
  },
  certifications: ['health-permit'],
  permitNumber: '',
  permitExpiry: '',
  insuranceRequired: true,
  pricePerHour: 35,
  minHours: 2,
  cleaningFee: 25,
  access247: false,
  schedule: weekdays.map((day) => ({ day, open: day !== 'Sunday', start: 6, end: 22 })),
  photos: []
};

function validateStep(step: number, d: ListingDraft): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 0) {
    if (d.title.trim().length < 4) e.title = 'Give your kitchen a name (at least 4 characters)';
    if (!d.city) e.city = 'Choose a city';
    if (!d.address.trim()) e.address = 'Enter the street address';
  }
  if (step === 1) {
    const count = d.equipment.reduce((s, c) => s + c.items.length, 0);
    if (count < 3) e.equipment = 'Add at least 3 pieces of equipment';
  }
  if (step === 3) {
    if (!d.certifications.includes('health-permit')) e.certifications = 'A current health permit is required to list';
    if (!d.permitNumber.trim()) e.permitNumber = 'Enter your health permit number';
  }
  if (step === 4) {
    if (d.pricePerHour < 10) e.pricePerHour = 'Hourly rate must be at least $10';
  }
  if (step === 5) {
    if (!d.access247 && !d.schedule.some((s) => s.open)) e.schedule = 'Open at least one day a week';
  }
  if (step === 6) {
    if (d.photos.length < 3) e.photos = 'Add at least 3 photos';
  }
  return e;
}

export function useListingWizard() {
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<number[]>([]);
  const [published, setPublished] = useState(false);

  const update = (patch: Partial<ListingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors({});
  };

  const next = () => {
    const found = validateStep(step, draft);
    setErrors(found);
    if (Object.keys(found).length) return;
    setCompleted((c) => c.includes(step) ? c : [...c, step]);
    if (step === wizardSteps.length - 1) setPublished(true);else
    setStep(step + 1);
    window.scrollTo({ top: 0 });
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const goTo = (i: number) => {
    if (i <= step || completed.includes(i - 1)) {
      setErrors({});
      setStep(i);
    }
  };

  const reset = () => {
    setDraft(initialDraft);
    setStep(0);
    setCompleted([]);
    setPublished(false);
  };

  return { draft, update, step, errors, completed, published, next, back, goTo, reset };
}
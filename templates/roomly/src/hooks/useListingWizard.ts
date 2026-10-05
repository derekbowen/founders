import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { cityCenters } from '../data/features';
import type { ListingDraft } from '../types/listing';

export const wizardSteps = [
{ id: 'room', label: 'Room details', hint: 'Type, size and features' },
{ id: 'flat', label: 'Flat & flatmates', hint: 'Who lives there and house rules' },
{ id: 'rent', label: 'Rent & bills', hint: 'Monthly costs and deposit' },
{ id: 'availability', label: 'Availability & stay', hint: 'Dates and stay length' },
{ id: 'location', label: 'Location', hint: 'Neighbourhood and transit' },
{ id: 'photos', label: 'Photos', hint: 'Show off the room' }] as
const;

export type WizardErrors = Partial<Record<keyof ListingDraft, string>>;

export interface WizardStepProps {
  draft: ListingDraft;
  update: <K extends keyof ListingDraft>(key: K, value: ListingDraft[K]) => void;
  errors: WizardErrors;
}

export const emptyDraft: ListingDraft = {
  title: '',
  description: '',
  roomType: '',
  roomSize: '',
  furnished: true,
  roomFeatures: [],
  bedrooms: '3',
  bathrooms: '1',
  flatSize: '',
  flatFeatures: [],
  flatmates: [],
  genderPreference: 'any',
  petsAllowed: false,
  smokingAllowed: false,
  couplesAllowed: false,
  houseRules: '',
  rent: '',
  deposit: '',
  billsIncluded: true,
  billsEstimate: '',
  billsNote: '',
  availableFrom: '',
  minStay: 3,
  maxStay: 12,
  city: '',
  neighborhood: '',
  street: '',
  transit: [],
  images: []
};

const positive = (v: string) => Number(v) > 0;

export function validateStep(index: number, d: ListingDraft): WizardErrors {
  const e: WizardErrors = {};
  switch (wizardSteps[index].id) {
    case 'room':
      if (d.title.trim().length < 10) e.title = 'Give your listing a title of at least 10 characters.';
      if (!d.roomType) e.roomType = 'Choose a room type.';
      if (!positive(d.roomSize)) e.roomSize = 'Enter the room size in m².';
      if (d.description.trim().length < 40) e.description = 'Describe the room in at least 40 characters.';
      break;
    case 'flat':
      if (!positive(d.bedrooms)) e.bedrooms = 'Required.';
      if (!positive(d.bathrooms)) e.bathrooms = 'Required.';
      if (!positive(d.flatSize)) e.flatSize = 'Enter the flat size in m².';
      break;
    case 'rent':
      if (!positive(d.rent)) e.rent = 'Enter the monthly rent.';
      if (d.deposit === '' || Number(d.deposit) < 0) e.deposit = 'Enter the deposit (0 if none).';
      if (!d.billsIncluded && !positive(d.billsEstimate)) e.billsEstimate = 'Estimate the monthly bills.';
      break;
    case 'availability':
      if (!d.availableFrom) e.availableFrom = 'Choose when the room is available.';
      if (d.maxStay !== null && d.maxStay < d.minStay) e.maxStay = 'Maximum stay must be longer than the minimum.';
      break;
    case 'location':
      if (!d.city) e.city = 'Choose a city.';
      if (!d.neighborhood.trim()) e.neighborhood = 'Enter the neighbourhood.';
      if (!d.street.trim()) e.street = 'Enter the street address.';
      break;
    case 'photos':
      if (d.images.length < 1) e.images = 'Add at least one photo.';
      break;
  }
  return e;
}

export function useListingWizard() {
  const { addListing } = useApp();
  const [draft, setDraft] = useState<ListingDraft>(emptyDraft);
  const [step, setStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [errors, setErrors] = useState<WizardErrors>({});
  const [publishing, setPublishing] = useState(false);

  const update: WizardStepProps['update'] = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const goTo = (index: number) => {
    if (index <= maxReached) {
      setErrors({});
      setStep(index);
    }
  };

  const next = () => {
    const e = validateStep(step, draft);
    setErrors(e);
    if (Object.keys(e).length) return false;
    const n = Math.min(step + 1, wizardSteps.length - 1);
    setStep(n);
    setMaxReached((m) => Math.max(m, n));
    return true;
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const publish = (onDone: (id: string) => void) => {
    const e = validateStep(step, draft);
    setErrors(e);
    if (Object.keys(e).length || !draft.roomType) return;
    setPublishing(true);
    const [lat, lng] = cityCenters[draft.city] ?? [52.52, 13.4];
    window.setTimeout(() => {
      const id = addListing({
        title: draft.title.trim(),
        description: draft.description.trim(),
        city: draft.city,
        neighborhood: draft.neighborhood.trim(),
        lat: lat + (Math.random() - 0.5) * 0.02,
        lng: lng + (Math.random() - 0.5) * 0.02,
        roomType: draft.roomType as Exclude<ListingDraft['roomType'], ''>,
        rent: Number(draft.rent),
        billsIncluded: draft.billsIncluded,
        billsEstimate: draft.billsIncluded ? 0 : Number(draft.billsEstimate),
        billsNote:
        draft.billsNote.trim() || (
        draft.billsIncluded ? 'All bills included in the rent.' : 'Bills are paid separately.'),
        deposit: Number(draft.deposit),
        minStay: draft.minStay,
        maxStay: draft.maxStay,
        availableFrom: draft.availableFrom,
        furnished: draft.furnished,
        roomSize: Number(draft.roomSize),
        flatSize: Number(draft.flatSize),
        bedrooms: Number(draft.bedrooms),
        bathrooms: Number(draft.bathrooms),
        roomFeatures: draft.roomFeatures,
        flatFeatures: draft.flatFeatures,
        flatmates: draft.flatmates,
        genderPreference: draft.genderPreference,
        petsAllowed: draft.petsAllowed,
        smokingAllowed: draft.smokingAllowed,
        couplesAllowed: draft.couplesAllowed,
        houseRules: draft.houseRules.
        split('\n').
        map((r) => r.trim()).
        filter(Boolean),
        neighborhoodInfo: `Located in ${draft.neighborhood.trim()}, ${draft.city}.`,
        transit: draft.transit,
        images: draft.images,
        idealFor: []
      });
      setPublishing(false);
      onDone(id);
    }, 800);
  };

  return { draft, update, step, goTo, next, back, errors, publish, publishing, maxReached };
}
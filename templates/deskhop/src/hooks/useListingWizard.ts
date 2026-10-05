import { useState } from 'react';
import { HOURS_STANDARD } from '../data/openingHours';
import type { DraftErrors, ListingDraft } from '../types/draft';
import { toMinutes } from '../utils/time';

export const wizardSteps = [
{ id: 'details', title: 'Space details', subtitle: 'Give your space a name and tell guests what it’s like.' },
{ id: 'seats', title: 'Space types & seats', subtitle: 'What can guests book, and how many at once?' },
{ id: 'amenities', title: 'Amenities', subtitle: 'Help guests find you with the right filters.' },
{ id: 'location', title: 'Location', subtitle: 'Where is your space?' },
{ id: 'pricing', title: 'Pricing', subtitle: 'Set hourly and daily rates per seat or room.' },
{ id: 'hours', title: 'Opening hours', subtitle: 'When can guests book?' },
{ id: 'photos', title: 'Photos', subtitle: 'Great photos are the #1 driver of bookings.' }] as
const;

const initialDraft: ListingDraft = {
  title: '',
  description: '',
  spaceType: 'hot-desk',
  seats: 10,
  capacity: 1,
  amenities: ['wifi', 'coffee'],
  city: 'London',
  address: '',
  postcode: '',
  pricePerHour: '',
  pricePerDay: '',
  minHours: 1,
  instantBook: true,
  openingHours: HOURS_STANDARD,
  photos: []
};

function validate(step: number, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  if (step === 0) {
    if (d.title.trim().length < 5) e.title = 'Add a title of at least 5 characters.';
    if (d.description.trim().length < 20) e.description = 'Describe your space in at least 20 characters.';
  }
  if (step === 3) {
    if (!d.address.trim()) e.address = 'Street address is required.';
    if (!d.postcode.trim()) e.postcode = 'Postcode is required.';
  }
  if (step === 4) {
    const h = Number(d.pricePerHour);
    const day = Number(d.pricePerDay);
    if (!h || h <= 0) e.pricePerHour = 'Set an hourly price.';
    if (!day || day <= 0) e.pricePerDay = 'Set a daily price.';else
    if (h && day < h) e.pricePerDay = 'Day price should be at least the hourly price.';
  }
  if (step === 5) {
    const openDays = d.openingHours.filter((x) => x.open && x.close);
    if (openDays.length === 0) e.openingHours = 'Open at least one day a week.';else
    if (openDays.some((x) => toMinutes(x.close as string) <= toMinutes(x.open as string)))
    e.openingHours = 'Closing time must be after opening time.';
  }
  if (step === 6 && d.photos.length === 0) e.photos = 'Add at least one photo.';
  return e;
}

export function useListingWizard() {
  const [step, setStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  function update(patch: Partial<ListingDraft>) {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      (Object.keys(patch) as (keyof ListingDraft)[]).forEach((k) => delete next[k]);
      return next;
    });
  }

  function goTo(index: number) {
    if (index <= maxReached) {
      setErrors({});
      setStep(index);
    }
  }

  function next() {
    const found = validate(step, draft);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (step === wizardSteps.length - 1) {
      setPublishing(true);
      window.setTimeout(() => {
        setPublishing(false);
        setPublished(true);
      }, 1200);
      return;
    }
    const n = step + 1;
    setStep(n);
    setMaxReached((m) => Math.max(m, n));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setDraft(initialDraft);
    setStep(0);
    setMaxReached(0);
    setPublished(false);
  }

  return { step, maxReached, draft, errors, update, goTo, next, back, publishing, published, restart };
}
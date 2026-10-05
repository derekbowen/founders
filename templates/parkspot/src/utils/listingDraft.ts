import type { DraftErrors, ListingDraft, WizardStepId } from '../types/listingDraft';

const positive = (v: string) => Number(v) > 0;

export function validateStep(step: WizardStepId, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  switch (step) {
    case 'details':
      if (d.title.trim().length < 8) e.title = 'Use at least 8 characters, e.g. “Covered garage near Oracle Park”';
      if (!d.spotType) e.spotType = 'Choose a spot type';
      if (d.description.trim().length < 20) e.description = 'Add a short description (20+ characters)';
      break;
    case 'location':
      if (d.address.trim().length < 5) e.address = 'Enter the street address';
      if (d.accessInstructions.trim().length < 15) e.accessInstructions = 'Tell drivers how to get in (15+ characters)';
      break;
    case 'size':
      if (!positive(d.lengthFt)) e.lengthFt = 'Enter a length';
      if (!positive(d.widthFt)) e.widthFt = 'Enter a width';
      if (d.covered && !positive(d.clearanceFt)) e.clearanceFt = 'Covered spots need a height clearance';
      break;
    case 'pricing':
      if (!d.hourlyEnabled && !d.dailyEnabled) e.hourlyEnabled = 'Enable at least one booking type';
      if (d.hourlyEnabled && !positive(d.hourlyPrice)) e.hourlyPrice = 'Enter an hourly price';
      if (d.dailyEnabled && !positive(d.dailyPrice)) e.dailyPrice = 'Enter a daily price';
      break;
    case 'availability':
      if (!d.alwaysAvailable && !d.schedule.some((s) => s.enabled)) e.schedule = 'Pick at least one day';
      if (!d.alwaysAvailable && d.schedule.some((s) => s.enabled && s.end <= s.start))
      e.schedule = 'End time must be after start time';
      break;
    case 'photos':
      if (d.photos.length === 0) e.photos = 'Add at least one photo';
      break;
  }
  return e;
}
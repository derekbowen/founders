import { destinations } from '../data/destinations';
import type { DraftErrors, ListingDraft, WizardStepId } from '../types/listingDraft';
import type { Listing } from '../types/marketplace';

const num = (v: string) => Number(v);
const isPos = (v: string) => v !== '' && !Number.isNaN(num(v)) && num(v) > 0;

export function validateStep(step: WizardStepId, d: ListingDraft): DraftErrors {
  const e: DraftErrors = {};
  switch (step) {
    case 'details':
      if (d.title.trim().length < 6) e.title = 'Give your boat a name of at least 6 characters.';
      if (!d.type) e.type = 'Choose a boat type.';
      if (d.description.trim().length < 40) e.description = 'Write at least 40 characters so guests know what to expect.';
      break;
    case 'specs':
      if (!d.make.trim()) e.make = 'Required.';
      if (!isPos(d.length)) e.length = 'Enter length in feet.';
      if (!isPos(d.capacity)) e.capacity = 'Enter max guests.';
      if (!/^\d{4}$/.test(d.year) || num(d.year) < 1900 || num(d.year) > 2027) e.year = 'Enter a valid year.';
      if (!d.engine.trim()) e.engine = 'Required.';
      break;
    case 'captain':
      if (d.captainMode !== 'none') {
        if (!d.captainName.trim()) e.captainName = 'Add your captain’s name.';
        if (!d.captainLicense.trim()) e.captainLicense = 'Add their USCG license type.';
        if (!isPos(d.captainHalfDay)) e.captainHalfDay = 'Enter a fee.';
        if (!isPos(d.captainFullDay)) e.captainFullDay = 'Enter a fee.';
      }
      break;
    case 'location':
      if (!d.destinationId) e.destinationId = 'Choose a destination.';
      if (!d.marinaName.trim()) e.marinaName = 'Enter the marina name.';
      if (!d.marinaAddress.trim()) e.marinaAddress = 'Enter the street address.';
      break;
    case 'pricing':
      if (!isPos(d.halfDay)) e.halfDay = 'Enter a half-day price.';
      if (!isPos(d.fullDay)) e.fullDay = 'Enter a full-day price.';
      if (isPos(d.halfDay) && isPos(d.fullDay) && num(d.fullDay) <= num(d.halfDay)) e.fullDay = 'Full day should cost more than half day.';
      if (d.fuelDeposit === '' || num(d.fuelDeposit) < 0) e.fuelDeposit = 'Enter 0 or more.';
      break;
    case 'photos':
      if (d.photos.length < 1) e.photos = 'Add at least one photo.';
      break;
    default:
      break;
  }
  return e;
}

export function draftToListing(d: ListingDraft, ownerId: string): Listing {
  const dest = destinations.find((x) => x.id === d.destinationId) ?? destinations[0];
  const jitter = () => (Math.random() - 0.5) * 0.04;
  return {
    id: `l-${Date.now().toString().slice(-6)}`,
    title: d.title.trim(),
    type: d.type || 'pontoon',
    summary: d.summary.trim() || d.description.trim().slice(0, 80),
    description: d.description.trim(),
    images: d.photos,
    destinationId: dest.id,
    marina: { name: d.marinaName.trim(), address: d.marinaAddress.trim(), lat: dest.lat + jitter(), lng: dest.lng + jitter() },
    pricing: {
      halfDay: num(d.halfDay),
      fullDay: num(d.fullDay),
      captainHalfDay: d.captainMode === 'none' ? 0 : num(d.captainHalfDay),
      captainFullDay: d.captainMode === 'none' ? 0 : num(d.captainFullDay),
      fuelDeposit: num(d.fuelDeposit)
    },
    captainMode: d.captainMode,
    captainId: undefined,
    specs: { make: d.make.trim(), model: d.model.trim(), length: num(d.length), capacity: num(d.capacity), engine: d.engine.trim(), year: num(d.year), cabins: num(d.cabins) || 0 },
    fishingGear: d.fishingGear,
    overnight: d.overnight,
    included: d.included,
    ownerId,
    rating: 5,
    reviewCount: 0,
    cancellation: d.cancellation,
    blockedDates: d.blockedDates
  };
}
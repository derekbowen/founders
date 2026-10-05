import { useCallback, useState } from 'react';
import type { ListingDraft } from '../types/listingDraft';
import type { WizardStepSlug } from '../data/wizardSteps';

const initialDraft: ListingDraft = {
  title: '',
  summary: '',
  description: '',
  destinationId: 'lisbon',
  languages: ['English'],
  categoryId: '',
  itinerary: [
  { time: '0:00', title: 'Meet & welcome', description: 'Introductions and a quick overview of the day.' }],

  durationHours: 3,
  minGuests: 1,
  maxGuests: 8,
  privateGroupsEnabled: true,
  wheelchairAccessible: false,
  weekdays: ['Thu', 'Fri', 'Sat'],
  departureTimes: ['10:00'],
  startDate: '',
  pricePerPerson: 55,
  privateGroupPrice: 320,
  meetingName: '',
  meetingAddress: '',
  meetingInstructions: '',
  photos: []
};

export function useListingDraft() {
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);
  const update = useCallback((patch: Partial<ListingDraft>) => setDraft((d) => ({ ...d, ...patch })), []);

  const isComplete = useCallback(
    (slug: WizardStepSlug): boolean => {
      switch (slug) {
        case 'details':
          return draft.title.trim().length >= 5 && draft.summary.trim().length >= 10 && draft.languages.length > 0;
        case 'category':
          return draft.categoryId !== '';
        case 'itinerary':
          return draft.itinerary.length >= 2 && draft.itinerary.every((s) => s.title.trim());
        case 'group-size':
          return draft.maxGuests >= draft.minGuests;
        case 'schedule':
          return draft.weekdays.length > 0 && draft.departureTimes.length > 0;
        case 'pricing':
          return draft.pricePerPerson > 0;
        case 'meeting-point':
          return draft.meetingName.trim().length > 0 && draft.meetingAddress.trim().length > 0;
        case 'photos':
          return draft.photos.length >= 3;
        default:
          return false;
      }
    },
    [draft]
  );

  return { draft, update, isComplete };
}
import type { ListingDraft, WizardStepId } from '../types/listingDraft';

export const wizardSteps: {id: WizardStepId;label: string;description: string;}[] = [
{ id: 'details', label: 'Boat details', description: 'Name, type and a short story' },
{ id: 'specs', label: 'Specs', description: 'Size, engine and amenities' },
{ id: 'captain', label: 'Captain & crew', description: 'Captained, optional or bareboat' },
{ id: 'location', label: 'Marina location', description: 'Where guests meet you' },
{ id: 'pricing', label: 'Packages & pricing', description: 'Half-day, full-day & deposit' },
{ id: 'availability', label: 'Availability', description: 'Block days you’re using the boat' },
{ id: 'photos', label: 'Photos', description: 'Show off your boat' }];


export const amenityOptions = [
'Life jackets for all sizes',
'Bluetooth sound system',
'Cooler & ice',
'Snorkel gear',
'Paddleboards',
'Bimini shade top',
'Swim ladder',
'Fresh-water shower',
'Towels',
'Grill',
'Restroom / head',
'Wi-Fi'];


export const emptyDraft: ListingDraft = {
  title: '',
  type: '',
  summary: '',
  description: '',
  make: '',
  model: '',
  year: '',
  length: '',
  capacity: '',
  engine: '',
  cabins: '0',
  fishingGear: false,
  overnight: false,
  included: ['Life jackets for all sizes'],
  captainMode: 'optional',
  captainName: '',
  captainLicense: '',
  captainHalfDay: '',
  captainFullDay: '',
  destinationId: '',
  marinaName: '',
  marinaAddress: '',
  halfDay: '',
  fullDay: '',
  fuelDeposit: '150',
  cancellation: 'moderate',
  blockedDates: [],
  photos: []
};
import type { ListingDraft, WizardStepId } from '../types/listingDraft';
import type { SpotType } from '../types/listing';

export const wizardSteps: {id: WizardStepId;title: string;description: string;}[] = [
{ id: 'details', title: 'Spot details', description: 'Name your space and tell drivers what makes it great.' },
{ id: 'location', title: 'Location & access', description: 'Where is it and how do drivers get in?' },
{ id: 'size', title: 'Size & vehicle types', description: 'Help drivers know their car will fit.' },
{ id: 'pricing', title: 'Pricing', description: 'Set hourly and daily rates.' },
{ id: 'availability', title: 'Availability', description: 'Choose when your spot can be booked.' },
{ id: 'photos', title: 'Photos', description: 'Clear photos get up to 3× more bookings.' }];


export const spotTypeOptions: {value: SpotType;text: string;}[] = [
{ value: 'Driveway', text: 'Uncovered space in front of or beside a home' },
{ value: 'Garage', text: 'Enclosed private garage with a door' },
{ value: 'Open lot', text: 'Space in an outdoor lot, often gated' },
{ value: 'Covered structure', text: 'Bay inside a multi-level parking structure' }];


export const emptyDraft: ListingDraft = {
  title: '',
  spotType: '',
  description: '',
  address: '',
  neighborhood: '',
  access247: true,
  accessInstructions: '',
  accessCode: '',
  securityCamera: false,
  lengthFt: '18',
  widthFt: '9',
  clearanceFt: '',
  maxVehicle: 'Sedan',
  covered: false,
  evCharging: false,
  hourlyEnabled: true,
  dailyEnabled: true,
  hourlyPrice: '4',
  dailyPrice: '22',
  minHours: '1',
  instantBook: true,
  alwaysAvailable: false,
  schedule: [
  { day: 'Monday', enabled: true, start: '07:00', end: '19:00' },
  { day: 'Tuesday', enabled: true, start: '07:00', end: '19:00' },
  { day: 'Wednesday', enabled: true, start: '07:00', end: '19:00' },
  { day: 'Thursday', enabled: true, start: '07:00', end: '19:00' },
  { day: 'Friday', enabled: true, start: '07:00', end: '22:00' },
  { day: 'Saturday', enabled: true, start: '09:00', end: '23:00' },
  { day: 'Sunday', enabled: false, start: '09:00', end: '18:00' }],

  photos: []
};
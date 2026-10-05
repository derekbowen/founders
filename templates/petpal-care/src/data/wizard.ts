import type { ListingDraft, WizardStepId } from '../types/wizard';

export const wizardSteps: {id: WizardStepId;title: string;description: string;}[] = [
{ id: 'about', title: 'About you', description: 'Introduce yourself to pet owners' },
{ id: 'services', title: 'Services & pricing', description: 'What you offer and what it costs' },
{ id: 'home', title: 'Home & yard', description: 'Where pets will stay or play' },
{ id: 'pets', title: 'Pet preferences', description: 'Sizes and species you accept' },
{ id: 'availability', title: 'Availability', description: 'When you can take bookings' },
{ id: 'photos', title: 'Photos', description: 'Show off your space' }];


export const samplePhotos = ["/02b717e1-3447-4e38-82ca-bfc8b87388bd.jpg", "/9aeed65a-64f9-4a6f-86dc-271b1b554e5d.jpg", "/1c29fdbb-8ee2-4c05-8ad0-246033f28078.jpg"];





export const emptyDraft: ListingDraft = {
  title: '',
  tagline: '',
  bio: '',
  neighborhood: '',
  experienceYears: 1,
  services: {
    boarding: {
      enabled: true,
      extraPetFee: 25,
      variants: [
      { id: 'small', label: 'Small pet', price: 45 },
      { id: 'large', label: 'Large dog', price: 55 }]

    },
    'house-sitting': {
      enabled: false,
      extraPetFee: 10,
      variants: [{ id: 'standard', label: 'Overnight at owner’s home', price: 70 }]
    },
    'drop-in': {
      enabled: false,
      extraPetFee: 8,
      variants: [
      { id: '30', label: '30-min visit', price: 22 },
      { id: '60', label: '60-min visit', price: 34 }]

    },
    'dog-walking': {
      enabled: true,
      extraPetFee: 10,
      variants: [
      { id: '30', label: '30-min walk', price: 20 },
      { id: '60', label: '60-min walk', price: 30 }]

    }
  },
  homeType: 'House',
  yard: 'fenced',
  childrenAtHome: 'No children',
  otherPets: '',
  fullTimeHome: true,
  smokeFree: true,
  acceptedSizes: ['small', 'medium'],
  acceptsCats: false,
  maxPets: 2,
  weekdays: [true, true, true, true, true, true, true],
  blockedDates: [],
  photos: []
};
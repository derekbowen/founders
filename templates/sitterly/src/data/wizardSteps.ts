import { WizardStepId } from '../types/listingDraft';

export const wizardSteps: {id: WizardStepId;title: string;description: string;}[] = [
{ id: 'about', title: 'About you', description: 'Introduce yourself to families' },
{ id: 'experience', title: 'Experience & age groups', description: 'Who you’re comfortable caring for' },
{ id: 'certifications', title: 'Certifications', description: 'Safety training and background check' },
{ id: 'rates', title: 'Rates', description: 'Your hourly price' },
{ id: 'availability', title: 'Availability', description: 'When you usually sit' },
{ id: 'service-area', title: 'Service area', description: 'How far you’ll travel' },
{ id: 'photo', title: 'Photo', description: 'A friendly, clear portrait' }];


export const neighborhoods = [
{ name: 'Hyde Park', lat: 30.3052, lng: -97.7286 },
{ name: 'Mueller', lat: 30.2985, lng: -97.7049 },
{ name: 'North Loop', lat: 30.3183, lng: -97.7218 },
{ name: 'East Austin', lat: 30.2622, lng: -97.7219 },
{ name: 'Zilker', lat: 30.2621, lng: -97.7702 },
{ name: 'Cherrywood', lat: 30.2873, lng: -97.7158 },
{ name: 'Allandale', lat: 30.3342, lng: -97.7431 },
{ name: 'Travis Heights', lat: 30.2481, lng: -97.7431 },
{ name: 'Tarrytown', lat: 30.2963, lng: -97.7678 },
{ name: 'Windsor Park', lat: 30.3109, lng: -97.6921 },
{ name: 'Crestview', lat: 30.3431, lng: -97.7222 },
{ name: 'Bouldin Creek', lat: 30.2522, lng: -97.7562 },
{ name: 'Brentwood', lat: 30.3291, lng: -97.7355 },
{ name: 'Clarksville', lat: 30.2812, lng: -97.7581 },
{ name: 'South Lamar', lat: 30.2431, lng: -97.7783 }];


export const radiusOptions = [2, 3, 5, 8, 10, 15];
import type { WizardStepKey } from '../types/wizard';

export const wizardSteps: {key: WizardStepKey;label: string;title: string;description: string;}[] = [
{ key: 'type', label: 'Site type', title: 'What kind of site are you hosting?', description: 'Pick the option that best describes where campers will sleep.' },
{ key: 'location', label: 'Location & directions', title: 'Where is your land?', description: 'Your exact address is only shared with campers after they book.' },
{ key: 'capacity', label: 'Capacity', title: 'How many campers can you host?', description: 'Set limits per site so everyone has room to spread out.' },
{ key: 'amenities', label: 'Amenities', title: 'What do you offer on site?', description: 'Campers filter heavily on water, toilets, fires and hookups — be accurate.' },
{ key: 'activities', label: 'Activities', title: 'What’s there to do nearby?', description: 'Highlight the adventures within a short walk or drive.' },
{ key: 'pricing', label: 'Pricing & rules', title: 'Set your price and rules', description: 'You can change these anytime. Most hosts start a little lower to earn first reviews.' },
{ key: 'calendar', label: 'Calendar', title: 'Which nights are open?', description: 'Tap dates to block them. Everything else is bookable.' },
{ key: 'photos', label: 'Photos', title: 'Show campers your land', description: 'Great photos are the #1 driver of bookings. Add at least 3.' }];
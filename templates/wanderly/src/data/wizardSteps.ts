export const wizardSteps = [
{ slug: 'details', label: 'Experience details', description: 'Name it and tell guests what makes it special.' },
{ slug: 'category', label: 'Category', description: 'Help travelers find you in search.' },
{ slug: 'itinerary', label: 'Itinerary', description: 'Walk guests through what they’ll do, step by step.' },
{ slug: 'group-size', label: 'Group size & seats', description: 'Set how many seats each departure has.' },
{ slug: 'schedule', label: 'Departure schedule', description: 'Choose the days and times you run it.' },
{ slug: 'pricing', label: 'Pricing', description: 'Set a per-person price and an optional private rate.' },
{ slug: 'meeting-point', label: 'Meeting point', description: 'Tell guests exactly where to find you.' },
{ slug: 'photos', label: 'Photos', description: 'Great photos are the #1 driver of bookings.' }] as
const;

export type WizardStepSlug = (typeof wizardSteps)[number]['slug'];
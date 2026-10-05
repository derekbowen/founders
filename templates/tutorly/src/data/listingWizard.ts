export type WizardStepId = 'about' | 'subjects' | 'credentials' | 'pricing' | 'availability' | 'media';

export const wizardSteps: {id: WizardStepId;title: string;description: string;}[] = [
{ id: 'about', title: 'About you', description: 'Introduce yourself to students and parents.' },
{ id: 'subjects', title: 'Subjects & levels', description: 'Choose what you teach and who you teach.' },
{ id: 'credentials', title: 'Credentials', description: 'Add degrees and certificates. We verify them for you.' },
{ id: 'pricing', title: 'Pricing & packages', description: 'Set your hourly rate and package discounts.' },
{ id: 'availability', title: 'Weekly availability', description: 'Select the hours students can book each week.' },
{ id: 'media', title: 'Intro video & photo', description: 'Profiles with a video get 3× more bookings.' }];


export const availabilityPresets: {label: string;days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];hours: number[];}[] = [
{ label: 'Weekday afternoons', days: ['mon', 'tue', 'wed', 'thu', 'fri'], hours: [15, 16, 17] },
{ label: 'Weekday evenings', days: ['mon', 'tue', 'wed', 'thu'], hours: [18, 19, 20] },
{ label: 'Weekend mornings', days: ['sat', 'sun'], hours: [9, 10, 11, 12] }];
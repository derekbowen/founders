import type { CancellationPolicyId, PackageId } from '../types/marketplace';

export const packages: {id: PackageId;label: string;hours: number;departures: string[];}[] = [
{ id: 'half', label: 'Half day', hours: 4, departures: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM'] },
{ id: 'full', label: 'Full day', hours: 8, departures: ['9:00 AM – 5:00 PM'] }];


export const cancellationPolicies: Record<CancellationPolicyId, {label: string;summary: string;}> = {
  flexible: { label: 'Flexible', summary: 'Full refund up to 24 hours before departure. 50% refund after that.' },
  moderate: { label: 'Moderate', summary: 'Full refund up to 5 days before departure. 50% refund up to 48 hours before.' },
  strict: { label: 'Strict', summary: 'Full refund up to 14 days before departure. 50% refund up to 7 days before.' }
};

export const weatherPolicy =
'If the captain or owner determines conditions are unsafe (small-craft advisory, lightning, or sustained winds over 25 knots), you can reschedule for free or receive a full refund — including service fees.';

export const experienceOptions = [
{ id: 'licensed', label: 'I hold a state boater education card or license', hint: 'Upload it after booking — required for bareboat trips.' },
{ id: 'experienced', label: 'I’ve operated a similar boat (3+ times)', hint: 'The owner may ask for a short check-out ride.' },
{ id: 'none', label: 'I’m new to boating', hint: 'We recommend adding a captain — you just enjoy the day.' }];


export const MAX_GUEST_DEFAULT = 6;
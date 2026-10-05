import { AgeGroup, Certification, DayKey, Slot } from '../types/sitter';
import { SortKey } from '../types/search';

export const ageGroupOptions: {value: AgeGroup;hint: string;}[] = [
{ value: 'Newborn', hint: '0–12 mo' },
{ value: 'Toddler', hint: '1–3 yrs' },
{ value: 'Preschool', hint: '3–5 yrs' },
{ value: 'School age', hint: '6–10 yrs' },
{ value: 'Pre-teen', hint: '11–13 yrs' }];


export const certificationOptions: Certification[] = ['CPR', 'First aid', 'Newborn care', 'Special needs', 'Early childhood ed'];

export const languageOptions = ['English', 'Spanish', 'Mandarin', 'Hindi', 'French', 'Arabic', 'ASL', 'Tagalog', 'German', 'Polish'];

export const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'rating', label: 'Top rated' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'experience', label: 'Most experienced' }];


export const days: DayKey[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const slots: {value: Slot;hours: string;}[] = [
{ value: 'Morning', hours: '7am–12pm' },
{ value: 'Afternoon', hours: '12–5pm' },
{ value: 'Evening', hours: '5–11pm' },
{ value: 'Overnight', hours: '11pm–7am' }];


export const priceBounds: [number, number] = [15, 40];
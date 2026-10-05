import type { DayKey, TimeOfDay } from '../types/marketplace';

export const weekDays: {key: DayKey;short: string;long: string;}[] = [
{ key: 'mon', short: 'Mon', long: 'Monday' },
{ key: 'tue', short: 'Tue', long: 'Tuesday' },
{ key: 'wed', short: 'Wed', long: 'Wednesday' },
{ key: 'thu', short: 'Thu', long: 'Thursday' },
{ key: 'fri', short: 'Fri', long: 'Friday' },
{ key: 'sat', short: 'Sat', long: 'Saturday' },
{ key: 'sun', short: 'Sun', long: 'Sunday' }];


export const timesOfDay: {key: TimeOfDay;label: string;range: string;start: number;end: number;}[] = [
{ key: 'morning', label: 'Morning', range: '6 AM – 12 PM', start: 6, end: 12 },
{ key: 'afternoon', label: 'Afternoon', range: '12 – 5 PM', start: 12, end: 17 },
{ key: 'evening', label: 'Evening', range: '5 – 11 PM', start: 17, end: 23 }];


/** Hours offered in the tutor availability editor (7 AM – 9 PM start times). */
export const editableHours: number[] = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
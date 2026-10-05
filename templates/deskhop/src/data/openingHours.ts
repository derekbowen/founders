import type { DayHours } from '../types/listing';

export const HOURS_STANDARD: DayHours[] = [
{ day: 'Mon', open: '08:00', close: '19:00' },
{ day: 'Tue', open: '08:00', close: '19:00' },
{ day: 'Wed', open: '08:00', close: '19:00' },
{ day: 'Thu', open: '08:00', close: '19:00' },
{ day: 'Fri', open: '08:00', close: '18:00' },
{ day: 'Sat', open: '09:00', close: '17:00' },
{ day: 'Sun', open: null, close: null }];


export const HOURS_EXTENDED: DayHours[] = [
{ day: 'Mon', open: '07:00', close: '22:00' },
{ day: 'Tue', open: '07:00', close: '22:00' },
{ day: 'Wed', open: '07:00', close: '22:00' },
{ day: 'Thu', open: '07:00', close: '22:00' },
{ day: 'Fri', open: '07:00', close: '21:00' },
{ day: 'Sat', open: '09:00', close: '18:00' },
{ day: 'Sun', open: '10:00', close: '18:00' }];


export const HOURS_ALWAYS: DayHours[] = [
{ day: 'Mon', open: '00:00', close: '24:00' },
{ day: 'Tue', open: '00:00', close: '24:00' },
{ day: 'Wed', open: '00:00', close: '24:00' },
{ day: 'Thu', open: '00:00', close: '24:00' },
{ day: 'Fri', open: '00:00', close: '24:00' },
{ day: 'Sat', open: '00:00', close: '24:00' },
{ day: 'Sun', open: '00:00', close: '24:00' }];


export const HOURS_WEEKDAYS: DayHours[] = [
{ day: 'Mon', open: '09:00', close: '18:00' },
{ day: 'Tue', open: '09:00', close: '18:00' },
{ day: 'Wed', open: '09:00', close: '18:00' },
{ day: 'Thu', open: '09:00', close: '18:00' },
{ day: 'Fri', open: '09:00', close: '17:00' },
{ day: 'Sat', open: null, close: null },
{ day: 'Sun', open: null, close: null }];
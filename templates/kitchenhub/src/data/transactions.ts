import type { Transaction } from '../types/marketplace';

export const transactions: Transaction[] = [
{
  id: 't-1001', role: 'customer', listingId: 'k-102',
  counterpartName: 'Daniel Reyes', counterpartBusiness: 'Flour & Steam',
  status: 'approved', date: '2026-10-06', startHour: 14, hours: 4, storage: ['dry'],
  messages: [
  { id: 'm1', from: 'me', text: 'Hi Daniel! Planning a holiday cookie run — 40 dozen. Is the sheeter available that afternoon?', at: '2026-09-28T10:12:00' },
  { id: 'm2', from: 'them', text: 'Yes, it’s all yours. I’ll leave two speed racks cleared for you near the deck oven.', at: '2026-09-28T11:02:00' },
  { id: 'm3', from: 'me', text: 'Perfect, thank you!', at: '2026-09-28T11:05:00' }],

  timeline: [
  { label: 'Booking requested', at: '2026-09-28T10:10:00' },
  { label: 'Host approved the booking', at: '2026-09-28T11:01:00' }],

  checklistDone: []
},
{
  id: 't-1002', role: 'customer', listingId: 'k-105',
  counterpartName: 'Elena Novak', counterpartBusiness: 'Novak Hospitality',
  status: 'requested', date: '2026-10-07', startHour: 9, hours: 3, storage: [],
  messages: [
  { id: 'm1', from: 'me', text: 'Hoping to shoot content for our new tasting menu. Is natural light best in the morning?', at: '2026-09-30T16:40:00' }],

  timeline: [{ label: 'Booking requested', at: '2026-09-30T16:38:00' }],
  checklistDone: []
},
{
  id: 't-1003', role: 'customer', listingId: 'k-109',
  counterpartName: 'Elena Novak', counterpartBusiness: 'Novak Hospitality',
  status: 'in-session', date: '2026-10-01', startHour: 8, hours: 5, storage: ['cold'],
  messages: [
  { id: 'm1', from: 'them', text: 'Door code is on your booking confirmation. Tempering machine is pre-heated!', at: '2026-10-01T07:45:00' },
  { id: 'm2', from: 'me', text: 'Amazing — just arrived.', at: '2026-10-01T08:03:00' }],

  timeline: [
  { label: 'Booking requested', at: '2026-09-25T09:00:00' },
  { label: 'Host approved the booking', at: '2026-09-25T12:20:00' },
  { label: 'Session started', at: '2026-10-01T08:00:00' }],

  checklistDone: ['surfaces', 'equipment']
},
{
  id: 't-1004', role: 'customer', listingId: 'k-104',
  counterpartName: 'Marcus Bell', counterpartBusiness: 'Prep Lab',
  status: 'completed', date: '2026-09-20', startHour: 6, hours: 6, storage: ['cold', 'frozen'],
  messages: [
  { id: 'm1', from: 'them', text: 'Thanks for leaving it so clean. Come back anytime!', at: '2026-09-20T13:10:00' }],

  timeline: [
  { label: 'Booking requested', at: '2026-09-14T08:00:00' },
  { label: 'Host approved the booking', at: '2026-09-14T09:30:00' },
  { label: 'Session started', at: '2026-09-20T06:00:00' },
  { label: 'Cleaning signed off by host', at: '2026-09-20T12:45:00' },
  { label: 'Session completed', at: '2026-09-20T12:50:00' }],

  checklistDone: ['surfaces', 'equipment', 'floors', 'trash', 'storage', 'photos']
},
{
  id: 't-1005', role: 'customer', listingId: 'k-107',
  counterpartName: 'Daniel Reyes', counterpartBusiness: 'Flour & Steam',
  status: 'cancelled', date: '2026-09-27', startHour: 10, hours: 2, storage: [],
  messages: [
  { id: 'm1', from: 'me', text: 'So sorry — our client postponed the event. Cancelling for now.', at: '2026-09-22T17:00:00' },
  { id: 'm2', from: 'them', text: 'No problem at all, hope to see you soon.', at: '2026-09-22T18:15:00' }],

  timeline: [
  { label: 'Booking requested', at: '2026-09-20T10:00:00' },
  { label: 'Host approved the booking', at: '2026-09-20T11:00:00' },
  { label: 'Cancelled by you', at: '2026-09-22T17:00:00' }],

  checklistDone: []
},
{
  id: 't-2001', role: 'provider', listingId: 'k-101',
  counterpartName: 'Luis Romero', counterpartBusiness: 'Taquería Romero',
  status: 'requested', date: '2026-10-04', startHour: 6, hours: 4, storage: ['cold'],
  messages: [
  { id: 'm1', from: 'them', text: 'Hola Maya! Need the fryers Saturday morning for a festival. Insurance cert is uploaded.', at: '2026-09-30T20:14:00' }],

  timeline: [{ label: 'Booking requested', at: '2026-09-30T20:12:00' }],
  checklistDone: []
},
{
  id: 't-2002', role: 'provider', listingId: 'k-112',
  counterpartName: 'Hannah Kim', counterpartBusiness: 'Seoul Bowl',
  status: 'approved', date: '2026-10-03', startHour: 7, hours: 6, storage: ['cold', 'frozen'],
  messages: [
  { id: 'm1', from: 'them', text: 'Can we get stations 3–6 together? Team of four.', at: '2026-09-27T09:20:00' },
  { id: 'm2', from: 'me', text: 'Done — I’ve blocked them for you. Walk-in shelf B is yours too.', at: '2026-09-27T09:41:00' }],

  timeline: [
  { label: 'Booking requested', at: '2026-09-27T09:18:00' },
  { label: 'You approved the booking', at: '2026-09-27T09:40:00' }],

  checklistDone: []
},
{
  id: 't-2003', role: 'provider', listingId: 'k-101',
  counterpartName: 'Grace Thompson', counterpartBusiness: 'Golden Crumb Bakery',
  status: 'in-session', date: '2026-10-01', startHour: 4, hours: 6, storage: ['dry'],
  messages: [
  { id: 'm1', from: 'them', text: 'Made it in! Ovens heating up now.', at: '2026-10-01T04:06:00' }],

  timeline: [
  { label: 'Booking requested', at: '2026-09-24T15:00:00' },
  { label: 'You approved the booking', at: '2026-09-24T15:30:00' },
  { label: 'Session started', at: '2026-10-01T04:00:00' }],

  checklistDone: ['surfaces']
},
{
  id: 't-2004', role: 'provider', listingId: 'k-101',
  counterpartName: 'Andre Wallace', counterpartBusiness: 'Wallace Events Catering',
  status: 'completed', date: '2026-09-25', startHour: 9, hours: 8, storage: [],
  messages: [
  { id: 'm1', from: 'them', text: 'Wedding went great — thank you for the early access!', at: '2026-09-25T18:30:00' },
  { id: 'm2', from: 'me', text: 'Congrats! Kitchen looked perfect after. Left you a review.', at: '2026-09-25T19:02:00' }],

  timeline: [
  { label: 'Booking requested', at: '2026-09-15T10:00:00' },
  { label: 'You approved the booking', at: '2026-09-15T10:20:00' },
  { label: 'Session started', at: '2026-09-25T09:00:00' },
  { label: 'Cleaning signed off', at: '2026-09-25T17:10:00' },
  { label: 'Session completed', at: '2026-09-25T17:15:00' }],

  checklistDone: ['surfaces', 'equipment', 'floors', 'trash', 'storage', 'photos']
}];
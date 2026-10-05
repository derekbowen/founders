import { defaultChecklist, withDone } from '../utils/transactions';
import type { Transaction } from '../types/marketplace';

export const transactions: Transaction[] = [
{
  id: 'tx-1001', listingId: 'l-1', customerId: 'u-me', providerId: 'u-marco', status: 'requested',
  tripDate: '2026-10-17', pkg: 'full', departure: '9:00 AM – 5:00 PM', withCaptain: true, guests: 8, experience: 'experienced',
  history: { requested: '2026-09-29T18:12:00' },
  messages: [
  { id: 'm-1', senderId: 'u-me', text: 'Hi Marco! Celebrating my sister’s engagement — could we do the Haulover sandbar and a skyline cruise at the end?', sentAt: '2026-09-29T18:12:00' },
  { id: 'm-2', senderId: 'u-marco', text: 'Congratulations to her! Absolutely — Ray loves that route. I’ll confirm the 17th by tomorrow morning.', sentAt: '2026-09-29T19:40:00' }],

  checklist: defaultChecklist(true)
},
{
  id: 'tx-1002', listingId: 'l-3', customerId: 'u-me', providerId: 'u-claire', status: 'confirmed',
  tripDate: '2026-10-09', pkg: 'half', departure: '1:00 PM – 5:00 PM', withCaptain: false, guests: 4, experience: 'licensed',
  history: { requested: '2026-09-20T10:05:00', confirmed: '2026-09-20T14:30:00' },
  messages: [
  { id: 'm-3', senderId: 'u-me', text: 'Looking forward to sailing Windward! I hold an ASA 104 certificate.', sentAt: '2026-09-20T10:05:00' },
  { id: 'm-4', senderId: 'u-claire', text: 'Perfect, confirmed. Meet me at slip C-14 at 12:45 for a quick check-out sail.', sentAt: '2026-09-20T14:30:00' }],

  checklist: withDone(defaultChecklist(false), 2)
},
{
  id: 'tx-1003', listingId: 'l-4', customerId: 'u-me', providerId: 'u-hank', status: 'on-the-water',
  tripDate: '2026-10-01', pkg: 'full', departure: '9:00 AM – 5:00 PM', withCaptain: true, guests: 4, experience: 'experienced',
  history: { requested: '2026-09-10T08:00:00', confirmed: '2026-09-10T09:15:00', 'on-the-water': '2026-10-01T09:04:00' },
  messages: [
  { id: 'm-5', senderId: 'u-hank', text: 'Tomás says the mahi are thick on the weed line. Bring a hat!', sentAt: '2026-09-30T17:20:00' },
  { id: 'm-6', senderId: 'u-me', text: 'Ha, will do. See you at 8:45.', sentAt: '2026-09-30T17:45:00' }],

  checklist: withDone(defaultChecklist(true), 5)
},
{
  id: 'tx-1004', listingId: 'l-2', customerId: 'u-me', providerId: 'u-devon', status: 'completed',
  tripDate: '2026-08-14', pkg: 'full', departure: '9:00 AM – 5:00 PM', withCaptain: false, guests: 9, experience: 'licensed',
  history: { requested: '2026-07-30T12:00:00', confirmed: '2026-07-30T15:00:00', 'on-the-water': '2026-08-14T09:02:00', completed: '2026-08-14T17:05:00' },
  messages: [
  { id: 'm-7', senderId: 'u-devon', text: 'Thanks for taking such good care of the boat! Deposit released.', sentAt: '2026-08-14T18:00:00' }],

  checklist: withDone(defaultChecklist(false), 6)
},
{
  id: 'tx-1005', listingId: 'l-7', customerId: 'u-me', providerId: 'u-claire', status: 'cancelled',
  tripDate: '2026-09-05', pkg: 'half', departure: '8:00 AM – 12:00 PM', withCaptain: true, guests: 2, experience: 'none',
  history: { requested: '2026-08-28T09:00:00', confirmed: '2026-08-28T11:00:00', cancelled: '2026-09-04T16:00:00' },
  messages: [
  { id: 'm-8', senderId: 'u-claire', text: 'Small-craft advisory tomorrow — I’ve cancelled with a full refund per our weather policy. So sorry!', sentAt: '2026-09-04T16:00:00' }],

  checklist: defaultChecklist(true)
},
{
  id: 'tx-2001', listingId: 'l-12', customerId: 'u-priya', providerId: 'u-me', status: 'requested',
  tripDate: '2026-10-24', pkg: 'full', departure: '9:00 AM – 5:00 PM', withCaptain: true, guests: 10, experience: 'none',
  history: { requested: '2026-09-30T21:10:00' },
  messages: [
  { id: 'm-9', senderId: 'u-priya', text: 'Hi Jordan! Planning a birthday for 10. Could we anchor off La Jolla Cove for lunch?', sentAt: '2026-09-30T21:10:00' }],

  checklist: defaultChecklist(true)
},
{
  id: 'tx-2002', listingId: 'l-12', customerId: 'u-ben', providerId: 'u-me', status: 'confirmed',
  tripDate: '2026-10-11', pkg: 'half', departure: '8:00 AM – 12:00 PM', withCaptain: false, guests: 5, experience: 'licensed',
  history: { requested: '2026-09-25T13:00:00', confirmed: '2026-09-25T13:40:00' },
  messages: [
  { id: 'm-10', senderId: 'u-ben', text: 'Thanks for confirming! I’ve uploaded my California Boater Card.', sentAt: '2026-09-25T14:02:00' }],

  checklist: withDone(defaultChecklist(false), 3)
},
{
  id: 'tx-2003', listingId: 'l-12', customerId: 'u-nora', providerId: 'u-me', status: 'completed',
  tripDate: '2026-09-20', pkg: 'full', departure: '9:00 AM – 5:00 PM', withCaptain: true, guests: 6, experience: 'experienced',
  history: { requested: '2026-09-01T10:00:00', confirmed: '2026-09-01T12:00:00', 'on-the-water': '2026-09-20T09:00:00', completed: '2026-09-20T17:10:00' },
  messages: [
  { id: 'm-11', senderId: 'u-nora', text: 'We saw dolphins! Thank you for a wonderful day.', sentAt: '2026-09-20T19:00:00' }],

  checklist: withDone(defaultChecklist(true), 6)
}];
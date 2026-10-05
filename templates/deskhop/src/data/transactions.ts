import type { Transaction } from '../types/transaction';

export const transactions: Transaction[] = [
{
  id: 'tx-1001',
  listingId: 'canal-office-jordaan',
  customerId: 'u-me',
  providerId: 'u-daan',
  status: 'requested',
  date: '2026-10-08',
  mode: 'hour',
  start: '10:00',
  end: '14:00',
  seats: 1,
  doorCode: '4821',
  companyName: 'Lindqvist Studio',
  history: [{ status: 'requested', at: '2026-09-30T16:42:00' }],
  messages: [
  { id: 'm1', senderId: 'u-me', text: 'Hi Daan! We’d love the canal office for a client workshop. Is it OK if we bring our own snacks?', at: '2026-09-30T16:43:00' }]

},
{
  id: 'tx-1002',
  listingId: 'kreuzberg-loft',
  customerId: 'u-me',
  providerId: 'u-lena',
  status: 'confirmed',
  date: '2026-10-03',
  mode: 'day',
  start: '00:00',
  end: '24:00',
  seats: 2,
  doorCode: '7310',
  history: [
  { status: 'requested', at: '2026-09-27T09:10:00' },
  { status: 'confirmed', at: '2026-09-27T09:10:00' }],

  messages: [
  { id: 'm1', senderId: 'u-me', text: 'Booked two desks for me and a colleague on Saturday — looking forward to it!', at: '2026-09-27T09:12:00' },
  { id: 'm2', senderId: 'u-lena', text: 'Wonderful! I’ve reserved desks 7 and 8 by the window for you. See you Saturday.', at: '2026-09-27T10:05:00' }]

},
{
  id: 'tx-1003',
  listingId: 'mitte-phone-booth',
  customerId: 'u-me',
  providerId: 'u-lena',
  status: 'checked-in',
  date: '2026-10-01',
  mode: 'hour',
  start: '11:00',
  end: '12:00',
  seats: 1,
  doorCode: '1984',
  history: [
  { status: 'requested', at: '2026-09-29T18:00:00' },
  { status: 'confirmed', at: '2026-09-29T18:00:00' },
  { status: 'checked-in', at: '2026-10-01T10:57:00' }],

  messages: [
  { id: 'm1', senderId: 'u-lena', text: 'Booth 3 is yours — the code is in your booking. Good luck with the interview!', at: '2026-09-30T08:30:00' }]

},
{
  id: 'tx-1004',
  listingId: 'principe-real-meeting',
  customerId: 'u-me',
  providerId: 'u-ines',
  status: 'completed',
  date: '2026-09-18',
  mode: 'hour',
  start: '09:00',
  end: '13:00',
  seats: 1,
  doorCode: '5562',
  companyName: 'Lindqvist Studio',
  history: [
  { status: 'requested', at: '2026-09-10T12:00:00' },
  { status: 'confirmed', at: '2026-09-10T12:00:00' },
  { status: 'checked-in', at: '2026-09-18T08:52:00' },
  { status: 'completed', at: '2026-09-18T13:01:00' }],

  messages: [
  { id: 'm1', senderId: 'u-me', text: 'Could we have coffee for eight ready at 9?', at: '2026-09-15T14:00:00' },
  { id: 'm2', senderId: 'u-ines', text: 'Of course — and pastéis de nata on the house!', at: '2026-09-15T14:20:00' },
  { id: 'm3', senderId: 'u-me', text: 'You’re the best. Thank you for a great session.', at: '2026-09-18T13:05:00' }]

},
{
  id: 'tx-1005',
  listingId: 'soho-skyline-office',
  customerId: 'u-me',
  providerId: 'u-marcus',
  status: 'cancelled',
  date: '2026-09-24',
  mode: 'day',
  start: '00:00',
  end: '24:00',
  seats: 1,
  doorCode: '0000',
  history: [
  { status: 'requested', at: '2026-09-12T20:00:00' },
  { status: 'cancelled', at: '2026-09-14T09:30:00' }],

  messages: [
  { id: 'm1', senderId: 'u-marcus', text: 'So sorry Maya — the office is under maintenance that week. I’ve cancelled and you’ve been fully refunded.', at: '2026-09-14T09:31:00' }]

},
{
  id: 'tx-2001',
  listingId: 'clerkenwell-quiet-desks',
  customerId: 'u-jonas',
  providerId: 'u-me',
  status: 'requested',
  date: '2026-10-06',
  mode: 'day',
  start: '09:00',
  end: '18:00',
  seats: 3,
  doorCode: '3307',
  companyName: 'Weber Engineering GmbH',
  history: [{ status: 'requested', at: '2026-10-01T08:15:00' }],
  messages: [
  { id: 'm1', senderId: 'u-jonas', text: 'Hi Maya, three of us are in London next week for a client. Could we have three desks next to each other?', at: '2026-10-01T08:16:00' }]

},
{
  id: 'tx-2002',
  listingId: 'clerkenwell-quiet-desks',
  customerId: 'u-priya',
  providerId: 'u-me',
  status: 'confirmed',
  date: '2026-10-02',
  mode: 'hour',
  start: '09:00',
  end: '17:00',
  seats: 1,
  doorCode: '6620',
  history: [
  { status: 'requested', at: '2026-09-28T19:20:00' },
  { status: 'confirmed', at: '2026-09-28T20:02:00' }],

  messages: [
  { id: 'm1', senderId: 'u-priya', text: 'Back for another focus day!', at: '2026-09-28T19:21:00' },
  { id: 'm2', senderId: 'u-me', text: 'Yay — desk 4 by the window is yours.', at: '2026-09-28T20:03:00' }]

},
{
  id: 'tx-2003',
  listingId: 'clerkenwell-quiet-desks',
  customerId: 'u-sofia',
  providerId: 'u-me',
  status: 'checked-in',
  date: '2026-10-01',
  mode: 'day',
  start: '09:00',
  end: '18:00',
  seats: 2,
  doorCode: '2291',
  history: [
  { status: 'requested', at: '2026-09-25T11:00:00' },
  { status: 'confirmed', at: '2026-09-25T12:30:00' },
  { status: 'checked-in', at: '2026-10-01T09:04:00' }],

  messages: [{ id: 'm1', senderId: 'u-sofia', text: 'We’re in! Lovely space.', at: '2026-10-01T09:06:00' }]
},
{
  id: 'tx-2004',
  listingId: 'clerkenwell-quiet-desks',
  customerId: 'u-tom',
  providerId: 'u-me',
  status: 'completed',
  date: '2026-09-22',
  mode: 'hour',
  start: '13:00',
  end: '18:00',
  seats: 1,
  doorCode: '8814',
  history: [
  { status: 'requested', at: '2026-09-20T10:00:00' },
  { status: 'confirmed', at: '2026-09-20T10:45:00' },
  { status: 'checked-in', at: '2026-09-22T12:58:00' },
  { status: 'completed', at: '2026-09-22T18:00:00' }],

  messages: [{ id: 'm1', senderId: 'u-tom', text: 'Thanks Maya, super productive afternoon.', at: '2026-09-22T18:04:00' }]
}];
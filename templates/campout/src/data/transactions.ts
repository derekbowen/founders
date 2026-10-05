import type { Transaction } from '../types/transaction';

export const transactions: Transaction[] = [
{
  id: 'tx-1042',
  role: 'trip',
  listingId: 'creekside-meadow',
  otherUserId: 'u-hank',
  status: 'booked',
  start: '2026-10-09',
  end: '2026-10-11',
  campers: 3,
  vehicles: 1,
  total: 84,
  arrivalTime: '4:00 PM – 6:00 PM',
  updatedAt: '2026-09-29T16:12:00',
  messages: [
  { id: 'm1', fromMe: true, text: 'Hi Hank! We’re excited for our trip. Is the creek still running this late in the season?', at: '2026-09-27T10:02:00' },
  { id: 'm2', fromMe: false, text: 'Hey Jordan — yes, still a nice flow after the September rain. I’ll put you at site 3, right by the swimming hole.', at: '2026-09-27T11:40:00' },
  { id: 'm3', fromMe: true, text: 'Amazing, thank you! We’ll likely arrive around 5.', at: '2026-09-29T16:12:00' }],

  timeline: [
  { label: 'You requested to book', at: '2026-09-26T19:20:00' },
  { label: 'Instant booking confirmed', at: '2026-09-26T19:20:00' },
  { label: 'Payment of $84 received', at: '2026-09-26T19:21:00' }]

},
{
  id: 'tx-1038',
  role: 'trip',
  listingId: 'redwood-treehouse',
  otherUserId: 'u-eli',
  status: 'requested',
  start: '2026-10-23',
  end: '2026-10-25',
  campers: 2,
  vehicles: 1,
  total: 512,
  arrivalTime: '3:00 PM – 5:00 PM',
  updatedAt: '2026-09-30T09:05:00',
  messages: [
  { id: 'm1', fromMe: true, text: 'Hi Eli, we’d love to celebrate our anniversary in the treehouse. Any chance the skylight is clear this time of year?', at: '2026-09-30T09:05:00' }],

  timeline: [
  { label: 'You requested to book', at: '2026-09-30T09:04:00' },
  { label: 'Waiting for host to respond (expires in 48 h)', at: '2026-09-30T09:04:00' }]

},
{
  id: 'tx-1031',
  role: 'trip',
  listingId: 'starlight-desert-rv',
  otherUserId: 'u-carmen',
  status: 'completed',
  start: '2026-03-14',
  end: '2026-03-17',
  campers: 2,
  vehicles: 1,
  total: 169,
  arrivalTime: '2:00 PM – 4:00 PM',
  updatedAt: '2026-03-18T10:00:00',
  messages: [
  { id: 'm1', fromMe: false, text: 'Thanks for being such great guests! Come back for the Perseids in August.', at: '2026-03-17T12:30:00' },
  { id: 'm2', fromMe: true, text: 'Best skies we’ve ever seen. Left you a review — thank you Carmen!', at: '2026-03-18T10:00:00' }],

  timeline: [
  { label: 'Booking confirmed', at: '2026-02-20T08:15:00' },
  { label: 'Checked in', at: '2026-03-14T15:10:00' },
  { label: 'Checked out', at: '2026-03-17T10:40:00' },
  { label: 'You left a review', at: '2026-03-18T09:55:00' }]

},
{
  id: 'tx-1027',
  role: 'trip',
  listingId: 'cape-bluff',
  otherUserId: 'u-nora',
  status: 'cancelled',
  start: '2026-11-06',
  end: '2026-11-08',
  campers: 2,
  vehicles: 1,
  total: 114,
  arrivalTime: '1:00 PM – 3:00 PM',
  updatedAt: '2026-09-20T14:00:00',
  messages: [
  { id: 'm1', fromMe: true, text: 'So sorry Nora, a work trip came up. Hope to rebook in the spring!', at: '2026-09-20T13:58:00' },
  { id: 'm2', fromMe: false, text: 'No worries at all — the whales will be back in April.', at: '2026-09-20T14:00:00' }],

  timeline: [
  { label: 'Booking confirmed', at: '2026-09-02T11:00:00' },
  { label: 'You cancelled · full refund issued', at: '2026-09-20T13:58:00' }]

},
{
  id: 'tx-2051',
  role: 'hosting',
  listingId: 'pine-hollow-aframe',
  otherUserId: 'u-lena',
  status: 'requested',
  start: '2026-10-16',
  end: '2026-10-18',
  campers: 2,
  vehicles: 1,
  total: 413,
  arrivalTime: '5:00 PM – 7:00 PM',
  updatedAt: '2026-09-30T20:44:00',
  messages: [
  { id: 'm1', fromMe: false, text: 'Hi Jordan! My partner and I would love to stay at the A-frame. We have a very calm 3-year-old lab — is that okay?', at: '2026-09-30T20:44:00' }],

  timeline: [{ label: 'Lena requested to book', at: '2026-09-30T20:43:00' }]
},
{
  id: 'tx-2048',
  role: 'hosting',
  listingId: 'apple-hill-orchard',
  otherUserId: 'u-marcus',
  status: 'checked-in',
  start: '2026-09-30',
  end: '2026-10-03',
  campers: 2,
  vehicles: 1,
  total: 132,
  arrivalTime: '2:00 PM – 4:00 PM',
  updatedAt: '2026-09-30T15:22:00',
  messages: [
  { id: 'm1', fromMe: false, text: 'Just pulled in — site 2 is beautiful. Which rows are good for picking?', at: '2026-09-30T15:20:00' },
  { id: 'm2', fromMe: true, text: 'Welcome Marcus! Rows 4–7 (Honeycrisp) are perfect right now. Enjoy!', at: '2026-09-30T15:22:00' }],

  timeline: [
  { label: 'Booking confirmed', at: '2026-09-12T10:00:00' },
  { label: 'Marcus checked in', at: '2026-09-30T15:18:00' }]

},
{
  id: 'tx-2044',
  role: 'hosting',
  listingId: 'pine-hollow-aframe',
  otherUserId: 'u-tess',
  status: 'booked',
  start: '2026-11-13',
  end: '2026-11-16',
  campers: 4,
  vehicles: 1,
  total: 678,
  arrivalTime: '4:00 PM – 6:00 PM',
  updatedAt: '2026-09-25T12:00:00',
  messages: [{ id: 'm1', fromMe: false, text: 'Booked! Do you have a pack-n-play for our toddler?', at: '2026-09-25T12:00:00' }],
  timeline: [
  { label: 'Tess requested to book', at: '2026-09-24T18:00:00' },
  { label: 'You accepted the request', at: '2026-09-25T08:30:00' }]

},
{
  id: 'tx-2039',
  role: 'hosting',
  listingId: 'apple-hill-orchard',
  otherUserId: 'u-owen',
  status: 'completed',
  start: '2026-09-05',
  end: '2026-09-07',
  campers: 1,
  vehicles: 1,
  total: 88,
  arrivalTime: '6:00 PM – 8:00 PM',
  updatedAt: '2026-09-08T09:00:00',
  messages: [{ id: 'm1', fromMe: false, text: 'Thanks for the apples! Great stop on my bikepacking loop.', at: '2026-09-08T09:00:00' }],
  timeline: [
  { label: 'Booking confirmed', at: '2026-08-30T10:00:00' },
  { label: 'Owen checked in', at: '2026-09-05T18:40:00' },
  { label: 'Trip completed · payout sent', at: '2026-09-08T09:00:00' }]

}];
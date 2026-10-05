import type { Transaction } from '../types/marketplace';

export const transactionsSeed: Transaction[] = [
{
  id: 'tx-1042',
  role: 'storing',
  listingId: 'spare-room-alberta-arts',
  counterpartName: 'Grace Kim',
  status: 'requested',
  moveIn: '2026-10-12',
  moveOut: null,
  monthlyPrice: 149,
  deposit: 75,
  inventory: ['Queen bed frame (disassembled)', '12 medium moving boxes', 'Dresser', 'Bike'],
  messages: [
  { id: 'm1', from: 'system', text: 'Booking requested for Oct 12, 2026 · ongoing monthly', time: '2026-09-29T10:02:00' },
  { id: 'm2', from: 'me', text: 'Hi Grace! I\u2019m between leases and would love to store a 1-bed worth of things. Is Saturday morning OK for move-in?', time: '2026-09-29T10:03:00' }],

  accessLog: [],
  updatedAt: '2026-09-29T10:03:00',
  unread: false
},
{
  id: 'tx-1038',
  role: 'storing',
  listingId: 'single-garage-kerns',
  counterpartName: 'Grace Kim',
  status: 'accepted',
  moveIn: '2026-10-05',
  moveOut: '2027-01-05',
  monthlyPrice: 189,
  deposit: 100,
  inventory: ['Honda Civic (2015)', 'Winter tires (set of 4)'],
  messages: [
  { id: 'm1', from: 'system', text: 'Booking requested for Oct 5, 2026 – Jan 5, 2027', time: '2026-09-24T14:10:00' },
  { id: 'm2', from: 'them', text: 'Accepted! I\u2019ll send the keypad code the evening before move-in.', time: '2026-09-24T16:42:00' },
  { id: 'm3', from: 'system', text: 'Grace accepted your request', time: '2026-09-24T16:42:00' }],

  accessLog: [],
  updatedAt: '2026-09-24T16:42:00',
  unread: true
},
{
  id: 'tx-1011',
  role: 'storing',
  listingId: 'dry-basement-room-hawthorne',
  counterpartName: 'Daniel Reyes',
  status: 'active',
  moveIn: '2026-08-15',
  moveOut: null,
  monthlyPrice: 119,
  deposit: 75,
  inventory: ['Bookshelf', '20 book boxes', 'Desk', 'Record collection (4 crates)'],
  messages: [
  { id: 'm1', from: 'system', text: 'You moved in on Aug 15, 2026', time: '2026-08-15T11:00:00' },
  { id: 'm2', from: 'me', text: 'Could I swing by Thursday after 6 to grab a couple of boxes?', time: '2026-09-27T09:12:00' },
  { id: 'm3', from: 'them', text: 'Sure thing, side door will be unlocked from 6–8pm.', time: '2026-09-27T09:40:00' }],

  accessLog: [
  { id: 'a1', time: '2026-08-15T10:12:00', action: 'Entry', note: 'Move-in with 2 helpers' },
  { id: 'a2', time: '2026-08-15T12:40:00', action: 'Exit', note: 'Move-in complete' },
  { id: 'a3', time: '2026-09-04T18:20:00', action: 'Entry', note: 'Picked up desk lamp' },
  { id: 'a4', time: '2026-09-04T18:31:00', action: 'Exit', note: '' }],

  updatedAt: '2026-09-27T09:40:00',
  unread: false
},
{
  id: 'tx-0954',
  role: 'storing',
  listingId: 'sunny-two-car-garage-sellwood',
  counterpartName: 'Maya Okafor',
  status: 'completed',
  moveIn: '2026-01-10',
  moveOut: '2026-06-30',
  monthlyPrice: 289,
  deposit: 150,
  inventory: ['Full 2-bedroom home during remodel'],
  messages: [
  { id: 'm1', from: 'system', text: 'Booking completed on Jun 30, 2026 · deposit refunded', time: '2026-06-30T17:00:00' },
  { id: 'm2', from: 'them', text: 'Thanks Jordan, it was a pleasure. Good luck with the new kitchen!', time: '2026-06-30T17:20:00' }],

  accessLog: [
  { id: 'a1', time: '2026-06-30T09:00:00', action: 'Entry', note: 'Move-out' },
  { id: 'a2', time: '2026-06-30T13:15:00', action: 'Exit', note: 'Space cleared and swept' }],

  updatedAt: '2026-06-30T17:20:00',
  unread: false
},
{
  id: 'tx-1045',
  role: 'hosting',
  listingId: 'garage-half-bay-cully',
  counterpartName: 'Sam Patel',
  status: 'requested',
  moveIn: '2026-10-08',
  moveOut: '2026-12-08',
  monthlyPrice: 95,
  deposit: 50,
  inventory: ['Motorcycle (Triumph Bonneville)', 'Riding gear tote', '4 small boxes'],
  messages: [
  { id: 'm1', from: 'system', text: 'Sam requested Oct 8 – Dec 8, 2026', time: '2026-09-30T19:22:00' },
  { id: 'm2', from: 'them', text: 'Hey Jordan — just need somewhere dry for my bike over the winter. Happy to bring my own cover.', time: '2026-09-30T19:23:00' }],

  accessLog: [],
  updatedAt: '2026-09-30T19:23:00',
  unread: true
},
{
  id: 'tx-1020',
  role: 'hosting',
  listingId: 'driveway-parking-cully',
  counterpartName: 'Lena Fischer',
  status: 'active',
  moveIn: '2026-09-01',
  moveOut: null,
  monthlyPrice: 110,
  deposit: 50,
  inventory: ['Ford Transit camper van'],
  messages: [
  { id: 'm1', from: 'system', text: 'Lena moved in on Sep 1, 2026', time: '2026-09-01T08:30:00' },
  { id: 'm2', from: 'them', text: 'Heading out for the weekend Friday, back Sunday night!', time: '2026-09-25T12:05:00' }],

  accessLog: [
  { id: 'a1', time: '2026-09-26T07:10:00', action: 'Exit', note: 'Van out for the weekend' },
  { id: 'a2', time: '2026-09-28T21:45:00', action: 'Entry', note: 'Van returned' }],

  updatedAt: '2026-09-28T21:45:00',
  unread: false
},
{
  id: 'tx-0990',
  role: 'hosting',
  listingId: 'garage-half-bay-cully',
  counterpartName: 'Chris Moreno',
  status: 'ending',
  moveIn: '2026-05-01',
  moveOut: '2026-10-15',
  monthlyPrice: 95,
  deposit: 50,
  inventory: ['Kayak', 'Camping gear (3 bins)'],
  messages: [
  { id: 'm1', from: 'them', text: 'I\u2019ve given notice — planning to clear everything out on the 15th.', time: '2026-09-15T10:00:00' },
  { id: 'm2', from: 'system', text: 'Move-out scheduled for Oct 15, 2026', time: '2026-09-15T10:01:00' }],

  accessLog: [{ id: 'a1', time: '2026-09-20T16:00:00', action: 'Entry', note: 'Took camping bin' }],
  updatedAt: '2026-09-15T10:01:00',
  unread: false
},
{
  id: 'tx-0901',
  role: 'hosting',
  listingId: 'driveway-parking-cully',
  counterpartName: 'Ava Thompson',
  status: 'completed',
  moveIn: '2026-03-01',
  moveOut: '2026-07-31',
  monthlyPrice: 110,
  deposit: 50,
  inventory: ['Utility trailer'],
  messages: [{ id: 'm1', from: 'system', text: 'Booking completed on Jul 31, 2026', time: '2026-07-31T18:00:00' }],
  accessLog: [],
  updatedAt: '2026-07-31T18:00:00',
  unread: false
}];
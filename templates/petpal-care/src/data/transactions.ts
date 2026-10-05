import type { Transaction } from '../types/transaction';

const update1 = "/39488fec-0eb0-4f8e-8b9b-87fed47f39d6.jpg";
const update2 = "/acbdfe8f-5731-4f0b-9e09-f8624c072506.jpg";
const yard = "/686df307-6ae7-4b47-90ed-c99b097ef3eb.jpg";
const walk = "/4b68e447-1ea1-44a7-a64b-9f35075212ec.jpg";
const nap = "/92222282-97ab-47c2-9d84-6364d4a48192.jpg";

export const transactions: Transaction[] = [
// ── My pets' stays (I'm the customer) ──
{
  id: 'tx-1001',
  role: 'customer',
  status: 'in-care',
  listingId: 'ben-sellwood',
  counterpartName: 'Ben Okafor',
  serviceId: 'boarding',
  variantId: 'small',
  start: '2026-09-29',
  end: '2026-10-03',
  petNames: ['Pip'],
  createdAt: '2026-09-15T10:12:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Hi Ben! Pip is a little escape artist — please double-check the gate latch.', time: '2026-09-15T10:12:00' },
  { id: 'm2', from: 'them', text: 'Totally noted. The garden gate has a double latch, so he’ll be safe. Can’t wait to meet him!', time: '2026-09-15T11:03:00' },
  { id: 'm3', from: 'them', text: 'Pip has settled in great. He and Biscuit already did three laps of the yard 😄', time: '2026-09-29T18:40:00' },
  { id: 'm4', from: 'me', text: 'That’s amazing, thank you! Did he eat his dinner?', time: '2026-09-29T19:02:00' },
  { id: 'm5', from: 'them', text: 'Every crumb, plus his joint supplement in a bit of peanut butter.', time: '2026-09-29T19:10:00' }],

  photoUpdates: [
  { id: 'p1', image: yard, caption: 'Zoomies with Biscuit in the garden', time: '2026-09-29T16:20:00' },
  { id: 'p2', image: update1, caption: 'Morning walk by the river — very proud of himself', time: '2026-09-30T08:15:00' },
  { id: 'p3', image: nap, caption: 'Post-walk nap by the fireplace', time: '2026-09-30T13:45:00' }]

},
{
  id: 'tx-1002',
  role: 'customer',
  status: 'requested',
  listingId: 'maya-alberta',
  counterpartName: 'Maya Chen',
  serviceId: 'boarding',
  variantId: 'large',
  start: '2026-10-15',
  end: '2026-10-19',
  petNames: ['Rocco'],
  createdAt: '2026-09-30T20:30:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Hi Maya, we’re heading to a wedding in Seattle. Rocco is a goofy boxer who loves other dogs — would he be a good fit with Juniper?', time: '2026-09-30T20:30:00' }],

  photoUpdates: []
},
{
  id: 'tx-1003',
  role: 'customer',
  status: 'confirmed',
  listingId: 'grace-multnomah',
  counterpartName: 'Grace Whitfield',
  serviceId: 'drop-in',
  variantId: '30',
  start: '2026-10-06',
  sessionTime: '09:00',
  petNames: ['Miso'],
  createdAt: '2026-09-27T09:00:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Miso needs wet food and a quick litter scoop. Key is in the lockbox — code coming separately.', time: '2026-09-27T09:00:00' },
  { id: 'm2', from: 'them', text: 'Perfect, I’ve confirmed. I’ll bring some freeze-dried chicken to win her over.', time: '2026-09-27T10:21:00' }],

  photoUpdates: []
},
{
  id: 'tx-1004',
  role: 'customer',
  status: 'completed',
  listingId: 'hannah-laurelhurst',
  counterpartName: 'Hannah Lee',
  serviceId: 'dog-walking',
  variantId: '60',
  start: '2026-09-20',
  sessionTime: '12:00',
  petNames: ['Rocco'],
  createdAt: '2026-09-17T14:00:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Rocco pulls toward squirrels, fair warning!', time: '2026-09-17T14:00:00' },
  { id: 'm2', from: 'them', text: 'Ha, aren’t they all. I use a front-clip harness — I’ll bring one.', time: '2026-09-17T14:20:00' },
  { id: 'm3', from: 'them', text: 'Great walk today! 4.1 km around Laurelhurst Park, two squirrels spotted, zero chased.', time: '2026-09-20T13:05:00' }],

  photoUpdates: [
  { id: 'p1', image: walk, caption: 'Strolling the park loop', time: '2026-09-20T12:25:00' },
  { id: 'p2', image: update1, caption: 'Water break by the pond', time: '2026-09-20T12:48:00' }]

},
{
  id: 'tx-1005',
  role: 'customer',
  status: 'cancelled',
  listingId: 'priya-stjohns',
  counterpartName: 'Priya Nair',
  serviceId: 'boarding',
  variantId: 'large',
  start: '2026-09-12',
  end: '2026-09-14',
  petNames: ['Rocco'],
  createdAt: '2026-09-01T08:45:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Our trip got postponed, so I’m cancelling — sorry Priya! Hope to book soon.', time: '2026-09-05T09:00:00' },
  { id: 'm2', from: 'them', text: 'No worries at all, Otis will be waiting!', time: '2026-09-05T09:40:00' }],

  photoUpdates: []
},

// ── Sitting (I'm the provider) ──
{
  id: 'tx-2001',
  role: 'provider',
  status: 'requested',
  listingId: 'jordan-richmond',
  counterpartName: 'Lena Ortiz',
  serviceId: 'boarding',
  variantId: 'small',
  start: '2026-10-16',
  end: '2026-10-19',
  petNames: ['Toby'],
  createdAt: '2026-09-30T17:15:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Hi Jordan! Toby (corgi, 3) stayed with you in September and loved it. Any chance you’re free mid-October?', time: '2026-09-30T17:15:00' }],

  photoUpdates: []
},
{
  id: 'tx-2002',
  role: 'provider',
  status: 'in-care',
  listingId: 'jordan-richmond',
  counterpartName: 'Chris Nguyen',
  serviceId: 'boarding',
  variantId: 'small',
  start: '2026-09-30',
  end: '2026-10-04',
  petNames: ['Maple', 'Bean'],
  createdAt: '2026-09-20T12:00:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Maple is the bossy one, Bean is a sweetheart. Both eat at 7am and 6pm.', time: '2026-09-20T12:00:00' },
  { id: 'm2', from: 'me', text: 'Got it! Rocco and Pip are excited to meet them.', time: '2026-09-20T12:30:00' },
  { id: 'm3', from: 'them', text: 'How are they settling in?', time: '2026-09-30T19:00:00' }],

  photoUpdates: [
  { id: 'p1', image: yard, caption: 'First yard session — Bean already loves the tennis balls', time: '2026-09-30T17:10:00' }]

},
{
  id: 'tx-2003',
  role: 'provider',
  status: 'confirmed',
  listingId: 'jordan-richmond',
  counterpartName: 'Sam Patel',
  serviceId: 'dog-walking',
  variantId: '30',
  start: '2026-10-04',
  sessionTime: '17:00',
  petNames: ['Luna'],
  createdAt: '2026-09-28T08:20:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Luna is friendly but a bit nervous around bikes.', time: '2026-09-28T08:20:00' },
  { id: 'm2', from: 'me', text: 'Thanks for the heads up — we’ll stick to quieter side streets.', time: '2026-09-28T09:00:00' }],

  photoUpdates: []
},
{
  id: 'tx-2004',
  role: 'provider',
  status: 'completed',
  listingId: 'jordan-richmond',
  counterpartName: 'Kelsey Morgan',
  serviceId: 'boarding',
  variantId: 'small',
  start: '2026-09-10',
  end: '2026-09-13',
  petNames: ['Toby'],
  createdAt: '2026-08-29T15:00:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Thanks so much, Toby had the best time!', time: '2026-09-13T18:00:00' }],

  photoUpdates: [
  { id: 'p1', image: update1, caption: 'Toby says hi from the park', time: '2026-09-11T10:00:00' },
  { id: 'p2', image: update2, caption: 'Breakfast is served', time: '2026-09-12T07:30:00' }]

}];
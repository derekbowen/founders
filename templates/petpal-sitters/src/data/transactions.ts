import type { Transaction } from '../types/marketplace';
import { images } from './images';

export const initialTransactions: Transaction[] = [
{
  id: 'tx-1042',
  role: 'customer',
  listingId: 'maya-sellwood',
  listingTitle: 'Sunny Sellwood home with a big fenced yard',
  counterpartName: 'Maya Collins',
  counterpartAvatar: images.portraits[0],
  petNames: ['Biscuit'],
  petPhoto: images.pets.biscuit,
  serviceId: 'boarding',
  variationLabel: 'Standard night',
  unitPrice: 48,
  extraPetPrice: 20,
  startDay: -2,
  endDay: 3,
  pets: 1,
  status: 'in-care',
  unread: true,
  messages: [
  { id: 'm1', from: 'system', text: 'Booking requested', time: 'Sep 24' },
  { id: 'm2', from: 'them', text: 'Hi Jordan! I’d love to host Biscuit. Does he do okay with cats? My senior cat Olive mostly ignores dogs.', time: 'Sep 24, 4:12 PM' },
  { id: 'm3', from: 'me', text: 'He’s great with cats — he lived with one until last year. Thanks so much!', time: 'Sep 24, 4:30 PM' },
  { id: 'm4', from: 'system', text: 'Maya accepted the booking', time: 'Sep 24' },
  { id: 'm5', from: 'them', text: 'Biscuit settled right in. He already found the sunniest spot on the couch 😄 First photo update is up!', time: 'Today, 8:05 AM' }],

  photoUpdates: [
  { id: 'p1', image: images.pets.biscuit, caption: 'Morning cuddles before breakfast. Ate every bite!', time: 'Today, 8:02 AM' },
  { id: 'p2', image: images.gallery.yard, caption: 'Zoomies in the yard — ball retrieved 27 times (I counted).', time: 'Yesterday, 4:40 PM' },
  { id: 'p3', image: images.gallery.brush, caption: 'Brushing session after the park. Very proud of his fluff.', time: 'Yesterday, 11:15 AM' },
  { id: 'p4', image: images.gallery.bedroom, caption: 'First night: out like a light on his blanket.', time: 'Sep 29, 9:48 PM' }]

},
{
  id: 'tx-1051',
  role: 'customer',
  listingId: 'andre-alberta',
  listingTitle: 'Adventure walks & cozy stays in Alberta Arts',
  counterpartName: 'Andre Thompson',
  counterpartAvatar: images.portraits[1],
  petNames: ['Pepper'],
  petPhoto: images.pets.pepper,
  serviceId: 'dog-walking',
  variationLabel: '60-minute walk',
  unitPrice: 32,
  extraPetPrice: 8,
  startDay: 1,
  time: '9:00 AM',
  pets: 1,
  status: 'confirmed',
  unread: false,
  messages: [
  { id: 'm1', from: 'system', text: 'Booking requested', time: 'Sep 28' },
  { id: 'm2', from: 'system', text: 'Andre accepted the booking', time: 'Sep 28' },
  { id: 'm3', from: 'them', text: 'See you and Pepper tomorrow at 9! I’ll keep it to a sniff-walk pace for her joints.', time: 'Yesterday, 6:20 PM' }],

  photoUpdates: []
},
{
  id: 'tx-1058',
  role: 'customer',
  listingId: 'grace-pearl',
  listingTitle: 'Calm cat care in a quiet Pearl District loft',
  counterpartName: 'Grace Kim',
  counterpartAvatar: images.portraits[2],
  petNames: ['Miso'],
  petPhoto: images.pets.miso,
  serviceId: 'drop-in',
  variationLabel: '45-minute visit',
  unitPrice: 30,
  extraPetPrice: 4,
  startDay: 12,
  time: '5:00 PM',
  pets: 1,
  status: 'requested',
  unread: false,
  messages: [
  { id: 'm1', from: 'system', text: 'Booking requested', time: 'Today' },
  { id: 'm2', from: 'me', text: 'Hi Grace! Miso is shy for the first visit, so no worries if she hides. Food is in the pantry.', time: 'Today, 10:02 AM' }],

  photoUpdates: []
},
{
  id: 'tx-0987',
  role: 'customer',
  listingId: 'walter-multnomah',
  listingTitle: 'Retired teacher’s garden home — senior dogs welcome',
  counterpartName: 'Walter Brennan',
  counterpartAvatar: images.portraits[3],
  petNames: ['Pepper'],
  petPhoto: images.pets.pepper,
  serviceId: 'boarding',
  variationLabel: 'Standard night',
  unitPrice: 45,
  extraPetPrice: 18,
  startDay: -34,
  endDay: -29,
  pets: 1,
  status: 'completed',
  unread: false,
  messages: [
  { id: 'm1', from: 'system', text: 'Booking requested', time: 'Aug 20' },
  { id: 'm2', from: 'system', text: 'Walter accepted the booking', time: 'Aug 20' },
  { id: 'm3', from: 'them', text: 'Pepper was a delight. She and I agree that afternoon naps are essential.', time: 'Sep 2, 11:00 AM' },
  { id: 'm4', from: 'system', text: 'Stay completed', time: 'Sep 2' }],

  photoUpdates: [
  { id: 'p1', image: images.covers[6], caption: 'Garden nap, day two.', time: 'Aug 29' },
  { id: 'p2', image: images.gallery.feeding, caption: 'Dinner with her joint supplement, as requested.', time: 'Aug 28' }]

},
{
  id: 'tx-0954',
  role: 'customer',
  listingId: 'sofia-hawthorne',
  listingTitle: 'Playful family home with two friendly terriers',
  counterpartName: 'Sofia Ramirez',
  counterpartAvatar: images.portraits[4],
  petNames: ['Biscuit'],
  petPhoto: images.pets.biscuit,
  serviceId: 'boarding',
  variationLabel: 'Standard night',
  unitPrice: 50,
  extraPetPrice: 20,
  startDay: -20,
  endDay: -17,
  pets: 1,
  status: 'cancelled',
  unread: false,
  messages: [
  { id: 'm1', from: 'system', text: 'Booking requested', time: 'Sep 5' },
  { id: 'm2', from: 'them', text: 'So sorry Jordan — Biscuit is a bit over my size limit for the terriers. I have to decline this one.', time: 'Sep 5, 2:10 PM' },
  { id: 'm3', from: 'system', text: 'Booking declined. You were not charged.', time: 'Sep 5' }],

  photoUpdates: []
},
{
  id: 'tx-2011',
  role: 'provider',
  listingTitle: 'Jordan’s weekday dog walks',
  counterpartName: 'Hannah Lee',
  petNames: ['Mochi'],
  serviceId: 'dog-walking',
  variationLabel: '30-minute walk',
  unitPrice: 21,
  extraPetPrice: 6,
  startDay: 3,
  time: '11:00 AM',
  pets: 1,
  status: 'requested',
  unread: true,
  messages: [
  { id: 'm1', from: 'system', text: 'New booking request', time: 'Today' },
  { id: 'm2', from: 'them', text: 'Hi! Mochi is a Shiba — a little stubborn on the leash but very sweet. Would Saturday at 11 work?', time: 'Today, 9:40 AM' }],

  photoUpdates: []
},
{
  id: 'tx-2004',
  role: 'provider',
  listingTitle: 'Jordan’s weekday dog walks',
  counterpartName: 'Marcus Webb',
  petNames: ['Luna'],
  serviceId: 'drop-in',
  variationLabel: '30-minute visit',
  unitPrice: 20,
  extraPetPrice: 4,
  startDay: 0,
  time: '5:00 PM',
  pets: 1,
  status: 'confirmed',
  unread: false,
  messages: [
  { id: 'm1', from: 'system', text: 'Booking accepted', time: 'Sep 27' },
  { id: 'm2', from: 'them', text: 'Spare key is in the lockbox, code 4721. Thank you!', time: 'Sep 27, 7:15 PM' }],

  photoUpdates: []
},
{
  id: 'tx-1990',
  role: 'provider',
  listingTitle: 'Jordan’s weekday dog walks',
  counterpartName: 'Priya Shah',
  petNames: ['Toby', 'Lulu'],
  serviceId: 'dog-walking',
  variationLabel: '60-minute walk',
  unitPrice: 32,
  extraPetPrice: 6,
  startDay: -6,
  time: '9:00 AM',
  pets: 2,
  status: 'completed',
  unread: false,
  messages: [
  { id: 'm1', from: 'system', text: 'Walk completed', time: 'Sep 25' },
  { id: 'm2', from: 'them', text: 'They were exhausted in the best way. Thanks Jordan!', time: 'Sep 25, 1:02 PM' }],

  photoUpdates: [{ id: 'p1', image: images.gallery.trail, caption: 'Toby and Lulu on the Wildwood loop.', time: 'Sep 25, 10:10 AM' }]
}];
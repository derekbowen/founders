import { Transaction } from '../types/transaction';

export const transactions: Transaction[] = [
{
  id: 'tx-1042',
  kind: 'booking',
  status: 'Requested',
  sitterId: 'maya-thompson',
  counterpartName: 'Maya Thompson',
  counterpartPhoto: "/3c1cebb4-fe80-47c5-a9e5-4f1b2541e974.jpg",
  careType: 'date-night',
  date: '2026-10-09',
  start: '18:00',
  end: '23:00',
  children: [
  { name: 'Ava', age: '6' },
  { name: 'Leo', age: '3' }],

  notes: 'Leo is allergic to peanuts (EpiPen in the kitchen drawer). Bedtime 7:30 for Leo, 8:15 for Ava.',
  address: '4512 Avenue F, Austin, TX 78751',
  emergencyContact: { name: 'Linda Rivera', relation: 'Grandmother', phone: '(512) 555-0198' },
  total: 137.8,
  lastActivity: '2026-10-01T09:12:00',
  messages: [
  { id: 'm1', from: 'me', text: "Hi Maya! We'd love you for our anniversary dinner next Friday. Two kids, 6 and 3.", at: '2026-10-01T09:10:00' },
  { id: 'm2', from: 'them', text: 'Happy early anniversary! Friday works on my end — I just need to confirm a class. Will accept within the hour 💜', at: '2026-10-01T09:12:00' }],

  timeline: [
  { label: 'Request sent', at: '2026-10-01T09:10:00', state: 'done' },
  { label: 'Sitter accepts', state: 'current' },
  { label: 'Sit starts', state: 'upcoming' },
  { label: 'Sit completed & reviewed', state: 'upcoming' }]

},
{
  id: 'tx-1039',
  kind: 'booking',
  status: 'In progress',
  sitterId: 'priya-nair',
  counterpartName: 'Priya Nair',
  counterpartPhoto: "/0466526d-c5ff-4202-86ce-41fa8711d3e8.jpg",
  careType: 'date-night',
  date: '2026-10-01',
  start: '17:30',
  end: '22:00',
  children: [
  { name: 'Ava', age: '6' },
  { name: 'Leo', age: '3' }],

  notes: 'Pizza is in the freezer. Ava can have one show before bed.',
  address: '4512 Avenue F, Austin, TX 78751',
  emergencyContact: { name: 'Linda Rivera', relation: 'Grandmother', phone: '(512) 555-0198' },
  total: 147.87,
  lastActivity: '2026-10-01T18:40:00',
  messages: [
  { id: 'm1', from: 'them', text: "I've arrived! Kids are showing me their fort 🏰", at: '2026-10-01T17:32:00' },
  { id: 'm2', from: 'me', text: 'Amazing, thank you! Have fun.', at: '2026-10-01T17:35:00' },
  { id: 'm3', from: 'them', text: 'Dinner done, Leo is in the bath. All good here!', at: '2026-10-01T18:40:00' }],

  timeline: [
  { label: 'Request sent', at: '2026-09-28T12:00:00', state: 'done' },
  { label: 'Sitter accepted', at: '2026-09-28T12:18:00', state: 'done' },
  { label: 'Checked in', at: '2026-10-01T17:32:00', state: 'current' },
  { label: 'Sit completed & reviewed', state: 'upcoming' }]

},
{
  id: 'tx-1035',
  kind: 'booking',
  status: 'Confirmed',
  sitterId: 'rosa-delgado',
  counterpartName: 'Rosa Delgado',
  counterpartPhoto: "/93fe9506-5b79-42ec-9bd6-1f0ed24c7ad6.jpg",
  careType: 'after-school',
  date: '2026-10-06',
  start: '15:00',
  end: '18:30',
  children: [{ name: 'Leo', age: '3' }],
  notes: 'Pick up Leo from Little Oaks Preschool at 3:15. Snack: apple slices.',
  address: '4512 Avenue F, Austin, TX 78751',
  emergencyContact: { name: 'Linda Rivera', relation: 'Grandmother', phone: '(512) 555-0198' },
  total: 103.88,
  lastActivity: '2026-09-29T16:05:00',
  messages: [
  { id: 'm1', from: 'me', text: 'Could you pick Leo up from preschool on Monday?', at: '2026-09-29T15:40:00' },
  { id: 'm2', from: 'them', text: 'Of course. Please add me to the pickup list and I will bring my ID.', at: '2026-09-29T16:05:00' }],

  timeline: [
  { label: 'Request sent', at: '2026-09-29T15:40:00', state: 'done' },
  { label: 'Sitter accepted', at: '2026-09-29T16:05:00', state: 'done' },
  { label: 'Sit starts', state: 'current' },
  { label: 'Sit completed & reviewed', state: 'upcoming' }]

},
{
  id: 'tx-1021',
  kind: 'booking',
  status: 'Completed',
  sitterId: 'daniel-brooks',
  counterpartName: 'Daniel Brooks',
  counterpartPhoto: "/9d4cc8bf-bf3d-4580-b049-aa737a32674e.jpg",
  careType: 'after-school',
  date: '2026-09-24',
  start: '15:00',
  end: '18:00',
  children: [
  { name: 'Ava', age: '6' },
  { name: 'Leo', age: '3' },
  { name: 'Noah', age: '9' }],

  notes: 'Noah has a spelling test Thursday.',
  address: '4512 Avenue F, Austin, TX 78751',
  emergencyContact: { name: 'Linda Rivera', relation: 'Grandmother', phone: '(512) 555-0198' },
  total: 133.56,
  lastActivity: '2026-09-24T18:10:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Noah aced his practice spelling quiz! Kids had a great afternoon.', at: '2026-09-24T18:02:00' },
  { id: 'm2', from: 'me', text: 'You are the best, thank you Daniel!', at: '2026-09-24T18:10:00' }],

  timeline: [
  { label: 'Request sent', at: '2026-09-20T10:00:00', state: 'done' },
  { label: 'Sitter accepted', at: '2026-09-20T10:45:00', state: 'done' },
  { label: 'Sit started', at: '2026-09-24T15:00:00', state: 'done' },
  { label: 'Sit completed', at: '2026-09-24T18:00:00', state: 'done' }]

},
{
  id: 'tx-1017',
  kind: 'booking',
  status: 'Cancelled',
  sitterId: 'hannah-kowalski',
  counterpartName: 'Hannah Kowalski',
  counterpartPhoto: "/278e744b-4d48-4a11-9117-9ae91d192cce.jpg",
  careType: 'date-night',
  date: '2026-09-19',
  start: '19:00',
  end: '23:00',
  children: [{ name: 'Ava', age: '6' }],
  notes: '',
  address: '4512 Avenue F, Austin, TX 78751',
  emergencyContact: { name: 'Linda Rivera', relation: 'Grandmother', phone: '(512) 555-0198' },
  total: 97.52,
  lastActivity: '2026-09-17T08:30:00',
  messages: [
  { id: 'm1', from: 'me', text: "So sorry Hannah — our plans fell through. Cancelling, but we'll rebook soon!", at: '2026-09-17T08:30:00' }],

  timeline: [
  { label: 'Request sent', at: '2026-09-14T20:00:00', state: 'done' },
  { label: 'Sitter accepted', at: '2026-09-14T20:20:00', state: 'done' },
  { label: 'Cancelled by you · full refund', at: '2026-09-17T08:30:00', state: 'cancelled' }]

},
{
  id: 'job-208',
  kind: 'job',
  status: 'Requested',
  sitterId: 'emma-larsen',
  counterpartName: 'The Patel family',
  careType: 'date-night',
  date: '2026-10-04',
  start: '19:00',
  end: '23:30',
  children: [
  { name: 'Arjun', age: '7' },
  { name: 'Diya', age: '4' }],

  notes: 'Diya needs her stuffed elephant to fall asleep. No screens after 7:30.',
  address: '2207 Westover Rd, Austin, TX 78703',
  emergencyContact: { name: 'Raj Patel', relation: 'Uncle', phone: '(512) 555-0117' },
  total: 126,
  lastActivity: '2026-10-01T07:55:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Hi Emma! Are you free Saturday evening? Our regular sitter is out of town.', at: '2026-10-01T07:55:00' }],

  timeline: [
  { label: 'Request received', at: '2026-10-01T07:55:00', state: 'done' },
  { label: 'You accept', state: 'current' },
  { label: 'Sit starts', state: 'upcoming' },
  { label: 'Payout sent', state: 'upcoming' }]

},
{
  id: 'job-204',
  kind: 'job',
  status: 'Confirmed',
  sitterId: 'emma-larsen',
  counterpartName: 'The Nguyen family',
  careType: 'after-school',
  date: '2026-10-08',
  start: '15:30',
  end: '18:00',
  children: [{ name: 'Mai', age: '8' }],
  notes: 'Swim lesson at 4:30 at Barton Springs. Bag is by the door.',
  address: '1803 S 5th St, Austin, TX 78704',
  emergencyContact: { name: 'Thu Nguyen', relation: 'Mother (work)', phone: '(512) 555-0163' },
  total: 60,
  lastActivity: '2026-09-30T12:20:00',
  messages: [
  { id: 'm1', from: 'them', text: 'Thanks for accepting! Mai is so excited.', at: '2026-09-30T12:15:00' },
  { id: 'm2', from: 'me', text: "Can't wait! I'll bring a towel just in case.", at: '2026-09-30T12:20:00' }],

  timeline: [
  { label: 'Request received', at: '2026-09-30T11:00:00', state: 'done' },
  { label: 'You accepted', at: '2026-09-30T12:10:00', state: 'done' },
  { label: 'Sit starts', state: 'current' },
  { label: 'Payout sent', state: 'upcoming' }]

},
{
  id: 'job-197',
  kind: 'job',
  status: 'Completed',
  sitterId: 'emma-larsen',
  counterpartName: 'The Garcia family',
  careType: 'date-night',
  date: '2026-09-27',
  start: '18:00',
  end: '23:00',
  children: [
  { name: 'Sofia', age: '10' },
  { name: 'Diego', age: '7' },
  { name: 'Lucia', age: '2' }],

  notes: 'Lucia goes down at 7. Older two can stay up until 9.',
  address: '3409 Kerbey Ln, Austin, TX 78703',
  emergencyContact: { name: 'Ana Garcia', relation: 'Aunt', phone: '(512) 555-0155' },
  total: 160,
  lastActivity: '2026-09-28T10:00:00',
  messages: [
  { id: 'm1', from: 'them', text: 'The kids loved you. Leaving a 5-star review now!', at: '2026-09-28T09:40:00' }],

  timeline: [
  { label: 'Request received', at: '2026-09-22T14:00:00', state: 'done' },
  { label: 'You accepted', at: '2026-09-22T14:30:00', state: 'done' },
  { label: 'Sit completed', at: '2026-09-27T23:00:00', state: 'done' },
  { label: 'Payout sent', at: '2026-09-28T10:00:00', state: 'done' }]

}];
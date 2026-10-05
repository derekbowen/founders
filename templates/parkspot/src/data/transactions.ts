import type { Transaction } from '../types/transaction';

export const transactions: Transaction[] = [
{
  id: 't-1001',
  listingId: 'l-02',
  customerId: 'u-jordan',
  providerId: 'u-diego',
  status: 'Requested',
  arrive: '2026-10-04T16:00',
  leave: '2026-10-04T22:00',
  unit: 'hour',
  plate: '8KXD214',
  vehicle: 'Subaru Outback · Navy',
  vehicleSize: 'SUV',
  createdAt: '2026-09-30T19:12',
  messages: [
  { id: 'm-1', senderId: 'u-jordan', text: 'Hi Diego! Heading to the Giants game Saturday — is there room for a roof box?', sentAt: '2026-09-30T19:12' }],

  timeline: [{ id: 'e-1', label: 'Reservation requested', at: '2026-09-30T19:12' }]
},
{
  id: 't-1002',
  listingId: 'l-01',
  customerId: 'u-jordan',
  providerId: 'u-maya',
  status: 'Confirmed',
  arrive: '2026-10-03T18:00',
  leave: '2026-10-03T23:30',
  unit: 'hour',
  plate: '8KXD214',
  vehicle: 'Subaru Outback · Navy',
  vehicleSize: 'SUV',
  createdAt: '2026-09-27T10:04',
  messages: [
  { id: 'm-1', senderId: 'u-jordan', text: 'Booked for the Warriors preseason game. Can I charge while I’m there?', sentAt: '2026-09-27T10:04' },
  { id: 'm-2', senderId: 'u-maya', text: 'Absolutely — the charger is free with your booking. Code is in your reservation once you arrive. Enjoy the game!', sentAt: '2026-09-27T10:11' }],

  timeline: [
  { id: 'e-1', label: 'Reservation requested', at: '2026-09-27T10:04' },
  { id: 'e-2', label: 'Instantly confirmed', at: '2026-09-27T10:04' }]

},
{
  id: 't-1003',
  listingId: 'l-07',
  customerId: 'u-jordan',
  providerId: 'u-chen',
  status: 'Active',
  arrive: '2026-10-01T08:00',
  leave: '2026-10-01T18:30',
  unit: 'day',
  plate: '8KXD214',
  vehicle: 'Subaru Outback · Navy',
  vehicleSize: 'SUV',
  createdAt: '2026-09-29T21:40',
  messages: [
  { id: 'm-1', senderId: 'u-chen', text: 'Morning! Bay P2-214 is reserved for you today. Plate entry is enabled.', sentAt: '2026-10-01T07:30' },
  { id: 'm-2', senderId: 'u-jordan', text: 'Parked — thanks Wei!', sentAt: '2026-10-01T08:06' }],

  timeline: [
  { id: 'e-1', label: 'Reservation requested', at: '2026-09-29T21:40' },
  { id: 'e-2', label: 'Instantly confirmed', at: '2026-09-29T21:40' },
  { id: 'e-3', label: 'Parking started', at: '2026-10-01T08:00' }]

},
{
  id: 't-1004',
  listingId: 'l-05',
  customerId: 'u-jordan',
  providerId: 'u-priya',
  status: 'Completed',
  arrive: '2026-09-12T05:30',
  leave: '2026-09-16T21:00',
  unit: 'day',
  plate: '8KXD214',
  vehicle: 'Subaru Outback · Navy',
  vehicleSize: 'SUV',
  createdAt: '2026-09-02T14:20',
  messages: [
  { id: 'm-1', senderId: 'u-priya', text: 'Shuttle leaves every 20 minutes from the blue bench. Safe travels!', sentAt: '2026-09-11T18:00' },
  { id: 'm-2', senderId: 'u-jordan', text: 'Back safe — car is perfect. Thank you!', sentAt: '2026-09-16T21:20' }],

  timeline: [
  { id: 'e-1', label: 'Reservation requested', at: '2026-09-02T14:20' },
  { id: 'e-2', label: 'Instantly confirmed', at: '2026-09-02T14:20' },
  { id: 'e-3', label: 'Parking started', at: '2026-09-12T05:30' },
  { id: 'e-4', label: 'Parking completed', at: '2026-09-16T21:00' }]

},
{
  id: 't-1005',
  listingId: 'l-11',
  customerId: 'u-jordan',
  providerId: 'u-chen',
  status: 'Cancelled',
  arrive: '2026-09-20T09:00',
  leave: '2026-09-20T17:00',
  unit: 'hour',
  plate: '8KXD214',
  vehicle: 'Subaru Outback · Navy',
  vehicleSize: 'SUV',
  createdAt: '2026-09-15T11:00',
  messages: [
  { id: 'm-1', senderId: 'u-jordan', text: 'My conference moved online, so I need to cancel. Sorry!', sentAt: '2026-09-18T09:30' }],

  timeline: [
  { id: 'e-1', label: 'Reservation requested', at: '2026-09-15T11:00' },
  { id: 'e-2', label: 'Instantly confirmed', at: '2026-09-15T11:00' },
  { id: 'e-3', label: 'Cancelled by driver · full refund', at: '2026-09-18T09:31' }]

},
{
  id: 't-2001',
  listingId: 'l-03',
  customerId: 'u-priya',
  providerId: 'u-jordan',
  status: 'Requested',
  arrive: '2026-10-05T09:00',
  leave: '2026-10-05T15:00',
  unit: 'hour',
  plate: '7PRN882',
  vehicle: 'Honda Civic · Silver',
  vehicleSize: 'Sedan',
  createdAt: '2026-10-01T07:45',
  messages: [
  { id: 'm-1', senderId: 'u-priya', text: 'Hi Jordan, visiting a friend on Sanchez on Sunday. Is the driveway level? My car is low.', sentAt: '2026-10-01T07:45' }],

  timeline: [{ id: 'e-1', label: 'Reservation requested', at: '2026-10-01T07:45' }]
},
{
  id: 't-2002',
  listingId: 'l-03',
  customerId: 'u-sam',
  providerId: 'u-jordan',
  status: 'Confirmed',
  arrive: '2026-10-02T10:00',
  leave: '2026-10-02T13:00',
  unit: 'hour',
  plate: '6TBA019',
  vehicle: 'Toyota Prius · White',
  vehicleSize: 'Sedan',
  createdAt: '2026-09-28T16:30',
  messages: [
  { id: 'm-1', senderId: 'u-sam', text: 'Thanks for confirming! See you Thursday.', sentAt: '2026-09-28T16:45' }],

  timeline: [
  { id: 'e-1', label: 'Reservation requested', at: '2026-09-28T16:30' },
  { id: 'e-2', label: 'Confirmed by host', at: '2026-09-28T16:40' }]

},
{
  id: 't-2003',
  listingId: 'l-03',
  customerId: 'u-olivia',
  providerId: 'u-jordan',
  status: 'Completed',
  arrive: '2026-09-25T11:00',
  leave: '2026-09-25T14:00',
  unit: 'hour',
  plate: '9GGL551',
  vehicle: 'Volvo XC40 · Green',
  vehicleSize: 'SUV',
  createdAt: '2026-09-22T08:10',
  messages: [
  { id: 'm-1', senderId: 'u-olivia', text: 'Lovely spot, thank you!', sentAt: '2026-09-25T14:10' }],

  timeline: [
  { id: 'e-1', label: 'Reservation requested', at: '2026-09-22T08:10' },
  { id: 'e-2', label: 'Confirmed by host', at: '2026-09-22T08:30' },
  { id: 'e-3', label: 'Parking started', at: '2026-09-25T11:00' },
  { id: 'e-4', label: 'Parking completed', at: '2026-09-25T14:00' }]

}];
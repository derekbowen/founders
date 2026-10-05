import { Transaction } from '../types/marketplace';

export const transactions: Transaction[] = [
{
  id: 't-1001', listingId: 'l-5', role: 'customer', counterpartyId: 'u-7', dayOffset: 0, startHour: 18, hours: 2,
  bookingType: 'openplay', seats: 2, addOnIds: ['paddles'], players: ['Jordan Lee', 'Sam Kim'], status: 'confirmed',
  messages: [
  { id: 'm-1', fromMe: false, text: 'You’re in for tonight’s 3.0–3.5 session! Paddles will be at the check-in table.', timeLabel: '9:12 AM' },
  { id: 'm-2', fromMe: true, text: 'Awesome, thanks. Is there parking on Barton Springs?', timeLabel: '9:20 AM' },
  { id: 'm-3', fromMe: false, text: 'Yes — the Zilker lot is free after 5 PM.', timeLabel: '9:31 AM' }]

},
{
  id: 't-1002', listingId: 'l-3', role: 'customer', counterpartyId: 'u-2', dayOffset: 2, startHour: 19, hours: 2,
  bookingType: 'private', seats: 1, addOnIds: ['balls'], players: ['Jordan Lee', 'Alex Rivera', 'Taylor Brooks', 'Morgan Diaz'], status: 'booked',
  messages: [{ id: 'm-4', fromMe: false, text: 'Thanks for booking! We’ll confirm your court assignment within a few hours.', timeLabel: 'Yesterday' }]
},
{
  id: 't-1003', listingId: 'l-8', role: 'customer', counterpartyId: 'u-4', dayOffset: -4, startHour: 20, hours: 1,
  bookingType: 'private', seats: 1, addOnIds: ['padel-rackets', 'coach'], players: ['Jordan Lee', 'Sam Kim', 'Ana Ortiz', 'Leo Park'], status: 'played',
  messages: [
  { id: 'm-5', fromMe: false, text: 'Coach Pablo will meet you at court 2.', timeLabel: 'Sep 26' },
  { id: 'm-6', fromMe: true, text: 'That was so much fun. We’ll be back!', timeLabel: 'Sep 26' }]

},
{
  id: 't-1004', listingId: 'l-12', role: 'customer', counterpartyId: 'u-6', dayOffset: -10, startHour: 21, hours: 1,
  bookingType: 'private', seats: 1, addOnIds: ['pinnies'], players: ['Jordan Lee'], status: 'cancelled',
  messages: [{ id: 'm-7', fromMe: true, text: 'Have to cancel — half the team is out sick. Sorry!', timeLabel: 'Sep 19' }]
},
{
  id: 't-1005', listingId: 'l-14', role: 'customer', counterpartyId: 'u-7', dayOffset: -16, startHour: 18, hours: 2,
  bookingType: 'openplay', seats: 1, addOnIds: [], players: ['Jordan Lee'], status: 'no-show',
  messages: [{ id: 'm-8', fromMe: false, text: 'We missed you at coed 4s! Seats are non-refundable after start.', timeLabel: 'Sep 13' }]
},
{
  id: 't-2001', listingId: 'l-11', role: 'provider', counterpartyId: 'u-9', dayOffset: 1, startHour: 17, hours: 2,
  bookingType: 'private', seats: 1, addOnIds: ['basketballs'], players: ['Marcus Bell', 'Devin Hart', 'Chris Young'], status: 'booked',
  messages: [{ id: 'm-9', fromMe: false, text: 'Hey! Running a small skills session for two of my players. Is the hoop at 10 ft?', timeLabel: '8:05 AM' }]
},
{
  id: 't-2002', listingId: 'l-11', role: 'provider', counterpartyId: 'u-8', dayOffset: 3, startHour: 10, hours: 1,
  bookingType: 'private', seats: 1, addOnIds: [], players: ['Priya Shah', 'Nina Shah'], status: 'confirmed',
  messages: [
  { id: 'm-10', fromMe: false, text: 'Can’t wait! Bringing my sister for some 1v1.', timeLabel: 'Sep 29' },
  { id: 'm-11', fromMe: true, text: 'Confirmed — gate code will be sent the morning of.', timeLabel: 'Sep 29' }]

},
{
  id: 't-2003', listingId: 'l-11', role: 'provider', counterpartyId: 'u-10', dayOffset: -2, startHour: 19, hours: 2,
  bookingType: 'private', seats: 1, addOnIds: ['basketballs'], players: ['Elena Ruiz', 'Kat Moore', 'Jo Lin'], status: 'played',
  messages: [{ id: 'm-12', fromMe: false, text: 'Thanks Jordan, great run tonight!', timeLabel: 'Sep 29' }]
}];
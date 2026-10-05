import type { Transaction } from '../types/marketplace';

export const transactions: Transaction[] = [
{
  id: 'tx-1042',
  listingId: 'emerald-one-shoulder-gown',
  role: 'renter',
  counterpartyId: 'u2',
  status: 'requested',
  startOffset: 32,
  days: 4,
  delivery: 'ship',
  updatedLabel: '2h ago',
  messages: [
  { id: 'm1', fromMe: true, text: 'Hi Priya! I’d love this for my cousin’s evening wedding. I’m 5′8″ — will the length work with 3″ heels?', time: 'Today, 9:14 AM' }]

},
{
  id: 'tx-1038',
  listingId: 'beaded-cape-sleeve-gown',
  role: 'renter',
  counterpartyId: 'u4',
  status: 'confirmed',
  startOffset: 19,
  days: 8,
  delivery: 'ship',
  updatedLabel: 'Yesterday',
  messages: [
  { id: 'm1', fromMe: true, text: 'So excited about this one — it’s for the museum gala.', time: 'Mon, 6:02 PM' },
  { id: 'm2', fromMe: false, text: 'It’s going to look incredible! I’ll ship it 3 days before your start date so you have time to try it on.', time: 'Mon, 7:40 PM' },
  { id: 'm3', fromMe: true, text: 'Perfect, thank you!', time: 'Mon, 7:42 PM' }]

},
{
  id: 'tx-1031',
  listingId: 'cowl-satin-slip-midi',
  role: 'renter',
  counterpartyId: 'u1',
  status: 'shipped',
  startOffset: 2,
  days: 4,
  delivery: 'ship',
  updatedLabel: 'Sep 29',
  messages: [
  { id: 'm1', fromMe: false, text: 'Shipped! Tracking is in the order details. It’s steamed and in a garment bag.', time: 'Sep 29, 11:20 AM' }]

},
{
  id: 'tx-0987',
  listingId: 'velvet-strapless-column',
  role: 'renter',
  counterpartyId: 'u3',
  status: 'completed',
  startOffset: -40,
  days: 4,
  delivery: 'ship',
  updatedLabel: 'Aug 22',
  messages: [
  { id: 'm1', fromMe: true, text: 'Returned today — thank you so much, it was a dream!', time: 'Aug 20, 4:10 PM' },
  { id: 'm2', fromMe: false, text: 'So glad! Received in perfect condition. Hope to see you again ✨', time: 'Aug 22, 10:05 AM' }]

},
{
  id: 'tx-1045',
  listingId: 'feather-trim-mini',
  role: 'lender',
  counterpartyId: 'u7',
  status: 'requested',
  startOffset: 26,
  days: 4,
  delivery: 'pickup',
  updatedLabel: '35m ago',
  messages: [
  { id: 'm1', fromMe: false, text: 'Hi Olivia! Could I pick this up in Chelsea for my 30th? I’m a usual 4.', time: 'Today, 10:31 AM' }]

},
{
  id: 'tx-1029',
  listingId: 'guipure-lace-bow-mini',
  role: 'lender',
  counterpartyId: 'u8',
  status: 'worn',
  startOffset: -2,
  days: 4,
  delivery: 'ship',
  updatedLabel: 'Today',
  messages: [
  { id: 'm1', fromMe: false, text: 'Wore it last night — got so many compliments! Will drop off the return tomorrow.', time: 'Today, 8:15 AM' }]

},
{
  id: 'tx-1017',
  listingId: 'ruched-one-sleeve-mini',
  role: 'lender',
  counterpartyId: 'u9',
  status: 'returned',
  startOffset: -9,
  days: 8,
  delivery: 'ship',
  updatedLabel: 'Sep 27',
  messages: [
  { id: 'm1', fromMe: false, text: 'Dropped it at UPS this morning. Thanks again!', time: 'Sep 27, 9:00 AM' }]

}];
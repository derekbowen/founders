import type { Order } from '../types/marketplace';

// Demo account perspective: the signed-in user (Mara) is both a buyer and a creator.
export const orders: Order[] = [
{
  id: 'ORD-1048',
  listingSlug: 'nordic-light-photo-pack',
  role: 'buyer',
  counterpartyName: 'Theo Lindqvist',
  amount: 29,
  createdAt: '2026-09-28T14:12:00',
  status: 'downloaded',
  paymentMethod: 'Visa •••• 4242',
  email: 'mara@maramakes.co',
  messages: [
  { id: 'm1', from: 'me', text: 'Hi Theo! Can I use these on printed planner covers I sell?', sentAt: '2026-09-28T14:20:00' },
  { id: 'm2', from: 'them', text: 'Absolutely — the commercial license covers printed products up to 10,000 units. Enjoy!', sentAt: '2026-09-28T16:02:00' },
  { id: 'm3', from: 'me', text: 'Perfect, thank you!', sentAt: '2026-09-28T16:10:00' }]

},
{
  id: 'ORD-1042',
  listingSlug: 'personal-finance-dashboard',
  role: 'buyer',
  counterpartyName: 'Priya Raman',
  amount: 22,
  createdAt: '2026-09-21T09:40:00',
  status: 'purchased',
  paymentMethod: 'Mastercard •••• 8812',
  email: 'mara@maramakes.co',
  messages: []
},
{
  id: 'ORD-1037',
  listingSlug: 'lofi-sunday-loop-kit',
  role: 'buyer',
  counterpartyName: 'Kai Mendes',
  amount: 24,
  createdAt: '2026-09-10T20:05:00',
  status: 'downloaded',
  paymentMethod: 'Visa •••• 4242',
  email: 'mara@maramakes.co',
  messages: [
  { id: 'm1', from: 'them', text: 'Thanks for grabbing the kit! Tag me if you make something with it 🎧', sentAt: '2026-09-10T20:30:00' }]

},
{
  id: 'ORD-1021',
  listingSlug: 'ship-it-side-projects',
  role: 'buyer',
  counterpartyName: 'Sam Whitfield',
  amount: 19,
  createdAt: '2026-08-30T11:22:00',
  status: 'refunded',
  paymentMethod: 'Apple Pay',
  email: 'mara@maramakes.co',
  messages: [
  { id: 'm1', from: 'me', text: 'Hi Sam, I accidentally bought this twice — could you refund one?', sentAt: '2026-08-30T11:30:00' },
  { id: 'm2', from: 'them', text: 'No problem, refund issued. You still have the other copy in your library.', sentAt: '2026-08-30T13:15:00' }]

},
{
  id: 'ORD-1015',
  listingSlug: 'ux-research-workbook',
  role: 'buyer',
  counterpartyName: 'Lena Fischer',
  amount: 27,
  createdAt: '2026-08-12T08:55:00',
  status: 'downloaded',
  paymentMethod: 'Visa •••• 4242',
  email: 'mara@maramakes.co',
  messages: []
},
{
  id: 'SAL-2091',
  listingSlug: 'undated-daily-planner',
  role: 'seller',
  counterpartyName: 'Hannah Cole',
  amount: 14,
  createdAt: '2026-09-30T18:44:00',
  status: 'purchased',
  paymentMethod: 'Visa •••• 1881',
  email: 'hannah.cole@example.com',
  messages: [
  { id: 'm1', from: 'them', text: 'Hi! Does this work with the reMarkable 2?', sentAt: '2026-09-30T18:50:00' }]

},
{
  id: 'SAL-2088',
  listingSlug: 'minimal-habit-tracker',
  role: 'seller',
  counterpartyName: 'Diego Alvarez',
  amount: 3,
  createdAt: '2026-09-22T07:15:00',
  status: 'downloaded',
  paymentMethod: 'Google Pay',
  email: 'diego.a@example.com',
  messages: []
},
{
  id: 'SAL-2080',
  listingSlug: 'wedding-planning-binder',
  role: 'seller',
  counterpartyName: 'Aisha Karim',
  amount: 18,
  createdAt: '2026-09-08T12:30:00',
  status: 'downloaded',
  paymentMethod: 'Visa •••• 0021',
  email: 'aisha.karim@example.com',
  messages: [
  { id: 'm1', from: 'them', text: 'Is there a way to edit the seating chart names?', sentAt: '2026-09-08T13:01:00' },
  { id: 'm2', from: 'me', text: 'Yes! Use the editable budget spreadsheet — tab 4 is a seating chart that prints straight onto the binder page.', sentAt: '2026-09-08T15:22:00' }]

},
{
  id: 'SAL-2072',
  listingSlug: 'undated-daily-planner',
  role: 'seller',
  counterpartyName: 'Oliver Grant',
  amount: 14,
  createdAt: '2026-08-25T16:00:00',
  status: 'refunded',
  paymentMethod: 'Mastercard •••• 3390',
  email: 'oliver.g@example.com',
  messages: []
},
{
  id: 'SAL-2066',
  listingSlug: 'minimal-habit-tracker',
  role: 'seller',
  counterpartyName: 'Mei Tanaka',
  amount: 0,
  createdAt: '2026-08-19T10:10:00',
  status: 'downloaded',
  paymentMethod: 'Free download',
  email: 'mei.t@example.com',
  messages: []
}];
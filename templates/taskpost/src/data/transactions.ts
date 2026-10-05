import type { Transaction } from '../types/marketplace';

export const transactions: Transaction[] = [
// ——— Alex as CUSTOMER (My jobs) ———
{
  id: 'tx-tv-sam',
  jobId: 'j-tv', customerId: 'u-alex', proId: 'u-sam', status: 'offer_sent', proMarkedDone: false,
  offers: [
  { id: 'o-1', by: 'pro', amount: 180, earliestDate: '2026-10-03', message: 'I’ve mounted dozens of TVs on brick. I’d use sleeve anchors and a paintable raceway down to the outlet — cleanest option without opening the chimney. About 2 hours.', createdAt: '2026-09-30T10:12:00', state: 'active' }],

  messages: [
  { id: 'm-1', senderId: 'u-sam', text: 'Hi Alex — quick question: do you know if the brick is real or a veneer over drywall?', createdAt: '2026-09-30T10:15:00' },
  { id: 'm-2', senderId: 'u-alex', text: 'Real brick, the house is from 1924. Thanks for the detailed offer!', createdAt: '2026-09-30T11:02:00' }],

  events: [{ id: 'e-1', type: 'offer', label: 'Sam sent an offer · $180', createdAt: '2026-09-30T10:12:00' }],
  updatedAt: '2026-09-30T11:02:00'
},
{
  id: 'tx-tv-chris',
  jobId: 'j-tv', customerId: 'u-alex', proId: 'u-chris', status: 'countered', proMarkedDone: false,
  offers: [
  { id: 'o-2', by: 'pro', amount: 240, earliestDate: '2026-10-05', message: 'Includes an in-wall power kit so there are zero visible cords. I can do Sunday.', createdAt: '2026-09-30T12:40:00', state: 'superseded' },
  { id: 'o-3', by: 'customer', amount: 200, earliestDate: '2026-10-05', message: 'Love the in-wall option. Could you do $200 if I patch and paint any holes myself?', createdAt: '2026-09-30T14:05:00', state: 'active' }],

  messages: [],
  events: [
  { id: 'e-2', type: 'offer', label: 'Chris sent an offer · $240', createdAt: '2026-09-30T12:40:00' },
  { id: 'e-3', type: 'counter', label: 'You countered · $200', createdAt: '2026-09-30T14:05:00' }],

  updatedAt: '2026-09-30T14:05:00'
},
{
  id: 'tx-garage-ben',
  jobId: 'j-garage', customerId: 'u-alex', proId: 'u-ben', status: 'accepted', proMarkedDone: false,
  offers: [
  { id: 'o-4', by: 'pro', amount: 420, earliestDate: '2026-10-05', message: 'Two-person crew with a 16ft box truck. Dump fees and the Goodwill drop are included.', createdAt: '2026-09-27T09:00:00', state: 'superseded' },
  { id: 'o-5', by: 'customer', amount: 360, earliestDate: '2026-10-05', message: 'Can you do $360? About a third of it is donation.', createdAt: '2026-09-27T12:30:00', state: 'superseded' },
  { id: 'o-6', by: 'pro', amount: 380, earliestDate: '2026-10-05', message: 'Meet you at $380 — that covers the transfer station fees. Sunday 9am works.', createdAt: '2026-09-27T15:10:00', state: 'accepted' }],

  messages: [
  { id: 'm-3', senderId: 'u-ben', text: 'Thanks Alex! Once payment is through we’ll lock in Sunday 9am.', createdAt: '2026-09-28T08:20:00' }],

  events: [
  { id: 'e-4', type: 'offer', label: 'Ben sent an offer · $420', createdAt: '2026-09-27T09:00:00' },
  { id: 'e-5', type: 'counter', label: 'You countered · $360', createdAt: '2026-09-27T12:30:00' },
  { id: 'e-6', type: 'counter', label: 'Ben countered · $380', createdAt: '2026-09-27T15:10:00' },
  { id: 'e-7', type: 'accepted', label: 'You accepted the offer · $380', createdAt: '2026-09-28T08:00:00' }],

  updatedAt: '2026-09-28T08:20:00'
},
{
  id: 'tx-garage-rosa',
  jobId: 'j-garage', customerId: 'u-alex', proId: 'u-rosa', status: 'declined', proMarkedDone: false,
  offers: [
  { id: 'o-7', by: 'pro', amount: 520, earliestDate: '2026-10-08', message: 'I can bring my trailer next Thursday.', createdAt: '2026-09-26T18:00:00', state: 'declined' }],

  messages: [],
  events: [
  { id: 'e-8', type: 'offer', label: 'Rosa sent an offer · $520', createdAt: '2026-09-26T18:00:00' },
  { id: 'e-9', type: 'declined', label: 'You declined the offer', createdAt: '2026-09-27T08:00:00' }],

  updatedAt: '2026-09-27T08:00:00'
},
{
  id: 'tx-dresser-omar',
  jobId: 'j-dresser', customerId: 'u-alex', proId: 'u-omar', status: 'completed', proMarkedDone: true,
  review: { rating: 5, text: 'Built a dresser and bed frame fast, anchored the dresser to the wall without me asking.' },
  offers: [
  { id: 'o-8', by: 'pro', amount: 115, earliestDate: '2026-09-14', message: 'Both pieces in about 2.5 hours, anchor kit included.', createdAt: '2026-09-09T09:00:00', state: 'accepted' }],

  messages: [
  { id: 'm-4', senderId: 'u-omar', text: 'All done! Dresser is anchored to a stud. Enjoy.', createdAt: '2026-09-14T16:40:00' }],

  events: [
  { id: 'e-10', type: 'offer', label: 'Omar sent an offer · $115', createdAt: '2026-09-09T09:00:00' },
  { id: 'e-11', type: 'accepted', label: 'You accepted the offer · $115', createdAt: '2026-09-09T12:00:00' },
  { id: 'e-12', type: 'paid', label: 'Payment of $121 secured', createdAt: '2026-09-09T12:02:00' },
  { id: 'e-13', type: 'marked_done', label: 'Omar marked the job as done', createdAt: '2026-09-14T16:38:00' },
  { id: 'e-14', type: 'completed', label: 'You confirmed completion', createdAt: '2026-09-14T18:10:00' },
  { id: 'e-15', type: 'reviewed', label: 'You left a 5-star review', createdAt: '2026-09-14T18:12:00' }],

  updatedAt: '2026-09-14T18:12:00'
},

// ——— Alex as PRO (My offers) ———
{
  id: 'tx-fence',
  jobId: 'j-fence', customerId: 'u-priya', proId: 'u-alex', status: 'offer_sent', proMarkedDone: false,
  offers: [
  { id: 'o-9', by: 'pro', amount: 320, earliestDate: '2026-10-10', message: 'I can replace the broken boards, re-plumb the leaning panels and reset the one post with fast-set concrete. Lumber extra at cost if your boards run short.', createdAt: '2026-09-29T13:30:00', state: 'active' }],

  messages: [],
  events: [{ id: 'e-16', type: 'offer', label: 'You sent an offer · $320', createdAt: '2026-09-29T13:30:00' }],
  updatedAt: '2026-09-29T13:30:00'
},
{
  id: 'tx-yard',
  jobId: 'j-yard', customerId: 'u-marcus', proId: 'u-alex', status: 'countered', proMarkedDone: false,
  offers: [
  { id: 'o-10', by: 'pro', amount: 300, earliestDate: '2026-10-11', message: 'Mow, rake, trim and haul away in one visit. I have a trailer.', createdAt: '2026-09-28T10:00:00', state: 'superseded' },
  { id: 'o-11', by: 'customer', amount: 260, earliestDate: '2026-10-11', message: 'We can skip haul-away — I’ll fill the green bin over a couple of weeks. $260?', createdAt: '2026-09-30T19:20:00', state: 'active' }],

  messages: [
  { id: 'm-5', senderId: 'u-marcus', text: 'Also, the side gate sticks — just lift and push.', createdAt: '2026-09-30T19:22:00' }],

  events: [
  { id: 'e-17', type: 'offer', label: 'You sent an offer · $300', createdAt: '2026-09-28T10:00:00' },
  { id: 'e-18', type: 'counter', label: 'Marcus countered · $260', createdAt: '2026-09-30T19:20:00' }],

  updatedAt: '2026-09-30T19:22:00'
},
{
  id: 'tx-wardrobe',
  jobId: 'j-wardrobe', customerId: 'u-lena', proId: 'u-alex', status: 'paid', proMarkedDone: false,
  offers: [
  { id: 'o-12', by: 'pro', amount: 150, earliestDate: '2026-10-03', message: 'Two PAX frames with doors and drawers, anchored to studs. About 4 hours.', createdAt: '2026-09-24T15:00:00', state: 'accepted' }],

  messages: [
  { id: 'm-6', senderId: 'u-lena', text: 'Paid! See you Saturday at 1pm. Buzzer is #4.', createdAt: '2026-09-25T09:10:00' },
  { id: 'm-7', senderId: 'u-alex', text: 'Perfect, see you then.', createdAt: '2026-09-25T09:30:00' }],

  events: [
  { id: 'e-19', type: 'offer', label: 'You sent an offer · $150', createdAt: '2026-09-24T15:00:00' },
  { id: 'e-20', type: 'accepted', label: 'Lena accepted the offer · $150', createdAt: '2026-09-25T09:00:00' },
  { id: 'e-21', type: 'paid', label: 'Lena paid · funds held until completion', createdAt: '2026-09-25T09:05:00' }],

  updatedAt: '2026-09-25T09:30:00'
},
{
  id: 'tx-patio',
  jobId: 'j-patio', customerId: 'u-tom', proId: 'u-alex', status: 'completed', proMarkedDone: true,
  review: { rating: 5, text: 'Alex was on time, brought his own pressure washer and left the patio looking brand new.' },
  offers: [
  { id: 'o-13', by: 'pro', amount: 130, earliestDate: '2026-09-20', message: 'Includes moss treatment afterwards.', createdAt: '2026-09-13T08:00:00', state: 'accepted' }],

  messages: [],
  events: [
  { id: 'e-22', type: 'offer', label: 'You sent an offer · $130', createdAt: '2026-09-13T08:00:00' },
  { id: 'e-23', type: 'accepted', label: 'Tom accepted the offer · $130', createdAt: '2026-09-13T12:00:00' },
  { id: 'e-24', type: 'paid', label: 'Tom paid · funds held until completion', createdAt: '2026-09-13T12:03:00' },
  { id: 'e-25', type: 'marked_done', label: 'You marked the job as done', createdAt: '2026-09-20T13:00:00' },
  { id: 'e-26', type: 'completed', label: 'Tom confirmed completion · payout sent', createdAt: '2026-09-20T17:30:00' }],

  updatedAt: '2026-09-20T17:30:00'
},
{
  id: 'tx-bath',
  jobId: 'j-bath', customerId: 'u-dave', proId: 'u-alex', status: 'declined', proMarkedDone: false,
  offers: [
  { id: 'o-14', by: 'pro', amount: 160, earliestDate: '2026-10-09', message: 'Cartridge swap plus full tub re-caulk with mildew-resistant silicone.', createdAt: '2026-09-30T14:00:00', state: 'declined' }],

  messages: [],
  events: [
  { id: 'e-27', type: 'offer', label: 'You sent an offer · $160', createdAt: '2026-09-30T14:00:00' },
  { id: 'e-28', type: 'declined', label: 'Dave declined the offer', createdAt: '2026-09-30T20:00:00' }],

  updatedAt: '2026-09-30T20:00:00'
}];
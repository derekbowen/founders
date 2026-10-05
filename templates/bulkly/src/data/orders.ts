import type { Order } from '../types/marketplace';

export const orders: Order[] = [
{
  id: 'BK-20481',
  role: 'purchase',
  productId: 'house-blend-whole-bean',
  cases: 4,
  unitPrice: 8.5,
  shipping: 18,
  status: 'Ordered',
  placedAt: '2026-09-30T15:12:00',
  counterparty: { name: 'Marcus Bell', business: 'Kettle Hollow Coffee Co.', location: 'Asheville, NC' },
  history: [{ status: 'Ordered', at: '2026-09-30T15:12:00' }],
  messages: [
  {
    id: 'm1',
    from: 'me',
    author: 'Priya',
    body: 'Hi Marcus — could we get 2 cases ground for drip and 2 whole bean?',
    sentAt: '2026-09-30T15:14:00'
  }]

},
{
  id: 'BK-20455',
  role: 'purchase',
  productId: 'sea-kelp-bar-soap',
  cases: 5,
  unitPrice: 4.0,
  shipping: 0,
  status: 'Confirmed',
  placedAt: '2026-09-27T10:03:00',
  counterparty: { name: 'Hannah Okafor', business: 'Saltwork Apothecary', location: 'Portland, ME' },
  history: [
  { status: 'Ordered', at: '2026-09-27T10:03:00' },
  { status: 'Confirmed', at: '2026-09-27T13:40:00', note: 'Packing Monday, ships Tuesday.' }],

  messages: [
  {
    id: 'm1',
    from: 'them',
    author: 'Hannah',
    body: 'Thanks Priya! Confirmed — you hit the 5-case tier so pricing is $4.00/bar. Shipping Tuesday.',
    sentAt: '2026-09-27T13:41:00'
  },
  { id: 'm2', from: 'me', author: 'Priya', body: 'Perfect, thank you!', sentAt: '2026-09-27T14:02:00' }]

},
{
  id: 'BK-20430',
  role: 'purchase',
  productId: 'speckled-stoneware-mug',
  cases: 2,
  unitPrice: 13.0,
  shipping: 18,
  status: 'Shipped',
  placedAt: '2026-09-18T09:20:00',
  counterparty: { name: 'Lucia Herrera', business: 'Mesa Clay Studio', location: 'Santa Fe, NM' },
  tracking: { carrier: 'UPS Ground', number: '1Z 8V4 W62 03 4471 2896', eta: '2026-10-03' },
  history: [
  { status: 'Ordered', at: '2026-09-18T09:20:00' },
  { status: 'Confirmed', at: '2026-09-18T16:05:00' },
  { status: 'Shipped', at: '2026-09-29T11:30:00', note: 'Double-boxed with honeycomb paper.' }],

  messages: [
  {
    id: 'm1',
    from: 'them',
    author: 'Lucia',
    body: 'Your mugs came out of the kiln beautifully. Shipped today — tracking is attached.',
    sentAt: '2026-09-29T11:32:00'
  }]

},
{
  id: 'BK-20398',
  role: 'purchase',
  productId: 'stonewashed-linen-tea-towel',
  cases: 3,
  unitPrice: 9.0,
  shipping: 18,
  status: 'Delivered',
  placedAt: '2026-09-10T12:45:00',
  counterparty: { name: 'Claire Dubois', business: 'Linen & Loam', location: 'Hudson, NY' },
  tracking: { carrier: 'USPS Priority', number: '9405 5036 9930 0412 7765 31', eta: '2026-09-16' },
  history: [
  { status: 'Ordered', at: '2026-09-10T12:45:00' },
  { status: 'Confirmed', at: '2026-09-10T15:00:00' },
  { status: 'Shipped', at: '2026-09-12T10:10:00' },
  { status: 'Delivered', at: '2026-09-16T14:22:00' }],

  messages: [
  {
    id: 'm1',
    from: 'them',
    author: 'Claire',
    body: 'Delivered! Let me know how the sage colorway does — we have more coming next month.',
    sentAt: '2026-09-16T15:00:00'
  }]

},
{
  id: 'BK-20311',
  role: 'purchase',
  productId: 'letterpress-cards-assorted',
  cases: 3,
  unitPrice: 2.4,
  shipping: 18,
  status: 'Received',
  placedAt: '2026-08-22T08:30:00',
  counterparty: { name: 'Theo Park', business: 'Paperboat Stationery', location: 'Brooklyn, NY' },
  tracking: { carrier: 'USPS Ground Advantage', number: '9400 1118 9922 3344 5566 77', eta: '2026-08-28' },
  history: [
  { status: 'Ordered', at: '2026-08-22T08:30:00' },
  { status: 'Confirmed', at: '2026-08-22T11:12:00' },
  { status: 'Shipped', at: '2026-08-24T09:00:00' },
  { status: 'Delivered', at: '2026-08-28T13:40:00' },
  { status: 'Received', at: '2026-08-29T10:05:00' }],

  messages: [
  { id: 'm1', from: 'me', author: 'Priya', body: 'All arrived in perfect shape. Thanks Theo!', sentAt: '2026-08-29T10:06:00' }]

},
{
  id: 'BK-20290',
  role: 'purchase',
  productId: 'freeze-dried-salmon-cat-treats',
  cases: 2,
  unitPrice: 6.2,
  shipping: 18,
  status: 'Disputed',
  placedAt: '2026-08-15T14:00:00',
  counterparty: { name: 'Rosa Jimenez', business: 'Wild Coast Pet Co.', location: 'Bellingham, WA' },
  tracking: { carrier: 'FedEx Ground', number: '7749 2210 5583', eta: '2026-08-21' },
  history: [
  { status: 'Ordered', at: '2026-08-15T14:00:00' },
  { status: 'Confirmed', at: '2026-08-15T17:20:00' },
  { status: 'Shipped', at: '2026-08-17T09:45:00' },
  { status: 'Delivered', at: '2026-08-21T12:10:00' },
  { status: 'Disputed', at: '2026-08-21T16:30:00', note: '1 case arrived crushed, 6 pouches torn.' }],

  messages: [
  {
    id: 'm1',
    from: 'me',
    author: 'Priya',
    body: 'One case arrived crushed and six pouches are torn. Photos attached to the dispute.',
    sentAt: '2026-08-21T16:31:00'
  },
  {
    id: 'm2',
    from: 'them',
    author: 'Rosa',
    body: 'So sorry! I’ve filed a claim with FedEx and can send a replacement case this week.',
    sentAt: '2026-08-21T18:02:00'
  }]

},
{
  id: 'BK-20477',
  role: 'sale',
  productId: 'maple-pecan-granola',
  cases: 6,
  unitPrice: 5.1,
  shipping: 0,
  status: 'Ordered',
  placedAt: '2026-09-30T11:48:00',
  counterparty: { name: 'Jen Lee', business: 'Corner Pantry Market', location: 'Oakland, CA' },
  history: [{ status: 'Ordered', at: '2026-09-30T11:48:00' }],
  messages: [
  {
    id: 'm1',
    from: 'them',
    author: 'Jen',
    body: 'Hi! Any chance these can ship by Friday? We’re featuring them in our fall endcap.',
    sentAt: '2026-09-30T11:50:00'
  }]

},
{
  id: 'BK-20462',
  role: 'sale',
  productId: 'sea-salt-dark-chocolate',
  cases: 10,
  unitPrice: 2.45,
  shipping: 0,
  status: 'Confirmed',
  placedAt: '2026-09-28T09:15:00',
  counterparty: { name: 'Dana Kim', business: 'Little Owl Café', location: 'Seattle, WA' },
  history: [
  { status: 'Ordered', at: '2026-09-28T09:15:00' },
  { status: 'Confirmed', at: '2026-09-28T10:02:00' }],

  messages: [
  {
    id: 'm1',
    from: 'me',
    author: 'Priya',
    body: 'Confirmed! You unlocked the 10+ case tier at $2.45/bar. Shipping Thursday.',
    sentAt: '2026-09-28T10:03:00'
  }]

},
{
  id: 'BK-20410',
  role: 'sale',
  productId: 'sparkling-hibiscus-tonic',
  cases: 3,
  unitPrice: 1.85,
  shipping: 18,
  status: 'Shipped',
  placedAt: '2026-09-21T13:30:00',
  counterparty: { name: 'Aisha Rahman', business: 'Harbor Provisions', location: 'Boston, MA' },
  tracking: { carrier: 'UPS Ground', number: '1Z 4F1 9X2 03 1188 0042', eta: '2026-10-02' },
  history: [
  { status: 'Ordered', at: '2026-09-21T13:30:00' },
  { status: 'Confirmed', at: '2026-09-22T08:45:00' },
  { status: 'Shipped', at: '2026-09-26T15:10:00' }],

  messages: []
},
{
  id: 'BK-20350',
  role: 'sale',
  productId: 'maple-pecan-granola',
  cases: 2,
  unitPrice: 5.4,
  shipping: 18,
  status: 'Received',
  placedAt: '2026-09-02T10:00:00',
  counterparty: { name: 'Miguel Torres', business: 'Blue Door Grocery', location: 'Sacramento, CA' },
  tracking: { carrier: 'USPS Priority', number: '9405 5036 9930 0410 2231 08', eta: '2026-09-07' },
  history: [
  { status: 'Ordered', at: '2026-09-02T10:00:00' },
  { status: 'Confirmed', at: '2026-09-02T12:30:00' },
  { status: 'Shipped', at: '2026-09-03T09:20:00' },
  { status: 'Delivered', at: '2026-09-07T11:45:00' },
  { status: 'Received', at: '2026-09-08T09:10:00' }],

  messages: [
  {
    id: 'm1',
    from: 'them',
    author: 'Miguel',
    body: 'Received, thanks! Already planning a reorder at 5 cases.',
    sentAt: '2026-09-08T09:12:00'
  }]

}];
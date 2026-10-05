import type { Order } from '../types/marketplace';

const samAddress = {
  fullName: 'Sam Rivera',
  line1: '2417 SE Hawthorne Blvd',
  line2: 'Studio B',
  city: 'Portland',
  state: 'Oregon',
  postalCode: '97214',
  country: 'United States'
};

export const orders: Order[] = [
{
  id: 'CR-10482',
  role: 'purchase',
  listingId: 'walnut-end-grain-board',
  quantity: 1,
  selections: { Size: 'Large (16" × 12")' },
  unitPrice: 145,
  deliveryFee: 15,
  deliveryMethod: 'shipping',
  status: 'shipped',
  carrier: 'UPS',
  trackingNumber: '1Z 84F 2W1 03 4471 2290',
  counterparty: { name: 'Tom Becker', location: 'Burlington, VT' },
  createdAt: '2026-09-26T15:20:00',
  events: [
  { status: 'purchased', at: '2026-09-26T15:20:00' },
  { status: 'shipped', at: '2026-09-28T10:05:00', note: 'UPS Ground' }],

  messages: [
  { id: 'a1', from: 'me', text: 'Hi Tom! Is this a gift-friendly package? It is for my brother’s housewarming.', at: '2026-09-26T15:24:00' },
  { id: 'a2', from: 'them', text: 'Absolutely — I’ll wrap it in kraft paper with twine and include a care card. Shipping out Monday.', at: '2026-09-26T17:02:00' },
  { id: 'a3', from: 'them', text: 'Shipped! Tracking is attached. Enjoy it.', at: '2026-09-28T10:06:00' }],

  shippingAddress: samAddress,
  giftNote: 'Happy new home, Luis! — Sam'
},
{
  id: 'CR-10451',
  role: 'purchase',
  listingId: 'hammered-stacking-rings',
  quantity: 1,
  selections: { 'Ring size': '7', Finish: 'Oxidized' },
  unitPrice: 58,
  deliveryFee: 5,
  deliveryMethod: 'shipping',
  status: 'delivered',
  carrier: 'USPS',
  trackingNumber: '9400 1118 9922 3301 7745 62',
  counterparty: { name: 'Lena Hoffmann', location: 'Brooklyn, NY' },
  createdAt: '2026-09-18T09:12:00',
  events: [
  { status: 'purchased', at: '2026-09-18T09:12:00' },
  { status: 'shipped', at: '2026-09-21T14:30:00', note: 'USPS Priority' },
  { status: 'delivered', at: '2026-09-24T12:41:00', note: 'Left at front door' }],

  messages: [
  { id: 'b1', from: 'them', text: 'Thanks for your order, Sam! Forging your rings this week.', at: '2026-09-18T11:00:00' }],

  shippingAddress: samAddress
},
{
  id: 'CR-10433',
  role: 'purchase',
  listingId: 'cedar-smoke-soy-candle',
  quantity: 2,
  selections: { Size: '12 oz' },
  unitPrice: 32,
  deliveryFee: 6,
  deliveryMethod: 'shipping',
  status: 'received',
  carrier: 'USPS',
  trackingNumber: '9400 1118 9922 3301 6612 09',
  counterparty: { name: 'Priya Nair', location: 'Austin, TX' },
  createdAt: '2026-09-04T19:45:00',
  events: [
  { status: 'purchased', at: '2026-09-04T19:45:00' },
  { status: 'shipped', at: '2026-09-05T13:10:00' },
  { status: 'delivered', at: '2026-09-09T11:22:00' },
  { status: 'received', at: '2026-09-09T18:03:00' }],

  messages: [
  { id: 'c1', from: 'me', text: 'These smell incredible. Thank you!', at: '2026-09-09T18:04:00' },
  { id: 'c2', from: 'them', text: 'So glad you love them! Let me know when you need a refill.', at: '2026-09-09T19:30:00' }],

  shippingAddress: samAddress
},
{
  id: 'CR-10398',
  role: 'purchase',
  listingId: 'mountain-lake-riso',
  quantity: 1,
  selections: { Size: 'A3' },
  unitPrice: 34,
  deliveryFee: 6,
  deliveryMethod: 'shipping',
  status: 'disputed',
  carrier: 'USPS',
  trackingNumber: '9400 1118 9922 3301 2290 41',
  counterparty: { name: 'Hana Sato', location: 'Chicago, IL' },
  createdAt: '2026-08-28T08:30:00',
  events: [
  { status: 'purchased', at: '2026-08-28T08:30:00' },
  { status: 'shipped', at: '2026-08-29T15:00:00' },
  { status: 'delivered', at: '2026-09-02T10:15:00' },
  { status: 'disputed', at: '2026-09-02T18:40:00', note: 'Print arrived with a creased corner' }],

  messages: [
  { id: 'd1', from: 'me', text: 'Hi Hana, the print arrived with a crease in the bottom-right corner. Photo attached.', at: '2026-09-02T18:41:00' },
  { id: 'd2', from: 'them', text: 'I’m so sorry! I’ll send a replacement today in a rigid mailer — no need to return the first one.', at: '2026-09-02T20:12:00' }],

  shippingAddress: samAddress
},
{
  id: 'CR-10377',
  role: 'purchase',
  listingId: 'fig-leaf-vessel-candle',
  quantity: 1,
  selections: {},
  unitPrice: 48,
  deliveryFee: 9,
  deliveryMethod: 'shipping',
  status: 'cancelled',
  counterparty: { name: 'Priya Nair', location: 'Austin, TX' },
  createdAt: '2026-08-20T12:00:00',
  events: [
  { status: 'purchased', at: '2026-08-20T12:00:00' },
  { status: 'cancelled', at: '2026-08-21T09:00:00', note: 'Vessels out of stock — refunded in full' }],

  messages: [
  { id: 'e1', from: 'them', text: 'So sorry Sam — my potter’s kiln broke this week, so I’ve refunded you in full. I’ll message you when they’re back!', at: '2026-08-21T09:01:00' }],

  shippingAddress: samAddress
},
{
  id: 'CR-10501',
  role: 'sale',
  listingId: 'speckled-stoneware-mug',
  quantity: 2,
  selections: { Size: '12 oz', Glaze: 'Sage' },
  unitPrice: 38,
  deliveryFee: 8,
  deliveryMethod: 'shipping',
  status: 'purchased',
  counterparty: { name: 'Jordan Ellis', location: 'Seattle, WA' },
  createdAt: '2026-09-30T20:14:00',
  events: [{ status: 'purchased', at: '2026-09-30T20:14:00' }],
  messages: [
  { id: 'f1', from: 'them', text: 'Hi! Any chance these could ship by Friday? It’s for my partner’s birthday.', at: '2026-09-30T20:16:00' }],

  shippingAddress: {
    fullName: 'Jordan Ellis',
    line1: '1520 NW 57th St',
    city: 'Seattle',
    state: 'Washington',
    postalCode: '98107',
    country: 'United States'
  },
  giftNote: 'Happy birthday, Alex — to many slow mornings together.'
},
{
  id: 'CR-10496',
  role: 'sale',
  listingId: 'ash-glaze-serving-bowl',
  quantity: 1,
  selections: { Size: 'Large (11")' },
  unitPrice: 86,
  deliveryFee: 0,
  deliveryMethod: 'pickup',
  status: 'purchased',
  counterparty: { name: 'Abby Turner', location: 'Portland, OR' },
  createdAt: '2026-09-29T11:02:00',
  events: [{ status: 'purchased', at: '2026-09-29T11:02:00' }],
  messages: [
  { id: 'g1', from: 'them', text: 'Could I swing by Saturday morning to pick up?', at: '2026-09-29T11:05:00' },
  { id: 'g2', from: 'me', text: 'Saturday 10–12 works great. Ring the bell at Studio B!', at: '2026-09-29T12:20:00' }]

},
{
  id: 'CR-10470',
  role: 'sale',
  listingId: 'bud-vase-trio',
  quantity: 1,
  selections: {},
  unitPrice: 64,
  deliveryFee: 10,
  deliveryMethod: 'shipping',
  status: 'shipped',
  carrier: 'USPS',
  trackingNumber: '9400 1118 9922 3302 1180 77',
  counterparty: { name: 'Noor Haddad', location: 'Chicago, IL' },
  createdAt: '2026-09-23T16:48:00',
  events: [
  { status: 'purchased', at: '2026-09-23T16:48:00' },
  { status: 'shipped', at: '2026-09-25T09:30:00' }],

  messages: [],
  shippingAddress: {
    fullName: 'Noor Haddad',
    line1: '3340 N Clark St',
    line2: 'Apt 4',
    city: 'Chicago',
    state: 'Illinois',
    postalCode: '60657',
    country: 'United States'
  }
},
{
  id: 'CR-10412',
  role: 'sale',
  listingId: 'speckled-stoneware-mug',
  quantity: 4,
  selections: { Size: '8 oz', Glaze: 'Oatmeal' },
  unitPrice: 38,
  deliveryFee: 8,
  deliveryMethod: 'shipping',
  status: 'received',
  carrier: 'UPS',
  trackingNumber: '1Z 84F 2W1 03 1902 5512',
  counterparty: { name: 'Mei Lin', location: 'Oakland, CA' },
  createdAt: '2026-08-29T10:00:00',
  events: [
  { status: 'purchased', at: '2026-08-29T10:00:00' },
  { status: 'shipped', at: '2026-08-30T15:20:00' },
  { status: 'delivered', at: '2026-09-02T13:45:00' },
  { status: 'received', at: '2026-09-02T19:10:00' }],

  messages: [
  { id: 'h1', from: 'them', text: 'They arrived perfectly. Thank you for the lovely note!', at: '2026-09-02T19:11:00' }],

  shippingAddress: {
    fullName: 'Mei Lin',
    line1: '512 Grand Ave',
    city: 'Oakland',
    state: 'California',
    postalCode: '94610',
    country: 'United States'
  }
}];
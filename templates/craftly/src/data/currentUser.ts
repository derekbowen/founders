import type { User } from '../types/marketplace';

export const currentUser: User = {
  id: 'u-sam',
  firstName: 'Sam',
  lastName: 'Rivera',
  email: 'sam@juniperkiln.com',
  phone: '(503) 555-0148',
  shopId: 'm1',
  shippingAddress: {
    fullName: 'Sam Rivera',
    line1: '2417 SE Hawthorne Blvd',
    line2: 'Studio B',
    city: 'Portland',
    state: 'Oregon',
    postalCode: '97214',
    country: 'United States'
  },
  payout: { accountHolder: 'Sam Rivera', bankLast4: '4821', connected: true }
};
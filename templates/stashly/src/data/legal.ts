import { brand } from './brand';

export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

export const termsUpdated = 'September 1, 2026';
export const privacyUpdated = 'September 1, 2026';

export const termsSections: LegalSection[] = [
{
  id: 'service',
  title: '1. The service',
  body: [
  `${brand.name} is an online marketplace that lets people who have spare space ("Hosts") offer it to people who need storage ("Storers"). ${brand.legalEntity} is not a party to the storage agreement between Hosts and Storers.`]

},
{
  id: 'bookings',
  title: '2. Bookings and payments',
  body: [
  'Bookings are made by the day. Prices are displayed per month (30 days) for convenience. Ongoing monthly bookings renew automatically every 30 days until either party gives 7 days’ notice.',
  `Storers pay a service fee of ${Math.round(brand.marketplace.serviceFeeRate * 100)}% on each billing period. Hosts pay a ${Math.round(brand.marketplace.hostCommissionRate * 100)}% commission deducted from payouts.`]

},
{
  id: 'deposits',
  title: '3. Deposits',
  body: ['Hosts may require a refundable deposit. Deposits are held by our payment processor and released within 5 days of a confirmed move-out unless a claim is filed.']
},
{
  id: 'prohibited',
  title: '4. Prohibited items',
  body: ['Storers must not store food, perishables, flammable or hazardous materials, firearms, ammunition, live animals, plants, or any illegal or stolen items. No one may live in a storage space or vehicle.']
},
{
  id: 'access',
  title: '5. Access',
  body: ['Hosts set access hours and frequency in each listing. Storers agree to visit only within those hours and to log entries where a smart lock or check-in is available.']
},
{
  id: 'cancellation',
  title: '6. Cancellation',
  body: ['Requests can be withdrawn at no cost before acceptance. After move-in, either party may end an ongoing booking with 7 days’ notice; fixed-term bookings follow the dates agreed at checkout.']
},
{
  id: 'liability',
  title: '7. Protection and liability',
  body: [`${brand.name} Protect covers eligible loss or damage to stored belongings up to $25,000 per booking, subject to the Protection Terms. Except as required by law, our liability is limited to the fees paid to us in the 12 months before a claim.`]
}];


export const privacySections: LegalSection[] = [
{
  id: 'collect',
  title: 'Information we collect',
  body: ['Account details (name, email, phone), listing information, booking history, messages, inventory lists, and payment data processed by Stripe. We collect device and usage data to keep the service secure.']
},
{
  id: 'use',
  title: 'How we use it',
  body: ['To operate bookings and payouts, verify identity, prevent fraud, provide support, and — with your consent — send product updates.']
},
{
  id: 'share',
  title: 'What we share',
  body: ['Hosts see a Storer’s name, inventory and messages. Exact addresses and phone numbers are shared only after a booking is accepted. We never sell personal data.']
},
{
  id: 'retention',
  title: 'Retention',
  body: ['We keep booking records for 7 years for tax and legal purposes. You can delete your account at any time from Account settings.']
},
{
  id: 'rights',
  title: 'Your rights',
  body: [`You can access, correct, export or delete your data. Contact ${brand.supportEmail} and we’ll respond within 30 days.`]
}];
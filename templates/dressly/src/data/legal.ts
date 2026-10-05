import { brand } from './brand';

export interface LegalSection {
  heading: string;
  body: string[];
}

export const termsUpdated = 'September 1, 2026';
export const privacyUpdated = 'September 1, 2026';

export const termsSections: LegalSection[] = [
{
  heading: '1. The marketplace',
  body: [
  `${brand.name} is a peer-to-peer marketplace that connects people who own designer dresses (“Lenders”) with people who want to rent them (“Renters”). ${brand.legalEntity} is not a party to rental agreements between members, but provides payments, damage protection and support.`]

},
{
  heading: '2. Bookings and rental periods',
  body: [
  'Rentals are offered for 4-day or 8-day periods. The rental period begins on the day the dress is scheduled to arrive (the day before your event) and ends on the return-by date shown at checkout.',
  'A booking request becomes a confirmed rental only when the Lender accepts it. Your payment method is authorized at request and charged on confirmation.']

},
{
  heading: '3. Delivery, pickup and returns',
  body: [
  'Shipped rentals include a prepaid round-trip label. Returns must be dropped off with the carrier by the return-by date. Pickups and drop-offs are arranged directly between members.',
  'Late returns are charged at the daily rate of the rental for each day late, up to the item’s retail value.']

},
{
  heading: '4. Cleaning and care',
  body: [
  'Professional cleaning is included in every rental. Renters must not wash, dry-clean, alter or repair rented items.']

},
{
  heading: '5. Damage protection',
  body: [
  'Damage protection covers minor accidental damage such as small stains, loose beading or broken zippers. It does not cover loss, theft or irreparable damage, which may be charged up to the retail value listed.']

},
{
  heading: '6. Fees and payouts',
  body: [
  `Renters pay a service fee shown at checkout. Lenders receive the rental price minus a ${Math.round(brand.fees.lenderCommissionRate * 100)}% commission, paid out after the rental is completed.`]

},
{
  heading: '7. Cancellations',
  body: [
  'Renters may cancel free of charge up to 7 days before the rental starts. Lenders who cancel confirmed rentals may have their listings suspended.']

},
{
  heading: '8. Contact',
  body: [`Questions about these terms? Email ${brand.supportEmail}.`]
}];


export const privacySections: LegalSection[] = [
{
  heading: 'What we collect',
  body: [
  'Account information (name, email, phone), sizing and measurement preferences, listing content and photos, messages between members, and transaction history. Payment details are collected and stored by our payment processor, Stripe — we never see your full card number.']

},
{
  heading: 'How we use it',
  body: [
  'To operate the marketplace: matching renters with dresses that fit, processing payments and payouts, generating shipping labels, preventing fraud and providing customer support.']

},
{
  heading: 'What we share',
  body: [
  'Your first name, city, profile and reviews are visible to other members. Your delivery address and phone number are shared with the other party only after a booking is confirmed. We never sell your personal data.']

},
{
  heading: 'Your choices',
  body: [
  'You can update your information in Account settings, opt out of marketing emails at any time, and request a copy or deletion of your data by contacting us.']

},
{
  heading: 'Contact',
  body: [`Privacy questions? Email ${brand.supportEmail}.`]
}];
import { brand } from './brand';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export const termsUpdated = 'September 1, 2026';
export const privacyUpdated = 'September 1, 2026';

export const termsSections: LegalSection[] = [
{
  id: 'acceptance',
  title: '1. Acceptance of terms',
  paragraphs: [
  `These Terms of Service govern your use of the ${brand.name} marketplace operated by ${brand.legalName}. By creating an account or placing an order, you agree to these terms on behalf of yourself and the business you represent.`]

},
{
  id: 'accounts',
  title: '2. Business accounts & verification',
  paragraphs: [
  `${brand.name} is a business-to-business marketplace. Retailers must provide a valid business name, tax ID or resale certificate, and a physical or online storefront. Brands must provide business and payout details before listing products.`,
  'We may request additional verification at any time and may suspend accounts that provide inaccurate information.']

},
{
  id: 'orders',
  title: '3. Orders, minimums & pricing',
  paragraphs: [
  'Products are sold in case quantities. Each listing displays its case pack size, minimum order quantity and tiered pricing. The tier applied to an order is determined by the number of cases of that product in the order at checkout.',
  'An order becomes binding when the brand confirms it. Brands may decline orders within 48 hours, in which case no payment is captured.']

},
{
  id: 'payments',
  title: '4. Payments & payouts',
  paragraphs: [
  `Payments are processed by our payment partner. Retailer cards are authorized at checkout and captured when the brand confirms. Brand payouts are released after the retailer confirms receipt or 2 days after carrier delivery, less the ${brand.sellerCommission} marketplace commission.`]

},
{
  id: 'shipping',
  title: '5. Shipping, returns & disputes',
  paragraphs: [
  'Brands are responsible for packing and shipping orders within their stated lead time. Retailers must report damaged, missing or incorrect items within 7 days of delivery by opening a dispute from the order page.',
  'First orders with a new brand may be eligible for free returns of unsold product within 60 days, subject to the returns policy.']

},
{
  id: 'liability',
  title: '6. Limitation of liability',
  paragraphs: [
  `To the maximum extent permitted by law, ${brand.legalName} is not liable for indirect, incidental or consequential damages arising from use of the marketplace.`]

}];


export const privacySections: LegalSection[] = [
{
  id: 'collect',
  title: '1. Information we collect',
  paragraphs: [
  'Account details (name, email, phone), business details (business name, tax ID, address), order history, messages exchanged with other members, and payment information processed by our payment partner.',
  'We also collect device and usage data such as IP address, browser type and pages viewed to keep the marketplace secure and improve it.']

},
{
  id: 'use',
  title: '2. How we use information',
  paragraphs: [
  'To verify businesses, process orders and payouts, provide customer support, prevent fraud, and send transactional messages. With your consent, we send product updates and marketing emails, which you can opt out of at any time.']

},
{
  id: 'share',
  title: '3. Sharing',
  paragraphs: [
  'We share order and shipping details with the brand or retailer on the other side of a transaction, and with service providers (payments, shipping, hosting) under contract. We never sell personal information.']

},
{
  id: 'rights',
  title: '4. Your rights',
  paragraphs: [
  `You can access, correct, export or delete your data from Account settings or by contacting ${brand.supportEmail}. Residents of certain jurisdictions have additional rights under laws such as the CCPA and GDPR.`]

},
{
  id: 'retention',
  title: '5. Retention & security',
  paragraphs: [
  'We retain transaction records for as long as required for tax and accounting purposes, and protect data with encryption in transit and at rest.']

}];
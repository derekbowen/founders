import { brand } from './brand';

export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

export const legalUpdated = 'September 1, 2026';

export const termsSections: LegalSection[] = [
{
  id: 'overview',
  title: '1. Overview',
  body: [
  `${brand.name} is an online marketplace that connects people who need home jobs done (“Customers”) with independent service providers (“Pros”). Customers post jobs, Pros send offers, and the parties agree on price and timing directly.`,
  `${brand.name} is not a party to the agreement between a Customer and a Pro and does not employ Pros. By creating an account you agree to these Terms.`]

},
{
  id: 'accounts',
  title: '2. Accounts & eligibility',
  body: [
  'You must be at least 18 years old and able to form a binding contract. You are responsible for keeping your login credentials secure and for all activity under your account.',
  'Pros must complete identity verification and a background check before sending offers. We may suspend accounts that provide false information.']

},
{
  id: 'offers',
  title: '3. Offers, counters & acceptance',
  body: [
  'A Pro’s offer states a price and earliest available date. Either party may counter. An offer becomes binding when the other party accepts it and the Customer completes payment.',
  'Offers and counter-offers expire if the job is filled, removed, or after 7 days without a response.']

},
{
  id: 'payments',
  title: '4. Payments & fees',
  body: [
  `Customers pay the agreed price plus a ${brand.fees.customerServiceRate * 100}% service fee when they accept an offer. Funds are held by our payment processor until the Customer confirms completion.`,
  `Pros pay a ${brand.fees.proCommissionRate * 100}% commission, deducted from the payout. Payouts are released after the Customer confirms the job, or automatically 72 hours after the Pro marks the job done if the Customer does not respond.`,
  'All payments must go through the platform. Taking payment off-platform is a violation of these Terms and voids the Guarantee.']

},
{
  id: 'cancellations',
  title: '5. Cancellations & disputes',
  body: [
  'Customers may cancel free of charge up to 24 hours before the agreed start date. Later cancellations may incur a fee of up to 25% of the job price, paid to the Pro.',
  'If something goes wrong, either party can open a dispute from the inbox within 48 hours of completion. Our support team will review messages, photos and the job record to reach a resolution.']

},
{
  id: 'guarantee',
  title: `6. The ${brand.name} Guarantee`,
  body: [
  `For jobs booked and paid through ${brand.name}, we cover property damage caused by a Pro up to $${brand.guaranteeAmount.toLocaleString()} per job, subject to the Guarantee policy and claim review.`]

},
{
  id: 'conduct',
  title: '7. Community standards',
  body: [
  'Treat others with respect. Harassment, discrimination, fraudulent listings, and fake reviews are prohibited and may result in permanent removal.']

},
{
  id: 'liability',
  title: '8. Limitation of liability',
  body: [
  `To the maximum extent permitted by law, ${brand.name} is not liable for indirect or consequential damages arising from jobs arranged through the marketplace. Our total liability is limited to the fees we received for the job in question.`]

},
{
  id: 'contact',
  title: '9. Contact',
  body: [`Questions about these Terms? Email ${brand.supportEmail}.`]
}];


export const privacySections: LegalSection[] = [
{
  id: 'collect',
  title: '1. Information we collect',
  body: [
  'Account information: name, email, phone number, password, and the account type you choose (Customer or Pro).',
  'Job information: job descriptions, photos, neighborhood, dates, budgets, offers and messages exchanged on the platform.',
  'Pro verification: government ID and background-check results, processed by our verification partner.',
  'Payment information: card and bank details are collected and stored by our payment processor. We only see the last four digits.']

},
{
  id: 'use',
  title: '2. How we use it',
  body: [
  'To run the marketplace: show jobs to nearby Pros, deliver offers and messages, process payments and payouts, and provide support.',
  'To keep people safe: verify identities, detect fraud, and enforce our Terms.',
  'To improve the product: aggregated, de-identified analytics about how the marketplace is used.']

},
{
  id: 'share',
  title: '3. What we share',
  body: [
  'Your neighborhood, job details and public profile are visible to other members. Your exact address and phone number are only shared with the other party once a job is booked and paid.',
  'We share data with service providers (payments, verification, hosting, email) under contracts that limit their use. We never sell your personal information.']

},
{
  id: 'retention',
  title: '4. Retention',
  body: ['We keep account data while your account is active and for up to 7 years afterwards where required for tax, legal, or dispute purposes.']
},
{
  id: 'rights',
  title: '5. Your choices & rights',
  body: [
  'You can update your contact details in Account settings, download a copy of your data, or request deletion by contacting support.',
  'Residents of certain states have additional rights under local privacy laws, including the right to know, correct and delete personal information.']

},
{
  id: 'cookies',
  title: '6. Cookies',
  body: ['We use essential cookies to keep you logged in and optional analytics cookies to understand usage. You can manage optional cookies in your browser.']
},
{
  id: 'contact',
  title: '7. Contact us',
  body: [`Privacy questions or requests: ${brand.supportEmail}.`]
}];
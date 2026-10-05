import { brand } from './brand';

export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

export const termsUpdated = 'September 15, 2026';
export const privacyUpdated = 'September 15, 2026';

export const termsSections: LegalSection[] = [
{
  id: 'introduction',
  title: '1. Introduction',
  body: [
  `These Terms of Service govern your use of the ${brand.name} marketplace, operated by ${brand.companyName}. By creating an account or making a booking you agree to these terms.`,
  `${brand.name} is a platform that connects pet owners with independent pet sitters. ${brand.name} is not a pet care provider and does not employ sitters.`]

},
{
  id: 'accounts',
  title: '2. Accounts',
  body: [
  'You must be at least 18 years old to create an account. You are responsible for keeping your login details secure and for all activity on your account.',
  'Sitters must complete identity verification and background screening before accepting bookings.']

},
{
  id: 'bookings',
  title: '3. Bookings & payments',
  body: [
  'Bookings are requests until the sitter accepts. Your payment method is authorized when you request and charged when the sitter accepts.',
  'Funds are held and released to the sitter after care begins. A service fee is added to each booking and shown before you confirm.']

},
{
  id: 'cancellations',
  title: '4. Cancellations & refunds',
  body: [
  'Owners can cancel a request at no cost before it is accepted. After acceptance, cancellations more than 48 hours before the start date are fully refunded excluding the service fee.',
  `If a sitter cancels, the ${brand.guaranteeName} provides a full refund or help rebooking with a comparable sitter.`]

},
{
  id: 'conduct',
  title: '5. Community standards',
  body: [
  'Treat every member and every animal with respect. Harassment, discrimination, misrepresentation or off-platform payments are not permitted and may result in account removal.']

},
{
  id: 'liability',
  title: '6. Limitation of liability',
  body: [
  `To the fullest extent permitted by law, ${brand.companyName} is not liable for indirect or consequential damages arising from your use of the marketplace. Nothing in these terms limits liability that cannot be limited by law.`]

},
{
  id: 'contact',
  title: '7. Contact',
  body: [`Questions about these terms? Email ${brand.supportEmail} or write to ${brand.address}.`]
}];


export const privacySections: LegalSection[] = [
{
  id: 'collect',
  title: '1. Information we collect',
  body: [
  'Account details such as your name, email, phone number and profile photo; pet profiles including breed, age and care notes; booking and messaging history; and payment details processed by our payment partner.']

},
{
  id: 'use',
  title: '2. How we use information',
  body: [
  'To operate the marketplace, match owners with sitters, process payments, verify identities, provide customer support and keep our community safe.',
  'We never sell your personal information.']

},
{
  id: 'share',
  title: '3. Sharing',
  body: [
  'We share booking-relevant details (like your pet’s care notes) with the sitter you book. We share data with service providers such as payment processors and background-check partners under strict agreements.']

},
{
  id: 'rights',
  title: '4. Your rights',
  body: [
  'You can access, correct or delete your personal information at any time from Account settings or by contacting us. Depending on where you live, you may have additional rights.']

},
{
  id: 'retention',
  title: '5. Retention & security',
  body: [
  'We keep data only as long as needed for the purposes above or as required by law, and protect it with encryption in transit and at rest.']

},
{
  id: 'contact',
  title: '6. Contact',
  body: [`Privacy questions can be sent to ${brand.supportEmail}.`]
}];
import type { LegalSection } from '../types/marketplace';

export const legalUpdatedAt = 'September 1, 2026';

export const termsSections: LegalSection[] = [
{
  heading: '1. Using the marketplace',
  body: [
  'The marketplace connects independent creators who sell digital files with buyers who download them. By creating an account or making a purchase you agree to these terms.',
  'You must be at least 16 years old to use the service, and 18 to sell.']

},
{
  heading: '2. Buying digital products',
  body: [
  'Every purchase grants you a license to the files — not ownership of the underlying work. The license type (personal or commercial) is shown on each listing before you buy.',
  'Files are available instantly after payment and stay in your library for as long as your account exists.']

},
{
  heading: '3. Refunds',
  body: [
  'Because files are delivered instantly, refunds are issued at the creator’s discretion. If a file is corrupted, materially different from its description or never delivered, contact us within 30 days and we will make it right.']

},
{
  heading: '4. Selling on the marketplace',
  body: [
  'Creators keep all rights to their work and set their own prices. We charge a flat commission on each sale, deducted before payout. Payouts are sent weekly via our payment partner.',
  'You may only sell files you created or have the right to resell. Listings that infringe copyright are removed.']

},
{
  heading: '5. Prohibited content',
  body: ['No malware, stolen content, illegal material, or files that misrepresent what they contain. We may suspend accounts that break these rules.']
},
{
  heading: '6. Liability',
  body: ['The service is provided “as is”. To the extent allowed by law, our liability is limited to the amount you paid for the product in question.']
}];


export const privacySections: LegalSection[] = [
{
  heading: 'What we collect',
  body: [
  'Account details (name, email), purchase history, payout details for creators, and basic usage analytics to keep the service running smoothly.',
  'Card details are handled entirely by our payment processor — we never see or store your full card number.']

},
{
  heading: 'How we use it',
  body: ['To deliver your downloads, send receipts, pay creators, prevent fraud and improve the marketplace. We never sell your personal data.']
},
{
  heading: 'What creators see',
  body: ['When you buy a product, the creator receives your name and email so they can support you and send product updates. You can opt out of creator emails at any time.']
},
{
  heading: 'Cookies',
  body: ['We use essential cookies to keep you signed in and remember your cart, plus privacy-friendly analytics without cross-site tracking.']
},
{
  heading: 'Your rights',
  body: ['You can download or delete your data from Account settings at any time, or email us and we will respond within 30 days.']
}];
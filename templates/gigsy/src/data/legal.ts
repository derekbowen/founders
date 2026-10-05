export interface LegalSection {
  heading: string;
  body: string[];
}

export const termsUpdated = '2026-08-01';
export const privacyUpdated = '2026-08-01';

export const termsSections: LegalSection[] = [
{ heading: '1. Using the marketplace', body: ['By creating an account you agree to these Terms. You must be at least 18 years old and able to form a binding contract.', 'The marketplace connects clients who need services with independent freelancers. We are not a party to the agreement between clients and freelancers.'] },
{ heading: '2. Quotes, offers and acceptance', body: ['Clients request quotes by submitting a project brief. Freelancers may respond with an offer describing scope, price and delivery date.', 'Either party may counter an offer. A binding agreement forms only when the client accepts an offer and completes payment.'] },
{ heading: '3. Payments and fees', body: ['Payments are processed by our payment partner and held until the client approves the delivery or the review period ends.', 'A service fee is added to each transaction and shown before checkout. Freelancer payouts are sent to the connected bank account.'] },
{ heading: '4. Delivery and approval', body: ['Freelancers deliver work through the transaction page. Clients have 7 days to approve or request a revision before the delivery is automatically approved.'] },
{ heading: '5. Cancellations and disputes', body: ['If a project cannot be completed, either party may request a cancellation. Our support team mediates disputes and may issue full or partial refunds.'] },
{ heading: '6. Content and conduct', body: ['You retain ownership of content you upload. You grant us a license to display listing content for operating the marketplace. Harassment, fraud or circumventing payments results in account suspension.'] }];


export const privacySections: LegalSection[] = [
{ heading: 'Information we collect', body: ['Account details such as your name, email and profile information; transaction and messaging data; and payment details processed by our payment partner.'] },
{ heading: 'How we use information', body: ['To operate the marketplace, process payments, prevent fraud, provide support and — with your consent — send product updates.'] },
{ heading: 'Sharing', body: ['We share information with the other party in a transaction, with service providers who help us operate the platform, and when required by law. We never sell your personal data.'] },
{ heading: 'Your rights', body: ['You can access, correct, export or delete your data at any time from your account settings or by contacting support.'] },
{ heading: 'Data retention', body: ['We keep transaction records for as long as required for tax and legal purposes, and delete other data within 90 days of account closure.'] }];
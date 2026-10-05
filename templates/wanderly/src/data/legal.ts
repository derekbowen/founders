export interface LegalSection {
  heading: string;
  body: string;
}

export const legalUpdated = 'September 1, 2026';

export const termsSections: LegalSection[] = [
{ heading: '1. Using the marketplace', body: 'The platform connects guests with independent local hosts who offer tours and experiences. We are not a party to the agreement between hosts and guests, but we provide the tools to discover, book and pay for experiences securely.' },
{ heading: '2. Accounts', body: 'You must be at least 18 years old to create an account. You are responsible for keeping your login details secure and for all activity that happens under your account.' },
{ heading: '3. Booking and payment', body: 'When you book an experience, you agree to pay the total price shown at checkout, including the guest service fee. Payment is authorized at booking and captured when the host confirms. Funds are released to the host 24 hours after the experience starts.' },
{ heading: '4. Cancellations and refunds', body: 'Guests can cancel for a full refund up to 24 hours before the start time. Cancellations within 24 hours are non-refundable unless the host cancels or the experience is called off for weather or safety, in which case you receive a full refund.' },
{ heading: '5. Host responsibilities', body: 'Hosts are responsible for providing the experience as described, holding any licenses and insurance required locally, and keeping their calendar and seat availability up to date.' },
{ heading: '6. Guest conduct', body: 'Guests agree to follow the host\u2019s safety instructions, arrive on time at the meeting point and treat hosts, other guests and local communities with respect.' },
{ heading: '7. Reviews', body: 'Reviews must reflect genuine experiences. We may remove reviews that are fraudulent, abusive or violate our content policy.' },
{ heading: '8. Liability', body: 'To the maximum extent permitted by law, the marketplace is not liable for the acts or omissions of hosts or guests. Nothing in these terms limits liability that cannot be excluded by law.' },
{ heading: '9. Changes', body: 'We may update these terms from time to time. We will notify you of material changes by email or in the app before they take effect.' }];


export const privacySections: LegalSection[] = [
{ heading: 'Information we collect', body: 'We collect the information you provide when you create an account, book or host an experience — such as your name, email, phone number, payment details, and messages exchanged with hosts or guests.' },
{ heading: 'How we use it', body: 'We use your information to operate the marketplace, process payments, help hosts and guests communicate, prevent fraud, and improve our service. With your consent, we may send you travel inspiration and offers.' },
{ heading: 'Sharing', body: 'We share booking details with the host of your experience (or the guest, if you are hosting). Payments are processed by our payment partner. We never sell your personal data.' },
{ heading: 'Cookies', body: 'We use essential cookies to keep you signed in and optional analytics cookies to understand how the site is used. You can manage your preferences at any time.' },
{ heading: 'Data retention', body: 'We keep your information for as long as your account is active and as needed to meet legal, tax and accounting obligations.' },
{ heading: 'Your rights', body: 'You can access, correct, export or delete your personal data from your account settings or by contacting our support team.' },
{ heading: 'Contact', body: 'Questions about privacy? Contact our data protection team using the support email listed in the footer.' }];
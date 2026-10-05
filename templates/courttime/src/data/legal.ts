import { LegalSection } from '../types/marketplace';

export const termsSections: LegalSection[] = [
{ heading: '1. Using the marketplace', body: 'The platform connects players with clubs, facilities and private owners (“Hosts”) who rent courts and fields by the hour. We are not a party to the rental agreement between players and Hosts, but we provide the tools to book, pay and communicate.' },
{ heading: '2. Accounts', body: 'You must be at least 18 years old to create an account. You are responsible for keeping your login details secure and for all activity under your account. Players under 18 may play when a guardian books on their behalf.' },
{ heading: '3. Bookings & payments', body: 'Prices are shown per hour for private courts and per seat for open-play sessions, plus a service fee shown before checkout. Your card is charged when a booking is placed. Hosts receive payouts after the game is marked as played.' },
{ heading: '4. Cancellations & no-shows', body: 'Each listing displays its cancellation policy. Unless stated otherwise, bookings cancelled at least 24 hours before start are fully refunded. Missed bookings are marked as no-shows and are not refunded.' },
{ heading: '5. Host responsibilities', body: 'Hosts must accurately describe their facilities, keep availability up to date, maintain safe playing conditions and honor confirmed bookings. Repeated cancellations by a Host may lead to listing removal.' },
{ heading: '6. Conduct & safety', body: 'Treat other players, staff and facilities with respect. Follow each venue’s house rules. Physical activity carries inherent risk; you participate at your own risk and should play within your abilities.' },
{ heading: '7. Changes to these terms', body: 'We may update these terms from time to time. We’ll notify you of material changes by email or in the app at least 14 days before they take effect.' }];


export const privacySections: LegalSection[] = [
{ heading: 'What we collect', body: 'Account details (name, email, phone), booking history, messages sent through the inbox, payment information processed by our payment provider, and approximate location when you search for nearby courts.' },
{ heading: 'How we use it', body: 'To process bookings and payouts, send confirmations and reminders, prevent fraud, improve search results and provide customer support. We never sell your personal data.' },
{ heading: 'Sharing with Hosts', body: 'When you book, the Host sees your name, player names you add, and messages you send. Exact facility addresses and gate codes are shared with you only after a booking is confirmed.' },
{ heading: 'Payments', body: 'Card details are handled by Stripe and never stored on our servers. Hosts provide bank details directly to Stripe for payouts.' },
{ heading: 'Your choices', body: 'You can update your contact details, notification preferences and password in Account settings, download your data, or delete your account at any time by contacting support.' },
{ heading: 'Data retention', body: 'Booking and payment records are kept for seven years to meet tax obligations. Messages and profile data are deleted within 30 days of account deletion.' }];
export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export const legalLastUpdated = 'September 1, 2026';

export const termsSections: LegalSection[] = [
{
  heading: '1. Using the marketplace',
  paragraphs: [
  'The marketplace connects drivers who need parking with hosts who offer private driveways, garages and lot spaces. We are not a party to the rental agreement between drivers and hosts.',
  'You must be at least 18 years old and hold a valid driver’s license to book a space.']

},
{
  heading: '2. Bookings and payments',
  paragraphs: [
  'Bookings can be made by the hour or by the day. Prices shown include the host’s rate; a driver service fee is added at checkout.',
  'Your card is authorized when you request a booking and charged when the host confirms. Instant-book spaces are charged immediately.']

},
{
  heading: '3. Cancellations',
  paragraphs: [
  'Drivers may cancel for a full refund up to 2 hours before arrival. Later cancellations are refunded at 50%.',
  'If a host cancels, the driver receives a full refund and a credit toward their next booking.']

},
{
  heading: '4. Host responsibilities',
  paragraphs: [
  'Hosts must have the right to rent the space, keep it accessible during booked hours, and provide accurate size limits and access instructions.',
  'Hosts are responsible for complying with local regulations, HOA rules and tax obligations.']

},
{
  heading: '5. Vehicles, damage and towing',
  paragraphs: [
  'Drivers must park only in the booked space and only the vehicle with the registered plate. Overstays may be charged at the hourly rate.',
  'Damage claims are handled through our resolution center within 14 days of the booking ending.']

}];


export const privacySections: LegalSection[] = [
{
  heading: 'Information we collect',
  paragraphs: [
  'Account details (name, email, phone), vehicle information (plate, make and model), payment details processed by our payment partner, and booking history.',
  'Approximate location when you search, if you allow it.']

},
{
  heading: 'How we use it',
  paragraphs: [
  'To facilitate bookings, share your plate and arrival time with your host, process payments and payouts, prevent fraud, and improve the service.']

},
{
  heading: 'What hosts and drivers see',
  paragraphs: [
  'Hosts see your first name, profile photo, plate number and messages for bookings with them. Exact host addresses and access codes are only shared after a booking is confirmed.']

},
{
  heading: 'Your choices',
  paragraphs: [
  'You can update or delete your account at any time from account settings. You may opt out of marketing emails using the link in any message.']

},
{
  heading: 'Contact',
  paragraphs: ['Questions about privacy? Email our privacy team and we’ll respond within 30 days.']
}];
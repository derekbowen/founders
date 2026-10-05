export interface LegalSection {
  heading: string;
  body: string;
}

export const termsSections: LegalSection[] = [
{ heading: '1. Using the marketplace', body: 'CampOut connects campers (“Guests”) with landowners (“Hosts”) who offer campsites, RV spots, cabins and glamping accommodations on private land. By creating an account you agree to these Terms and confirm you are at least 18 years old.' },
{ heading: '2. Bookings and payments', body: 'Bookings are priced per night. When you book, you authorize CampOut to charge the total shown at checkout, including the nightly rate, applicable cleaning and extra-camper fees, and the CampOut service fee. Payments are held securely and released to the Host 24 hours after check-in.' },
{ heading: '3. Cancellations', body: 'Each listing displays a Flexible, Moderate or Strict cancellation policy. Flexible: full refund up to 24 hours before check-in. Moderate: full refund up to 5 days before. Strict: 50% refund up to 7 days before. Service fees are refunded when a Host cancels.' },
{ heading: '4. Host responsibilities', body: 'Hosts must accurately describe their land, amenities and access, comply with local zoning, fire and permitting rules, and maintain appropriate liability coverage. Hosts set their own rules, which Guests agree to when booking.' },
{ heading: '5. Guest responsibilities', body: 'Guests agree to follow posted rules, Leave No Trace principles, local fire restrictions and wildlife regulations. Guests are responsible for damage they or their party cause.' },
{ heading: '6. Outdoor risk', body: 'Camping involves inherent risks including weather, wildlife, terrain and fire. You accept these risks and agree CampOut is not liable for injuries arising from outdoor activities except where required by law.' },
{ heading: '7. Changes to these terms', body: 'We may update these Terms from time to time. We will notify you of material changes by email at least 30 days before they take effect.' }];


export const privacySections: LegalSection[] = [
{ heading: 'What we collect', body: 'Account details (name, email, phone), profile information, booking history, messages exchanged on the platform, payment details processed by our payment partner, and approximate location when you search.' },
{ heading: 'How we use it', body: 'To operate bookings, process payments and payouts, keep the community safe, provide customer support, and — with your permission — send trip ideas and seasonal picks.' },
{ heading: 'What Hosts and Guests see', body: 'Hosts see your first name, profile photo and trip details. Exact addresses and arrival instructions are shared with Guests only after a booking is confirmed.' },
{ heading: 'Payments', body: 'Card and bank details are handled by our PCI-compliant payment processor. CampOut never stores full card numbers.' },
{ heading: 'Your choices', body: 'You can download or delete your data at any time from Account settings, and unsubscribe from marketing emails with one click.' },
{ heading: 'Contact', body: 'Questions? Email privacy@campout.co and our team will respond within 5 business days.' }];
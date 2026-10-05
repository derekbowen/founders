import { brand } from './brand';

export const currentUser = {
  id: 'me',
  name: 'Jordan Rivera',
  firstName: 'Jordan',
  email: 'jordan.rivera@example.com',
  phone: '(503) 555-0187',
  location: 'Kenton, Portland',
  bio: 'Pet parent to Biscuit, Pepper and Miso. Weekday dog walker on the side and always up for a park meetup.',
  memberSince: '2023'
};

export const howItWorks = [
{
  title: 'Search & compare',
  text: 'Browse verified sitters near you. Filter by service, yard, pet size and price, and read reviews from local pet parents.'
},
{
  title: 'Meet & request',
  text: 'Message sitters, set up a meet & greet, then send a booking request with your pet’s care notes.'
},
{
  title: 'Relax with updates',
  text: 'Get photo updates throughout the stay. Payment is released to your sitter only after care begins.'
}];


export const safetyPoints = [
{
  title: 'Vetted sitters',
  text: 'Every sitter passes an identity check, background screening and a profile review before they can accept bookings.'
},
{
  title: 'Photo updates',
  text: 'See how your pet is doing with photo updates and messages right in your booking conversation.'
},
{
  title: 'Reservation protection',
  text: `If your sitter cancels, the ${brand.guaranteeName} helps you rebook fast — or you get a full refund.`
}];


export const footerColumns = [
{
  title: 'Services',
  links: [
  { label: 'Pet boarding', to: '/s?service=boarding' },
  { label: 'House sitting', to: '/s?service=house-sitting' },
  { label: 'Drop-in visits', to: '/s?service=drop-in' },
  { label: 'Dog walking', to: '/s?service=dog-walking' }]

},
{
  title: 'Sitters',
  links: [
  { label: 'Become a sitter', to: '/listings/new' },
  { label: 'Sitter payouts', to: '/account/payouts' },
  { label: 'Inbox', to: '/inbox' }]

},
{
  title: 'Company',
  links: [
  { label: `About ${brand.name}`, to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' }]

}];


export const aboutStats = [
{ value: '2,400+', label: 'Vetted sitters' },
{ value: '68k', label: 'Nights booked' },
{ value: '4.9', label: 'Average rating' },
{ value: '24/7', label: 'Owner support' }];


export const aboutValues = [
{ title: 'Pets first, always', text: 'Every product decision starts with one question: is this better for the animal in our care?' },
{ title: 'Local by design', text: 'We help neighbors care for neighbors’ pets — no kennels, no anonymous staff, no cages.' },
{ title: 'Trust you can see', text: 'Verified profiles, honest reviews and photo updates mean you never have to wonder.' }];
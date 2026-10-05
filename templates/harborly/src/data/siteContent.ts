import { AnchorIcon, CloudSunIcon, LifeBuoyIcon, ShieldCheckIcon, BadgeCheckIcon, HeadphonesIcon } from 'lucide-react';

export const tripModes = [
{
  id: 'captained',
  title: 'Captained',
  eyebrow: 'Sit back & enjoy',
  description: 'A licensed captain handles navigation, docking and safety. No experience needed — ideal for celebrations, first-timers and big groups.',
  points: ['USCG-licensed captains', 'Local knowledge of coves & sandbars', 'Captain fee shown upfront']
},
{
  id: 'bareboat',
  title: 'Bareboat',
  eyebrow: 'Take the helm',
  description: 'Skipper the boat yourself. Owners verify your experience and boater card, then give you a dockside walkthrough before departure.',
  points: ['Boater education card required', 'Dockside check-out with the owner', 'Refundable fuel deposit']
}];


export const safetyItems = [
{ icon: ShieldCheckIcon, title: 'Up to $1M liability coverage', text: 'Every trip is insured through our marine insurance partner — for renters, owners and captains.' },
{ icon: BadgeCheckIcon, title: 'Verified owners & captains', text: 'We check identity, vessel registration and USCG captain credentials before listings go live.' },
{ icon: CloudSunIcon, title: 'Weather guarantee', text: 'Unsafe conditions? Reschedule for free or get a full refund, service fees included.' },
{ icon: HeadphonesIcon, title: '24/7 on-water support', text: 'Real people, day or night, plus towing assistance through our national partner network.' }];


export const howItWorks = [
{ icon: AnchorIcon, title: 'Find your boat', text: 'Filter by marina, boat type, captain and price.' },
{ icon: LifeBuoyIcon, title: 'Request to book', text: 'Owners confirm within 24 hours — you’re only charged on acceptance.' },
{ icon: CloudSunIcon, title: 'Head out', text: 'Meet at the dock, run the checklist, and enjoy the water.' }];


export const ownerStats = [
{ value: '$18,400', label: 'Average yearly owner earnings' },
{ value: '$1M', label: 'Liability insurance on every trip' },
{ value: '24h', label: 'Payouts after each trip' }];


export const footerColumns = [
{
  title: 'Explore',
  links: [
  { label: 'Search boats', to: '/s' },
  { label: 'Yachts', to: '/s?type=yacht' },
  { label: 'Sailboats', to: '/s?type=sailboat' },
  { label: 'Fishing charters', to: '/s?type=fishing' }]

},
{
  title: 'Owners',
  links: [
  { label: 'List your boat', to: '/listings/new' },
  { label: 'Your inbox', to: '/inbox/listings' },
  { label: 'Payout settings', to: '/account/payouts' }]

},
{
  title: 'Company',
  links: [
  { label: 'About us', to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' }]

}];


export const aboutValues = [
{ title: 'Safety first, always', text: 'Insurance, credential checks and a weather guarantee on every booking — so the only thing you worry about is sunscreen.' },
{ title: 'Owners are partners', text: 'Owners set their own prices, packages and rules. We keep fees low and payouts fast.' },
{ title: 'Respect the water', text: 'We fund reef restoration and marina cleanups with 1% of every booking.' }];
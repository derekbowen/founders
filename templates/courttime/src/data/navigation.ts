import { NavGroup } from '../types/marketplace';

export const siteMenuGroups: NavGroup[] = [
{
  title: 'Play',
  links: [
  { label: 'Home', to: '/' },
  { label: 'Explore courts', to: '/search' },
  { label: 'Open play sessions', to: '/search?openPlay=1' },
  { label: 'My games', to: '/inbox' }]

},
{
  title: 'Host',
  links: [
  { label: 'List your court', to: '/create-listing' },
  { label: 'Hosting inbox', to: '/inbox?tab=hosting' }]

},
{
  title: 'Account',
  links: [
  { label: 'Profile', to: '/profile/u-me' },
  { label: 'Contact details', to: '/account/contact' },
  { label: 'Password', to: '/account/password' },
  { label: 'Payouts', to: '/account/payouts' },
  { label: 'Log in', to: '/login' },
  { label: 'Sign up', to: '/signup' }]

},
{
  title: 'Company',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' }]

}];


export const footerGroups: NavGroup[] = [
{
  title: 'Sports',
  links: [
  { label: 'Tennis courts', to: '/search?sport=tennis' },
  { label: 'Pickleball courts', to: '/search?sport=pickleball' },
  { label: 'Padel courts', to: '/search?sport=padel' },
  { label: 'Basketball courts', to: '/search?sport=basketball' },
  { label: 'Soccer fields', to: '/search?sport=soccer' },
  { label: 'Volleyball courts', to: '/search?sport=volleyball' }]

},
{
  title: 'Hosting',
  links: [
  { label: 'List your court', to: '/create-listing' },
  { label: 'Hosting inbox', to: '/inbox?tab=hosting' },
  { label: 'Payout settings', to: '/account/payouts' }]

},
{
  title: 'Company',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' }]

}];
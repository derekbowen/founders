import { brand } from './brand';

export const howItWorks = [
{
  title: 'Find a space nearby',
  text: 'Search by neighborhood, size and move-in date. Compare real photos, dimensions and access hours.'
},
{
  title: 'Request to book',
  text: 'Tell your host what you\u2019re storing. You\u2019re only charged once they accept — usually within hours.'
},
{
  title: 'Move in, pay monthly',
  text: 'Get move-in instructions in your inbox. Billed by the day, shown monthly, cancel with 7 days\u2019 notice.'
}];


export const protection = [
{
  title: 'Up to $25,000 protection',
  text: 'Belongings are covered against theft and damage for every booking.'
},
{
  title: 'Verified hosts',
  text: 'ID checks and address verification before any space goes live.'
},
{
  title: 'Secure payments',
  text: `Pay through ${brand.name}. Hosts are paid only after you move in.`
},
{
  title: 'Refundable deposits',
  text: 'Your deposit comes back within 5 days of a clean move-out.'
}];


export const footerColumns = [
{
  title: 'Storers',
  links: [
  { label: 'Browse spaces', to: '/s' },
  { label: 'Garages', to: '/s?type=garage' },
  { label: 'Vehicle storage', to: '/s?type=parking' },
  { label: 'Inbox', to: '/inbox/storing' }]

},
{
  title: 'Hosts',
  links: [
  { label: 'Rent out your space', to: '/listings/new' },
  { label: 'Earnings calculator', to: '/#earnings' },
  { label: 'Payouts', to: '/account/payouts' },
  { label: 'Hosting inbox', to: '/inbox/hosting' }]

},
{
  title: brand.name,
  links: [
  { label: 'About', to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Contact', to: '/about#contact' }]

}];


export const earningsRates: Record<string, number> = {
  closet: 1.6,
  room: 1.1,
  basement: 0.85,
  attic: 0.6,
  garage: 0.72,
  shed: 0.85,
  parking: 0.42
};

export const neighborhoods = [
'Sellwood',
'Hawthorne',
'Pearl District',
'Alberta Arts',
'St. Johns',
'Montavilla',
'Kerns',
'Cully'];
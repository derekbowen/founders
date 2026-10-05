export interface NavLinkItem {
  label: string;
  to: string;
}

export const menuGroups: {title: string;links: NavLinkItem[];}[] = [
{
  title: 'For families',
  links: [
  { label: 'Find a sitter', to: '/s' },
  { label: 'Sitters available tonight', to: '/s?tonight=1' },
  { label: 'Example sitter listing', to: '/l/maya-thompson' },
  { label: 'Inbox', to: '/inbox' }]

},
{
  title: 'For sitters',
  links: [
  { label: 'Become a sitter', to: '/listings/new' },
  { label: 'Sitter profile', to: '/u/emma-larsen' },
  { label: 'Sitting jobs', to: '/inbox?tab=jobs' },
  { label: 'Payouts', to: '/account/payouts' }]

},
{
  title: 'Account',
  links: [
  { label: 'Contact details', to: '/account/contact' },
  { label: 'Password', to: '/account/password' }]

},
{
  title: 'Company',
  links: [
  { label: 'About us', to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' }]

}];


export const footerGroups: {title: string;links: NavLinkItem[];}[] = [
{
  title: 'Families',
  links: [
  { label: 'Find a sitter', to: '/s' },
  { label: 'Date night', to: '/s?care=date-night' },
  { label: 'After school', to: '/s?care=after-school' },
  { label: 'Newborn care', to: '/s?care=newborn' }]

},
{
  title: 'Sitters',
  links: [
  { label: 'Become a sitter', to: '/listings/new' },
  { label: 'Sitting jobs', to: '/inbox?tab=jobs' },
  { label: 'Payouts', to: '/account/payouts' }]

},
{
  title: 'Company',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' }]

}];
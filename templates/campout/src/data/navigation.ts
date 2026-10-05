export interface NavLinkItem {
  label: string;
  to: string;
}

export const appLinks: NavLinkItem[] = [
{ label: 'Explore campsites', to: '/s' },
{ label: 'Inbox', to: '/inbox' },
{ label: 'Profile', to: '/profile' },
{ label: 'Host on your land', to: '/l/new' },
{ label: 'Account settings', to: '/account/contact' }];


export const companyLinks: NavLinkItem[] = [
{ label: 'About', to: '/about' },
{ label: 'Terms of service', to: '/terms' },
{ label: 'Privacy policy', to: '/privacy' }];


export const hostingLinks: NavLinkItem[] = [
{ label: 'List your land', to: '/l/new' },
{ label: 'Hosting inbox', to: '/inbox?tab=hosting' },
{ label: 'Payouts', to: '/account/payouts' },
{ label: 'Host profile', to: '/profile' }];


export const accountLinks: NavLinkItem[] = [
{ label: 'Contact details', to: '/account/contact' },
{ label: 'Password', to: '/account/password' },
{ label: 'Payouts', to: '/account/payouts' }];
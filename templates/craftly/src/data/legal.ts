import { brand } from './brand';

export const termsSections = [
{
  id: 'overview',
  title: 'Overview',
  body: `${brand.name} is an online marketplace that connects independent makers ("Sellers") with people who want to buy handmade goods ("Buyers"). By creating an account or placing an order, you agree to these Terms. ${brand.name} is not a party to transactions between Buyers and Sellers.`
},
{
  id: 'accounts',
  title: 'Your account',
  body: 'You must be at least 18 years old to create an account. You are responsible for keeping your login details secure and for all activity on your account. Please tell us right away if you suspect unauthorized access.'
},
{
  id: 'handmade',
  title: 'Handmade standards',
  body: 'Everything listed must be made or designed by the Seller. Reselling mass-produced items, dropshipping, and listing items made by third parties without disclosure are not allowed. We may remove listings that do not meet these standards.'
},
{
  id: 'purchases',
  title: 'Purchases & payments',
  body: `When a Buyer places an order, payment is authorized and held by our payments partner. Funds are released to the Seller after the Buyer marks the order as received, or automatically 7 days after confirmed delivery. ${brand.name} charges Sellers a ${brand.marketplaceFeePercent}% commission on the item price.`
},
{
  id: 'delivery',
  title: 'Shipping & local pickup',
  body: 'Sellers set their own processing times, shipping prices, and pickup options. Sellers must add a tracking number when marking an order as shipped. For local pickup, Buyers and Sellers arrange a time through the order inbox.'
},
{
  id: 'disputes',
  title: 'Disputes & refunds',
  body: `If an item doesn’t arrive, arrives damaged, or isn’t as described, Buyers can report a problem from the order page before marking it received. ${brand.name} support reviews disputes within 1 business day and may issue refunds from held funds.`
},
{
  id: 'changes',
  title: 'Changes to these Terms',
  body: 'We may update these Terms from time to time. If changes are significant, we’ll notify you by email at least 14 days before they take effect.'
}];


export const privacySections = [
{
  id: 'collect',
  title: 'What we collect',
  body: 'We collect the information you give us — your name, email, shipping address, and messages — plus basic usage data like pages viewed and device type. Payment details are collected and stored directly by our payments partner, not by us.'
},
{
  id: 'use',
  title: 'How we use it',
  body: 'We use your information to process orders, connect Buyers and Sellers, prevent fraud, provide support, and improve the marketplace. We only send marketing emails if you opt in, and you can unsubscribe at any time.'
},
{
  id: 'share',
  title: 'What we share',
  body: 'When you place an order, we share your name and shipping address with that Seller so they can fulfill it. We never sell your personal information. We share data with service providers (payments, hosting, email) only as needed to run the service.'
},
{
  id: 'rights',
  title: 'Your rights',
  body: `You can access, correct, export, or delete your personal data from Account settings or by emailing ${brand.supportEmail}. Residents of certain regions have additional rights under local law.`
},
{
  id: 'cookies',
  title: 'Cookies',
  body: 'We use essential cookies to keep you signed in and remember your cart, and optional analytics cookies to understand how the marketplace is used. You can manage optional cookies in your browser.'
},
{
  id: 'contact',
  title: 'Contact us',
  body: `Questions about privacy? Email ${brand.supportEmail} and a real person will get back to you.`
}];
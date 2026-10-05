import { cities } from './catalog';

export const stats = [
{ value: '350+', label: 'Licensed kitchens' },
{ value: '48k', label: 'Hours booked' },
{ value: '4.8★', label: 'Average rating' },
{ value: '2h', label: 'Minimum booking' }];


export const howItWorks = [
{ title: 'Find your kitchen', body: 'Filter by equipment, storage and certifications. See real availability by the hour.' },
{ title: 'Request to book', body: 'Pick a date and time, add monthly storage, and upload your insurance once.' },
{ title: 'Cook, clean, sign off', body: 'Check in, cook, complete the cleaning checklist and you are done.' }];


export const compliancePoints = [
{ key: 'permits', title: 'Health permits on file', body: 'Every kitchen holds a current health department permit and fire inspection. Hosts upload documents before going live.' },
{ key: 'insurance', title: 'Insurance verified', body: 'Renters upload a certificate of general liability insurance naming the host. We check it before your first booking.' },
{ key: 'storage', title: 'Compliant storage', body: 'Add dry, cold or frozen storage by the month, with temperature logs and labeled, dated shelving.' }];


export const complianceChecklist = [
'Food handler cards verified',
'Hood suppression inspected yearly',
'Cleaning sign-off after every session',
'Temperature logs for cold storage'];


export const hostBenefits = [
'Fill idle overnight and off-day hours',
'Set your own hourly rate and minimums',
'Only verified, insured food businesses',
'Weekly payouts straight to your bank'];


export const aboutValues = [
{ title: 'Access over ownership', body: 'A commercial kitchen build-out can cost $250k. Renting by the hour lets great food businesses start with a few hundred dollars.' },
{ title: 'Compliance by default', body: 'Permits, insurance and cleaning sign-offs are built into every booking, so hosts and renters stay inspection-ready.' },
{ title: 'Built for small food businesses', body: 'Caterers, truck owners, bakers and meal-prep founders shaped every feature — from 2-hour minimums to monthly storage.' }];


export const footerColumns = [
{
  title: 'Marketplace',
  links: [
  { label: 'Browse kitchens', to: '/search' },
  { label: 'List your kitchen', to: '/listings/new' },
  { label: 'Inbox', to: '/inbox' },
  { label: 'Account settings', to: '/account/contact' }]

},
{
  title: 'Cities',
  links: cities.map((city) => ({ label: city, to: `/search?city=${encodeURIComponent(city)}` }))
},
{
  title: 'Company',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' }]

}];
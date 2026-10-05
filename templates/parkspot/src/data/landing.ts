export const heroImage = "/caa0c596-44bd-435f-844f-fb9a996eb80a.jpg";


export const heroStats = [
{ value: '4,800+', label: 'private spots' },
{ value: '52%', label: 'avg. saved vs. garages' },
{ value: '4.9★', label: 'average rating' }];


export type UseCaseIcon = 'briefcase' | 'ticket' | 'plane' | 'calendar';

export const useCaseCards: {
  id: 'commuters' | 'events' | 'airports' | 'monthly';
  title: string;
  description: string;
  icon: UseCaseIcon;
  fromPrice: string;
}[] = [
{ id: 'commuters', title: 'Commuters', description: 'Reserve a spot near your office or transit stop for the workday.', icon: 'briefcase', fromPrice: 'from $3/hr' },
{ id: 'events', title: 'Events', description: 'Walk to the game or concert and skip the post-show gridlock.', icon: 'ticket', fromPrice: 'from $4/hr' },
{ id: 'airports', title: 'Airports', description: 'Long-stay lots with shuttles — for a fraction of terminal rates.', icon: 'plane', fromPrice: 'from $14/day' },
{ id: 'monthly', title: 'Monthly', description: 'Hosts who welcome recurring daily bookings all month long.', icon: 'calendar', fromPrice: 'from $16/day' }];


export const howItWorksSteps = [
{ title: 'Search where you’re headed', text: 'Enter an address or venue plus your arrival and departure times. Compare prices on the map.' },
{ title: 'Reserve in seconds', text: 'Pick hourly or daily, add your plate and pay securely. Many spots confirm instantly.' },
{ title: 'Get your access code', text: 'Once the host confirms, gate codes and directions unlock in your inbox.' },
{ title: 'Park and go', text: 'Pull in, enjoy your day, and leave a review. No tickets, no circling.' }];


export const hostCta = {
  heading: 'Your empty driveway could pay the bills',
  text: 'Hosts near stadiums and transit earn an average of $320 a month. List for free, set your own hours and prices, and get paid out weekly.',
  stats: [
  { value: '$320', label: 'avg. monthly earnings' },
  { value: '$0', label: 'to list your space' },
  { value: '$1M', label: 'host protection' }]

};
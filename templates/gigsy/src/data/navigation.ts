export const footerColumns = [
{
  title: 'For clients',
  links: [
  { label: 'Browse services', to: '/s' },
  { label: 'How quotes work', to: '/about' },
  { label: 'Inbox', to: '/inbox' }]

},
{
  title: 'For freelancers',
  links: [
  { label: 'Offer your services', to: '/create-listing' },
  { label: 'Payout settings', to: '/account/payouts' },
  { label: 'Your profile', to: '/u/u-jordan' }]

},
{
  title: 'Company',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' }]

}];


export const searchLanguages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Hindi', 'Japanese'];

export const deliveryOptions = [
{ value: 0, label: 'Any time' },
{ value: 3, label: 'Up to 3 days' },
{ value: 7, label: 'Up to 7 days' },
{ value: 14, label: 'Up to 2 weeks' },
{ value: 30, label: 'Up to 30 days' }];


export const ratingOptions = [
{ value: 0, label: 'Any rating' },
{ value: 4.5, label: '4.5 & up' },
{ value: 4.8, label: '4.8 & up' }];


export const priceOptions = [
{ value: 'any', label: 'Any price', min: 0, max: Infinity },
{ value: 'u500', label: 'Under $500', min: 0, max: 499 },
{ value: '500-1500', label: '$500 – $1,500', min: 500, max: 1500 },
{ value: '1500+', label: '$1,500+', min: 1500, max: Infinity }];


export const sortOptions = [
{ value: 'relevance', label: 'Relevance' },
{ value: 'rating', label: 'Highest rated' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'delivery', label: 'Fastest delivery' }];


export const budgetRanges = [
{ value: '250-500', label: '$250 – $500', min: 250, max: 500 },
{ value: '500-1000', label: '$500 – $1,000', min: 500, max: 1000 },
{ value: '1000-2500', label: '$1,000 – $2,500', min: 1000, max: 2500 },
{ value: '2500-5000', label: '$2,500 – $5,000', min: 2500, max: 5000 },
{ value: '5000+', label: '$5,000+', min: 5000, max: 10000 }];
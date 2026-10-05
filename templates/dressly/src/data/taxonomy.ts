import type { Designer, DressLength, Occasion } from '../types/marketplace';

const img = (id: string) =>
`https://cdn.magicpatterns.com/patterns/generated-images/${id}.jpg`;

export const occasions: Occasion[] = [
{
  slug: 'wedding-guest',
  label: 'Wedding guest',
  blurb: 'Garden, city hall & destination',
  image: img('8306fa63-c094-485c-aedc-cc432eea7cf2')
},
{
  slug: 'black-tie',
  label: 'Black tie',
  blurb: 'Gowns for formal evenings',
  image: img('6dddba19-8e37-4ad6-958f-caf89f93c416')
},
{
  slug: 'cocktail',
  label: 'Cocktail',
  blurb: 'Minis, sequins & feathers',
  image: img('57660aa3-06d9-4a94-83f6-b4ab98f84a00')
},
{
  slug: 'gala',
  label: 'Gala',
  blurb: 'Embellished & red carpet',
  image: img('fc9122ce-42e3-4f4b-80b2-db2364a92fa6')
},
{
  slug: 'vacation',
  label: 'Vacation',
  blurb: 'Linen, broderie & sun',
  image: img('8316b05b-c7ec-4e35-a480-bf2404ddf535')
},
{
  slug: 'maternity',
  label: 'Maternity',
  blurb: 'Bump-friendly elegance',
  image: img('0668ae25-9079-44df-a7c4-e68ee10cbe75')
}];


export const designers: Designer[] = [
{ name: 'Zimmermann', image: img('7e5264cc-4b44-4e43-937a-be786047b639'), pieces: 142 },
{ name: 'Galvan', image: img('6dddba19-8e37-4ad6-958f-caf89f93c416'), pieces: 58 },
{ name: 'Self-Portrait', image: img('31836b5b-93f7-4c6e-b34d-2895590b41fb'), pieces: 211 },
{ name: 'Hervé Léger', image: img('b35e6eb9-7610-4b34-8c6f-dd764cc4292c'), pieces: 74 },
{ name: 'Marchesa Notte', image: img('fc9122ce-42e3-4f4b-80b2-db2364a92fa6'), pieces: 63 },
{ name: 'Staud', image: img('afb4b980-81ed-48ec-a21e-764046dde32b'), pieces: 97 }];


export const sizes = [0, 2, 4, 6, 8, 10, 12, 14];

export const lengths: DressLength[] = ['Mini', 'Midi', 'Maxi', 'Floor-length'];

export const colorSwatches: {name: string;hex: string;}[] = [
{ name: 'Black', hex: '#111111' },
{ name: 'White', hex: '#f8f6f2' },
{ name: 'Pink', hex: '#e7a1b5' },
{ name: 'Red', hex: '#a3212f' },
{ name: 'Orange', hex: '#c8643b' },
{ name: 'Yellow', hex: '#e9c64a' },
{ name: 'Green', hex: '#2f6b4f' },
{ name: 'Blue', hex: '#2747a8' },
{ name: 'Navy', hex: '#1d2a4a' },
{ name: 'Purple', hex: '#b9a3d4' },
{ name: 'Silver', hex: '#c9c9cc' },
{ name: 'Floral', hex: 'conic' }];


export const sortOptions = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'newest', label: 'Newest arrivals' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Top rated' }];


export const pricePresets = [
{ label: 'Under $50', min: 0, max: 50 },
{ label: '$50 – $100', min: 50, max: 100 },
{ label: '$100+', min: 100, max: 1000 }];
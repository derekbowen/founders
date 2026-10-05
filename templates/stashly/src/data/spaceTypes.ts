import type { SpaceType } from '../types/marketplace';

export const spaceTypes: Array<{value: SpaceType;label: string;hint: string;}> = [
{ value: 'closet', label: 'Closet', hint: 'Seasonal gear, a few boxes' },
{ value: 'room', label: 'Spare room', hint: 'Furniture from a 1-bed' },
{ value: 'basement', label: 'Basement', hint: 'Dry, often climate controlled' },
{ value: 'attic', label: 'Attic', hint: 'Light boxes and bins' },
{ value: 'garage', label: 'Garage', hint: 'A full home or a car' },
{ value: 'shed', label: 'Shed', hint: 'Tools, bikes, garden gear' },
{ value: 'parking', label: 'Parking', hint: 'RV, boat, trailer or van' }];


export const spaceTypeLabel = (type: SpaceType): string =>
spaceTypes.find((t) => t.value === type)?.label ?? type;

export const sizeGuide = [
{
  id: 'closet',
  title: 'Closet',
  range: '10–30 sq ft',
  fits: 'Holiday decor, ski gear, 10–20 boxes',
  from: 35,
  query: 'closet'
},
{
  id: 'room',
  title: 'Small room',
  range: '75–150 sq ft',
  fits: 'Contents of a studio or 1-bedroom',
  from: 99,
  query: 'room'
},
{
  id: 'garage',
  title: 'Garage',
  range: '200–400 sq ft',
  fits: 'A 3-bedroom home or one car',
  from: 189,
  query: 'garage'
},
{
  id: 'parking',
  title: 'Parking for RV/boat',
  range: '240–500 sq ft',
  fits: 'RVs, boats, trailers and vans',
  from: 110,
  query: 'parking'
}] as
const;

export const sizeBuckets = [
{ id: 'any', label: 'Any size', min: 0, max: Infinity },
{ id: 'xs', label: 'Under 50 sq ft', min: 0, max: 49 },
{ id: 'sm', label: '50–150', min: 50, max: 150 },
{ id: 'md', label: '150–300', min: 151, max: 300 },
{ id: 'lg', label: '300+', min: 301, max: Infinity }] as
const;

export const accessFrequencyLabel: Record<string, string> = {
  anytime: 'Anytime, 24/7',
  daily: 'Daily during access hours',
  weekly: 'Up to once a week',
  'by-appointment': 'By appointment (24h notice)'
};
import type { Category } from '../types/marketplace';
import { images } from './images';

export const categories: Category[] = [
{
  id: 'handyman',
  name: 'Handyman',
  description: 'Repairs, mounting, painting and small fixes around the house.',
  examples: ['TV mounting', 'Fence repair', 'Leaky faucets', 'Painting'],
  image: images.tvmount,
  typicalBudget: [100, 450]
},
{
  id: 'moving',
  name: 'Moving help',
  description: 'Loading, unloading, heavy lifting and dump runs.',
  examples: ['Apartment moves', 'Single items', 'Garage clear-outs', 'Dump runs'],
  image: images.moving,
  typicalBudget: [120, 500]
},
{
  id: 'cleaning',
  name: 'Cleaning',
  description: 'Deep cleans, move-out cleans and rental turnovers.',
  examples: ['Move-out cleans', 'Deep cleans', 'Airbnb turnovers', 'Post-renovation'],
  image: images.cleaning,
  typicalBudget: [90, 400]
},
{
  id: 'assembly',
  name: 'Furniture assembly',
  description: 'Flat-pack furniture, desks, beds and shelving built right.',
  examples: ['IKEA wardrobes', 'Standing desks', 'Bed frames', 'Shelving'],
  image: images.assembly,
  typicalBudget: [70, 220]
},
{
  id: 'yard',
  name: 'Yard work',
  description: 'Mowing, leaf cleanup, hedge trimming and garden builds.',
  examples: ['Leaf cleanup', 'Hedge trimming', 'Gutter cleaning', 'Raised beds'],
  image: images.yard,
  typicalBudget: [80, 400]
}];


export const jobSizes = [
{ id: 'small', label: 'Small', description: 'Under 2 hours' },
{ id: 'medium', label: 'Medium', description: 'Half a day' },
{ id: 'large', label: 'Large', description: 'Full day or more' }] as
const;

export const timingOptions = [
{ id: 'specific', label: 'On a specific date', description: 'I need it done on the day I choose.' },
{ id: 'flexible', label: 'Flexible', description: 'Any time within a week of my date works.' },
{ id: 'asap', label: 'As soon as possible', description: 'Urgent — the earlier the better.' }] as
const;

export const timeOfDayOptions = [
{ id: 'morning', label: 'Morning', description: '8am – 12pm' },
{ id: 'afternoon', label: 'Afternoon', description: '12pm – 5pm' },
{ id: 'evening', label: 'Evening', description: '5pm – 8pm' },
{ id: 'any', label: 'Any time', description: 'I’m flexible' }] as
const;
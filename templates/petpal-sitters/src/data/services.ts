import type { PetSize, ServiceDefinition } from '../types/marketplace';

export const services: ServiceDefinition[] = [
{
  id: 'boarding',
  label: 'Boarding',
  description: 'Overnight stays in the sitter’s home',
  unitType: 'night',
  unitLabel: 'night'
},
{
  id: 'house-sitting',
  label: 'House sitting',
  description: 'Overnight care in your own home',
  unitType: 'night',
  unitLabel: 'night'
},
{
  id: 'drop-in',
  label: 'Drop-in visits',
  description: 'Feeding, potty breaks and cuddles',
  unitType: 'fixed',
  unitLabel: 'visit'
},
{
  id: 'dog-walking',
  label: 'Dog walking',
  description: 'Walks around your neighborhood',
  unitType: 'fixed',
  unitLabel: 'walk'
}];


export const petSizeOptions: {id: PetSize;label: string;range: string;}[] = [
{ id: 'small', label: 'Small', range: '0–15 lb' },
{ id: 'medium', label: 'Medium', range: '16–40 lb' },
{ id: 'large', label: 'Large', range: '41–100 lb' },
{ id: 'giant', label: 'Giant', range: '100+ lb' }];


export const timeSlots = ['7:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];

export const marketplaceFees = {
  /** Service fee charged to the pet owner, % of subtotal */
  customerFeePercent: 10,
  /** Commission deducted from the sitter's payout, % of subtotal */
  providerCommissionPercent: 15
};

export const sortOptions = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Top rated' },
{ value: 'reviews', label: 'Most reviews' }];
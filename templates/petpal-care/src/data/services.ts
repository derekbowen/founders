import type { PetSize, ServiceMeta } from '../types/listing';

export const services: ServiceMeta[] = [
{
  id: 'boarding',
  name: 'Boarding',
  unitType: 'night',
  unitLabel: 'night',
  shortDescription: 'Overnight stays in the sitter’s home'
},
{
  id: 'house-sitting',
  name: 'House sitting',
  unitType: 'night',
  unitLabel: 'night',
  shortDescription: 'Your sitter stays overnight at your place'
},
{
  id: 'drop-in',
  name: 'Drop-in visits',
  unitType: 'fixed',
  unitLabel: 'visit',
  shortDescription: 'Feeding, play and potty breaks at home'
},
{
  id: 'dog-walking',
  name: 'Dog walking',
  unitType: 'fixed',
  unitLabel: 'walk',
  shortDescription: 'Neighborhood walks while you’re busy'
}];


export const petSizes: {id: PetSize;label: string;range: string;}[] = [
{ id: 'small', label: 'Small', range: '0–7 kg' },
{ id: 'medium', label: 'Medium', range: '7–18 kg' },
{ id: 'large', label: 'Large', range: '18–45 kg' },
{ id: 'giant', label: 'Giant', range: '45+ kg' }];


export const sessionTimes = ['07:00', '08:00', '09:00', '12:00', '13:00', '15:00', '17:00', '18:00', '19:00'];
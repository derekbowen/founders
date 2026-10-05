import type { CurrentUser, Host } from '../types/marketplace';

export const hosts: Host[] = [
{
  id: 'h1',
  name: 'Maya Okafor',
  city: 'Sellwood, Portland',
  joined: '2023-04-12',
  responseTime: 'within an hour',
  responseRate: 99,
  verified: true,
  bio: 'Architect, cyclist and recovering over-packer. My garage sits empty since we went car-free — happy to see it help a neighbor.'
},
{
  id: 'h2',
  name: 'Daniel Reyes',
  city: 'Hawthorne, Portland',
  joined: '2022-11-03',
  responseTime: 'within 2 hours',
  responseRate: 96,
  verified: true,
  bio: 'I work from home most days, so access is easy to arrange. Basement is dry, dehumidified and monitored.'
},
{
  id: 'h3',
  name: 'Priya Nair',
  city: 'Pearl District, Portland',
  joined: '2024-01-20',
  responseTime: 'within a few hours',
  responseRate: 92,
  verified: true,
  bio: 'Condo with a doorman and a closet I never use. Great for seasonal gear and suitcases.'
},
{
  id: 'h4',
  name: 'Tom Lindqvist',
  city: 'Lents, Portland',
  joined: '2021-08-15',
  responseTime: 'within a day',
  responseRate: 94,
  verified: true,
  bio: 'Big lot, gated driveway, and a 30A hookup. I store my own trailer here too.'
},
{
  id: 'h5',
  name: 'Grace Kim',
  city: 'Alberta Arts, Portland',
  joined: '2023-09-02',
  responseTime: 'within an hour',
  responseRate: 100,
  verified: true,
  bio: 'Ceramicist and plant person. Our spare room is bright, clean and climate controlled.'
},
{
  id: 'h6',
  name: 'Marcus Bell',
  city: 'St. Johns, Portland',
  joined: '2022-05-28',
  responseTime: 'within 3 hours',
  responseRate: 95,
  verified: false,
  bio: 'Fisherman by weekend. Covered bay fits a 20 ft boat with room to spare.'
},
{
  id: 'me',
  name: 'Jordan Ellis',
  city: 'Cully, Portland',
  joined: '2024-06-10',
  responseTime: 'within an hour',
  responseRate: 98,
  verified: true,
  bio: 'Storing a few things, hosting a few more. Our garage and driveway are on Stashly.'
}];


export const currentUserSeed: CurrentUser = {
  id: 'me',
  name: 'Jordan Ellis',
  email: 'jordan.ellis@example.com',
  phone: '+1 (503) 555-0148'
};

export const findHost = (id: string): Host | undefined => hosts.find((h) => h.id === id);
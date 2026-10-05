import type { Host } from '../types/marketplace';
import { images } from './images';

/** The demo account used when someone logs in. */
export const currentUserId = 'h1';

export const hosts: Host[] = [
{
  id: 'h1',
  name: 'Maya Okafor',
  business: 'Southside Kitchens Co.',
  email: 'maya@southsidekitchens.co',
  avatar: images.host,
  city: 'Chicago, IL',
  joined: '2021',
  bio: 'Former catering chef turned kitchen operator. I run two licensed commissaries and still cater the occasional wedding, so I know exactly what a smooth 5 a.m. load-in should feel like.',
  responseTime: 'within an hour',
  responseRate: 99,
  verified: true,
  languages: ['English', 'Yoruba']
},
{
  id: 'h2',
  name: 'Daniel Reyes',
  business: 'Flour & Steam',
  email: 'daniel@flourandsteam.com',
  city: 'Brooklyn, NY',
  joined: '2022',
  bio: 'Baker for 15 years. Our bakehouse is idle most afternoons and evenings, so we open it up to bakers and small producers who need real ovens without a real lease.',
  responseTime: 'within 2 hours',
  responseRate: 96,
  verified: true,
  languages: ['English', 'Spanish']
},
{
  id: 'h3',
  name: 'Priya Shah',
  business: 'Lone Star Commissaries',
  email: 'priya@lonestarcommissary.com',
  city: 'Austin, TX',
  joined: '2020',
  bio: 'We operate commissaries built around food trucks: truck parking, potable water fill, grey-water dump and grease disposal, plus plenty of cold storage.',
  responseTime: 'within an hour',
  responseRate: 98,
  verified: true,
  languages: ['English', 'Gujarati', 'Hindi']
},
{
  id: 'h4',
  name: 'Marcus Bell',
  business: 'Prep Lab',
  email: 'marcus@preplab.kitchen',
  city: 'Los Angeles, CA',
  joined: '2022',
  bio: 'Prep Lab is a production kitchen made for meal-prep brands scaling from 200 to 5,000 meals a week. Organic and gluten-free certified.',
  responseTime: 'within 3 hours',
  responseRate: 94,
  verified: true,
  languages: ['English']
},
{
  id: 'h5',
  name: 'Elena Novak',
  business: 'Novak Hospitality',
  email: 'elena@novakhospitality.com',
  city: 'Chicago, IL',
  joined: '2023',
  bio: 'Restaurant group owner sharing our private-event and pastry kitchens on days we are closed.',
  responseTime: 'within a day',
  responseRate: 91,
  verified: true,
  languages: ['English', 'Czech']
},
{
  id: 'h6',
  name: 'Theo Laurent',
  business: 'Ember Collective',
  email: 'theo@embercollective.co',
  city: 'Los Angeles, CA',
  joined: '2023',
  bio: 'We built Ember for chefs testing concepts. Wood-fired oven, flexible layout and a loyal pop-up crowd on our mailing list.',
  responseTime: 'within 2 hours',
  responseRate: 97,
  verified: false,
  languages: ['English', 'French']
}];
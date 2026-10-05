import type { User } from '../types/user';

export const CURRENT_USER_ID = 'u-jordan';

export const users: User[] = [
{
  id: 'u-jordan',
  name: 'Jordan Lee',
  bio: 'Product designer who drives into the city twice a week. I also rent out my Noe Valley driveway while I’m at the office.',
  location: 'Noe Valley, San Francisco',
  joined: 'February 2024',
  responseTime: 'within an hour',
  verified: true,
  email: 'jordan.lee@example.com',
  phone: '(415) 555-0142'
},
{
  id: 'u-maya',
  name: 'Maya Okafor',
  avatar: "/a66085ff-b2c0-4591-8353-59b70123d96b.jpg",
  bio: 'Mission Bay homeowner and Warriors fan. My garage sits empty most evenings, so I share it with fellow game-goers.',
  location: 'Mission Bay, San Francisco',
  joined: 'June 2022',
  responseTime: 'within 15 minutes',
  verified: true,
  email: 'maya@example.com',
  phone: '(415) 555-0177'
},
{
  id: 'u-diego',
  name: 'Diego Ramírez',
  bio: 'Small-business owner in South Beach. I manage a gated lot behind my shop and an EV-ready pad near Caltrain.',
  location: 'South Beach, San Francisco',
  joined: 'September 2021',
  responseTime: 'within an hour',
  verified: true,
  email: 'diego@example.com',
  phone: '(415) 555-0119'
},
{
  id: 'u-priya',
  name: 'Priya Natarajan',
  bio: 'Frequent flyer turned airport-parking host. Shuttle schedules and keypad codes are always in my listings.',
  location: 'Millbrae, CA',
  joined: 'January 2023',
  responseTime: 'within 30 minutes',
  verified: true,
  email: 'priya@example.com',
  phone: '(650) 555-0163'
},
{
  id: 'u-sam',
  name: 'Sam Whitaker',
  bio: 'Mission district local. Two spots, both well lit, both close to BART.',
  location: 'Mission District, San Francisco',
  joined: 'April 2023',
  responseTime: 'within 2 hours',
  verified: false,
  email: 'sam@example.com',
  phone: '(415) 555-0188'
},
{
  id: 'u-chen',
  name: 'Wei Chen',
  bio: 'Property manager for two downtown structures. Monthly and daily commuters welcome.',
  location: 'Financial District, San Francisco',
  joined: 'November 2020',
  responseTime: 'within 15 minutes',
  verified: true,
  email: 'wei@example.com',
  phone: '(415) 555-0101'
},
{
  id: 'u-olivia',
  name: 'Olivia Brooks',
  bio: 'Inner Sunset family with a long driveway. Great for Golden Gate Park days and festival weekends.',
  location: 'Inner Sunset, San Francisco',
  joined: 'May 2022',
  responseTime: 'within an hour',
  verified: true,
  email: 'olivia@example.com',
  phone: '(415) 555-0155'
},
{
  id: 'u-marcus',
  name: 'Marcus Hill',
  bio: 'Live-music lover renting my Civic Center garage on show nights.',
  location: 'Civic Center, San Francisco',
  joined: 'August 2023',
  responseTime: 'within 3 hours',
  verified: true,
  email: 'marcus@example.com',
  phone: '(415) 555-0134'
}];
import type { User } from '../types/user';

export const DEMO_RENTER_ID = 'u-r1';
export const DEMO_LANDLORD_ID = 'u-l3';

export const users: User[] = [
{
  id: 'u-r1',
  name: 'Lena Fischer',
  type: 'renter',
  email: 'lena@example.com',
  phone: '+49 151 2345 6789',
  city: 'Hamburg',
  occupation: 'MSc Urban Planning student',
  bio: 'Starting an Erasmus semester and a design internship this winter. Tidy, early riser, loves cooking for flatmates and weekend cycling trips.',
  joined: '2025-03-12',
  languages: ['German', 'English', 'Spanish'],
  verified: true,
  lookingFor: { city: 'Amsterdam', budget: 950, moveIn: '2026-11-01', stayMonths: 6 }
},
{
  id: 'u-r2',
  name: 'Tom Becker',
  type: 'renter',
  email: 'tom@example.com',
  city: 'Munich',
  occupation: 'Software engineering intern',
  bio: 'Six-month internship at a Berlin fintech. Quiet during the week, happy to join for a beer on Fridays.',
  joined: '2026-05-02',
  languages: ['German', 'English'],
  verified: true,
  lookingFor: { city: 'Berlin', budget: 700, moveIn: '2026-11-01', stayMonths: 6 }
},
{
  id: 'u-r3',
  name: 'Aisha Khan',
  type: 'renter',
  email: 'aisha@example.com',
  city: 'London',
  occupation: 'Remote product designer',
  bio: 'Working remotely for a London studio, spending a year in Berlin. Need good Wi-Fi and a proper desk.',
  joined: '2026-01-20',
  languages: ['English', 'Urdu'],
  verified: true,
  lookingFor: { city: 'Berlin', budget: 1000, moveIn: '2026-10-15', stayMonths: 12 }
},
{
  id: 'u-r4',
  name: 'Diego Martín',
  type: 'renter',
  email: 'diego@example.com',
  city: 'Madrid',
  occupation: 'Exchange student, TU Berlin',
  bio: 'Mechanical engineering exchange student. Easy-going, plays guitar (with headphones!).',
  joined: '2026-07-08',
  languages: ['Spanish', 'English'],
  verified: false,
  lookingFor: { city: 'Berlin', budget: 450, moveIn: '2026-10-15', stayMonths: 5 }
},
{
  id: 'u-l1',
  name: 'Marco Rossi',
  type: 'landlord',
  email: 'marco@example.com',
  city: 'Milan',
  bio: 'Architect renting out two renovated flats near Bocconi and the Navigli. I like hosting students and young professionals.',
  joined: '2023-09-01',
  languages: ['Italian', 'English'],
  verified: true,
  responseRate: 96,
  responseTime: 'within a few hours'
},
{
  id: 'u-l2',
  name: 'Sophie de Vries',
  type: 'landlord',
  email: 'sophie@example.com',
  city: 'Amsterdam',
  bio: 'Born and raised in Amsterdam. I manage three family properties and live around the corner if anything comes up.',
  joined: '2022-11-14',
  languages: ['Dutch', 'English', 'German'],
  verified: true,
  responseRate: 100,
  responseTime: 'within an hour'
},
{
  id: 'u-l3',
  name: 'Jonas Weber',
  type: 'landlord',
  email: 'jonas@example.com',
  phone: '+49 160 9876 5432',
  city: 'Berlin',
  bio: 'I run four flatshares in Neukölln, Friedrichshain, Kreuzberg and Prenzlauer Berg. I care about good flatmate matches — every new renter meets the flat first.',
  joined: '2021-06-22',
  languages: ['German', 'English'],
  verified: true,
  responseRate: 94,
  responseTime: 'within a day'
},
{
  id: 'u-l4',
  name: 'Inês Carvalho',
  type: 'landlord',
  email: 'ines@example.com',
  city: 'Lisbon',
  bio: 'Lisbon local and former Erasmus student myself. I rent rooms in Arroios, Santos and a studio in Alfama.',
  joined: '2023-02-03',
  languages: ['Portuguese', 'English', 'French'],
  verified: true,
  responseRate: 98,
  responseTime: 'within a few hours'
},
{
  id: 'u-l5',
  name: 'Clara Puig',
  type: 'landlord',
  email: 'clara@example.com',
  city: 'Barcelona',
  bio: 'I live in one of my flats in Gràcia and rent the spare rooms to people staying in Barcelona for a semester or more.',
  joined: '2024-01-10',
  languages: ['Catalan', 'Spanish', 'English'],
  verified: true,
  responseRate: 91,
  responseTime: 'within a day'
},
{
  id: 'u-l6',
  name: 'Anna Huber',
  type: 'landlord',
  email: 'anna@example.com',
  city: 'Vienna',
  bio: 'Retired teacher renting a bright room in my Neubau Altbau flat to students and young professionals.',
  joined: '2024-08-19',
  languages: ['German', 'English'],
  verified: true,
  responseRate: 89,
  responseTime: 'within a day'
}];
import type { User } from '../types/user';

/** The signed-in demo account. */
export const CURRENT_USER_ID = 'u-me';

export const users: User[] = [
{
  id: 'u-me',
  name: 'Maya Lindqvist',
  firstName: 'Maya',
  email: 'maya@lindqvist.studio',
  city: 'London',
  bio: 'Product designer splitting my week between client offices and quiet desks. I also host a small studio in Clerkenwell with ten dedicated desks.',
  joined: '2024-03-12',
  languages: ['English', 'Swedish'],
  responseTime: 'within an hour',
  isHost: true,
  verified: true,
  company: 'Lindqvist Studio'
},
{
  id: 'u-oliver',
  name: 'Oliver Grant',
  firstName: 'Oliver',
  email: 'oliver@greenhouse.work',
  city: 'London',
  bio: 'Founder of The Greenhouse. We turned a 1920s print works into a plant-filled home for freelancers and small teams.',
  joined: '2023-01-04',
  languages: ['English', 'French'],
  responseTime: 'within 15 minutes',
  isHost: true,
  verified: true
},
{
  id: 'u-lena',
  name: 'Lena Fischer',
  firstName: 'Lena',
  email: 'lena@kiezwork.de',
  city: 'Berlin',
  bio: 'Community manager across three Berlin spaces. Ask me for the best Kreuzberg lunch spots.',
  joined: '2023-06-19',
  languages: ['German', 'English'],
  responseTime: 'within an hour',
  isHost: true,
  verified: true
},
{
  id: 'u-daan',
  name: 'Daan de Vries',
  firstName: 'Daan',
  email: 'daan@grachtwerk.nl',
  city: 'Amsterdam',
  bio: 'Architect turned space host. Our canal-side offices and NDSM boardroom are designed for calm, focused work.',
  joined: '2023-09-02',
  languages: ['Dutch', 'English', 'German'],
  responseTime: 'within 2 hours',
  isHost: true,
  verified: true
},
{
  id: 'u-ines',
  name: 'Inês Carvalho',
  firstName: 'Inês',
  email: 'ines@luzcowork.pt',
  city: 'Lisbon',
  bio: 'Running sunny workspaces for digital nomads and Lisbon locals since 2019.',
  joined: '2023-02-27',
  languages: ['Portuguese', 'English', 'Spanish'],
  responseTime: 'within 30 minutes',
  isHost: true,
  verified: true
},
{
  id: 'u-marcus',
  name: 'Marcus Bell',
  firstName: 'Marcus',
  email: 'marcus@castiron.nyc',
  city: 'New York',
  bio: 'Operator of Cast Iron Works in SoHo and a Williamsburg studio. Big windows, strong coffee.',
  joined: '2024-01-15',
  languages: ['English'],
  responseTime: 'within an hour',
  isHost: true,
  verified: true
},
{
  id: 'u-jonas',
  name: 'Jonas Weber',
  firstName: 'Jonas',
  email: 'jonas@weber.dev',
  city: 'Berlin',
  bio: 'Backend engineer, frequently in London for client work.',
  joined: '2024-08-01',
  languages: ['German', 'English'],
  responseTime: 'within a day',
  isHost: false,
  verified: true,
  company: 'Weber Engineering GmbH'
},
{
  id: 'u-priya',
  name: 'Priya Nair',
  firstName: 'Priya',
  email: 'priya@nair.co',
  city: 'London',
  bio: 'Freelance UX researcher. Always looking for quiet desks near King’s Cross.',
  joined: '2024-05-22',
  languages: ['English', 'Hindi'],
  responseTime: 'within a few hours',
  isHost: false,
  verified: true
},
{
  id: 'u-tom',
  name: 'Tom Okafor',
  firstName: 'Tom',
  email: 'tom@okafor.io',
  city: 'London',
  bio: 'Startup founder building climate software.',
  joined: '2024-11-03',
  languages: ['English'],
  responseTime: 'within an hour',
  isHost: false,
  verified: false
},
{
  id: 'u-sofia',
  name: 'Sofia Rossi',
  firstName: 'Sofia',
  email: 'sofia@rossi.it',
  city: 'Milan',
  bio: 'Brand strategist travelling across Europe for workshops.',
  joined: '2025-02-10',
  languages: ['Italian', 'English'],
  responseTime: 'within a day',
  isHost: false,
  verified: true
}];
import type { User } from '../types/user';

export const currentUserId = 'u-jordan';

export const users: User[] = [
{
  id: 'u-jordan',
  name: 'Jordan Reyes',
  location: 'Bend, Oregon',
  joinedYear: 2023,
  bio: 'Weekend climber, weekday software person. I rent out the A-frame my grandfather built and a few walk-in sites in our family orchard in Hood River. I camp most weekends and love finding quiet farms off the beaten path.',
  isHost: true,
  verified: true,
  languages: ['English', 'Spanish'],
  responseRate: 98,
  responseTime: 'within an hour',
  email: 'jordan.reyes@example.com',
  phone: '(541) 555-0142'
},
{
  id: 'u-hank',
  name: 'Hank Moreno',
  location: 'Oakhurst, California',
  joinedYear: 2021,
  bio: 'Third-generation cattle family turned campsite hosts. Our meadow sits 25 minutes from Yosemite’s south gate — bring a fishing pole for the creek.',
  isHost: true,
  verified: true,
  languages: ['English', 'Spanish'],
  responseRate: 100,
  responseTime: 'within an hour'
},
{
  id: 'u-dale',
  name: 'Dale & Rosa Whitaker',
  location: 'Columbia Falls, Montana',
  joinedYear: 2022,
  bio: 'We run 400 acres of hay and horses outside Glacier. The RV pads have full hookups and the best sunset view in the valley.',
  isHost: true,
  verified: true,
  languages: ['English'],
  responseRate: 95,
  responseTime: 'within a few hours'
},
{
  id: 'u-maggie',
  name: 'Maggie Holloway',
  location: 'Stowe, Vermont',
  joinedYear: 2020,
  bio: 'Holloway Family Farm has been growing maple and raising goats since 1962. Campers are welcome to help with morning chores — kids love it.',
  isHost: true,
  verified: true,
  languages: ['English', 'French'],
  responseRate: 99,
  responseTime: 'within an hour'
},
{
  id: 'u-eli',
  name: 'Eli Brandt',
  location: 'Port Angeles, Washington',
  joinedYear: 2021,
  bio: 'Forester and amateur boat builder. I host on two pieces of family land — one deep in the redwoods and one on a quiet lake near the Olympics.',
  isHost: true,
  verified: true,
  languages: ['English', 'German'],
  responseRate: 92,
  responseTime: 'within a day'
},
{
  id: 'u-carmen',
  name: 'Carmen Ortiz',
  location: 'Joshua Tree, California',
  joinedYear: 2022,
  bio: 'Desert artist and dark-sky advocate. My 20 acres border the national park — no light pollution, just boulders and stars.',
  isHost: true,
  verified: true,
  languages: ['English', 'Spanish'],
  responseRate: 97,
  responseTime: 'within a few hours'
},
{
  id: 'u-sam',
  name: 'Sam Okafor',
  location: 'Bryson City, North Carolina',
  joinedYear: 2023,
  bio: 'Fly-fishing guide on the Tuckasegee. Our riverside land and log cabin are minutes from the Smokies’ quiet south entrance.',
  isHost: true,
  verified: true,
  languages: ['English'],
  responseRate: 100,
  responseTime: 'within an hour'
},
{
  id: 'u-priya',
  name: 'Priya Natarajan',
  location: 'Healdsburg, California',
  joinedYear: 2021,
  bio: 'Winemaker by day. Our safari tents overlook the zinfandel block — tastings are on the house for campers.',
  isHost: true,
  verified: true,
  languages: ['English', 'Tamil'],
  responseRate: 96,
  responseTime: 'within a few hours'
},
{
  id: 'u-nora',
  name: 'Nora Lindqvist',
  location: 'Forks, Washington',
  joinedYear: 2024,
  bio: 'Retired marine biologist. My bluff is the westernmost private campsite in the state — come watch the storms roll in.',
  isHost: true,
  verified: false,
  languages: ['English', 'Swedish'],
  responseRate: 90,
  responseTime: 'within a day'
},
{ id: 'u-lena', name: 'Lena Park', location: 'Portland, Oregon', joinedYear: 2024, bio: 'Trail runner and dog mom.', isHost: false, verified: true, languages: ['English', 'Korean'] },
{ id: 'u-marcus', name: 'Marcus Bell', location: 'Seattle, Washington', joinedYear: 2023, bio: 'Photographer chasing dark skies.', isHost: false, verified: true, languages: ['English'] },
{ id: 'u-tess', name: 'Tess Albright', location: 'Boise, Idaho', joinedYear: 2025, bio: 'Family camping with two little ones.', isHost: false, verified: true, languages: ['English'] },
{ id: 'u-owen', name: 'Owen Fitzgerald', location: 'Eugene, Oregon', joinedYear: 2022, bio: 'Bikepacker.', isHost: false, verified: false, languages: ['English'] }];
import type { User } from '../types/marketplace';

export const CURRENT_USER_ID = 'u-me';

export const users: User[] = [
{
  id: 'u-me', name: 'Jordan Ellis', initials: 'JE', role: 'owner', location: 'San Diego, CA', joined: '2023-04-12',
  bio: 'Weekend sailor, occasional fisherman and proud owner of a power catamaran on Shelter Island. I love showing first-timers how good a day on the bay can be.',
  languages: ['English', 'Spanish'], verified: true, responseTime: 'within an hour',
  email: 'jordan.ellis@example.com', phone: '+1 (619) 555-0182'
},
{
  id: 'u-marco', name: 'Marco Alvarez', initials: 'MA', role: 'owner', location: 'Miami, FL', joined: '2021-02-03',
  bio: 'Third-generation Miami boater. My family runs a small fleet out of Miami Beach Marina — every boat is detailed after each trip.',
  languages: ['English', 'Spanish', 'Portuguese'], verified: true, responseTime: 'within 30 minutes'
},
{
  id: 'u-claire', name: 'Claire Whitman', initials: 'CW', role: 'owner', location: 'Newport, RI', joined: '2020-06-18',
  bio: 'Racing sailor turned charter owner. I restore classic boats in the off-season and share them with guests all summer.',
  languages: ['English', 'French'], verified: true, responseTime: 'within 2 hours'
},
{
  id: 'u-devon', name: 'Devon Brooks', initials: 'DB', role: 'owner', location: 'South Lake Tahoe, CA', joined: '2022-05-09',
  bio: 'Tahoe local and former ski patroller. Summers are for pontoon days, Emerald Bay picnics and cliff-jump coves.',
  languages: ['English'], verified: true, responseTime: 'within an hour'
},
{
  id: 'u-sofia', name: 'Sofia Ramirez', initials: 'SR', role: 'owner', location: 'San Diego, CA', joined: '2021-09-22',
  bio: 'Offshore angler and J/111 racer. If the yellowtail are biting, I’ll be the first to tell you.',
  languages: ['English', 'Spanish'], verified: true, responseTime: 'within 3 hours'
},
{
  id: 'u-hank', name: 'Hank Leduc', initials: 'HL', role: 'owner', location: 'Islamorada, FL', joined: '2019-11-30',
  bio: 'Forty years on the flats and the reef line. Sportfishing capital of the world is my backyard.',
  languages: ['English'], verified: true, responseTime: 'within an hour'
},
{
  id: 'c-ray', name: 'Capt. Ray Okafor', initials: 'RO', role: 'captain', location: 'Miami, FL', joined: '2020-03-14',
  bio: 'Licensed master with 15 years running private yachts between Miami and the Bahamas. Calm hands, great playlists.',
  languages: ['English', 'French'], verified: true, responseTime: 'within an hour',
  yearsExperience: 15, license: 'USCG 100-Ton Master', specialties: ['Luxury yachts', 'Sandbar days', 'Sunset cruises']
},
{
  id: 'c-lena', name: 'Capt. Lena Holm', initials: 'LH', role: 'captain', location: 'Newport, RI', joined: '2019-07-01',
  bio: 'Grew up sailing Narragansett Bay and spent a decade delivering yachts across the Atlantic. Happy to teach you to trim.',
  languages: ['English', 'Swedish'], verified: true, responseTime: 'within 2 hours',
  yearsExperience: 12, license: 'USCG 50-Ton Master, Auxiliary Sail', specialties: ['Classic yachts', 'Sailing lessons']
},
{
  id: 'c-tomas', name: 'Capt. Tomás Vidal', initials: 'TV', role: 'captain', location: 'Islamorada, FL', joined: '2021-01-10',
  bio: 'Born in the Keys. I know where the snorkel reefs are quiet and where the mahi are hiding.',
  languages: ['English', 'Spanish'], verified: true, responseTime: 'within an hour',
  yearsExperience: 10, license: 'USCG OUPV (6-Pack)', specialties: ['Reef snorkeling', 'Offshore fishing', 'Catamarans']
},
{
  id: 'c-amy', name: 'Capt. Amy Chen', initials: 'AC', role: 'captain', location: 'San Diego, CA', joined: '2022-02-17',
  bio: 'Former Navy navigator. I run sportfish trips to the Coronado Islands and whale-watching runs in winter.',
  languages: ['English', 'Mandarin'], verified: true, responseTime: 'within 2 hours',
  yearsExperience: 9, license: 'USCG 100-Ton Master', specialties: ['Sportfishing', 'Whale watching']
},
{
  id: 'u-priya', name: 'Priya Natarajan', initials: 'PN', role: 'renter', location: 'Los Angeles, CA', joined: '2024-03-02',
  bio: 'Planning birthdays, one boat day at a time.', languages: ['English', 'Tamil'], verified: true, responseTime: 'within a day'
},
{
  id: 'u-ben', name: 'Ben Carter', initials: 'BC', role: 'renter', location: 'Phoenix, AZ', joined: '2024-06-15',
  bio: 'Desert dweller who escapes to the coast every chance he gets.', languages: ['English'], verified: true, responseTime: 'within a day'
},
{
  id: 'u-nora', name: 'Nora Lindqvist', initials: 'NL', role: 'renter', location: 'Seattle, WA', joined: '2023-08-08',
  bio: 'Sailing club member and amateur photographer.', languages: ['English'], verified: false, responseTime: 'within a day'
}];
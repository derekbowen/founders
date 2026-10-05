import type { CurrentUser, User } from '../types/marketplace';

export const CURRENT_USER_ID = 'u-alex';

export const defaultCurrentUser: CurrentUser = {
  id: CURRENT_USER_ID,
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  phone: '(503) 555-0142',
  roles: ['customer', 'pro'],
  payout: {
    holder: 'Alex Rivera',
    bankName: 'Umpqua Bank',
    last4: '4821',
    schedule: 'weekly'
  }
};

export const users: User[] = [
{
  id: 'u-alex',
  name: 'Alex Rivera',
  roles: ['customer', 'pro'],
  location: 'Kerns, Portland',
  memberSince: '2024-03-12',
  bio: 'Homeowner in inner SE and weekend handyman. I post the big jobs and pick up assembly and yard work when I have free time.',
  verified: true,
  headline: 'Assembly & yard work · weekends',
  skills: ['Furniture assembly', 'Leaf cleanup', 'Hedge trimming', 'Shelving', 'Own power tools'],
  categories: ['assembly', 'yard'],
  rating: 4.9,
  reviewCount: 18,
  completedJobs: 23,
  responseTime: 'within 2 hours',
  jobsPosted: 7,
  reviews: [
  { id: 'r-a1', authorId: 'u-tom', rating: 5, text: 'Alex was on time, brought his own pressure washer and left the patio looking brand new.', date: '2026-09-21', jobTitle: 'Pressure wash back patio' },
  { id: 'r-a2', authorId: 'u-grace', rating: 5, text: 'Built two bookcases and a bed frame in under three hours. Tidy and friendly.', date: '2026-08-30', jobTitle: 'Assemble bed frame + bookcases' }]

},
{
  id: 'u-sam',
  name: 'Sam Delgado',
  roles: ['pro'],
  location: 'Hawthorne, Portland',
  memberSince: '2023-05-02',
  bio: 'Licensed and insured handyman with 12 years in residential repair. I specialize in TV mounting, drywall, and the small jobs bigger contractors won’t take.',
  verified: true,
  headline: 'Licensed handyman · 12 yrs experience',
  skills: ['TV mounting', 'Drywall repair', 'Fence repair', 'Fixture installs', 'Caulking', 'Door adjustments'],
  categories: ['handyman', 'assembly'],
  rating: 4.9,
  reviewCount: 142,
  completedJobs: 211,
  responseTime: 'within 1 hour',
  reviews: [
  { id: 'r-s1', authorId: 'u-hannah', rating: 5, text: 'Mounted our 75" TV and ran the cables through the wall. Absolutely spotless work.', date: '2026-09-18', jobTitle: 'Mount 75" TV in living room' },
  { id: 'r-s2', authorId: 'u-dave', rating: 5, text: 'Fixed a sagging gate and two fence posts the same afternoon I accepted his offer.', date: '2026-09-02', jobTitle: 'Gate and fence post repair' },
  { id: 'r-s3', authorId: 'u-lena', rating: 4, text: 'Great work hanging shelves. Ran 20 minutes late but kept me updated.', date: '2026-08-14', jobTitle: 'Hang floating shelves' }]

},
{
  id: 'u-chris',
  name: 'Chris Novak',
  roles: ['pro'],
  location: 'Buckman, Portland',
  memberSince: '2024-01-20',
  bio: 'Painter and finish carpenter. Clean lines, drop cloths everywhere, and no mess left behind.',
  verified: true,
  headline: 'Painting & finish carpentry',
  skills: ['Interior painting', 'Trim work', 'TV mounting', 'Shelving', 'Patch & repair'],
  categories: ['handyman'],
  rating: 4.8,
  reviewCount: 67,
  completedJobs: 94,
  responseTime: 'within 3 hours',
  reviews: [
  { id: 'r-c1', authorId: 'u-priya', rating: 5, text: 'Painted our nursery in a day. Crisp edges and he moved all the furniture back.', date: '2026-09-10', jobTitle: 'Paint nursery' }]

},
{
  id: 'u-ben',
  name: 'Ben Hartley',
  roles: ['pro'],
  location: 'Montavilla, Portland',
  memberSince: '2022-11-08',
  bio: 'Hartley Hauling — two guys, one 16ft box truck. Moves, junk removal and dump runs across the metro.',
  verified: true,
  headline: 'Hartley Hauling · box truck + crew',
  skills: ['Apartment moves', 'Junk removal', 'Dump runs', 'Piano moving', 'Box truck'],
  categories: ['moving'],
  rating: 4.9,
  reviewCount: 203,
  completedJobs: 318,
  responseTime: 'within 1 hour',
  reviews: [
  { id: 'r-b1', authorId: 'u-marcus', rating: 5, text: 'Moved our 2-bedroom up three flights without a scratch. Fast and careful.', date: '2026-09-25', jobTitle: '2-bedroom apartment move' },
  { id: 'r-b2', authorId: 'u-grace', rating: 5, text: 'Cleared out a whole basement and took everything to the transfer station.', date: '2026-09-04', jobTitle: 'Basement clear-out' }]

},
{
  id: 'u-keisha',
  name: 'Keisha Moore',
  roles: ['pro'],
  location: 'Irvington, Portland',
  memberSince: '2023-02-14',
  bio: 'Owner of Bright Nest Cleaning. Eco-friendly products, insured team, and a checklist for every room.',
  verified: true,
  headline: 'Bright Nest Cleaning · eco products',
  skills: ['Deep cleaning', 'Move-out cleans', 'Airbnb turnovers', 'Eco products', 'Oven & fridge'],
  categories: ['cleaning'],
  rating: 5,
  reviewCount: 88,
  completedJobs: 126,
  responseTime: 'within 2 hours',
  reviews: [
  { id: 'r-k1', authorId: 'u-tom', rating: 5, text: 'Got our full deposit back thanks to Keisha’s move-out clean.', date: '2026-09-12', jobTitle: 'Move-out clean, 2 bed' }]

},
{
  id: 'u-omar',
  name: 'Omar Haddad',
  roles: ['pro'],
  location: 'Goose Hollow, Portland',
  memberSince: '2024-06-01',
  bio: 'Furniture assembly specialist. I’ve built more PAX wardrobes than I can count — and I bring a wall anchor kit.',
  verified: true,
  headline: 'Furniture assembly specialist',
  skills: ['IKEA assembly', 'Wall anchoring', 'Office furniture', 'Bed frames'],
  categories: ['assembly'],
  rating: 4.9,
  reviewCount: 54,
  completedJobs: 77,
  responseTime: 'within 1 hour',
  reviews: [
  { id: 'r-o1', authorId: 'u-alex', rating: 5, text: 'Built a dresser and bed frame fast, anchored the dresser to the wall without me asking.', date: '2026-09-15', jobTitle: 'Assemble dresser & bed frame' }]

},
{
  id: 'u-rosa',
  name: 'Rosa Jimenez',
  roles: ['pro'],
  location: 'Woodstock, Portland',
  memberSince: '2023-08-22',
  bio: 'Landscaper with a trailer and commercial mowers. Seasonal cleanups, hedges and garden builds.',
  verified: true,
  headline: 'Landscaping & seasonal cleanups',
  skills: ['Mowing', 'Leaf cleanup', 'Hedge trimming', 'Raised beds', 'Trailer haul-away'],
  categories: ['yard', 'moving'],
  rating: 4.7,
  reviewCount: 39,
  completedJobs: 58,
  responseTime: 'within 4 hours',
  reviews: [
  { id: 'r-ro1', authorId: 'u-marcus', rating: 5, text: 'Our yard went from jungle to tidy in one afternoon.', date: '2026-09-19', jobTitle: 'Fall yard cleanup' }]

},
{ id: 'u-priya', name: 'Priya Nair', roles: ['customer'], location: 'Sellwood, Portland', memberSince: '2024-09-03', bio: 'New homeowner learning which jobs I can DIY and which I can’t.', verified: true, jobsPosted: 5, rating: 5, reviewCount: 4, reviews: [{ id: 'r-p1', authorId: 'u-chris', rating: 5, text: 'Clear instructions and paid right away. Would work for Priya again.', date: '2026-09-10', jobTitle: 'Paint nursery' }] },
{ id: 'u-marcus', name: 'Marcus Bell', roles: ['customer'], location: 'St. Johns, Portland', memberSince: '2023-04-17', bio: 'Busy dad of three. Big yard, little free time.', verified: true, jobsPosted: 11, rating: 4.9, reviewCount: 9, reviews: [] },
{ id: 'u-hannah', name: 'Hannah Okafor', roles: ['customer'], location: 'Hawthorne, Portland', memberSince: '2024-02-08', bio: 'Moving to a new place this fall and need a hand.', verified: true, jobsPosted: 3, rating: 5, reviewCount: 2, reviews: [] },
{ id: 'u-dave', name: 'Dave Kowalski', roles: ['customer'], location: 'Buckman, Portland', memberSince: '2022-10-29', bio: 'Old house, lots of quirks.', verified: false, jobsPosted: 8, rating: 4.8, reviewCount: 6, reviews: [] },
{ id: 'u-lena', name: 'Lena Park', roles: ['customer'], location: 'Alberta Arts, Portland', memberSince: '2025-01-11', bio: 'Furnishing my first apartment one flat-pack at a time.', verified: true, jobsPosted: 4, rating: 5, reviewCount: 3, reviews: [] },
{ id: 'u-tom', name: 'Tom Ruiz', roles: ['customer'], location: 'Pearl District, Portland', memberSince: '2023-07-05', bio: 'Landlord with two rental units in NW.', verified: true, jobsPosted: 14, rating: 4.9, reviewCount: 12, reviews: [] },
{ id: 'u-grace', name: 'Grace Liu', roles: ['customer'], location: 'Irvington, Portland', memberSince: '2024-05-19', bio: 'Airbnb host and plant person.', verified: true, jobsPosted: 9, rating: 5, reviewCount: 7, reviews: [] }];
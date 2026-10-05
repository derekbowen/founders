import type { Listing } from '../types/marketplace';
import { images } from './images';

const { covers, gallery, portraits } = images;

export const listings: Listing[] = [
{
  id: 'maya-sellwood',
  title: 'Sunny Sellwood home with a big fenced yard',
  sitter: {
    id: 'maya-collins',
    name: 'Maya Collins',
    firstName: 'Maya',
    avatar: portraits[0],
    bio: 'I’m a former vet tech who now works from home as a UX writer, so your pup gets company all day. Our yard backs onto a quiet street and we walk Oaks Bottom every morning.',
    memberSince: '2021',
    responseTime: 'within an hour',
    repeatClients: 38,
    yearsExperience: 8,
    verified: true
  },
  neighborhood: 'Sellwood',
  city: 'Portland, OR',
  lat: 45.4648,
  lng: -122.653,
  rating: 4.98,
  reviewCount: 126,
  photos: [covers[0], gallery.yard, gallery.bedroom, gallery.brush],
  description:
  'Your dog will have the run of our cozy craftsman, a fenced 2,000 sq ft yard and plenty of couch space. I keep a strict feeding schedule, send photo updates twice a day and can give oral medication.',
  highlights: ['Former vet tech', 'Pet first aid certified', 'Twice-daily photo updates'],
  services: [
  { serviceId: 'boarding', extraPetPrice: 20, variations: [{ id: 'standard', label: 'Standard night', price: 48 }] },
  { serviceId: 'house-sitting', extraPetPrice: 15, variations: [{ id: 'standard', label: 'Overnight', price: 75 }] },
  {
    serviceId: 'drop-in',
    extraPetPrice: 5,
    variations: [
    { id: '30', label: '30-minute visit', price: 22, durationMins: 30 },
    { id: '60', label: '60-minute visit', price: 35, durationMins: 60 }]

  },
  {
    serviceId: 'dog-walking',
    extraPetPrice: 8,
    variations: [
    { id: '30', label: '30-minute walk', price: 22, durationMins: 30 },
    { id: '60', label: '60-minute walk', price: 34, durationMins: 60 }]

  }],

  home: { homeType: 'House', yard: 'fenced', children: 'No children', otherPets: 'One dog-friendly senior cat', smokeFree: true, homeFullTime: true },
  petSizes: ['small', 'medium', 'large'],
  acceptsCats: true,
  maxPets: 3,
  blockedDays: [4, 5, 6, 13, 20, 21, 34, 35]
},
{
  id: 'andre-alberta',
  title: 'Adventure walks & cozy stays in Alberta Arts',
  sitter: {
    id: 'andre-thompson',
    name: 'Andre Thompson',
    firstName: 'Andre',
    avatar: portraits[1],
    bio: 'Trail runner and lifelong dog person. I specialize in high-energy breeds that need to burn off steam — think huskies, shepherds and herding dogs.',
    memberSince: '2022',
    responseTime: 'within 2 hours',
    repeatClients: 24,
    yearsExperience: 6,
    verified: true
  },
  neighborhood: 'Alberta Arts',
  city: 'Portland, OR',
  lat: 45.559,
  lng: -122.645,
  rating: 4.93,
  reviewCount: 84,
  photos: [covers[4], gallery.trail, gallery.fetch, gallery.feeding],
  description:
  'Walks are GPS-tracked and you’ll get a route map plus photos after every outing. Boarding guests join me for a long morning run or a sniff-walk, depending on their pace.',
  highlights: ['GPS-tracked walks', 'High-energy breed expert', 'Leash reactivity training'],
  services: [
  {
    serviceId: 'dog-walking',
    extraPetPrice: 8,
    variations: [
    { id: '30', label: '30-minute walk', price: 20, durationMins: 30 },
    { id: '60', label: '60-minute walk', price: 32, durationMins: 60 },
    { id: '90', label: '90-minute trail run', price: 45, durationMins: 90 }]

  },
  { serviceId: 'drop-in', extraPetPrice: 5, variations: [{ id: '30', label: '30-minute visit', price: 20, durationMins: 30 }] },
  { serviceId: 'boarding', extraPetPrice: 18, variations: [{ id: 'standard', label: 'Standard night', price: 42 }] }],

  home: { homeType: 'Townhouse', yard: 'unfenced', children: 'No children', otherPets: null, smokeFree: true, homeFullTime: false },
  petSizes: ['medium', 'large', 'giant'],
  acceptsCats: false,
  maxPets: 2,
  blockedDays: [2, 3, 9, 10, 16, 17, 23, 24]
},
{
  id: 'grace-pearl',
  title: 'Calm cat care in a quiet Pearl District loft',
  sitter: {
    id: 'grace-kim',
    name: 'Grace Kim',
    firstName: 'Grace',
    avatar: portraits[2],
    bio: 'Cat behaviorist by training and a cat mom of 15 years. Shy cats, diabetic cats, seniors — I’m comfortable with insulin, sub-Q fluids and slow introductions.',
    memberSince: '2020',
    responseTime: 'within an hour',
    repeatClients: 52,
    yearsExperience: 15,
    verified: true
  },
  neighborhood: 'Pearl District',
  city: 'Portland, OR',
  lat: 45.53,
  lng: -122.683,
  rating: 5.0,
  reviewCount: 142,
  photos: [covers[2], covers[9], gallery.feeding, gallery.bedroom],
  description:
  'My loft has a dedicated quiet room for feline guests with window perches, a covered litter box and a Feliway diffuser. Drop-ins include litter scooping, fresh water, play and a written visit log.',
  highlights: ['Cat behavior specialist', 'Insulin & fluids', 'Written visit log'],
  services: [
  {
    serviceId: 'drop-in',
    extraPetPrice: 4,
    variations: [
    { id: '30', label: '30-minute visit', price: 24, durationMins: 30 },
    { id: '45', label: '45-minute visit', price: 30, durationMins: 45 }]

  },
  { serviceId: 'house-sitting', extraPetPrice: 10, variations: [{ id: 'standard', label: 'Overnight', price: 70 }] },
  { serviceId: 'boarding', extraPetPrice: 12, variations: [{ id: 'standard', label: 'Cat suite night', price: 40 }] }],

  home: { homeType: 'Apartment', yard: 'none', children: 'No children', otherPets: null, smokeFree: true, homeFullTime: true },
  petSizes: ['small'],
  acceptsCats: true,
  maxPets: 3,
  blockedDays: [7, 8, 14, 15, 28]
},
{
  id: 'walter-multnomah',
  title: 'Retired teacher’s garden home — senior dogs welcome',
  sitter: {
    id: 'walter-brennan',
    name: 'Walter Brennan',
    firstName: 'Walter',
    avatar: portraits[3],
    bio: 'Retired after 30 years teaching middle school science. I’m home all day, love a slow walk and have a soft spot for grey muzzles and dogs with special needs.',
    memberSince: '2019',
    responseTime: 'within 3 hours',
    repeatClients: 61,
    yearsExperience: 12,
    verified: true
  },
  neighborhood: 'Multnomah Village',
  city: 'Portland, OR',
  lat: 45.477,
  lng: -122.711,
  rating: 4.97,
  reviewCount: 98,
  photos: [covers[6], gallery.yard, gallery.bedroom, gallery.feeding],
  description:
  'Single-level home, no stairs, orthopedic dog beds in every room and a quiet fenced garden. Perfect for seniors, post-surgery recovery and dogs who like a calm routine.',
  highlights: ['Home full-time', 'Senior & special-needs dogs', 'Single-level, no stairs'],
  services: [
  { serviceId: 'boarding', extraPetPrice: 18, variations: [{ id: 'standard', label: 'Standard night', price: 45 }] },
  { serviceId: 'house-sitting', extraPetPrice: 12, variations: [{ id: 'standard', label: 'Overnight', price: 65 }] },
  { serviceId: 'drop-in', extraPetPrice: 5, variations: [{ id: '30', label: '30-minute visit', price: 18, durationMins: 30 }] }],

  home: { homeType: 'House', yard: 'fenced', children: 'No children', otherPets: null, smokeFree: true, homeFullTime: true },
  petSizes: ['small', 'medium', 'large'],
  acceptsCats: true,
  maxPets: 2,
  blockedDays: [1, 2, 18, 19, 25, 26, 27]
},
{
  id: 'sofia-hawthorne',
  title: 'Playful family home with two friendly terriers',
  sitter: {
    id: 'sofia-ramirez',
    name: 'Sofia Ramirez',
    firstName: 'Sofia',
    avatar: portraits[4],
    bio: 'Grad student, part-time dog trainer and big sister to two very social terriers, Taco and Churro. Your small pup will have built-in playmates.',
    memberSince: '2023',
    responseTime: 'within an hour',
    repeatClients: 17,
    yearsExperience: 5,
    verified: true
  },
  neighborhood: 'Hawthorne',
  city: 'Portland, OR',
  lat: 45.512,
  lng: -122.625,
  rating: 4.91,
  reviewCount: 57,
  photos: [covers[1], gallery.fetch, gallery.yard, gallery.brush],
  description:
  'Boarding guests get group play in our fenced yard, two walks a day on Hawthorne and Mt. Tabor trails, and nap time in a crate-free home. Great for socializing young dogs.',
  highlights: ['Positive-reinforcement trainer', 'Built-in doggy playmates', 'Crate-free home'],
  services: [
  { serviceId: 'boarding', extraPetPrice: 20, variations: [{ id: 'standard', label: 'Standard night', price: 50 }] },
  {
    serviceId: 'dog-walking',
    extraPetPrice: 8,
    variations: [
    { id: '30', label: '30-minute walk', price: 22, durationMins: 30 },
    { id: '60', label: '60-minute walk', price: 34, durationMins: 60 }]

  },
  { serviceId: 'drop-in', extraPetPrice: 5, variations: [{ id: '30', label: '30-minute visit', price: 22, durationMins: 30 }] }],

  home: { homeType: 'House', yard: 'fenced', children: 'One child (8)', otherPets: 'Two small terriers', smokeFree: true, homeFullTime: false },
  petSizes: ['small', 'medium'],
  acceptsCats: false,
  maxPets: 2,
  blockedDays: [5, 6, 12, 13, 19, 20]
},
{
  id: 'arjun-laurelhurst',
  title: 'Big-dog boarding near Laurelhurst Park',
  sitter: {
    id: 'arjun-patel',
    name: 'Arjun Patel',
    firstName: 'Arjun',
    avatar: portraits[5],
    bio: 'Software engineer working remotely, raised two huskies and a Great Pyrenees. Large and giant breeds are my favorite — the fluffier the better.',
    memberSince: '2021',
    responseTime: 'within an hour',
    repeatClients: 29,
    yearsExperience: 9,
    verified: true
  },
  neighborhood: 'Laurelhurst',
  city: 'Portland, OR',
  lat: 45.525,
  lng: -122.628,
  rating: 4.95,
  reviewCount: 73,
  photos: [covers[7], gallery.yard, gallery.trail, gallery.brush],
  description:
  'Six-foot fence, dog door to the yard and two blocks from Laurelhurst Park. Daily brushing included for double-coated breeds — your vacuum will thank me.',
  highlights: ['Large & giant breeds', 'Six-foot fence', 'Daily brushing included'],
  services: [
  {
    serviceId: 'boarding',
    extraPetPrice: 22,
    variations: [
    { id: 'standard', label: 'Standard night', price: 55 },
    { id: 'giant', label: 'Giant breed night (100+ lb)', price: 65 }]

  },
  {
    serviceId: 'dog-walking',
    extraPetPrice: 10,
    variations: [
    { id: '30', label: '30-minute walk', price: 24, durationMins: 30 },
    { id: '60', label: '60-minute walk', price: 36, durationMins: 60 }]

  }],

  home: { homeType: 'House', yard: 'fenced', children: 'No children', otherPets: null, smokeFree: true, homeFullTime: true },
  petSizes: ['medium', 'large', 'giant'],
  acceptsCats: false,
  maxPets: 2,
  blockedDays: [10, 11, 12, 30, 31]
},
{
  id: 'emma-mississippi',
  title: 'Neighborhood walks & drop-ins on Mississippi Ave',
  sitter: {
    id: 'emma-obrien',
    name: 'Emma O’Brien',
    firstName: 'Emma',
    avatar: portraits[6],
    bio: 'Barista by morning, pet sitter by afternoon. I know every dog-friendly patio and park on the North side and I’m great with puppies who are still learning leash manners.',
    memberSince: '2022',
    responseTime: 'within 2 hours',
    repeatClients: 21,
    yearsExperience: 4,
    verified: true
  },
  neighborhood: 'Mississippi',
  city: 'Portland, OR',
  lat: 45.549,
  lng: -122.676,
  rating: 4.89,
  reviewCount: 46,
  photos: [covers[8], gallery.trail, gallery.feeding, covers[3]],
  description:
  'Flexible afternoon walks and drop-ins for busy owners. I send a quick report card after every visit: potty, water, mood and a photo.',
  highlights: ['Puppy-friendly', 'Visit report cards', 'Same-day availability'],
  services: [
  {
    serviceId: 'dog-walking',
    extraPetPrice: 6,
    variations: [
    { id: '20', label: '20-minute puppy break', price: 16, durationMins: 20 },
    { id: '30', label: '30-minute walk', price: 19, durationMins: 30 },
    { id: '60', label: '60-minute walk', price: 30, durationMins: 60 }]

  },
  { serviceId: 'drop-in', extraPetPrice: 5, variations: [{ id: '30', label: '30-minute visit', price: 19, durationMins: 30 }] },
  { serviceId: 'house-sitting', extraPetPrice: 12, variations: [{ id: 'standard', label: 'Overnight', price: 68 }] }],

  home: { homeType: 'Apartment', yard: 'none', children: 'No children', otherPets: null, smokeFree: true, homeFullTime: false },
  petSizes: ['small', 'medium'],
  acceptsCats: true,
  maxPets: 2,
  blockedDays: [3, 4, 17, 18]
},
{
  id: 'nia-irvington',
  title: 'Puppy-pro family home in historic Irvington',
  sitter: {
    id: 'nia-johnson',
    name: 'Nia Johnson',
    firstName: 'Nia',
    avatar: portraits[7],
    bio: 'Mom of two kids and one goofy lab, Bear. I’ve raised three guide-dog puppies and love helping young dogs build confidence and good house manners.',
    memberSince: '2020',
    responseTime: 'within an hour',
    repeatClients: 44,
    yearsExperience: 10,
    verified: true
  },
  neighborhood: 'Irvington',
  city: 'Portland, OR',
  lat: 45.541,
  lng: -122.645,
  rating: 4.96,
  reviewCount: 109,
  photos: [covers[5], gallery.fetch, gallery.yard, gallery.bedroom],
  description:
  'Our home is set up for puppies: gated play areas, a strict potty schedule and lots of supervised play with Bear. Kids are 10 and 13 and very gentle with dogs.',
  highlights: ['Guide-dog puppy raiser', 'Potty training routines', 'Kid-friendly home'],
  services: [
  {
    serviceId: 'boarding',
    extraPetPrice: 20,
    variations: [
    { id: 'standard', label: 'Standard night', price: 52 },
    { id: 'puppy', label: 'Puppy night (under 1 year)', price: 60 }]

  },
  { serviceId: 'drop-in', extraPetPrice: 5, variations: [{ id: '30', label: '30-minute visit', price: 21, durationMins: 30 }] }],

  home: { homeType: 'House', yard: 'fenced', children: 'Two children (10, 13)', otherPets: 'One friendly Labrador', smokeFree: true, homeFullTime: true },
  petSizes: ['small', 'medium', 'large', 'giant'],
  acceptsCats: true,
  maxPets: 3,
  blockedDays: [8, 9, 22, 23, 24]
},
{
  id: 'caleb-stjohns',
  title: 'Half-acre yard & trail days in St. Johns',
  sitter: {
    id: 'caleb-morgan',
    name: 'Caleb Morgan',
    firstName: 'Caleb',
    avatar: portraits[8],
    bio: 'Landscape designer with a half-acre lot and a mellow lab mix named Moose. Weekends are for Forest Park hikes and Cathedral Park sniff walks.',
    memberSince: '2022',
    responseTime: 'within 3 hours',
    repeatClients: 19,
    yearsExperience: 7,
    verified: false
  },
  neighborhood: 'St. Johns',
  city: 'Portland, OR',
  lat: 45.59,
  lng: -122.754,
  rating: 4.88,
  reviewCount: 38,
  photos: [gallery.fetch, gallery.trail, gallery.yard, covers[7]],
  description:
  'Room to roam: a fully fenced half-acre with a kiddie pool, agility tunnel and shade trees. Trail add-ons available on weekends.',
  highlights: ['Half-acre fenced lot', 'Weekend trail adventures', 'Dog pool in summer'],
  services: [
  { serviceId: 'boarding', extraPetPrice: 18, variations: [{ id: 'standard', label: 'Standard night', price: 46 }] },
  {
    serviceId: 'dog-walking',
    extraPetPrice: 8,
    variations: [
    { id: '60', label: '60-minute walk', price: 30, durationMins: 60 },
    { id: '90', label: '90-minute trail hike', price: 45, durationMins: 90 }]

  }],

  home: { homeType: 'House', yard: 'fenced', children: 'No children', otherPets: 'One mellow lab mix', smokeFree: true, homeFullTime: false },
  petSizes: ['medium', 'large', 'giant'],
  acceptsCats: false,
  maxPets: 3,
  blockedDays: [1, 14, 15, 16, 29]
},
{
  id: 'rosa-woodstock',
  title: 'Gentle care for cats & small dogs in Woodstock',
  sitter: {
    id: 'rosa-delgado',
    name: 'Rosa Delgado',
    firstName: 'Rosa',
    avatar: portraits[9],
    bio: 'Registered nurse, now semi-retired. I bring a nurse’s attention to detail to medication schedules and post-op care for cats and small dogs.',
    memberSince: '2019',
    responseTime: 'within 2 hours',
    repeatClients: 47,
    yearsExperience: 14,
    verified: true
  },
  neighborhood: 'Woodstock',
  city: 'Portland, OR',
  lat: 45.479,
  lng: -122.615,
  rating: 4.99,
  reviewCount: 88,
  photos: [covers[9], covers[2], gallery.bedroom, gallery.feeding],
  description:
  'Quiet townhouse with no other pets, perfect for anxious or recovering animals. Medications, injections and special diets handled with care and logged at every visit.',
  highlights: ['Registered nurse', 'Medication & injections', 'No other pets'],
  services: [
  { serviceId: 'house-sitting', extraPetPrice: 10, variations: [{ id: 'standard', label: 'Overnight', price: 72 }] },
  {
    serviceId: 'drop-in',
    extraPetPrice: 4,
    variations: [
    { id: '30', label: '30-minute visit', price: 20, durationMins: 30 },
    { id: '60', label: '60-minute visit', price: 32, durationMins: 60 }]

  },
  { serviceId: 'boarding', extraPetPrice: 12, variations: [{ id: 'standard', label: 'Standard night', price: 40 }] }],

  home: { homeType: 'Townhouse', yard: 'none', children: 'No children', otherPets: null, smokeFree: true, homeFullTime: true },
  petSizes: ['small'],
  acceptsCats: true,
  maxPets: 3,
  blockedDays: [6, 7, 20, 21, 22]
},
{
  id: 'riley-kenton',
  title: 'Cozy Kenton apartment for small, chill pups',
  sitter: {
    id: 'riley-chen',
    name: 'Riley Chen',
    firstName: 'Riley',
    avatar: portraits[10],
    bio: 'Illustrator working from home with a very comfy couch. Frenchies, pugs and dachshunds are my people. Lots of naps, short strolls and cuddles.',
    memberSince: '2023',
    responseTime: 'within an hour',
    repeatClients: 12,
    yearsExperience: 3,
    verified: true
  },
  neighborhood: 'Kenton',
  city: 'Portland, OR',
  lat: 45.582,
  lng: -122.689,
  rating: 4.92,
  reviewCount: 31,
  photos: [covers[3], covers[10], gallery.bedroom, gallery.feeding],
  description:
  'Climate-controlled apartment ideal for brachycephalic breeds. Only one boarding guest at a time, so your pup gets my full attention.',
  highlights: ['One guest at a time', 'Flat-faced breed savvy', 'Home full-time'],
  services: [
  { serviceId: 'boarding', extraPetPrice: 15, variations: [{ id: 'standard', label: 'Standard night', price: 44 }] },
  { serviceId: 'dog-walking', extraPetPrice: 6, variations: [{ id: '30', label: '30-minute walk', price: 20, durationMins: 30 }] },
  { serviceId: 'drop-in', extraPetPrice: 5, variations: [{ id: '30', label: '30-minute visit', price: 20, durationMins: 30 }] }],

  home: { homeType: 'Apartment', yard: 'none', children: 'No children', otherPets: null, smokeFree: true, homeFullTime: true },
  petSizes: ['small', 'medium'],
  acceptsCats: true,
  maxPets: 1,
  blockedDays: [2, 9, 10, 11, 26]
},
{
  id: 'omar-richmond',
  title: 'Boutique pet stays in a modern Richmond home',
  sitter: {
    id: 'omar-haddad',
    name: 'Omar Haddad',
    firstName: 'Omar',
    avatar: portraits[11],
    bio: 'Chef and lifelong dog lover. Guests get home-cooked toppers (with your OK), a private suite and evening sniffaris along Division Street.',
    memberSince: '2021',
    responseTime: 'within 2 hours',
    repeatClients: 33,
    yearsExperience: 8,
    verified: true
  },
  neighborhood: 'Richmond',
  city: 'Portland, OR',
  lat: 45.502,
  lng: -122.62,
  rating: 4.94,
  reviewCount: 64,
  photos: [covers[11], gallery.bedroom, gallery.yard, gallery.feeding],
  description:
  'Choose a standard stay or the suite: a private room with a raised bed, a white-noise machine and a nightly enrichment puzzle.',
  highlights: ['Private guest suite', 'Home-cooked toppers', 'Enrichment puzzles'],
  services: [
  {
    serviceId: 'boarding',
    extraPetPrice: 22,
    variations: [
    { id: 'standard', label: 'Standard night', price: 58 },
    { id: 'suite', label: 'Private suite night', price: 72 }]

  },
  { serviceId: 'house-sitting', extraPetPrice: 15, variations: [{ id: 'standard', label: 'Overnight', price: 85 }] }],

  home: { homeType: 'House', yard: 'fenced', children: 'One teenager', otherPets: null, smokeFree: true, homeFullTime: true },
  petSizes: ['small', 'medium', 'large'],
  acceptsCats: true,
  maxPets: 2,
  blockedDays: [3, 4, 5, 24, 25]
}];
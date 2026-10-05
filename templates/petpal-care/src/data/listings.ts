import type { Listing } from '../types/listing';

const home = "/1c29fdbb-8ee2-4c05-8ad0-246033f28078.jpg";
const yard = "/9aeed65a-64f9-4a6f-86dc-271b1b554e5d.jpg";
const walk = "/4b68e447-1ea1-44a7-a64b-9f35075212ec.jpg";

export const listings: Listing[] = [
{
  id: 'maya-alberta',
  title: 'Cozy craftsman home with a big fenced yard',
  tagline: 'Lab lover · Former shelter volunteer',
  neighborhood: 'Alberta Arts',
  city: 'Portland, OR',
  lat: 45.5591,
  lng: -122.6452,
  photos: ["/1e6c0c00-3445-429c-b8a5-f54727a6154f.jpg",

  home,
  yard],

  rating: 4.97,
  reviewCount: 128,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 30,
    variants: [
    { id: 'small', label: 'Small pet', description: 'Dogs under 18 kg and cats', price: 45 },
    { id: 'large', label: 'Large dog', description: 'Dogs 18 kg and up', price: 58 }]

  },
  {
    serviceId: 'drop-in',
    extraPetFee: 8,
    variants: [
    { id: '30', label: '30-min visit', description: 'Feeding, fresh water, potty break', price: 22, durationMinutes: 30 },
    { id: '60', label: '60-min visit', description: 'Everything above plus play & cuddles', price: 35, durationMinutes: 60 }]

  },
  {
    serviceId: 'dog-walking',
    extraPetFee: 10,
    variants: [
    { id: '30', label: '30-min walk', description: 'Neighborhood loop', price: 20, durationMinutes: 30 },
    { id: '60', label: '60-min walk', description: 'Park adventure', price: 32, durationMinutes: 60 }]

  }],

  home: {
    homeType: 'House',
    yard: 'fenced',
    childrenAtHome: 'No children',
    otherPets: 'Juniper, a calm 9-year-old lab',
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['small', 'medium', 'large'],
  acceptsCats: false,
  maxPets: 3,
  blockedDayOffsets: [4, 5, 11, 12, 13, 25, 26],
  highlights: ['Pet first aid certified', 'Daily photo updates', 'Can give oral meds'],
  sitter: {
    id: 'maya-chen',
    name: 'Maya Chen',
    firstName: 'Maya',
    memberSince: '2021-03-14',
    responseTime: 'within an hour',
    repeatClients: 46,
    experienceYears: 8,
    verified: true,
    languages: ['English', 'Mandarin'],
    bio: 'I spent six years volunteering at the Oregon Humane Society before I started sitting full time. I work from home, so your dog gets three walks a day, plenty of yard time and a spot on the couch next to my lab Juniper. I send photo updates every morning and evening so you never have to wonder.'
  }
},
{
  id: 'sofia-pearl',
  title: 'Calm Pearl District apartment for cats & tiny dogs',
  tagline: 'Cat whisperer · Quiet home',
  neighborhood: 'Pearl District',
  city: 'Portland, OR',
  lat: 45.5287,
  lng: -122.6829,
  photos: ["/26a0f4e0-a740-4bd2-a091-b19f481ae292.jpg",

  home,
  walk],

  rating: 4.95,
  reviewCount: 86,
  services: [
  {
    serviceId: 'house-sitting',
    extraPetFee: 10,
    variants: [{ id: 'standard', label: 'Overnight at your home', description: 'Arrive by 7pm, leave after breakfast', price: 68 }]
  },
  {
    serviceId: 'drop-in',
    extraPetFee: 6,
    variants: [
    { id: '30', label: '30-min visit', description: 'Feeding, litter, fresh water', price: 24, durationMinutes: 30 },
    { id: '60', label: '60-min visit', description: 'Plus brushing and play time', price: 36, durationMinutes: 60 }]

  }],

  home: {
    homeType: 'Apartment',
    yard: 'none',
    childrenAtHome: 'No children',
    otherPets: null,
    fullTimeHome: false,
    smokeFree: true
  },
  acceptedSizes: ['small'],
  acceptsCats: true,
  maxPets: 3,
  blockedDayOffsets: [2, 3, 9, 16, 17, 18],
  highlights: ['Insulin injections', 'Senior cat experience', 'Litter deep-cleans'],
  sitter: {
    id: 'sofia-ramirez',
    name: 'Sofia Ramirez',
    firstName: 'Sofia',
    memberSince: '2022-01-09',
    responseTime: 'within 2 hours',
    repeatClients: 31,
    experienceYears: 6,
    verified: true,
    languages: ['English', 'Spanish'],
    bio: 'Cats are my people. I’ve cared for shy rescues, diabetic seniors and a very opinionated Maine Coon named Waffles. I keep routines exactly as you leave them and I’m comfortable giving insulin and subcutaneous fluids.'
  }
},
{
  id: 'ben-sellwood',
  title: 'Small-dog playgroup with a fenced garden',
  tagline: 'Small breeds · Corgi dad',
  neighborhood: 'Sellwood',
  city: 'Portland, OR',
  lat: 45.4655,
  lng: -122.6521,
  photos: ["/686df307-6ae7-4b47-90ed-c99b097ef3eb.jpg",

  yard,
  home],

  rating: 4.92,
  reviewCount: 64,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 25,
    variants: [
    { id: 'small', label: 'Small dog', description: 'Up to 12 kg', price: 40 },
    { id: 'large', label: 'Medium dog', description: '12–18 kg', price: 52 }]

  },
  {
    serviceId: 'dog-walking',
    extraPetFee: 10,
    variants: [
    { id: '30', label: '30-min walk', description: 'Riverfront loop', price: 22, durationMinutes: 30 },
    { id: '60', label: '60-min walk', description: 'Oaks Bottom trail', price: 34, durationMinutes: 60 }]

  }],

  home: {
    homeType: 'House',
    yard: 'fenced',
    childrenAtHome: 'No children',
    otherPets: 'Biscuit, a friendly 5-year-old corgi',
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['small', 'medium'],
  acceptsCats: false,
  maxPets: 4,
  blockedDayOffsets: [6, 7, 8, 20, 21],
  highlights: ['Max 3 guest dogs', 'Puppy-proofed home', 'Crate-free'],
  sitter: {
    id: 'ben-okafor',
    name: 'Ben Okafor',
    firstName: 'Ben',
    memberSince: '2022-06-21',
    responseTime: 'within an hour',
    repeatClients: 22,
    experienceYears: 5,
    verified: true,
    languages: ['English'],
    bio: 'I run a tiny, supervised playgroup for small dogs out of my Sellwood home. Biscuit is the host with the most and loves showing guests around the garden. I work remotely and take walks along the river twice a day.'
  }
},
{
  id: 'hannah-laurelhurst',
  title: 'Reliable walks & drop-ins around Laurelhurst',
  tagline: 'Pro dog walker · 200+ reviews',
  neighborhood: 'Laurelhurst',
  city: 'Portland, OR',
  lat: 45.5262,
  lng: -122.6251,
  photos: ["/ca33125f-35fa-4c49-a632-7a590fba7890.jpg",

  walk,
  yard],

  rating: 4.99,
  reviewCount: 211,
  services: [
  {
    serviceId: 'dog-walking',
    extraPetFee: 12,
    variants: [
    { id: '30', label: '30-min walk', description: 'Solo or paired walk', price: 24, durationMinutes: 30 },
    { id: '60', label: '60-min walk', description: 'Laurelhurst Park adventure', price: 36, durationMinutes: 60 }]

  },
  {
    serviceId: 'drop-in',
    extraPetFee: 8,
    variants: [
    { id: '30', label: '30-min visit', description: 'Feeding & potty break', price: 25, durationMinutes: 30 },
    { id: '60', label: '60-min visit', description: 'Includes a short walk', price: 38, durationMinutes: 60 }]

  }],

  home: {
    homeType: 'House',
    yard: 'unfenced',
    childrenAtHome: 'No children',
    otherPets: null,
    fullTimeHome: false,
    smokeFree: true
  },
  acceptedSizes: ['small', 'medium', 'large', 'giant'],
  acceptsCats: true,
  maxPets: 3,
  blockedDayOffsets: [1, 14, 15, 28],
  highlights: ['GPS-tracked walks', 'Leash-reactive experience', 'Insured & bonded'],
  sitter: {
    id: 'hannah-lee',
    name: 'Hannah Lee',
    firstName: 'Hannah',
    memberSince: '2020-09-02',
    responseTime: 'within 30 minutes',
    repeatClients: 88,
    experienceYears: 10,
    verified: true,
    languages: ['English', 'Korean'],
    bio: 'Walking dogs is my full-time job and my favorite thing in the world. Every walk is GPS-tracked and ends with a photo report card. I’m patient with leash-reactive pups and always walk solo unless you ask for a buddy.'
  }
},
{
  id: 'marcus-hawthorne',
  title: 'Flat-faced breed specialist in a cool, quiet condo',
  tagline: 'Frenchie & pug expert',
  neighborhood: 'Hawthorne',
  city: 'Portland, OR',
  lat: 45.5121,
  lng: -122.6321,
  photos: ["/92222282-97ab-47c2-9d84-6364d4a48192.jpg",

  home,
  walk],

  rating: 4.9,
  reviewCount: 47,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 30,
    variants: [
    { id: 'small', label: 'Small dog or cat', description: 'Under 12 kg', price: 50 },
    { id: 'large', label: 'Medium dog', description: '12–18 kg', price: 62 }]

  },
  {
    serviceId: 'house-sitting',
    extraPetFee: 12,
    variants: [{ id: 'standard', label: 'Overnight at your home', description: '12 hours on site', price: 75 }]
  }],

  home: {
    homeType: 'Condo',
    yard: 'none',
    childrenAtHome: 'No children',
    otherPets: null,
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['small', 'medium'],
  acceptsCats: true,
  maxPets: 2,
  blockedDayOffsets: [3, 4, 10, 22, 23, 24],
  highlights: ['Air-conditioned home', 'Brachycephalic care', 'One family at a time'],
  sitter: {
    id: 'marcus-bell',
    name: 'Marcus Bell',
    firstName: 'Marcus',
    memberSince: '2023-02-11',
    responseTime: 'within 3 hours',
    repeatClients: 14,
    experienceYears: 4,
    verified: true,
    languages: ['English'],
    bio: 'After raising two French bulldogs I learned everything about keeping flat-faced breeds cool, calm and breathing easy. My condo stays at 70°F year-round and I only host one family at a time.'
  }
},
{
  id: 'priya-stjohns',
  title: 'Big dogs welcome — half-acre yard in St. Johns',
  tagline: 'Gentle giants · Family home',
  neighborhood: 'St. Johns',
  city: 'Portland, OR',
  lat: 45.5902,
  lng: -122.7531,
  photos: ["/ab78397d-4fe2-4985-99c1-97f1d5d24122.jpg",

  yard,
  home],

  rating: 4.96,
  reviewCount: 102,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 30,
    variants: [
    { id: 'small', label: 'Medium dog', description: 'Up to 25 kg', price: 48 },
    { id: 'large', label: 'Large or giant dog', description: '25 kg and up', price: 60 }]

  },
  {
    serviceId: 'dog-walking',
    extraPetFee: 10,
    variants: [
    { id: '30', label: '30-min walk', description: 'Cathedral Park loop', price: 20, durationMinutes: 30 },
    { id: '60', label: '60-min walk', description: 'Forest Park trail', price: 30, durationMinutes: 60 }]

  }],

  home: {
    homeType: 'House',
    yard: 'fenced',
    childrenAtHome: 'Two kids (8 and 11)',
    otherPets: 'Otis, a 6-year-old Bernese mountain dog',
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['medium', 'large', 'giant'],
  acceptsCats: false,
  maxPets: 3,
  blockedDayOffsets: [9, 10, 17, 18, 19],
  highlights: ['Half-acre fenced yard', 'Kid-friendly', 'Experience with hip dysplasia'],
  sitter: {
    id: 'priya-nair',
    name: 'Priya Nair',
    firstName: 'Priya',
    memberSince: '2021-07-30',
    responseTime: 'within an hour',
    repeatClients: 39,
    experienceYears: 7,
    verified: true,
    languages: ['English', 'Hindi', 'Malayalam'],
    bio: 'Our family has a soft spot for big, fluffy dogs. Otis runs the half-acre yard and loves a playmate his size. My kids help with brushing and belly rubs, and I’m home all day with a flexible work schedule.'
  }
},
{
  id: 'elena-irvington',
  title: 'Cats and small dogs in a sunny Irvington home',
  tagline: 'Mixed-species home · Cat & dog',
  neighborhood: 'Irvington',
  city: 'Portland, OR',
  lat: 45.5392,
  lng: -122.6512,
  photos: ["/93a62a43-9682-465a-b5d7-8383e8b83432.jpg",

  home,
  yard],

  rating: 4.93,
  reviewCount: 73,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 25,
    variants: [
    { id: 'small', label: 'Cat', description: 'Private guest room', price: 42 },
    { id: 'large', label: 'Small dog', description: 'Under 10 kg', price: 54 }]

  },
  {
    serviceId: 'drop-in',
    extraPetFee: 6,
    variants: [
    { id: '30', label: '30-min visit', description: 'Feeding & litter', price: 21, durationMinutes: 30 },
    { id: '60', label: '60-min visit', description: 'Plus play and brushing', price: 32, durationMinutes: 60 }]

  },
  {
    serviceId: 'house-sitting',
    extraPetFee: 10,
    variants: [{ id: 'standard', label: 'Overnight at your home', description: 'Evening to morning', price: 65 }]
  }],

  home: {
    homeType: 'House',
    yard: 'fenced',
    childrenAtHome: 'No children',
    otherPets: 'Pepper, a mellow British shorthair',
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['small'],
  acceptsCats: true,
  maxPets: 3,
  blockedDayOffsets: [5, 6, 12, 27],
  highlights: ['Separate cat guest room', 'Gentle introductions', 'Medication experience'],
  sitter: {
    id: 'elena-petrova',
    name: 'Elena Petrova',
    firstName: 'Elena',
    memberSince: '2021-11-05',
    responseTime: 'within 2 hours',
    repeatClients: 27,
    experienceYears: 9,
    verified: true,
    languages: ['English', 'Russian'],
    bio: 'I’m a freelance illustrator who works from a sunny studio at home. Cats get their own quiet guest room, small dogs get the run of the house, and everyone gets introduced slowly to Pepper, our resident diplomat.'
  }
},
{
  id: 'tyler-mississippi',
  title: 'Puppy-friendly loft steps from Overlook Park',
  tagline: 'Puppy training · Positive reinforcement',
  neighborhood: 'Mississippi',
  city: 'Portland, OR',
  lat: 45.5519,
  lng: -122.6762,
  photos: ["/564ab663-0bf0-4b38-8b17-a1dc0285707b.jpg",

  walk,
  home],

  rating: 4.88,
  reviewCount: 39,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 28,
    variants: [
    { id: 'small', label: 'Puppy or small dog', description: 'Under 12 kg', price: 46 },
    { id: 'large', label: 'Medium dog', description: '12–18 kg', price: 58 }]

  },
  {
    serviceId: 'dog-walking',
    extraPetFee: 10,
    variants: [
    { id: '30', label: '30-min walk', description: 'With leash-manners practice', price: 22, durationMinutes: 30 },
    { id: '60', label: '60-min walk', description: 'Park + socialization', price: 34, durationMinutes: 60 }]

  },
  {
    serviceId: 'drop-in',
    extraPetFee: 8,
    variants: [
    { id: '30', label: '30-min visit', description: 'Puppy potty break', price: 23, durationMinutes: 30 },
    { id: '60', label: '60-min visit', description: 'Potty, play and training', price: 34, durationMinutes: 60 }]

  }],

  home: {
    homeType: 'Loft',
    yard: 'none',
    childrenAtHome: 'No children',
    otherPets: null,
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['small', 'medium'],
  acceptsCats: false,
  maxPets: 2,
  blockedDayOffsets: [2, 8, 9, 15, 29],
  highlights: ['CPDT-KA trainer', 'Potty-training support', 'Park 2 minutes away'],
  sitter: {
    id: 'tyler-brooks',
    name: 'Tyler Brooks',
    firstName: 'Tyler',
    memberSince: '2023-05-18',
    responseTime: 'within an hour',
    repeatClients: 12,
    experienceYears: 3,
    verified: true,
    languages: ['English'],
    bio: 'I’m a certified trainer who loves the chaotic puppy phase. Your pup will keep up with their training plan while staying with me — sit, stay, and lots of crate-free naps. Overlook Park is right around the corner.'
  }
},
{
  id: 'grace-multnomah',
  title: 'Senior pet care from a retired vet tech',
  tagline: 'Senior & special-needs pets',
  neighborhood: 'Multnomah Village',
  city: 'Portland, OR',
  lat: 45.4681,
  lng: -122.7141,
  photos: ["/5e506cd5-106b-4b5f-83d6-c9167db94269.jpg",

  home,
  yard],

  rating: 5.0,
  reviewCount: 58,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 30,
    variants: [
    { id: 'small', label: 'Small pet', description: 'Dogs under 18 kg and cats', price: 52 },
    { id: 'large', label: 'Large dog', description: '18 kg and up', price: 64 }]

  },
  {
    serviceId: 'drop-in',
    extraPetFee: 8,
    variants: [
    { id: '30', label: '30-min visit', description: 'Meds & feeding', price: 26, durationMinutes: 30 },
    { id: '60', label: '60-min visit', description: 'Meds, feeding & companionship', price: 40, durationMinutes: 60 }]

  },
  {
    serviceId: 'house-sitting',
    extraPetFee: 12,
    variants: [{ id: 'standard', label: 'Overnight at your home', description: 'Ideal for anxious seniors', price: 80 }]
  }],

  home: {
    homeType: 'House',
    yard: 'fenced',
    childrenAtHome: 'No children',
    otherPets: null,
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['small', 'medium', 'large'],
  acceptsCats: true,
  maxPets: 2,
  blockedDayOffsets: [7, 8, 14, 21, 22],
  highlights: ['Retired vet technician', 'Injections & fluids', 'Single-level, ramp access'],
  sitter: {
    id: 'grace-whitfield',
    name: 'Grace Whitfield',
    firstName: 'Grace',
    memberSince: '2020-04-27',
    responseTime: 'within 2 hours',
    repeatClients: 34,
    experienceYears: 25,
    verified: true,
    languages: ['English'],
    bio: 'I spent 22 years as a veterinary technician and now spend my retirement spoiling older pets. My single-level home has ramps, orthopedic beds and a quiet garden. Medications, injections and fluids are second nature.'
  }
},
{
  id: 'noah-kenton',
  title: 'Trail adventures for high-energy dogs',
  tagline: 'Hikes & runs · Active breeds',
  neighborhood: 'Kenton',
  city: 'Portland, OR',
  lat: 45.5841,
  lng: -122.6901,
  photos: ["/55e4c93a-b6d0-45d4-a05b-7588d9bf70cc.jpg",

  walk,
  yard],

  rating: 4.94,
  reviewCount: 91,
  services: [
  {
    serviceId: 'dog-walking',
    extraPetFee: 12,
    variants: [
    { id: '30', label: '30-min run', description: 'Jog-paced neighborhood run', price: 28, durationMinutes: 30 },
    { id: '60', label: '60-min trail adventure', description: 'Pickup + Forest Park hike', price: 42, durationMinutes: 60 }]

  },
  {
    serviceId: 'boarding',
    extraPetFee: 30,
    variants: [
    { id: 'small', label: 'Medium dog', description: 'Up to 25 kg', price: 50 },
    { id: 'large', label: 'Large dog', description: '25 kg and up', price: 62 }]

  }],

  home: {
    homeType: 'Townhouse',
    yard: 'unfenced',
    childrenAtHome: 'No children',
    otherPets: null,
    fullTimeHome: false,
    smokeFree: true
  },
  acceptedSizes: ['medium', 'large', 'giant'],
  acceptsCats: false,
  maxPets: 2,
  blockedDayOffsets: [3, 10, 11, 24, 25],
  highlights: ['Wilderness first aid', 'Husky & shepherd experience', 'Trail pickup van'],
  sitter: {
    id: 'noah-kim',
    name: 'Noah Kim',
    firstName: 'Noah',
    memberSince: '2021-08-12',
    responseTime: 'within an hour',
    repeatClients: 41,
    experienceYears: 6,
    verified: true,
    languages: ['English', 'Korean'],
    bio: 'Huskies, shepherds, pointers — if your dog has energy to burn, we’ll get along great. I pick up in a dog-safe van and head to Forest Park for real trail time. Tired dogs are happy dogs.'
  }
},
{
  id: 'ava-division',
  title: 'Bright loft with cat trees in every corner',
  tagline: 'Cats only (and the occasional tiny pup)',
  neighborhood: 'Division',
  city: 'Portland, OR',
  lat: 45.5051,
  lng: -122.6201,
  photos: ["/8a860aef-40bb-4b0b-9b03-94ae527c6d9c.jpg",

  home,
  walk],

  rating: 4.98,
  reviewCount: 67,
  services: [
  {
    serviceId: 'house-sitting',
    extraPetFee: 8,
    variants: [{ id: 'standard', label: 'Overnight at your home', description: 'Evening through breakfast', price: 70 }]
  },
  {
    serviceId: 'drop-in',
    extraPetFee: 6,
    variants: [
    { id: '30', label: '30-min visit', description: 'Feeding & litter', price: 24, durationMinutes: 30 },
    { id: '60', label: '60-min visit', description: 'Plus enrichment play', price: 36, durationMinutes: 60 }]

  },
  {
    serviceId: 'boarding',
    extraPetFee: 20,
    variants: [
    { id: 'small', label: 'Cat', description: 'Private catio access', price: 38 },
    { id: 'large', label: 'Bonded pair', description: 'Two cats, one room', price: 55 }]

  }],

  home: {
    homeType: 'Loft',
    yard: 'none',
    childrenAtHome: 'No children',
    otherPets: 'Two cats, Noodle and Clementine',
    fullTimeHome: true,
    smokeFree: true
  },
  acceptedSizes: ['small'],
  acceptsCats: true,
  maxPets: 3,
  blockedDayOffsets: [1, 2, 13, 19, 20],
  highlights: ['Enclosed catio', 'Fear Free certified', 'Daily video updates'],
  sitter: {
    id: 'ava-thompson',
    name: 'Ava Thompson',
    firstName: 'Ava',
    memberSince: '2022-03-03',
    responseTime: 'within an hour',
    repeatClients: 29,
    experienceYears: 7,
    verified: true,
    languages: ['English', 'French'],
    bio: 'My loft is basically a cat amusement park — wall shelves, three cat trees and an enclosed catio. I’m Fear Free certified and take things slow with nervous kitties. Expect a short video every day.'
  }
},
{
  id: 'jordan-richmond',
  title: 'Laid-back boxer household near Richmond Park',
  tagline: 'Playful pups · Fenced backyard',
  neighborhood: 'Richmond',
  city: 'Portland, OR',
  lat: 45.4981,
  lng: -122.6381,
  photos: ["/02b717e1-3447-4e38-82ca-bfc8b87388bd.jpg",

  yard,
  home],

  rating: 4.91,
  reviewCount: 34,
  services: [
  {
    serviceId: 'boarding',
    extraPetFee: 25,
    variants: [
    { id: 'small', label: 'Small/medium dog', description: 'Up to 18 kg', price: 44 },
    { id: 'large', label: 'Large dog', description: '18 kg and up', price: 56 }]

  },
  {
    serviceId: 'dog-walking',
    extraPetFee: 10,
    variants: [
    { id: '30', label: '30-min walk', description: 'Neighborhood loop', price: 20, durationMinutes: 30 },
    { id: '60', label: '60-min walk', description: 'Mt. Tabor loop', price: 30, durationMinutes: 60 }]

  }],

  home: {
    homeType: 'House',
    yard: 'fenced',
    childrenAtHome: 'No children',
    otherPets: 'Rocco (boxer) and Pip (terrier)',
    fullTimeHome: false,
    smokeFree: true
  },
  acceptedSizes: ['small', 'medium', 'large'],
  acceptsCats: false,
  maxPets: 2,
  blockedDayOffsets: [5, 12, 13, 26, 27],
  highlights: ['Hybrid work schedule', 'Fenced yard', 'Dog-social household'],
  sitter: {
    id: 'jordan-avery',
    name: 'Jordan Avery',
    firstName: 'Jordan',
    memberSince: '2023-09-01',
    responseTime: 'within 2 hours',
    repeatClients: 9,
    experienceYears: 4,
    verified: true,
    languages: ['English'],
    bio: 'Rocco and Pip are always up for a new friend. We have a fenced yard, a well-worn tennis ball collection and Mt. Tabor is a short walk away. I work from home three days a week.'
  }
}];
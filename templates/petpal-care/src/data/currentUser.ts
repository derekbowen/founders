import type { CurrentUser, Pet } from '../types/user';

export const currentUser: CurrentUser = {
  id: 'jordan-avery',
  name: 'Jordan Avery',
  firstName: 'Jordan',
  email: 'jordan.avery@example.com',
  phone: '(503) 555-0187',
  neighborhood: 'Richmond, Portland',
  memberSince: '2023-09-01',
  bio: 'Product designer, weekend hiker and proud dog dad to Rocco and Pip. Our cat Miso tolerates us all.'
};

export const myPets: Pet[] = [
{
  id: 'pet-rocco',
  name: 'Rocco',
  species: 'Dog',
  breed: 'Boxer',
  age: '4 years',
  size: 'large',
  photo: "/39488fec-0eb0-4f8e-8b9b-87fed47f39d6.jpg",
  careNotes: 'Two cups of kibble morning and evening. Loves tennis balls; pulls on leash near squirrels.'
},
{
  id: 'pet-pip',
  name: 'Pip',
  species: 'Dog',
  breed: 'Jack Russell terrier',
  age: '7 years',
  size: 'small',
  careNotes: 'Half a joint supplement with breakfast. Escape artist — please double-check the gate.'
},
{
  id: 'pet-miso',
  name: 'Miso',
  species: 'Cat',
  breed: 'Domestic shorthair',
  age: '3 years',
  size: 'small',
  photo: "/acbdfe8f-5731-4f0b-9e09-f8624c072506.jpg",
  careNotes: 'Wet food at 7am and 6pm. Shy at first; warms up with treats.'
}];
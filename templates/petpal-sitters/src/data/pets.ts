import type { Pet } from '../types/marketplace';
import { images } from './images';

export const myPets: Pet[] = [
{
  id: 'pet-biscuit',
  name: 'Biscuit',
  species: 'Dog',
  breed: 'Goldendoodle',
  age: '3 years',
  size: 'large',
  photo: images.pets.biscuit,
  careNotes: 'Eats 2 cups of kibble at 7 AM and 6 PM. Loves fetch, scared of thunder — give him his blanket.'
},
{
  id: 'pet-pepper',
  name: 'Pepper',
  species: 'Dog',
  breed: 'Beagle mix',
  age: '8 years',
  size: 'medium',
  photo: images.pets.pepper,
  careNotes: 'Joint supplement with dinner. Will try to eat anything on walks — keep her on a short leash.'
},
{
  id: 'pet-miso',
  name: 'Miso',
  species: 'Cat',
  breed: 'Domestic shorthair',
  age: '5 years',
  size: 'small',
  photo: images.pets.miso,
  careNotes: 'Wet food twice a day, half a can each. Shy with strangers for the first day.'
}];
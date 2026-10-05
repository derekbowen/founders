import { Amenity, Sport } from '../types/marketplace';
import { images } from './images';

export const sports: Sport[] = [
{ id: 'tennis', label: 'Tennis', image: images.tennisNight, blurb: 'Hard, clay & indoor courts' },
{ id: 'pickleball', label: 'Pickleball', image: images.pickleballOutdoor, blurb: 'Courts & open play' },
{ id: 'padel', label: 'Padel', image: images.padelOutdoor, blurb: 'Glass-walled courts' },
{ id: 'basketball', label: 'Basketball', image: images.basketballOutdoor, blurb: 'Full & half courts' },
{ id: 'soccer', label: 'Soccer', image: images.soccerTurf, blurb: 'Turf fields & futsal' },
{ id: 'volleyball', label: 'Volleyball', image: images.volleyballBeach, blurb: 'Sand & indoor courts' }];


export const amenities: Amenity[] = [
{ id: 'lights', label: 'Court lights' },
{ id: 'lockers', label: 'Locker rooms' },
{ id: 'showers', label: 'Showers' },
{ id: 'parking', label: 'Free parking' },
{ id: 'proShop', label: 'Pro shop' },
{ id: 'water', label: 'Water station' },
{ id: 'seating', label: 'Spectator seating' },
{ id: 'wifi', label: 'Wi‑Fi' },
{ id: 'cafe', label: 'Café & bar' }];
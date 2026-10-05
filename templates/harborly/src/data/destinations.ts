import { media } from './media';
import type { Destination } from '../types/marketplace';

export const destinations: Destination[] = [
{ id: 'miami', name: 'Miami', region: 'Florida', image: media.miami, blurb: 'Skyline cruises & sandbar days on Biscayne Bay', lat: 25.77, lng: -80.17 },
{ id: 'keys', name: 'Florida Keys', region: 'Florida', image: media.keys, blurb: 'Turquoise flats, reefs & world-class fishing', lat: 24.85, lng: -80.9 },
{ id: 'newport', name: 'Newport', region: 'Rhode Island', image: media.newport, blurb: 'Classic yachts and America’s sailing capital', lat: 41.49, lng: -71.32 },
{ id: 'tahoe', name: 'Lake Tahoe', region: 'California & Nevada', image: media.tahoe, blurb: 'Crystal alpine water ringed by granite peaks', lat: 39.05, lng: -120.05 },
{ id: 'sandiego', name: 'San Diego', region: 'California', image: media.sandiego, blurb: 'Year-round sun, bay sails & offshore tuna runs', lat: 32.72, lng: -117.22 }];
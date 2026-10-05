import type { Destination } from '../types/marketplace';
import { images } from './images';

export const destinations: Destination[] = [
{ id: 'lisbon', city: 'Lisbon', country: 'Portugal', tagline: 'Tiles, trams & fado', image: images.destLisbon, lat: 38.7223, lng: -9.1393 },
{ id: 'mexico-city', city: 'Mexico City', country: 'Mexico', tagline: 'Tacos, murals & mezcal', image: images.destCdmx, lat: 19.4326, lng: -99.1332 },
{ id: 'kyoto', city: 'Kyoto', country: 'Japan', tagline: 'Temples, tea & lantern lanes', image: images.destKyoto, lat: 35.0116, lng: 135.7681 },
{ id: 'barcelona', city: 'Barcelona', country: 'Spain', tagline: 'Tapas, Gaudí & rooftops', image: images.destBarcelona, lat: 41.3874, lng: 2.1686 },
{ id: 'marrakech', city: 'Marrakech', country: 'Morocco', tagline: 'Souks, spice & riads', image: images.destMarrakech, lat: 31.6295, lng: -7.9811 },
{ id: 'cape-town', city: 'Cape Town', country: 'South Africa', tagline: 'Ocean, mountain & jazz', image: images.destCapeTown, lat: -33.9249, lng: 18.4241 }];
import { images } from './images';

export interface Park {
  id: string;
  name: string;
  region: string;
  image: string;
  query: string;
  siteCount: number;
}

export const parks: Park[] = [
{ id: 'yosemite', name: 'Yosemite', region: 'California', image: images.parkGranite, query: 'Yosemite', siteCount: 2 },
{ id: 'redwood', name: 'Redwood', region: 'California', image: images.parkRedwoods, query: 'Redwood', siteCount: 1 },
{ id: 'joshua-tree', name: 'Joshua Tree', region: 'California', image: images.parkDesert, query: 'Joshua Tree', siteCount: 1 },
{ id: 'olympic', name: 'Olympic', region: 'Washington', image: images.parkCoast, query: 'Olympic', siteCount: 2 },
{ id: 'smokies', name: 'Great Smoky Mtns', region: 'North Carolina', image: images.autumnCabin, query: 'Smoky', siteCount: 2 },
{ id: 'glacier', name: 'Glacier', region: 'Montana', image: images.rvRanch, query: 'Glacier', siteCount: 1 }];
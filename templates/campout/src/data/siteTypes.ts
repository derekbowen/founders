import { CaravanIcon, HouseIcon, TentIcon, TentTreeIcon, TractorIcon, TreeDeciduousIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SiteType } from '../types/listing';

export interface SiteTypeInfo {
  key: SiteType;
  label: string;
  plural: string;
  icon: LucideIcon;
  description: string;
}

export const siteTypes: SiteTypeInfo[] = [
{ key: 'tent', label: 'Tent', plural: 'Tent sites', icon: TentIcon, description: 'Quiet meadows, creekside clearings, walk-in spots' },
{ key: 'rv', label: 'RV', plural: 'RV spots', icon: CaravanIcon, description: 'Level pads, hookups and room for big rigs' },
{ key: 'cabin', label: 'Cabin', plural: 'Cabins', icon: HouseIcon, description: 'Four walls, a real bed and a wood stove' },
{ key: 'glamping', label: 'Glamping', plural: 'Glamping', icon: TentTreeIcon, description: 'Furnished bell & safari tents, ready on arrival' },
{ key: 'treehouse', label: 'Treehouse', plural: 'Treehouses', icon: TreeDeciduousIcon, description: 'Sleep up in the canopy among the branches' },
{ key: 'farm', label: 'Farm stay', plural: 'Farm stays', icon: TractorIcon, description: 'Camp with goats, gardens and fresh eggs' }];
import {
  AxeIcon,
  BikeIcon,
  BirdIcon,
  CarIcon,
  ChefHatIcon,
  DoorClosedIcon,
  DropletsIcon,
  FishIcon,
  FlameIcon,
  FootprintsIcon,
  MountainIcon,
  PawPrintIcon,
  PlugZapIcon,
  SailboatIcon,
  ShowerHeadIcon,
  TelescopeIcon,
  Trash2Icon,
  TreesIcon,
  UmbrellaIcon,
  UtensilsIcon,
  WavesIcon,
  WheatIcon,
  WifiIcon,
  ZapIcon } from
'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ActivityKey, AmenityKey } from '../types/listing';
import type { AmenityFilterKey } from '../types/search';

export interface OptionInfo<K extends string> {
  key: K;
  label: string;
  icon: LucideIcon;
}

export const amenities: OptionInfo<AmenityKey>[] = [
{ key: 'pets', label: 'Pets allowed', icon: PawPrintIcon },
{ key: 'campfires', label: 'Campfires allowed', icon: FlameIcon },
{ key: 'water', label: 'Drinking water', icon: DropletsIcon },
{ key: 'toilets', label: 'Toilets', icon: DoorClosedIcon },
{ key: 'showers', label: 'Showers', icon: ShowerHeadIcon },
{ key: 'hookups', label: 'RV hookups', icon: PlugZapIcon },
{ key: 'electricity', label: 'Electricity', icon: ZapIcon },
{ key: 'wifi', label: 'Wi‑Fi', icon: WifiIcon },
{ key: 'picnic', label: 'Picnic table', icon: UtensilsIcon },
{ key: 'firewood', label: 'Firewood for sale', icon: AxeIcon },
{ key: 'kitchen', label: 'Camp kitchen', icon: ChefHatIcon },
{ key: 'parking', label: 'Park at site', icon: CarIcon },
{ key: 'trash', label: 'Trash & recycling', icon: Trash2Icon },
{ key: 'shade', label: 'Shaded sites', icon: UmbrellaIcon }];


export const searchAmenityFilters: AmenityFilterKey[] = ['pets', 'campfires', 'water', 'toilets', 'showers', 'hookups'];

export const activities: OptionInfo<ActivityKey>[] = [
{ key: 'hiking', label: 'Hiking', icon: FootprintsIcon },
{ key: 'fishing', label: 'Fishing', icon: FishIcon },
{ key: 'swimming', label: 'Swimming', icon: WavesIcon },
{ key: 'paddling', label: 'Paddling', icon: SailboatIcon },
{ key: 'biking', label: 'Mountain biking', icon: BikeIcon },
{ key: 'wildlife', label: 'Wildlife watching', icon: BirdIcon },
{ key: 'stargazing', label: 'Stargazing', icon: TelescopeIcon },
{ key: 'climbing', label: 'Climbing', icon: MountainIcon },
{ key: 'farm', label: 'Farm activities', icon: WheatIcon },
{ key: 'beach', label: 'Beach access', icon: TreesIcon }];


export const vehicleLengthOptions = [
{ value: 0, label: 'Any / no RV' },
{ value: 20, label: '20 ft +' },
{ value: 30, label: '30 ft +' },
{ value: 40, label: '40 ft +' }];
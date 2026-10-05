import type { LucideIcon } from 'lucide-react';

export type SpaceTypeId =
'hot-desk' |
'dedicated-desk' |
'private-office' |
'meeting-room' |
'phone-booth';

export type AmenityId =
'wifi' |
'coffee' |
'monitors' |
'parking' |
'access-24-7' |
'printing' |
'lockers' |
'kitchen' |
'showers' |
'bike-storage' |
'accessible' |
'phone-booths';

export type BookingMode = 'hour' | 'day';

export type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface DayHours {
  day: DayKey;
  open: string | null;
  close: string | null;
}

export interface SpaceTypeInfo {
  id: SpaceTypeId;
  label: string;
  description: string;
  /** 'seat' = each unit is one person; 'space' = each unit is a whole room with a capacity */
  bookBy: 'seat' | 'space';
  unit: {one: string;many: string;};
  icon: LucideIcon;
}

export interface AmenityInfo {
  id: AmenityId;
  label: string;
  icon: LucideIcon;
  filterable: boolean;
}

export interface Listing {
  id: string;
  title: string;
  spaceType: SpaceTypeId;
  city: string;
  neighborhood: string;
  address: string;
  /** Position on the illustrative map, in % (0–100) */
  map: {x: number;y: number;};
  pricePerHour: number;
  pricePerDay: number;
  /** Number of bookable units per time slot (desks, offices, rooms, booths) */
  seats: number;
  /** People per unit */
  capacity: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: AmenityId[];
  summary: string;
  description: string;
  houseRules: string[];
  openingHours: DayHours[];
  hostId: string;
  instantBook: boolean;
  minHours: number;
  access: {
    instructions: string[];
    wifiNetwork: string;
    wifiPassword: string;
  };
}

export interface BookingDetails {
  date: string;
  mode: BookingMode;
  start: string;
  end: string;
  seats: number;
}
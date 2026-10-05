export type SiteType = 'tent' | 'rv' | 'cabin' | 'glamping' | 'treehouse' | 'farm';

export type AmenityKey =
'pets' |
'campfires' |
'water' |
'toilets' |
'showers' |
'hookups' |
'electricity' |
'wifi' |
'picnic' |
'firewood' |
'kitchen' |
'parking' |
'trash' |
'shade';

export type ActivityKey =
'hiking' |
'fishing' |
'swimming' |
'paddling' |
'biking' |
'wildlife' |
'stargazing' |
'climbing' |
'farm' |
'beach';

export type CancellationPolicy = 'Flexible' | 'Moderate' | 'Strict';

export type EssentialKey = 'water' | 'toilets' | 'fires' | 'showers';

export interface EssentialInfo {
  available: boolean;
  detail: string;
}

export interface ListingLocation {
  town: string;
  region: string;
  park: string;
  driveToPark: string;
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  title: string;
  siteType: SiteType;
  hostId: string;
  location: ListingLocation;
  price: number;
  cleaningFee: number;
  includedCampers: number;
  extraCamperFee: number;
  maxCampers: number;
  maxVehicles: number;
  /** Longest RV/trailer in feet that fits. 0 = no RVs */
  maxVehicleLength: number;
  acres: number;
  rating: number;
  reviewCount: number;
  images: string[];
  summary: string;
  description: string;
  amenities: AmenityKey[];
  activities: ActivityKey[];
  essentials: Record<EssentialKey, EssentialInfo>;
  checkIn: string;
  checkOut: string;
  minNights: number;
  instantBook: boolean;
  cancellation: CancellationPolicy;
  rules: string[];
  directions: string;
  arrivalInstructions: string;
  seasonal?: string;
}

export interface ListingDraft {
  siteType: SiteType | null;
  title: string;
  address: string;
  town: string;
  region: string;
  directions: string;
  maxCampers: number;
  maxVehicles: number;
  maxVehicleLength: number;
  sites: number;
  amenities: AmenityKey[];
  activities: ActivityKey[];
  price: number;
  cleaningFee: number;
  minNights: number;
  checkIn: string;
  checkOut: string;
  instantBook: boolean;
  cancellation: CancellationPolicy;
  rules: string;
  blockedDates: string[];
  photos: string[];
}
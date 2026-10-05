export type SpotType = 'Driveway' | 'Garage' | 'Open lot' | 'Covered structure';

export type VehicleSize = 'Motorcycle' | 'Compact' | 'Sedan' | 'SUV' | 'Truck / Van';

export type UnitType = 'hour' | 'day';

export type UseCase = 'commuters' | 'events' | 'airports' | 'monthly';

export interface SpotDimensions {
  lengthFt: number;
  widthFt: number;
  /** null when uncovered / no height limit */
  clearanceFt: number | null;
}

export interface Listing {
  id: string;
  title: string;
  spotType: SpotType;
  neighborhood: string;
  city: string;
  addressHint: string;
  lat: number;
  lng: number;
  hourlyPrice: number;
  dailyPrice: number;
  minHours: number;
  photos: string[];
  hostId: string;
  rating: number;
  reviewCount: number;
  covered: boolean;
  evCharging: boolean;
  access247: boolean;
  securityCamera: boolean;
  instantBook: boolean;
  maxVehicle: VehicleSize;
  dimensions: SpotDimensions;
  accessPreview: string;
  accessInstructions: string;
  accessCode: string;
  amenities: string[];
  description: string;
  nearby: string[];
  useCases: UseCase[];
  featuredVenue?: string;
}
import type { VehicleSize } from '../types/listing';

/** Ordered smallest → largest */
export const vehicleSizes: VehicleSize[] = ['Motorcycle', 'Compact', 'Sedan', 'SUV', 'Truck / Van'];

export const vehicleExamples: Record<VehicleSize, string> = {
  Motorcycle: 'Scooters & motorbikes',
  Compact: 'Mini, Fiat 500, Bolt',
  Sedan: 'Civic, Model 3, Camry',
  SUV: 'RAV4, Model Y, Highlander',
  'Truck / Van': 'F-150, Sprinter, Tacoma'
};
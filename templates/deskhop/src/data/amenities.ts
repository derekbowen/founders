import {
  AccessibilityIcon,
  BikeIcon,
  CarIcon,
  Clock3Icon,
  CoffeeIcon,
  LockIcon,
  MonitorIcon,
  PhoneIcon,
  PrinterIcon,
  ShowerHeadIcon,
  UtensilsCrossedIcon,
  WifiIcon } from
'lucide-react';
import type { AmenityInfo } from '../types/listing';

export const amenities: AmenityInfo[] = [
{ id: 'wifi', label: 'Fast wifi', icon: WifiIcon, filterable: true },
{ id: 'coffee', label: 'Free coffee', icon: CoffeeIcon, filterable: true },
{ id: 'monitors', label: 'External monitors', icon: MonitorIcon, filterable: true },
{ id: 'parking', label: 'Parking', icon: CarIcon, filterable: true },
{ id: 'access-24-7', label: '24/7 access', icon: Clock3Icon, filterable: true },
{ id: 'printing', label: 'Printing & scanning', icon: PrinterIcon, filterable: false },
{ id: 'lockers', label: 'Lockers', icon: LockIcon, filterable: false },
{ id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossedIcon, filterable: false },
{ id: 'showers', label: 'Showers', icon: ShowerHeadIcon, filterable: false },
{ id: 'bike-storage', label: 'Bike storage', icon: BikeIcon, filterable: false },
{ id: 'accessible', label: 'Step-free access', icon: AccessibilityIcon, filterable: false },
{ id: 'phone-booths', label: 'Phone booths', icon: PhoneIcon, filterable: false }];
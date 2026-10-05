export type AgeGroup = 'Newborn' | 'Toddler' | 'Preschool' | 'School age' | 'Pre-teen';
export type Certification = 'CPR' | 'First aid' | 'Newborn care' | 'Special needs' | 'Early childhood ed';
export type CareTypeId = 'date-night' | 'after-school' | 'overnight' | 'special-needs' | 'newborn';
export type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type Slot = 'Morning' | 'Afternoon' | 'Evening' | 'Overnight';
export type WeeklyAvailability = Record<DayKey, Slot[]>;

export interface Sitter {
  id: string;
  name: string;
  age: number;
  photo: string;
  headline: string;
  bio: string;
  neighborhood: string;
  lat: number;
  lng: number;
  serviceRadiusMiles: number;
  hourlyRate: number;
  extraChildRate: number;
  maxKids: number;
  experienceYears: number;
  ageGroups: AgeGroup[];
  certifications: Certification[];
  languages: string[];
  nonSmoker: boolean;
  hasCar: boolean;
  availableTonight: boolean;
  backgroundCheckDate: string;
  careTypes: CareTypeId[];
  rating: number;
  reviewCount: number;
  responseTime: string;
  repeatFamilies: number;
  memberSince: string;
  availability: WeeklyAvailability;
}

export interface Review {
  id: string;
  sitterId: string;
  author: string;
  context: string;
  rating: number;
  date: string;
  text: string;
}
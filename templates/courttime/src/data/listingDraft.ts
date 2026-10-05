import { ListingDraft, WizardStep } from '../types/listingDraft';
import { SportId } from '../types/marketplace';
import { brand } from './brand';
import { images } from './images';

export const wizardSteps: WizardStep[] = [
{ id: 'details', label: 'Court details', description: 'Name your court and tell players what makes it great.' },
{ id: 'sport', label: 'Sport & surface', description: 'What can be played here, and on what?' },
{ id: 'amenities', label: 'Amenities', description: 'Highlight the extras players care about.' },
{ id: 'location', label: 'Location', description: 'Where will players find you? The exact address is shared after booking.' },
{ id: 'pricing', label: 'Pricing & open play', description: 'Set your hourly rate and optional per-seat sessions.' },
{ id: 'hours', label: 'Weekly hours', description: 'When is the court bookable each week?' },
{ id: 'photos', label: 'Photos', description: 'Courts with 3+ bright photos get twice as many bookings.' }];


export const surfaceOptionsBySport: Record<SportId, string[]> = {
  tennis: ['Hard court', 'Clay', 'Cushioned acrylic', 'Grass', 'Artificial grass'],
  pickleball: ['Hard court', 'Sport court tile', 'Cushioned acrylic', 'Asphalt'],
  padel: ['Artificial turf', 'Glass-walled turf'],
  basketball: ['Hardwood', 'Sport court tile', 'Asphalt', 'Concrete'],
  soccer: ['Artificial turf', 'Natural grass', 'Hardwood', 'Sport court tile'],
  volleyball: ['Sand', 'Sport court tile', 'Hardwood', 'Grass']
};

export const skillLevels = ['All levels', 'Beginner friendly', 'Intermediate', 'Advanced', 'Social mixer'];

export const samplePhotos = [images.tennisNight, images.pickleballIndoor, images.padelGlass, images.basketballIndoor, images.equipment, images.lockerRoom];

const weekday = (day: string, open = true, from = 7, to = 22) => ({ day, open, from, to });

export const initialListingDraft: ListingDraft = {
  title: '',
  clubName: '',
  description: '',
  capacity: 4,
  sport: 'tennis',
  surface: '',
  setting: 'outdoor',
  lights: true,
  amenities: ['lights', 'parking'],
  address: '',
  neighborhood: '',
  city: brand.city,
  zip: '',
  pricePerHour: 30,
  minHours: 1,
  openPlayEnabled: false,
  seatsTotal: 8,
  pricePerSeat: 10,
  sessions: [{ id: 's-1', startHour: 18, durationHours: 2, level: 'All levels' }],
  weeklyHours: [
  weekday('Monday'),
  weekday('Tuesday'),
  weekday('Wednesday'),
  weekday('Thursday'),
  weekday('Friday'),
  weekday('Saturday', true, 8, 21),
  weekday('Sunday', true, 8, 20)],

  photos: []
};
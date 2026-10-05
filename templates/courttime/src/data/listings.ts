import { AddOn, Listing } from '../types/marketplace';
import { images } from './images';

const racket: AddOn = { id: 'racket', label: 'Racket rental', description: 'Wilson & Babolat demo rackets', price: 6, per: 'booking', kind: 'equipment' };
const balls: AddOn = { id: 'balls', label: 'New can of balls', description: 'Penn Championship, 3 balls', price: 5, per: 'booking', kind: 'equipment' };
const ballMachine: AddOn = { id: 'ball-machine', label: 'Ball machine', description: 'Lobster Elite with drill presets', price: 15, per: 'hour', kind: 'equipment' };
const paddles: AddOn = { id: 'paddles', label: 'Paddle set (4)', description: 'Selkirk & JOOLA paddles plus balls', price: 10, per: 'booking', kind: 'equipment' };
const padelRackets: AddOn = { id: 'padel-rackets', label: 'Padel rackets (pair)', description: 'Bullpadel Vertex rackets', price: 8, per: 'booking', kind: 'equipment' };
const basketballs: AddOn = { id: 'basketballs', label: 'Game balls (2)', description: 'Spalding TF-1000 indoor balls', price: 4, per: 'booking', kind: 'equipment' };
const pinnies: AddOn = { id: 'pinnies', label: 'Pinnies & match ball', description: 'Two sets of 7 bibs + size 5 ball', price: 8, per: 'booking', kind: 'equipment' };
const volleyballs: AddOn = { id: 'volleyballs', label: 'Volleyball rental', description: 'Mikasa ball + boundary lines', price: 5, per: 'booking', kind: 'equipment' };
const coach: AddOn = { id: 'coach', label: 'Pro coach on court', description: 'Certified coach joins your session', price: 45, per: 'hour', kind: 'service' };
const referee: AddOn = { id: 'referee', label: 'Referee & scoreboard', description: 'Certified ref plus digital scoreboard', price: 25, per: 'hour', kind: 'service' };

const standardRules = ['Non-marking court shoes only', 'Arrive 10 minutes early to check in', 'Please clear the court on time for the next group'];
const flexible = 'Free cancellation up to 24 hours before start. 50% refund within 24 hours.';
const strict = 'Free cancellation up to 48 hours before start. No refunds after that.';

export const listings: Listing[] = [
{
  id: 'l-1', title: 'Centre Court under the lights', clubName: 'Barton Hills Tennis Club', hostId: 'u-1', sport: 'tennis',
  surface: 'Hard court', setting: 'outdoor', lights: true, amenities: ['lights', 'lockers', 'showers', 'parking', 'proShop', 'water'],
  pricePerHour: 32, minHours: 1, maxHours: 3, capacity: 4,
  images: [images.tennisNight, images.hero, images.lockerRoom],
  location: { neighborhood: 'Barton Hills', address: '2108 Barton Hills Dr, Austin, TX 78704', lat: 30.251, lng: -97.779 },
  rating: 4.9, reviewCount: 128, featured: true,
  description: 'Our show court with fresh Plexipave surfacing, tournament nets and LED floodlights that stay on until 10 PM. Shaded bleachers, a pro shop for restrings and the club locker rooms are steps away.',
  houseRules: [...standardRules, 'Lights switch on automatically at sunset'],
  cancellationPolicy: flexible, addOns: [racket, balls, ballMachine, coach], hours: { open: 7, close: 22 }
},
{
  id: 'l-2', title: 'Red clay Court 3', clubName: 'Westlake Racquet Club', hostId: 'u-2', sport: 'tennis',
  surface: 'Clay', setting: 'outdoor', lights: false, amenities: ['lockers', 'showers', 'parking', 'proShop', 'cafe'],
  pricePerHour: 45, minHours: 1, maxHours: 2, capacity: 4,
  images: [images.tennisClay, images.equipment, images.lockerRoom],
  location: { neighborhood: 'Westlake', address: '1400 Westlake Dr, Austin, TX 78746', lat: 30.295, lng: -97.803 },
  rating: 4.8, reviewCount: 64,
  description: 'Groomed Har-Tru clay that is easy on the knees and rewards long rallies. Courts are swept and lined between every booking.',
  houseRules: ['Clay court shoes required', 'Brush and line the court at the end of your session', 'No food on court'],
  cancellationPolicy: strict, addOns: [racket, balls, coach], hours: { open: 7, close: 19 }
},
{
  id: 'l-3', title: 'Indoor hard court — climate controlled', clubName: 'Westlake Racquet Club', hostId: 'u-2', sport: 'tennis',
  surface: 'Cushioned acrylic', setting: 'indoor', lights: true, amenities: ['lights', 'lockers', 'showers', 'parking', 'wifi', 'cafe'],
  pricePerHour: 58, minHours: 1, maxHours: 3, capacity: 4,
  images: [images.tennisIndoor, images.equipment, images.lockerRoom],
  location: { neighborhood: 'The Domain', address: '11410 Century Oaks Ter, Austin, TX 78758', lat: 30.402, lng: -97.725 },
  rating: 4.7, reviewCount: 41,
  description: 'Play through Texas summers and rainy days on cushioned courts kept at 72°F. Curtain dividers keep your court quiet and private.',
  houseRules: standardRules, cancellationPolicy: flexible, addOns: [racket, balls, ballMachine, coach], hours: { open: 6, close: 23 }
},
{
  id: 'l-4', title: 'Rooftop court with skyline views', clubName: 'Rainey Street Athletic', hostId: 'u-11', sport: 'tennis',
  surface: 'Hard court', setting: 'outdoor', lights: true, amenities: ['lights', 'water', 'cafe', 'wifi'],
  pricePerHour: 64, minHours: 1, maxHours: 2, capacity: 4,
  images: [images.tennisRooftop, images.tennisNight, images.equipment],
  location: { neighborhood: 'Rainey Street', address: '70 Rainey St, Austin, TX 78701', lat: 30.258, lng: -97.738 },
  rating: 0, reviewCount: 0,
  description: 'A one-of-a-kind court on the 9th floor terrace. Wind screens on all sides, lights after dark and a rooftop bar for post-match drinks.',
  houseRules: [...standardRules, 'Guests must check in at the lobby desk'], cancellationPolicy: strict, addOns: [racket, balls], hours: { open: 8, close: 22 }
},
{
  id: 'l-5', title: 'Pickleball Court 2 at Zilker', clubName: 'Austin Community Courts', hostId: 'u-7', sport: 'pickleball',
  surface: 'Hard court', setting: 'outdoor', lights: true, amenities: ['lights', 'parking', 'water', 'seating'],
  pricePerHour: 18, minHours: 1, maxHours: 2, capacity: 4,
  images: [images.pickleballOutdoor, images.openPlay, images.pickleballPark],
  location: { neighborhood: 'Zilker', address: '2100 Barton Springs Rd, Austin, TX 78704', lat: 30.2669, lng: -97.7729 },
  rating: 4.8, reviewCount: 212,
  description: 'Dedicated pickleball court with permanent nets, fresh lines and shade trees on the south side. Popular evening open-play sessions for all levels.',
  houseRules: ['Paddles up rotation during open play', 'Keep noise down after 9 PM', 'No pets on court'],
  cancellationPolicy: flexible, addOns: [paddles], hours: { open: 7, close: 22 },
  openPlay: { seatsTotal: 8, pricePerSeat: 8, sessions: [
    { id: 'op-5a', startHour: 9, durationHours: 2, level: 'All levels', seatsTaken: 5 },
    { id: 'op-5b', startHour: 18, durationHours: 2, level: '3.0–3.5 intermediate', seatsTaken: 6 },
    { id: 'op-5c', startHour: 20, durationHours: 2, level: '4.0+ advanced', seatsTaken: 8 }]
  }
},
{
  id: 'l-6', title: 'Indoor pickleball — Court 4', clubName: 'The Kitchen Club', hostId: 'u-3', sport: 'pickleball',
  surface: 'Sport court tile', setting: 'indoor', lights: true, amenities: ['lights', 'lockers', 'parking', 'proShop', 'cafe', 'wifi'],
  pricePerHour: 28, minHours: 1, maxHours: 3, capacity: 4,
  images: [images.pickleballIndoor, images.openPlay, images.equipment],
  location: { neighborhood: 'North Burnet', address: '10901 N Lamar Blvd, Austin, TX 78753', lat: 30.37, lng: -97.72 },
  rating: 4.9, reviewCount: 187, featured: true,
  description: 'Eight air-conditioned indoor courts with pro-grade tile, a demo paddle wall and a café overlooking play. Book privately or drop into a skill-matched session.',
  houseRules: [...standardRules, 'Open play uses a paddle-stack rotation'], cancellationPolicy: flexible, addOns: [paddles, coach], hours: { open: 6, close: 23 },
  openPlay: { seatsTotal: 8, pricePerSeat: 12, sessions: [
    { id: 'op-6a', startHour: 7, durationHours: 2, level: 'Early birds — all levels', seatsTaken: 3 },
    { id: 'op-6b', startHour: 12, durationHours: 1, level: 'Lunch league 3.5', seatsTaken: 4 },
    { id: 'op-6c', startHour: 19, durationHours: 2, level: '3.5+ intermediate', seatsTaken: 5 },
    { id: 'op-6d', startHour: 21, durationHours: 2, level: 'Late night mixer', seatsTaken: 2 }]
  }
},
{
  id: 'l-7', title: 'Mueller Park pickleball courts', clubName: 'Austin Community Courts', hostId: 'u-7', sport: 'pickleball',
  surface: 'Hard court', setting: 'outdoor', lights: false, amenities: ['parking', 'water', 'seating'],
  pricePerHour: 14, minHours: 1, maxHours: 2, capacity: 4,
  images: [images.pickleballPark, images.pickleballOutdoor, images.openPlay],
  location: { neighborhood: 'Mueller', address: '4550 Mueller Blvd, Austin, TX 78723', lat: 30.299, lng: -97.705 },
  rating: 4.6, reviewCount: 93,
  description: 'Neighborhood courts beside Mueller Lake Park with benches, shade sails and a water fountain. Great for casual doubles and beginner clinics.',
  houseRules: ['Daylight play only', 'Max 4 players per private booking'], cancellationPolicy: flexible, addOns: [paddles], hours: { open: 7, close: 20 },
  openPlay: { seatsTotal: 8, pricePerSeat: 6, sessions: [
    { id: 'op-7a', startHour: 8, durationHours: 2, level: 'Beginner friendly', seatsTaken: 4 },
    { id: 'op-7b', startHour: 17, durationHours: 2, level: 'All levels', seatsTaken: 7 }]
  }
},
{
  id: 'l-8', title: 'Panoramic padel court', clubName: 'Padel Haus Austin', hostId: 'u-4', sport: 'padel',
  surface: 'Artificial turf', setting: 'indoor', lights: true, amenities: ['lights', 'lockers', 'showers', 'proShop', 'cafe', 'parking'],
  pricePerHour: 48, minHours: 1, maxHours: 2, capacity: 4,
  images: [images.padelGlass, images.equipment, images.lockerRoom],
  location: { neighborhood: 'South Lamar', address: '3801 S Lamar Blvd, Austin, TX 78704', lat: 30.24, lng: -97.785 },
  rating: 4.9, reviewCount: 156, featured: true,
  description: 'All-glass panoramic court with WPT-spec turf and arena lighting. New to padel? Add a coach for your first hour and you’ll be hooked.',
  houseRules: [...standardRules, 'Padel-specific or clay shoes recommended'], cancellationPolicy: flexible, addOns: [padelRackets, balls, coach], hours: { open: 7, close: 23 },
  openPlay: { seatsTotal: 4, pricePerSeat: 16, sessions: [
    { id: 'op-8a', startHour: 18, durationHours: 1, level: 'Intro to padel', seatsTaken: 2 },
    { id: 'op-8b', startHour: 20, durationHours: 2, level: 'Intermediate Americano', seatsTaken: 3 }]
  }
},
{
  id: 'l-9', title: 'Sunset padel court', clubName: 'East Side Padel Club', hostId: 'u-12', sport: 'padel',
  surface: 'Artificial turf', setting: 'outdoor', lights: true, amenities: ['lights', 'water', 'cafe', 'parking'],
  pricePerHour: 40, minHours: 1, maxHours: 2, capacity: 4,
  images: [images.padelOutdoor, images.padelGlass, images.equipment],
  location: { neighborhood: 'East Austin', address: '1209 E 6th St, Austin, TX 78702', lat: 30.262, lng: -97.725 },
  rating: 4.7, reviewCount: 58,
  description: 'Open-air panoramic court surrounded by palms with a beer garden next door. Golden hour slots go fast.',
  houseRules: standardRules, cancellationPolicy: flexible, addOns: [padelRackets, balls], hours: { open: 8, close: 22 },
  openPlay: { seatsTotal: 4, pricePerSeat: 14, sessions: [
    { id: 'op-9a', startHour: 19, durationHours: 2, level: 'Social mixer', seatsTaken: 1 }]
  }
},
{
  id: 'l-10', title: 'Full court hardwood gym', clubName: 'Hyde Park Gym', hostId: 'u-5', sport: 'basketball',
  surface: 'Hardwood', setting: 'indoor', lights: true, amenities: ['lights', 'lockers', 'showers', 'seating', 'water', 'parking'],
  pricePerHour: 60, minHours: 1, maxHours: 4, capacity: 20,
  images: [images.basketballIndoor, images.lockerRoom, images.equipment],
  location: { neighborhood: 'Hyde Park', address: '4301 Guadalupe St, Austin, TX 78751', lat: 30.306, lng: -97.728 },
  rating: 4.8, reviewCount: 102, featured: true,
  description: 'Regulation maple floor, glass backboards and pull-out bleachers. Perfect for league games, runs with friends or team practice.',
  houseRules: ['No dunking on the side hoops', 'Clean court shoes only', 'No outside food in the gym'],
  cancellationPolicy: strict, addOns: [basketballs, referee], hours: { open: 6, close: 23 },
  openPlay: { seatsTotal: 15, pricePerSeat: 10, sessions: [
    { id: 'op-10a', startHour: 12, durationHours: 1, level: 'Lunchtime run', seatsTaken: 9 },
    { id: 'op-10b', startHour: 19, durationHours: 2, level: 'Competitive 5v5', seatsTaken: 12 }]
  }
},
{
  id: 'l-11', title: 'Private half court in East Austin', clubName: 'Jordan’s Court', hostId: 'u-me', sport: 'basketball',
  surface: 'Sport court tile', setting: 'outdoor', lights: true, amenities: ['lights', 'parking', 'water'],
  pricePerHour: 20, minHours: 1, maxHours: 3, capacity: 8,
  images: [images.basketballOutdoor, images.basketballIndoor, images.equipment],
  location: { neighborhood: 'East Cesar Chavez', address: '1500 E Cesar Chavez St, Austin, TX 78702', lat: 30.256, lng: -97.724 },
  rating: 4.9, reviewCount: 27,
  description: 'A fenced backyard half court with an adjustable hoop, fresh paint and string lights. Great for shootarounds, 2v2 and training.',
  houseRules: ['Street parking only', 'No music after 9 PM', 'Close the gate behind you'],
  cancellationPolicy: flexible, addOns: [basketballs], hours: { open: 8, close: 21 }
},
{
  id: 'l-12', title: '5-a-side turf field', clubName: 'Mopac Futbol Center', hostId: 'u-6', sport: 'soccer',
  surface: 'Artificial turf', setting: 'outdoor', lights: true, amenities: ['lights', 'lockers', 'parking', 'seating', 'water'],
  pricePerHour: 110, minHours: 1, maxHours: 2, capacity: 14,
  images: [images.soccerTurf, images.futsalIndoor, images.lockerRoom],
  location: { neighborhood: 'Northwest Hills', address: '7700 N Mopac Expy, Austin, TX 78731', lat: 30.35, lng: -97.755 },
  rating: 4.7, reviewCount: 88,
  description: 'FIFA-quality turf with rebound boards, floodlights and goals that stay up. Split the cost with your team or join a pickup game.',
  houseRules: ['Turf or flat shoes only — no metal studs', 'Shin guards recommended', 'Max 14 players'],
  cancellationPolicy: strict, addOns: [pinnies, referee], hours: { open: 9, close: 23 },
  openPlay: { seatsTotal: 14, pricePerSeat: 12, sessions: [
    { id: 'op-12a', startHour: 20, durationHours: 1, level: 'Co-ed pickup', seatsTaken: 10 }]
  }
},
{
  id: 'l-13', title: 'Indoor futsal court', clubName: 'Mopac Futbol Center', hostId: 'u-6', sport: 'soccer',
  surface: 'Hardwood', setting: 'indoor', lights: true, amenities: ['lights', 'lockers', 'seating', 'parking'],
  pricePerHour: 85, minHours: 1, maxHours: 2, capacity: 12,
  images: [images.futsalIndoor, images.soccerTurf, images.lockerRoom],
  location: { neighborhood: 'Riverside', address: '2201 E Riverside Dr, Austin, TX 78741', lat: 30.238, lng: -97.728 },
  rating: 0, reviewCount: 0,
  description: 'A newly opened futsal court with low-bounce balls, small goals and a spectator mezzanine. Air-conditioned year round.',
  houseRules: ['Indoor flats only', 'Max 12 players'], cancellationPolicy: flexible, addOns: [pinnies], hours: { open: 10, close: 23 }
},
{
  id: 'l-14', title: 'Lakeside sand volleyball', clubName: 'Austin Community Courts', hostId: 'u-7', sport: 'volleyball',
  surface: 'Sand', setting: 'outdoor', lights: true, amenities: ['lights', 'parking', 'water', 'seating'],
  pricePerHour: 26, minHours: 1, maxHours: 3, capacity: 12,
  images: [images.volleyballBeach, images.openPlay, images.volleyballIndoor],
  location: { neighborhood: 'Lady Bird Lake', address: '901 W Riverside Dr, Austin, TX 78704', lat: 30.2605, lng: -97.7535 },
  rating: 4.6, reviewCount: 49,
  description: 'Deep, raked sand with lake views and lights until 10 PM. Bring sunscreen — we’ll bring the lines.',
  houseRules: ['No glass on the sand', 'Rake the court before you leave'], cancellationPolicy: flexible, addOns: [volleyballs], hours: { open: 8, close: 22 },
  openPlay: { seatsTotal: 12, pricePerSeat: 7, sessions: [
    { id: 'op-14a', startHour: 18, durationHours: 2, level: 'Coed 4s — all levels', seatsTaken: 8 }]
  }
},
{
  id: 'l-15', title: 'Indoor volleyball court', clubName: 'Hyde Park Gym', hostId: 'u-5', sport: 'volleyball',
  surface: 'Sport court tile', setting: 'indoor', lights: true, amenities: ['lights', 'lockers', 'showers', 'seating'],
  pricePerHour: 55, minHours: 1, maxHours: 3, capacity: 12,
  images: [images.volleyballIndoor, images.lockerRoom, images.equipment],
  location: { neighborhood: 'North Loop', address: '5305 Airport Blvd, Austin, TX 78751', lat: 30.319, lng: -97.718 },
  rating: 4.5, reviewCount: 22,
  description: 'Regulation-size indoor court with adjustable net heights for men’s, women’s and youth play.',
  houseRules: standardRules, cancellationPolicy: flexible, addOns: [volleyballs, referee], hours: { open: 7, close: 22 }
}];
import type { Job } from '../types/marketplace';
import { images } from './images';

export const jobs: Job[] = [
{
  id: 'j-fence',
  title: 'Repair 3 broken fence panels in backyard',
  categoryId: 'handyman',
  description:
  'Three cedar fence panels along the back of our yard are leaning and a few boards have snapped after the last windstorm. Posts look OK but one may need resetting. I have some replacement boards in the garage but you may need more.',
  details: ['About 18 ft of fence affected', 'Replacement boards partly supplied', 'Side gate access, no stairs', 'Dog will be kept inside'],
  photos: [images.fence, images.yard],
  area: 'Sellwood', city: 'Portland, OR', lat: 45.465, lng: -122.65, distanceMi: 4.8,
  preferredDate: '2026-10-10', timing: 'flexible', timeOfDay: 'morning',
  budgetMin: 250, budgetMax: 400, size: 'medium',
  customerId: 'u-priya', offerCount: 5, postedAt: '2026-09-29T09:15:00', status: 'open'
},
{
  id: 'j-move-1br',
  title: 'Help moving a 1-bedroom apartment (2nd floor, no elevator)',
  categoryId: 'moving',
  description:
  'Moving from Hawthorne to Laurelhurst — about 2 miles. Need two people and a truck or large van. Everything will be boxed and ready. Largest items are a queen bed, sofa, dresser and a dining table.',
  details: ['~25 boxes + 6 furniture pieces', 'Truck or van required', '2nd floor walk-up at pickup', 'Ground floor at drop-off'],
  photos: [images.moving, images.garage],
  area: 'Hawthorne', city: 'Portland, OR', lat: 45.512, lng: -122.627, distanceMi: 1.8,
  preferredDate: '2026-10-18', timing: 'specific', timeOfDay: 'morning',
  budgetMin: 300, budgetMax: 500, size: 'large',
  customerId: 'u-hannah', offerCount: 7, postedAt: '2026-09-30T18:40:00', status: 'open'
},
{
  id: 'j-moveout-clean',
  title: 'Move-out deep clean, 2 bed / 1 bath condo',
  categoryId: 'cleaning',
  description:
  'Moving out at the end of the month and want my deposit back. Need a thorough clean: kitchen (inside oven and fridge), bathroom, baseboards, windows inside, and floors. Unit will be empty.',
  details: ['~950 sq ft, empty unit', 'Inside oven & fridge', 'Supplies not provided', 'Building has parking'],
  photos: [images.cleaning, images.bathroom],
  area: 'Pearl District', city: 'Portland, OR', lat: 45.529, lng: -122.683, distanceMi: 1.7,
  preferredDate: '2026-10-29', timing: 'specific', timeOfDay: 'any',
  budgetMin: 180, budgetMax: 260, size: 'medium',
  customerId: 'u-tom', offerCount: 4, postedAt: '2026-09-28T11:05:00', status: 'open'
},
{
  id: 'j-yard',
  title: 'Backyard cleanup: mow, rake leaves, trim hedges',
  categoryId: 'yard',
  description:
  'Our backyard got away from us this summer. Need the lawn mowed, leaves raked and bagged, and the hedges along the fence trimmed back. Green waste bin available, but there will be overflow to haul away.',
  details: ['~2,000 sq ft yard', 'Hedges ~6 ft tall, 40 ft long', 'Haul-away needed for overflow', 'Bring your own mower'],
  photos: [images.yard, images.fence],
  area: 'St. Johns', city: 'Portland, OR', lat: 45.59, lng: -122.754, distanceMi: 8.6,
  preferredDate: '2026-10-11', timing: 'flexible', timeOfDay: 'any',
  budgetMin: 200, budgetMax: 350, size: 'medium',
  customerId: 'u-marcus', offerCount: 3, postedAt: '2026-09-27T16:30:00', status: 'open'
},
{
  id: 'j-tv',
  title: 'Mount 65" TV above fireplace and hide cables',
  categoryId: 'handyman',
  description:
  'Need a 65" Samsung mounted above a brick-faced fireplace. I have a tilting mount already. Would like cables hidden — open to an in-wall kit or a paintable raceway depending on what works with brick.',
  details: ['Mount already purchased', 'Brick fireplace surround', 'Outlet ~4 ft below target', 'Cable concealment wanted'],
  photos: [images.tvmount],
  area: 'Laurelhurst', city: 'Portland, OR', lat: 45.528, lng: -122.624, distanceMi: 1.6,
  preferredDate: '2026-10-06', timing: 'flexible', timeOfDay: 'evening',
  budgetMin: 150, budgetMax: 250, size: 'small',
  customerId: 'u-alex', offerCount: 3, postedAt: '2026-09-30T08:10:00', status: 'open'
},
{
  id: 'j-garage',
  title: 'Garage clear-out + dump run',
  categoryId: 'moving',
  description:
  'Clearing out a two-car garage before we sell. Old furniture, a broken treadmill, boxes of junk and some scrap wood. A few items can go to donation — I’ll mark them. Everything else to the transfer station.',
  details: ['Roughly one truckload', 'Treadmill is heavy (~250 lb)', 'Donation drop at Goodwill', 'Dump fees included in offer'],
  photos: [images.garage, images.moving],
  area: 'Montavilla', city: 'Portland, OR', lat: 45.518, lng: -122.581, distanceMi: 3.9,
  preferredDate: '2026-10-05', timing: 'specific', timeOfDay: 'morning',
  budgetMin: 250, budgetMax: 450, size: 'large',
  customerId: 'u-alex', offerCount: 4, postedAt: '2026-09-26T10:00:00', status: 'open'
},
{
  id: 'j-bath',
  title: 'Fix leaky bathroom faucet and re-caulk tub',
  categoryId: 'handyman',
  description:
  'Bathroom sink faucet drips constantly — probably a cartridge. The tub caulk is cracked and starting to mildew. Looking for someone to fix the drip and strip and re-caulk the tub.',
  details: ['Single-handle Moen faucet', 'Tub surround ~5 ft', 'Parts reimbursed at cost', 'Street parking'],
  photos: [images.bathroom],
  area: 'Buckman', city: 'Portland, OR', lat: 45.518, lng: -122.653, distanceMi: 0.9,
  preferredDate: '2026-10-08', timing: 'asap', timeOfDay: 'any',
  budgetMin: 100, budgetMax: 180, size: 'small',
  customerId: 'u-dave', offerCount: 6, postedAt: '2026-09-30T13:25:00', status: 'open'
},
{
  id: 'j-paint',
  title: 'Paint one bedroom (walls only, ~12×12)',
  categoryId: 'handyman',
  description:
  'Repainting a guest bedroom from beige to a light gray. Walls only — ceiling and trim are fine. Paint is purchased (Sherwin-Williams Repose Gray). A couple of small nail holes to patch.',
  details: ['~12×12 ft room, 8 ft ceilings', 'Paint supplied', 'Minor patching', 'Furniture moved out beforehand'],
  photos: [images.painting],
  area: 'Kenton', city: 'Portland, OR', lat: 45.583, lng: -122.687, distanceMi: 5.2,
  preferredDate: '2026-10-15', timing: 'flexible', timeOfDay: 'any',
  budgetMin: 350, budgetMax: 550, size: 'medium',
  customerId: 'u-grace', offerCount: 2, postedAt: '2026-09-29T19:45:00', status: 'open'
},
{
  id: 'j-gutters',
  title: 'Clean gutters on single-story ranch house',
  categoryId: 'yard',
  description:
  'Gutters are overflowing with fir needles. Single-story ranch, about 140 linear feet. Would love downspouts flushed too. Ladder access is easy all the way around.',
  details: ['~140 linear ft', 'Single story', 'Flush downspouts', 'Debris bagged or hauled'],
  photos: [images.yard],
  area: 'Gateway', city: 'Portland, OR', lat: 45.532, lng: -122.561, distanceMi: 5.4,
  preferredDate: '2026-10-09', timing: 'flexible', timeOfDay: 'afternoon',
  budgetMin: 90, budgetMax: 150, size: 'small',
  customerId: 'u-marcus', offerCount: 1, postedAt: '2026-10-01T07:20:00', status: 'open'
},
{
  id: 'j-desk',
  title: 'Assemble standing desk + ergonomic office chair',
  categoryId: 'assembly',
  description:
  'Uplift V2 standing desk (with crossbar and keyboard tray) and a Branch ergonomic chair, both still in boxes. Need them assembled in my home office and the boxes broken down.',
  details: ['2 items, both in boxes', 'Home office on main floor', 'Box breakdown', 'Tools available if needed'],
  photos: [images.assembly],
  area: 'Goose Hollow', city: 'Portland, OR', lat: 45.519, lng: -122.696, distanceMi: 2.4,
  preferredDate: '2026-10-07', timing: 'specific', timeOfDay: 'evening',
  budgetMin: 80, budgetMax: 120, size: 'small',
  customerId: 'u-lena', offerCount: 3, postedAt: '2026-09-30T21:00:00', status: 'open'
},
{
  id: 'j-sofa',
  title: 'Move a sofa and dresser across town',
  categoryId: 'moving',
  description:
  'Bought a sofa and a solid-wood dresser on Marketplace. Need them picked up in Woodstock and delivered to my place in Irvington. Both pickup and drop-off are ground floor.',
  details: ['2 large items', 'Ground floor both ends', '~7 miles apart', 'Blankets/straps appreciated'],
  photos: [images.moving],
  area: 'Woodstock', city: 'Portland, OR', lat: 45.479, lng: -122.615, distanceMi: 4.1,
  preferredDate: '2026-10-04', timing: 'asap', timeOfDay: 'afternoon',
  budgetMin: 120, budgetMax: 200, size: 'small',
  customerId: 'u-grace', offerCount: 8, postedAt: '2026-09-30T15:55:00', status: 'open'
},
{
  id: 'j-airbnb',
  title: 'Airbnb turnover clean every Friday (studio)',
  categoryId: 'cleaning',
  description:
  'Looking for a reliable cleaner for weekly turnovers of a 450 sq ft studio ADU. Strip and remake the bed, launder linens on site, restock supplies, and a full clean. First clean this Friday, ongoing if it’s a fit.',
  details: ['Studio ADU, 450 sq ft', 'Washer/dryer on site', 'Supplies provided', 'Recurring weekly'],
  photos: [images.cleaning],
  area: 'Kerns', city: 'Portland, OR', lat: 45.526, lng: -122.643, distanceMi: 1.1,
  preferredDate: '2026-10-09', timing: 'specific', timeOfDay: 'morning',
  budgetMin: 90, budgetMax: 130, size: 'small',
  customerId: 'u-grace', offerCount: 2, postedAt: '2026-09-28T09:40:00', status: 'open'
},
{
  id: 'j-shelves',
  title: 'Install 4 floating shelves and hang a gallery wall',
  categoryId: 'handyman',
  description:
  'Four 36" floating oak shelves for the living room (hardware included), plus a gallery wall of 9 frames. I have a paper template for the gallery layout. Plaster walls, so the right anchors matter.',
  details: ['Plaster walls', 'Shelves & hardware supplied', '9-frame gallery wall', 'Level & laser preferred'],
  photos: [images.painting, images.tvmount],
  area: 'Irvington', city: 'Portland, OR', lat: 45.544, lng: -122.645, distanceMi: 1.9,
  preferredDate: '2026-10-12', timing: 'flexible', timeOfDay: 'afternoon',
  budgetMin: 120, budgetMax: 200, size: 'small',
  customerId: 'u-lena', offerCount: 4, postedAt: '2026-09-29T12:10:00', status: 'open'
},
{
  id: 'j-beds',
  title: 'Build two raised garden beds (cedar)',
  categoryId: 'yard',
  description:
  'Want two 4×8 cedar raised beds built in a sunny corner of the yard, about 16" tall, and filled with soil. Happy for you to source lumber and soil and include it in your offer.',
  details: ['Two 4×8 beds, 16" tall', 'Lumber & soil sourcing', 'Level ground', 'Side gate access'],
  photos: [images.yard, images.fence],
  area: 'Brooklyn', city: 'Portland, OR', lat: 45.496, lng: -122.648, distanceMi: 2.6,
  preferredDate: '2026-10-20', timing: 'flexible', timeOfDay: 'any',
  budgetMin: 250, budgetMax: 400, size: 'medium',
  customerId: 'u-priya', offerCount: 2, postedAt: '2026-09-27T08:30:00', status: 'open'
},
{
  id: 'j-reno-clean',
  title: 'Post-renovation clean, 3 bed house',
  categoryId: 'cleaning',
  description:
  'Kitchen and bath remodel just wrapped. Fine drywall dust everywhere. Need a top-to-bottom clean: vents, cabinets inside and out, windows, floors, and all surfaces.',
  details: ['3 bed / 2 bath, ~1,800 sq ft', 'Heavy dust', 'HEPA vacuum preferred', 'Two-person crew ideal'],
  photos: [images.cleaning, images.painting],
  area: 'Eastmoreland', city: 'Portland, OR', lat: 45.48, lng: -122.637, distanceMi: 3.9,
  preferredDate: '2026-10-14', timing: 'specific', timeOfDay: 'morning',
  budgetMin: 350, budgetMax: 500, size: 'large',
  customerId: 'u-tom', offerCount: 3, postedAt: '2026-09-26T17:15:00', status: 'open'
},
{
  id: 'j-wardrobe',
  title: 'Assemble IKEA PAX wardrobe (2 units)',
  categoryId: 'assembly',
  description:
  'Two PAX frames (100×236) with HASBERG doors and interior drawers. Must be anchored to the wall. Boxes are already in the bedroom.',
  details: ['2 frames + doors + 4 drawers', 'Wall anchoring required', 'Bedroom on 2nd floor', 'Boxes on site'],
  photos: [images.assembly],
  area: 'Alberta Arts', city: 'Portland, OR', lat: 45.559, lng: -122.644, distanceMi: 3.1,
  preferredDate: '2026-10-03', timing: 'specific', timeOfDay: 'afternoon',
  budgetMin: 120, budgetMax: 180, size: 'small',
  customerId: 'u-lena', offerCount: 5, postedAt: '2026-09-24T10:20:00', status: 'in_progress'
},
{
  id: 'j-dresser',
  title: 'Assemble dresser & bed frame',
  categoryId: 'assembly',
  description: 'MALM 6-drawer dresser and a queen platform bed frame.',
  details: ['2 items', 'Wall anchoring for dresser'],
  photos: [images.assembly],
  area: 'Kerns', city: 'Portland, OR', lat: 45.526, lng: -122.643, distanceMi: 1.1,
  preferredDate: '2026-09-14', timing: 'specific', timeOfDay: 'afternoon',
  budgetMin: 90, budgetMax: 140, size: 'small',
  customerId: 'u-alex', offerCount: 4, postedAt: '2026-09-08T10:20:00', status: 'completed'
},
{
  id: 'j-patio',
  title: 'Pressure wash back patio',
  categoryId: 'yard',
  description: 'Concrete patio about 300 sq ft with moss build-up.',
  details: ['~300 sq ft concrete', 'Water spigot available'],
  photos: [images.yard],
  area: 'Pearl District', city: 'Portland, OR', lat: 45.529, lng: -122.683, distanceMi: 1.7,
  preferredDate: '2026-09-20', timing: 'flexible', timeOfDay: 'morning',
  budgetMin: 100, budgetMax: 160, size: 'small',
  customerId: 'u-tom', offerCount: 3, postedAt: '2026-09-12T10:20:00', status: 'completed'
}];
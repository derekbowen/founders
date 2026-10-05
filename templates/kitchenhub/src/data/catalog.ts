import type {
  CertificationKey,
  City,
  EquipmentKey,
  SegmentKey,
  SortKey,
  StorageType } from
'../types/marketplace';
import { images } from './images';

export const cities: City[] = ['Chicago', 'Brooklyn', 'Austin', 'Los Angeles'];

export const priceBounds = { min: 20, max: 60 };

export const keyEquipment: {key: EquipmentKey;label: string;}[] = [
{ key: 'convection-oven', label: 'Convection oven' },
{ key: 'walk-in-cooler', label: 'Walk-in cooler' },
{ key: 'mixer', label: 'Stand mixer' },
{ key: 'fryer', label: 'Fryer' },
{ key: 'hood', label: 'Exhaust hood' }];


export const storageTypes: {key: StorageType;label: string;description: string;}[] = [
{ key: 'dry', label: 'Dry storage', description: 'Shelving for packaging, dry goods and smallwares' },
{ key: 'cold', label: 'Cold storage', description: 'Walk-in or reach-in refrigeration, 34–40°F' },
{ key: 'frozen', label: 'Frozen storage', description: 'Walk-in or chest freezer space, 0°F or below' }];


export const certifications: {key: CertificationKey;label: string;description: string;}[] = [
{ key: 'health-permit', label: 'Health permit', description: 'Current county health department permit' },
{ key: 'fire-inspection', label: 'Fire inspected', description: 'Hood suppression inspected in last 12 months' },
{ key: 'servsafe', label: 'ServSafe manager', description: 'Certified food protection manager on site' },
{ key: 'kosher', label: 'Kosher', description: 'Supervised kosher kitchen' },
{ key: 'halal', label: 'Halal', description: 'Halal-certified prep areas' },
{ key: 'gluten-free', label: 'Gluten-free', description: 'Dedicated gluten-free zone' },
{ key: 'organic', label: 'Organic handler', description: 'USDA organic handling certification' }];


export const segments: {key: SegmentKey;label: string;description: string;image: string;}[] = [
{ key: 'caterers', label: 'Caterers', description: 'Big line space and hot-holding for event-day production.', image: images.kitchens.catering },
{ key: 'food-trucks', label: 'Food trucks', description: 'Commissary prep, overnight parking and grease disposal.', image: images.kitchens.truck },
{ key: 'bakers', label: 'Bakers', description: 'Deck ovens, 60 qt mixers and sheeters before sunrise.', image: images.kitchens.bakery },
{ key: 'meal-prep', label: 'Meal prep', description: 'Long prep tables, blast chillers and walk-in storage.', image: images.kitchens.mealPrep },
{ key: 'pop-ups', label: 'Pop-ups', description: 'Test menus and run one-night events without a lease.', image: images.kitchens.popUp }];


export const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'relevance', label: 'Recommended' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'rating', label: 'Top rated' }];


export const equipmentPresets: {category: string;items: string[];}[] = [
{ category: 'Cooking', items: ['Convection oven', '6-burner range', 'Flat-top griddle', 'Fryer', 'Combi oven', 'Tilt skillet', 'Exhaust hood'] },
{ category: 'Baking', items: ['Deck oven', '20 qt mixer', '60 qt mixer', 'Dough sheeter', 'Proofing cabinet', 'Speed racks'] },
{ category: 'Refrigeration', items: ['Walk-in cooler', 'Walk-in freezer', 'Reach-in refrigerator', 'Blast chiller', 'Ice machine'] },
{ category: 'Prep', items: ['Stainless prep tables', 'Food processor', 'Vacuum sealer', 'Immersion circulator', 'Commercial scale'] },
{ category: 'Cleaning', items: ['3-compartment sink', 'High-temp dishwasher', 'Hand-wash stations', 'Mop sink', 'Grease trap'] }];


export const cleaningChecklist: {id: string;label: string;}[] = [
{ id: 'surfaces', label: 'Prep surfaces cleaned & sanitized' },
{ id: 'equipment', label: 'Equipment wiped down and switched off' },
{ id: 'floors', label: 'Floors swept and mopped' },
{ id: 'trash', label: 'Trash, recycling and grease disposed' },
{ id: 'storage', label: 'Stored items labeled and dated' },
{ id: 'photos', label: 'Sign-off photos uploaded for host' }];


export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
import { AnchorIcon, FishIcon, SailboatIcon, ShipIcon, WavesIcon, ShipWheelIcon } from 'lucide-react';
import type { BoatType } from '../types/marketplace';

export const boatTypes: BoatType[] = [
{ id: 'pontoon', label: 'Pontoon', plural: 'Pontoons', description: 'Roomy, stable & family-friendly', icon: AnchorIcon },
{ id: 'sailboat', label: 'Sailboat', plural: 'Sailboats', description: 'Harness the wind, quietly', icon: SailboatIcon },
{ id: 'yacht', label: 'Yacht', plural: 'Yachts', description: 'Crewed luxury for celebrations', icon: ShipIcon },
{ id: 'fishing', label: 'Fishing', plural: 'Fishing boats', description: 'Rigged for inshore & offshore', icon: FishIcon },
{ id: 'jetski', label: 'Jet ski', plural: 'Jet skis', description: 'Fast, fun, no license fuss', icon: WavesIcon },
{ id: 'catamaran', label: 'Catamaran', plural: 'Catamarans', description: 'Twin hulls, wide decks', icon: ShipWheelIcon }];
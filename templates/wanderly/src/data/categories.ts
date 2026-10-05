import { CameraIcon, LandmarkIcon, MoonStarIcon, MountainIcon, PaletteIcon, UtensilsIcon } from 'lucide-react';
import type { Category } from '../types/marketplace';

export const categories: Category[] = [
{ id: 'food', label: 'Food & drink', description: 'Tastings, market walks and tasca crawls', icon: UtensilsIcon },
{ id: 'outdoors', label: 'Outdoors', description: 'Kayaks, hikes and coastal adventures', icon: MountainIcon },
{ id: 'culture', label: 'Culture', description: 'Street art, rituals and local history', icon: LandmarkIcon },
{ id: 'workshops', label: 'Workshops', description: 'Cooking classes and hands-on crafts', icon: PaletteIcon },
{ id: 'nightlife', label: 'Nightlife', description: 'Live music, bars and after-dark tours', icon: MoonStarIcon },
{ id: 'photography', label: 'Photography', description: 'Photo walks with pro local shooters', icon: CameraIcon }];
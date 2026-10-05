import { CareTypeId } from '../types/sitter';

export interface CareType {
  id: CareTypeId;
  title: string;
  description: string;
  fromRate: number;
  tone: 'primary' | 'accent';
}

export const careTypes: CareType[] = [
{ id: 'date-night', title: 'Date night', description: 'Dinner, baths and bedtime handled while you get a night out.', fromRate: 18, tone: 'primary' },
{ id: 'after-school', title: 'After school', description: 'Pickups, snacks, homework help and activity drop-offs.', fromRate: 18, tone: 'accent' },
{ id: 'overnight', title: 'Overnight', description: 'Sitters who stay the night so you can travel or rest.', fromRate: 23, tone: 'primary' },
{ id: 'special-needs', title: 'Special needs', description: 'Trained caregivers for medical, sensory and behavioral needs.', fromRate: 26, tone: 'accent' },
{ id: 'newborn', title: 'Newborn', description: 'Newborn care specialists for feeds, soothing and sleep.', fromRate: 26, tone: 'primary' }];
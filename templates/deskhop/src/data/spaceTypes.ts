import {
  DoorClosedIcon,
  LaptopIcon,
  MonitorIcon,
  PhoneCallIcon,
  PresentationIcon } from
'lucide-react';
import type { SpaceTypeInfo } from '../types/listing';

export const spaceTypes: SpaceTypeInfo[] = [
{
  id: 'hot-desk',
  label: 'Hot desk',
  description: 'Grab any open seat in a shared, buzzing workspace.',
  bookBy: 'seat',
  unit: { one: 'desk', many: 'desks' },
  icon: LaptopIcon
},
{
  id: 'dedicated-desk',
  label: 'Dedicated desk',
  description: 'Your own desk and monitor, same spot all day.',
  bookBy: 'seat',
  unit: { one: 'desk', many: 'desks' },
  icon: MonitorIcon
},
{
  id: 'private-office',
  label: 'Private office',
  description: 'A lockable room for you and your team.',
  bookBy: 'space',
  unit: { one: 'office', many: 'offices' },
  icon: DoorClosedIcon
},
{
  id: 'meeting-room',
  label: 'Meeting room',
  description: 'Screens, whiteboards and space to think together.',
  bookBy: 'space',
  unit: { one: 'room', many: 'rooms' },
  icon: PresentationIcon
},
{
  id: 'phone-booth',
  label: 'Phone booth',
  description: 'Soundproof pods for calls and deep focus.',
  bookBy: 'seat',
  unit: { one: 'booth', many: 'booths' },
  icon: PhoneCallIcon
}];
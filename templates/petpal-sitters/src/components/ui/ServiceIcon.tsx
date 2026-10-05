import React from 'react';
import { DoorOpenIcon, FootprintsIcon, HouseIcon, KeyRoundIcon } from 'lucide-react';
import type { ServiceId } from '../../types/marketplace';

const icons: Record<ServiceId, React.ElementType> = {
  boarding: HouseIcon,
  'house-sitting': KeyRoundIcon,
  'drop-in': DoorOpenIcon,
  'dog-walking': FootprintsIcon
};

export function ServiceIcon({ id, className = 'h-5 w-5' }: {id: ServiceId;className?: string;}) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden="true" />;
}
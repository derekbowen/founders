import React from 'react';
import { BedDoubleIcon, DogIcon, DoorOpenIcon, HomeIcon } from 'lucide-react';
import type { ServiceId } from '../../types/listing';

const icons: Record<ServiceId, typeof HomeIcon> = {
  boarding: BedDoubleIcon,
  'house-sitting': HomeIcon,
  'drop-in': DoorOpenIcon,
  'dog-walking': DogIcon
};

interface ServiceIconProps {
  serviceId: ServiceId;
  className?: string;
}

export function ServiceIcon({ serviceId, className = 'h-4 w-4' }: ServiceIconProps) {
  const Icon = icons[serviceId];
  return <Icon className={className} aria-hidden="true" />;
}
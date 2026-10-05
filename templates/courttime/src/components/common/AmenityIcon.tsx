import React from "react";
import { ArmchairIcon, CarIcon, CoffeeIcon, DropletIcon, LightbulbIcon, LockIcon, ShoppingBagIcon, ShowerHeadIcon, WifiIcon, BoxIcon } from "lucide-react";
import { AmenityId } from "../../types/marketplace";
const iconMap: Record<AmenityId, BoxIcon> = {
  lights: LightbulbIcon,
  lockers: LockIcon,
  parking: CarIcon,
  proShop: ShoppingBagIcon,
  showers: ShowerHeadIcon,
  water: DropletIcon,
  seating: ArmchairIcon,
  wifi: WifiIcon,
  cafe: CoffeeIcon
};
export function AmenityIcon({
  id,
  size = 18,
  className = ''




}: {id: AmenityId;size?: number;className?: string;}) {
  const Icon = iconMap[id];
  return <Icon size={size} className={className} aria-hidden="true" />;
}
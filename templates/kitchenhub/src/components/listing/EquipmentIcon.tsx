import React from "react";
import { CookingPotIcon, FlameIcon, MicrowaveIcon, RefrigeratorIcon, WindIcon, BoxIcon } from "lucide-react";
import { EquipmentKey } from "../../types/marketplace";
const icons: Record<EquipmentKey, BoxIcon> = {
  'convection-oven': MicrowaveIcon,
  'walk-in-cooler': RefrigeratorIcon,
  mixer: CookingPotIcon,
  fryer: FlameIcon,
  hood: WindIcon
};
export function EquipmentIcon({
  equipment,
  className = 'h-4 w-4'



}: {equipment: EquipmentKey;className?: string;}) {
  const Icon = icons[equipment];
  return <Icon className={className} aria-hidden="true" />;
}
import React from "react";
import { HammerIcon, LeafIcon, PackageOpenIcon, SparklesIcon, TruckIcon, BoxIcon } from "lucide-react";
import { CategoryId } from "../../types/marketplace";
const icons: Record<CategoryId, BoxIcon> = {
  handyman: HammerIcon,
  moving: TruckIcon,
  cleaning: SparklesIcon,
  assembly: PackageOpenIcon,
  yard: LeafIcon
};
export function CategoryIcon({
  id,
  className = 'h-4 w-4'



}: {id: CategoryId;className?: string;}) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden="true" />;
}
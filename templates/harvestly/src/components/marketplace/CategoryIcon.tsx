import React from "react";
import { AppleIcon, BeefIcon, CarrotIcon, CroissantIcon, DropletIcon, EggIcon, Flower2Icon } from "lucide-react";
import { CategoryId } from "../../types/marketplace";

const map: Record<CategoryId, React.ComponentType<{className?: string;}>> = {
  vegetables: CarrotIcon,
  fruit: AppleIcon,
  "eggs-dairy": EggIcon,
  meat: BeefIcon,
  honey: DropletIcon,
  bakery: CroissantIcon,
  flowers: Flower2Icon
};

export function CategoryIcon({ id, className = "h-4 w-4" }: {id: CategoryId;className?: string;}) {
  const Icon = map[id];
  return <Icon className={className} aria-hidden="true" />;
}
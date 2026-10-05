import React from "react";
import { BadgeCheckIcon, BirdIcon, FlameIcon, LeafIcon, RecycleIcon, SproutIcon, SunIcon, DropletIcon } from "lucide-react";
import { Practice } from "../../types/marketplace";

const icons: Record<Practice, React.ComponentType<{className?: string;}>> = {
  "Certified organic": BadgeCheckIcon,
  "No-spray": LeafIcon,
  Heirloom: SproutIcon,
  "Pasture-raised": SunIcon,
  "Grass-fed": SproutIcon,
  Regenerative: RecycleIcon,
  "Free-range": BirdIcon,
  "Raw & unfiltered": DropletIcon,
  "Wood-fired": FlameIcon,
  "Small batch": BadgeCheckIcon
};

export function PracticeBadges({ practices, size = "md" }: {practices: Practice[];size?: "sm" | "md";}) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Growing practices">
      {practices.map((p) => {
        const Icon = icons[p];
        return (
          <li
            key={p}
            className={`inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft/60 font-medium text-primary-dark ${
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`
            }>
            
            <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
            {p}
          </li>);

      })}
    </ul>);

}
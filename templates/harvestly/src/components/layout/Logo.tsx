import React from "react";
import { Link } from "react-router-dom";
import { SproutIcon } from "lucide-react";
import { brand } from "../../data/brand";

export function Logo({ inverted = false }: {inverted?: boolean;}) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2" aria-label={`${brand.name} home`}>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition group-hover:rotate-[-8deg] ${
        inverted ? "bg-kraft text-primary" : "bg-primary text-kraft"}`
        }>
        
        <SproutIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className={`font-display text-2xl font-semibold ${inverted ? "text-kraft" : "text-primary-dark"}`}>
        {brand.name}
      </span>
    </Link>);

}
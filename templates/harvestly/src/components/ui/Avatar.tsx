import React from "react";
import { initials } from "../../utils/format";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  tone?: "green" | "orange";
}

const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-16 w-16 text-lg" };

export function Avatar({ name, size = "md", tone = "green" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${sizes[size]} ${
      tone === "green" ? "bg-primary-soft text-primary-dark" : "bg-accent-soft text-accent-dark"}`
      }>
      
      {initials(name)}
    </span>);

}
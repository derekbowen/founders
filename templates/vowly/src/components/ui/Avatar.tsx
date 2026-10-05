import React from "react";
import { initialsOf } from "../../utils/format";

interface AvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-24 w-24 text-3xl"
};

export function Avatar({ name, image, size = "md", className = "" }: AvatarProps) {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        className={`${sizes[size]} shrink-0 rounded-full object-cover ring-2 ring-surface ${className}`} />);


  }
  return (
    <span
      aria-hidden="true"
      className={`${sizes[size]} inline-flex shrink-0 items-center justify-center rounded-full bg-blush font-display font-semibold text-primary ring-2 ring-surface ${className}`}>
      
      {initialsOf(name)}
    </span>);

}
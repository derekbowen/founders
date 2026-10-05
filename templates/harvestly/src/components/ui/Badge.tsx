import React from "react";
import { twMerge } from "tailwind-merge";

type Tone = "green" | "orange" | "neutral" | "red" | "blue";

const tones: Record<Tone, string> = {
  green: "bg-primary-soft text-primary-dark",
  orange: "bg-accent-soft text-accent-dark",
  neutral: "bg-ink/[0.06] text-ink",
  red: "bg-danger/10 text-danger",
  blue: "bg-sky-100 text-sky-900"
};

interface BadgeProps {
  tone?: Tone;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ tone = "neutral", icon, className, children }: BadgeProps) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}>
      
      {icon}
      {children}
    </span>);

}
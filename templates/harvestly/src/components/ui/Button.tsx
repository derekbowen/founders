import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "accent" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps &
React.ButtonHTMLAttributes<HTMLButtonElement> & {to?: undefined;};
type LinkProps = BaseProps & {to: string;onClick?: () => void;"aria-label"?: string;};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark shadow-sm",
  accent: "bg-accent text-white hover:bg-accent-dark shadow-sm",
  outline: "border border-line bg-white text-ink hover:border-primary/40 hover:bg-primary-soft/40",
  ghost: "text-ink hover:bg-ink/5",
  danger: "border border-danger/30 bg-white text-danger hover:bg-danger/5"
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2"
};

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", fullWidth, className, children } = props;
  const classes = twMerge(
    "inline-flex items-center justify-center rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if (props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} aria-label={props["aria-label"]} className={classes}>
        {children}
      </Link>);

  }

  const { variant: _v, size: _s, fullWidth: _f, className: _c, children: _ch, to: _t, ...rest } =
  props as ButtonProps;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>);

}
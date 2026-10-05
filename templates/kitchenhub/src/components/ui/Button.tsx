import React from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { cn, focusRing } from '../../utils/styles';

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'dark' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-hover',
  accent: 'bg-accent text-white shadow-sm hover:bg-accent-hover',
  secondary: 'bg-steel-100 text-steel-900 hover:bg-steel-200',
  outline: 'border border-steel-300 bg-white text-steel-900 hover:border-steel-400 hover:bg-steel-50',
  ghost: 'text-steel-700 hover:bg-steel-100 hover:text-steel-900',
  danger: 'border border-primary/30 bg-white text-primary hover:bg-primary-soft',
  dark: 'bg-steel-900 text-white hover:bg-steel-800',
  light: 'bg-white text-steel-900 shadow-sm hover:bg-steel-100'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3 text-sm',
  md: 'h-11 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-6 text-base'
};

export function buttonClasses(
variant: ButtonVariant = 'primary',
size: ButtonSize = 'md',
fullWidth = false,
className?: string)
: string {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50',
    focusRing,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, fullWidth, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}>
      
      {loading && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>);

}
import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-stone-900 hover:bg-primary-400 active:bg-primary-600 shadow-sm',
  secondary: 'bg-white text-stone-800 border border-stone-300 hover:border-stone-400 hover:bg-stone-50',
  accent: 'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-sm',
  ghost: 'text-stone-700 hover:bg-stone-100',
  danger: 'bg-white text-red-700 border border-red-200 hover:bg-red-50 hover:border-red-300'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base'
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', fullWidth = false, className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-extrabold whitespace-nowrap transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );
}
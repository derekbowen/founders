import React from 'react';
import { Button } from '../Button';

type DSButtonProps = React.ComponentProps<typeof Button>;
export type ButtonTone = 'primary' | 'accent' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BrandButtonProps extends Omit<DSButtonProps, 'variant' | 'size'> {
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const dsVariant: Record<ButtonTone, DSButtonProps['variant']> = {
  primary: 'primary',
  accent: 'primary',
  outline: 'secondary',
  ghost: 'tertiary',
  danger: 'destructive'
};
const dsSize: Record<ButtonSize, DSButtonProps['size']> = { sm: 'small', md: 'medium', lg: 'large' };

const toneOverrides: Record<ButtonTone, string> = {
  primary: '!bg-primary-600 hover:!bg-primary-700 !text-white !border-transparent',
  accent: '!bg-accent-300 hover:!bg-accent-400 !text-ink-900 !border-transparent',
  outline: '!bg-white hover:!bg-ink-50 !text-ink-800 !border !border-ink-200 hover:!border-ink-300',
  ghost: '!bg-transparent hover:!bg-primary-50 !text-primary-700 !border-transparent',
  danger: '!bg-white hover:!bg-red-50 !text-red-700 !border !border-red-200'
};
const sizeOverrides: Record<ButtonSize, string> = {
  sm: '!h-9 !px-4 !text-sm',
  md: '!h-11 !px-5 !text-sm',
  lg: '!h-12 !px-7 !text-base'
};

/** Design-system Button themed with the brand tokens from data/brand.ts */
export function BrandButton({ tone = 'primary', size = 'md', fullWidth, className = '', ...rest }: BrandButtonProps) {
  return (
    <Button
      variant={dsVariant[tone]}
      size={dsSize[size]}
      className={`!rounded-full !font-semibold !shadow-none !transition-colors focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-primary-400 focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-60 ${toneOverrides[tone]} ${sizeOverrides[size]} ${fullWidth ? '!w-full' : ''} ${className}`}
      {...rest} />);


}

const linkTone: Record<ButtonTone, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  accent: 'bg-accent-300 text-ink-900 hover:bg-accent-400',
  outline: 'bg-white text-ink-800 border border-ink-200 hover:border-ink-300 hover:bg-ink-50',
  ghost: 'text-primary-700 hover:bg-primary-50',
  danger: 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
};
const linkSize: Record<ButtonSize, string> = { sm: 'h-9 px-4 text-sm', md: 'h-11 px-5 text-sm', lg: 'h-12 px-7 text-base' };

/** Class string for router <Link>s that should look like buttons */
export function buttonLinkClass(tone: ButtonTone = 'primary', size: ButtonSize = 'md', extra = ''): string {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 ${linkTone[tone]} ${linkSize[size]} ${extra}`;
}
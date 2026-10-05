import React from 'react';
import { Button } from '../Button';

type Tone = 'primary' | 'secondary' | 'ghost' | 'danger';

type BrandButtonProps = React.ComponentProps<typeof Button> & {
  tone?: Tone;
  fullWidth?: boolean;
};

const toneClasses: Record<Tone, string> = {
  primary:
  '!bg-brand-700 !text-white !border-transparent hover:!bg-brand-800 focus-visible:!ring-brand-600',
  secondary:
  '!bg-white !text-ink !border !border-line hover:!bg-mist hover:!border-ink-subtle/40 focus-visible:!ring-brand-600',
  ghost: '!bg-transparent !text-ink !border-transparent hover:!bg-mist focus-visible:!ring-brand-600',
  danger:
  '!bg-white !text-red-700 !border !border-red-200 hover:!bg-red-50 focus-visible:!ring-red-600'
};

const variantFor: Record<Tone, 'primary' | 'secondary' | 'tertiary' | 'destructive'> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'tertiary',
  danger: 'destructive'
};

const sizeClasses = {
  small: '!px-3 !py-1.5 !text-sm',
  medium: '!px-4 !py-2.5 !text-sm',
  large: '!px-5 !py-3 !text-base'
};

export function BrandButton({
  tone = 'primary',
  fullWidth = false,
  size = 'medium',
  className = '',
  ...rest
}: BrandButtonProps) {
  return (
    <Button
      {...rest}
      size={size}
      variant={variantFor[tone]}
      className={[
      'inline-flex items-center justify-center gap-2 !rounded-lg !font-semibold !shadow-none transition-colors disabled:!cursor-not-allowed disabled:!opacity-50',
      sizeClasses[size],
      toneClasses[tone],
      fullWidth ? '!w-full' : '',
      className].
      join(' ')} />);


}
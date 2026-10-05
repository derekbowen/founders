import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { buttonClasses, type ButtonSize, type ButtonVariant } from '../../utils/buttonStyles';

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function ButtonLink({ variant = 'primary', size = 'md', fullWidth = false, className = '', ...rest }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, `${fullWidth ? 'w-full' : ''} ${className}`)} {...rest} />;
}
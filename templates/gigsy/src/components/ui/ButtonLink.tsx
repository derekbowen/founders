import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ButtonSize, ButtonVariant, buttonClasses } from '../../utils/buttonStyles';

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, fullWidth, String(className))} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>);

}
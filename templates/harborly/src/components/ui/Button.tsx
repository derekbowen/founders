import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { buttonClasses, type ButtonSize, type ButtonVariant } from '../../utils/ui';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  to?: string;
}

export function Button({ variant = 'primary', size = 'md', loading, to, className, children, disabled, type = 'button', ...rest }: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>);

  }
  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>);

}
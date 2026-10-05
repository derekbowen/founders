import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { buttonClasses, ButtonSize, ButtonVariant } from "../../utils/buttonClasses";

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses({ variant, size, fullWidth, className: className as string })}
      {...props} />);


}
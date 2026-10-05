import React from 'react';
import { getInitials } from '../../utils/format';

interface TutorPhotoProps {
  name: string;
  src?: string;
  className?: string;
}

/** Large tutor portrait with an initials fallback. */
export function TutorPhoto({ name, src, className = '' }: TutorPhotoProps) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-primary-100 text-3xl font-semibold text-primary-700 ${className}`}
        role="img"
        aria-label={name}>
        
        {getInitials(name)}
      </div>);

  }
  return <img src={src} alt={name} loading="lazy" className={`object-cover object-top ${className}`} />;
}
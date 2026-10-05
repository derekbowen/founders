import React from 'react';
import { CompassIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <EmptyState
        icon={CompassIcon}
        title="Page not found"
        description="The page you’re looking for doesn’t exist or has moved."
        action={<ButtonLink to="/">Back to home</ButtonLink>} />
      
    </div>);

}
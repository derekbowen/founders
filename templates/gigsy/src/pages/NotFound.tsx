import React from 'react';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { ButtonLink } from '../components/ui/ButtonLink';

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <EmptyState
        icon={<CompassIcon className="h-6 w-6" />}
        title="Page not found"
        text="The page you're looking for doesn't exist or has moved."
        action={<ButtonLink to="/">Back to home</ButtonLink>} />
      
    </div>);

}
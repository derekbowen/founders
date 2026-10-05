import React from 'react';
import { CompassIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <EmptyState
        icon={<CompassIcon className="h-5 w-5" />}
        title="Page not found"
        description="The page you’re looking for doesn’t exist or has moved."
        action={
        <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink to="/">Go home</ButtonLink>
            <ButtonLink to="/search" variant="secondary">
              Browse jobs
            </ButtonLink>
          </div>
        } />
      
    </div>);

}
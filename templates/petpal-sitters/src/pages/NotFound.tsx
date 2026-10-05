import React from 'react';
import { SearchIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-24">
      <EmptyState
        title="We couldn’t find that page"
        text="The page may have moved, or the listing is no longer available. Let’s get you back to finding a great sitter."
        action={
        <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink to="/s" leftIcon={<SearchIcon className="h-4 w-4" />}>
              Browse sitters
            </ButtonLink>
            <ButtonLink to="/" variant="secondary">
              Go home
            </ButtonLink>
          </div>
        } />
      
    </div>);

}
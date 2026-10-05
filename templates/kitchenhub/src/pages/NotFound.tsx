import React from 'react';
import { CookingPotIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { containerClass } from '../utils/styles';

export function NotFoundPage() {
  return (
    <div className={`${containerClass} py-24`}>
      <EmptyState
        icon={<CookingPotIcon className="h-5 w-5" aria-hidden="true" />}
        title="This page burned in the oven"
        body="The link may be broken or the page was moved."
        action={<ButtonLink to="/">Back to home</ButtonLink>} />
      
    </div>);

}
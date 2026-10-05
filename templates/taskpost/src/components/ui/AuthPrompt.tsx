import React from 'react';
import { useLocation } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { ButtonLink } from './ButtonLink';
import { EmptyState } from './EmptyState';

export function AuthPrompt({ title, description }: {title: string;description: string;}) {
  const location = useLocation();
  const redirect = encodeURIComponent(location.pathname + location.search);
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <EmptyState
        icon={<LockIcon className="h-5 w-5" />}
        title={title}
        description={description}
        action={
        <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink to={`/login?redirect=${redirect}`}>Log in</ButtonLink>
            <ButtonLink to={`/signup?redirect=${redirect}`} variant="secondary">
              Create account
            </ButtonLink>
          </div>
        } />
      
    </div>);

}
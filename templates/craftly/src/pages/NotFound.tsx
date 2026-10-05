import React from 'react';
import { ButtonLink } from '../components/ui/ButtonLink';

export function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="font-heading text-8xl font-medium italic text-primary">404</p>
      <h1 className="mt-4 text-3xl font-medium">This page cracked in the kiln</h1>
      <p className="mt-2 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved. Let’s get you back to the good stuff.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/s" variant="secondary">Browse all</ButtonLink>
      </div>
    </div>);

}
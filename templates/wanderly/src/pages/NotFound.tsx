import React from 'react';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <EmptyState
        icon={CompassIcon}
        title="Looks like you wandered off the map"
        description="The page you're looking for doesn't exist. Let's get you back on track."
        action={<Button to="/">Back to home</Button>} />
      
    </div>);

}
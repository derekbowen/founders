import React from 'react';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <EmptyState icon={CompassIcon} title="Off the chart" text="We couldn’t find that page. Let’s get you back to calmer waters." action={<Button to="/">Back to home</Button>} />
    </div>);

}
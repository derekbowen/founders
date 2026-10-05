import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { linkButton } from '../utils/buttonStyles';

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-page px-4 py-20 sm:px-6">
      <EmptyState
        icon={CompassIcon}
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        action={
        <div className="flex gap-2">
            <Link to="/" className={`${linkButton.base} ${linkButton.primary}`}>Go home</Link>
            <Link to="/search" className={`${linkButton.base} ${linkButton.secondary}`}>Find tutors</Link>
          </div>
        } />
      
    </div>);

}
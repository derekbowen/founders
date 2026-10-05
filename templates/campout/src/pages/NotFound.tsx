import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

export function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        icon={CompassIcon}
        title="Looks like you’ve wandered off trail"
        description="We couldn’t find that page. Head back to the trailhead and try again."
        action={
        <Link to="/" className="btn-primary">
            Back to home
          </Link>
        } />
      
    </div>);

}
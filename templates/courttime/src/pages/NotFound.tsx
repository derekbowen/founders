import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        icon={<CompassIcon size={26} />}
        title="Out of bounds"
        description="We couldn’t find that page. Let’s get you back in play."
        action={<Link to="/" className="btn btn-primary btn-md">Back to home</Link>} />
      
    </div>);

}
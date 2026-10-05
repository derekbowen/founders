import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFound() {
  return (
    <div className="container-page py-24">
      <EmptyState
        icon={CompassIcon}
        title="This page took the day off"
        description="We couldn’t find what you were looking for. Try searching for a space instead."
        action={
        <div className="flex gap-2">
            <Link to="/" className="btn-secondary">Go home</Link>
            <Link to="/s" className="btn-primary">Find a space</Link>
          </div>
        } />
      
    </div>);

}
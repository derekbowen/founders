import React from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';

export function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        title="This page wandered off"
        description="We couldn’t find what you were looking for. Let’s get you back on the trail."
        action={
        <Link to="/" className="btn btn-md btn-primary">
            Back to home
          </Link>
        } />
      
    </div>);

}
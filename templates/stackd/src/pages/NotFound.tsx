import React from 'react';
import { Link } from 'react-router-dom';
import { SearchXIcon as FileQuestionIcon } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        icon={FileQuestionIcon}
        title="404 — file not found"
        body="The page you’re looking for doesn’t exist. Maybe it was never uploaded."
        action={
        <div className="flex gap-2">
            <Link to="/" className="btn btn-ink">
              Go home
            </Link>
            <Link to="/s" className="btn btn-outline">
              Explore products
            </Link>
          </div>
        } />
      
    </div>);

}
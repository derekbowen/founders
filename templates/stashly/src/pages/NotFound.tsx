import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { ui, cx } from '../utils/styles';

export function NotFound() {
  return (
    <div className={cx(ui.container, 'py-24')}>
      <EmptyState
        icon={<CompassIcon className="h-5 w-5" />}
        title="Page not found"
        text="The page you’re looking for has moved or doesn’t exist."
        action={<Link to="/" className={ui.linkBrand}>Go home</Link>} />
      
    </div>);

}
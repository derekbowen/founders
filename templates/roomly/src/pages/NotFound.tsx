import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { buttonStyles } from '../utils/styles';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <EmptyState
        icon={<CompassIcon size={26} />}
        title="Page not found"
        text="The page you're looking for doesn't exist or has moved."
        action={
        <div className="flex gap-3">
            <Button className={buttonStyles.primary} onClick={() => navigate('/')}>
              Go home
            </Button>
            <Button className={buttonStyles.outline} onClick={() => navigate('/s')}>
              Browse rooms
            </Button>
          </div>
        } />
      
    </div>);

}
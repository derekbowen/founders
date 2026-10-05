import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import { buttonClass } from '../../utils/styles';

export function RequireAuth({ children, title = 'Log in to continue' }: {children: React.ReactNode;title?: string;}) {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (currentUser) return <>{children}</>;
  const from = location.pathname + location.search;
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-2xl border border-line bg-surface">
        <EmptyState
          icon={<LockIcon size={24} aria-hidden />}
          title={title}
          text="You need an account to reserve spots, message hosts and manage your bookings."
          action={
          <div className="flex gap-3">
              <Link to="/login" state={{ from }} className={buttonClass('primary')}>
                Log in
              </Link>
              <Link to="/signup" state={{ from }} className={buttonClass('secondary')}>
                Sign up
              </Link>
            </div>
          } />
        
      </div>
    </div>);

}
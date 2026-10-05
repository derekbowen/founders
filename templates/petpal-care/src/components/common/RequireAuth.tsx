import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LockKeyholeIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function RequireAuth({ children }: {children: React.ReactNode;}) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) return <>{children}</>;
  const next = encodeURIComponent(location.pathname + location.search);
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
      <div className="card w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-700">
          <LockKeyholeIcon className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-black text-ink-900">Log in to continue</h1>
        <p className="mt-2 text-sm text-ink-600">You’ll need an account to view this page. It only takes a minute.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to={`/login?next=${next}`} className="btn btn-md btn-primary">
            Log in
          </Link>
          <Link to={`/signup?next=${next}`} className="btn btn-md btn-secondary">
            Create an account
          </Link>
        </div>
      </div>
    </div>);

}
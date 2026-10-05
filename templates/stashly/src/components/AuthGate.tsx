import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { Button } from './Button';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { ui } from '../utils/styles';

export function AuthGate({ children, title }: {children: React.ReactNode;title: string;}) {
  const { user, login } = useMarketplace();
  const location = useLocation();
  if (user) return <>{children}</>;
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-700">
        <LockIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-stone-900">Log in to see your {title}</h1>
      <p className="mt-2 text-sm text-stone-600">
        Your bookings, messages and settings are private to your account.
      </p>
      <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Link to={`/login?next=${encodeURIComponent(location.pathname)}`} className={ui.linkOutline}>
          Log in
        </Link>
        <Button className={ui.btnBrand} onClick={() => login()}>
          Continue as demo user
        </Button>
      </div>
    </div>);

}
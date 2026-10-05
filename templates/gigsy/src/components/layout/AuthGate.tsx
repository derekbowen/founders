import React from 'react';
import { useLocation } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ButtonLink } from '../ui/ButtonLink';

interface AuthGateProps {
  children: React.ReactNode;
  title?: string;
}

export function AuthGate({ children, title = 'Log in to continue' }: AuthGateProps) {
  const { isSignedIn } = useAuth();
  const location = useLocation();

  if (isSignedIn) return <>{children}</>;

  const redirect = encodeURIComponent(location.pathname + location.search);
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <LockIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">This page is only available to signed-in members. It takes a few seconds.</p>
      <div className="mt-6 flex gap-2">
        <ButtonLink to={`/login?redirect=${redirect}`}>Log in</ButtonLink>
        <ButtonLink to={`/signup?redirect=${redirect}`} variant="secondary">Create account</ButtonLink>
      </div>
    </div>);

}
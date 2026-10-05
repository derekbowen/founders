import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function RequireAuth({ children }: {children: React.ReactElement;}) {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  if (!isSignedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search, fromState: location.state }} />);


  }
  return children;
}
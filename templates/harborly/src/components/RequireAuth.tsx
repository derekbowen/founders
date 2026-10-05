import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useMarketplace } from '../contexts/MarketplaceContext';

export function RequireAuth({ children }: {children: React.ReactElement;}) {
  const { isAuthenticated } = useMarketplace();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }
  return children;
}
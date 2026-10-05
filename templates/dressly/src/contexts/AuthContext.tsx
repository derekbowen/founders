import React, { createContext, useContext, useMemo, useState } from 'react';
import { currentUserId } from '../data/users';
import { getUser } from '../utils/lookup';
import type { User } from '../types/marketplace';

interface AuthContextValue {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  startSignedIn: boolean;
}

export function AuthProvider({ children, startSignedIn }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(startSignedIn);
  const value = useMemo<AuthContextValue>(
    () => ({
      user: signedIn ? getUser(currentUserId) ?? null : null,
      login: () => setSignedIn(true),
      logout: () => setSignedIn(false)
    }),
    [signedIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}